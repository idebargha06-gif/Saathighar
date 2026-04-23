// ============================================================
//  SaathiGhar — Backend Services Configuration
//  Cloudinary · Razorpay · Notifications · Realtime
// ============================================================

/* ── Supabase (already initialised via supabase-config.js) ── */
function getSB(){ return window._sb; }

// ============================================================
//  CLOUDINARY — Image Upload
// ============================================================
const CLOUDINARY = {
  cloudName: 'devzlasx2',
  uploadPreset: 'saathighar_unsigned',    // create in Cloudinary → Settings → Upload Presets
  apiBase: 'https://api.cloudinary.com/v1_1/devzlasx2',

  // Image transform URLs (auto-compress, WebP)
  thumb: (publicId) => `https://res.cloudinary.com/devzlasx2/image/upload/w_200,h_200,c_fill,q_auto,f_auto/${publicId}`,
  medium: (publicId) => `https://res.cloudinary.com/devzlasx2/image/upload/w_800,q_auto,f_auto/${publicId}`,
  full: (publicId) => `https://res.cloudinary.com/devzlasx2/image/upload/q_auto,f_auto/${publicId}`,
};

// Upload a file to Cloudinary (unsigned upload)
async function uploadToCloudinary(file, folder='general') {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', CLOUDINARY.uploadPreset);
  fd.append('folder', `saathighar/${folder}`);
  fd.append('quality', 'auto');

  const res = await fetch(`${CLOUDINARY.apiBase}/image/upload`, { method: 'POST', body: fd });
  if (!res.ok) throw new Error('Cloudinary upload failed');
  const data = await res.json();
  return { url: data.secure_url, publicId: data.public_id, thumb: CLOUDINARY.thumb(data.public_id) };
}

// Upload widget (requires Cloudinary widget script)
function openCloudinaryWidget(folder, onSuccess) {
  if (!window.cloudinary) { console.warn('Cloudinary widget script not loaded. Add: <script src="https://upload-widget.cloudinary.com/global/all.js"><\/script>'); return; }
  const widget = cloudinary.createUploadWidget({
    cloudName: CLOUDINARY.cloudName,
    uploadPreset: CLOUDINARY.uploadPreset,
    folder: `saathighar/${folder}`,
    maxFileSize: 20000000,
    clientAllowedFormats: ['jpg','jpeg','png','webp','gif','mp4','mov','mp3'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    sources: ['local','camera','url'],
    showAdvancedOptions: false,
    cropping: folder === 'profiles',
    croppingAspectRatio: folder === 'profiles' ? 1 : undefined,
    multiple: folder === 'memory-wall',
  }, (error, result) => {
    if (error) { showToast('Upload failed: ' + error.message, 'error'); return; }
    if (result.event === 'success') onSuccess(result.info);
  });
  widget.open();
}

// ============================================================
//  RAZORPAY — Payment Integration
// ============================================================
const RAZORPAY_KEY = 'rzp_test_REPLACE_WITH_YOUR_KEY'; // replace with live key for production

// Flow 2: Family pays ashram — one-time fee payment
async function initiateResidentFeePayment({ familyId, residentId, ashramId, amountInr, residentName, ashramName }) {
  if (!window.Razorpay) { showToast('Payment service loading…', 'info'); return; }

  // 1. Create order in Supabase (Edge Function or direct insert)
  const { data: payment, error } = await getSB()
    .from('resident_fee_payments')
    .insert({
      family_id: familyId, resident_id: residentId, ashram_id: ashramId,
      amount_inr: amountInr, method: 'platform',
      platform_fee_inr: Math.round(amountInr * 0.015),
      status: 'pending', due_date: new Date().toISOString().split('T')[0],
    })
    .select().single();
  if (error) { showToast('Could not initiate payment.', 'error'); return; }

  // 2. Open Razorpay checkout
  const options = {
    key: RAZORPAY_KEY,
    amount: amountInr * 100,  // in paise
    currency: 'INR',
    name: 'SaathiGhar',
    description: `Care fee for ${residentName} — ${ashramName}`,
    image: '/assets/images/logo.png',
    handler: async (response) => {
      // 3. Update payment record with Razorpay IDs
      await getSB().from('resident_fee_payments').update({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        status: 'paid', paid_at: new Date().toISOString(),
      }).eq('id', payment.id);
      showToast('Payment successful! ✅ Receipt sent to your email.', 'success');
    },
    prefill: { name: '', email: '', contact: '' },
    theme: { color: '#1A5276' },
    modal: { ondismiss: () => showToast('Payment cancelled.', 'info') },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
}

// Flow 3: Donation
async function initiateDonation({ donorId, type, targetResidentId, targetAshramId, amountInr, isAnonymous, message }) {
  if (!window.Razorpay) { showToast('Payment service loading…', 'info'); return; }

  const { data: donation, error } = await getSB()
    .from('donations')
    .insert({
      donor_id: donorId, donation_type: type,
      target_resident_id: targetResidentId || null,
      target_ashram_id: targetAshramId || null,
      amount_inr: amountInr,
      platform_fee_inr: type !== 'platform' ? Math.round(amountInr * 0.02) : 0,
      is_anonymous: isAnonymous, message, status: 'pending',
    })
    .select().single();
  if (error) { showToast('Could not process donation.', 'error'); return; }

  const labelMap = { resident:'Sponsor a resident\'s month', ashram:'Donate to ashram', platform:'Support SaathiGhar', csr:'CSR Donation' };
  const options = {
    key: RAZORPAY_KEY,
    amount: amountInr * 100,
    currency: 'INR',
    name: 'SaathiGhar Foundation',
    description: labelMap[type] || 'Donation',
    image: '/assets/images/logo.png',
    handler: async (response) => {
      await getSB().from('donations').update({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        status: 'completed',
      }).eq('id', donation.id);
      showToast('Thank you! Your donation has been received. 💛', 'success');
    },
    theme: { color: '#D4A017' },
    modal: { ondismiss: () => showToast('Donation cancelled.', 'info') },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
}

// Flow 1: Ashram subscription (redirect to Razorpay Subscription link)
const SUBSCRIPTION_LINKS = {
  starter:  'https://rzp.io/l/saathighar-starter',   // create in Razorpay dashboard
  care:     'https://rzp.io/l/saathighar-care',
  complete: 'https://rzp.io/l/saathighar-complete',
};
function startAshramSubscription(plan) {
  const link = SUBSCRIPTION_LINKS[plan];
  if (link) window.open(link, '_blank');
  else showToast('Please contact support to set up your subscription.', 'info');
}

// ============================================================
//  REALTIME — Live Notifications
// ============================================================
function subscribeToNotifications(userId, onNotification) {
  return getSB()
    .channel('notifications:' + userId)
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'notifications',
      filter: `user_id=eq.${userId}`,
    }, payload => onNotification(payload.new))
    .subscribe();
}

function subscribeToMemoryWall(residentId, onNewMedia) {
  return getSB()
    .channel('memory_wall:' + residentId)
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'memory_wall',
      filter: `resident_id=eq.${residentId}`,
    }, payload => onNewMedia(payload.new))
    .subscribe();
}

function subscribeToSOS(ashramId, onSOS) {
  return getSB()
    .channel('sos:' + ashramId)
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'sos_events',
      filter: `ashram_id=eq.${ashramId}`,
    }, payload => onSOS(payload.new))
    .subscribe();
}

// ============================================================
//  DATA HELPERS — Common DB queries
// ============================================================

// Get current user's profile + role
async function getCurrentProfile() {
  const { data:{ session } } = await getSB().auth.getSession();
  if (!session) return null;
  const { data } = await getSB().from('profiles').select('*').eq('id', session.user.id).single();
  return data;
}

// Get ashram by manager
async function getMyAshram(managerId) {
  const { data } = await getSB().from('ashrams').select('*').eq('manager_id', managerId).single();
  return data;
}

// Get residents for family member
async function getMyResidents(familyId) {
  const { data } = await getSB()
    .from('family_links')
    .select('*, resident:residents(*, ashram:ashrams(name,city))')
    .eq('family_id', familyId)
    .eq('status', 'approved');
  return data?.map(l => l.resident) || [];
}

// Get memory wall for a resident
async function getMemoryWall(residentId, limit=20) {
  const { data } = await getSB()
    .from('memory_wall')
    .select('*')
    .eq('resident_id', residentId)
    .eq('is_visible', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  return data || [];
}

// Get latest wellness log
async function getLatestWellness(residentId) {
  const { data } = await getSB()
    .from('wellness_logs')
    .select('*')
    .eq('resident_id', residentId)
    .order('logged_at', { ascending: false })
    .limit(1)
    .single();
  return data;
}

// Log a check-in
async function logCheckIn(familyId, residentId, type, durationMins, notes) {
  const { data, error } = await getSB()
    .from('check_ins')
    .insert({ family_id: familyId, resident_id: residentId, type, duration_mins: durationMins, notes });
  if (error) throw error;
  return data;
}

// Get unread notifications
async function getUnreadNotifications(userId, limit=10) {
  const { data } = await getSB()
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .eq('is_read', false)
    .order('sent_at', { ascending: false })
    .limit(limit);
  return data || [];
}

// Mark notification read
async function markNotificationRead(notificationId) {
  await getSB().from('notifications').update({ is_read: true }).eq('id', notificationId);
}

// Trigger SOS
async function triggerSOS(residentId, ashramId, triggeredBy, description) {
  const { data, error } = await getSB()
    .from('sos_events')
    .insert({ resident_id: residentId, ashram_id: ashramId, triggered_by: triggeredBy,
              trigger_type: 'resident_button', description, status: 'open' });
  if (error) throw error;
  return data;
}

// ============================================================
//  PRICING CONSTANTS (for UI display)
// ============================================================
const PLANS = {
  starter:  { name:'SaathiGhar Starter',  monthly:1999,  annual:19999, residents:25,  managers:1 },
  care:     { name:'SaathiGhar Care',     monthly:3999,  annual:39999, residents:75,  managers:3 },
  complete: { name:'SaathiGhar Complete', monthly:6999,  annual:69999, residents:200, managers:10 },
  enterprise:{ name:'Enterprise',         monthly:12000, annual:null,  residents:null,managers:null },
};

const PLATFORM_FEES = {
  resident_fee: 0.015,   // 1.5% when family pays via platform
  donation_external: 0.02, // 2% on resident/ashram donations
  csr_management: 0.10,    // 10% on CSR allocations
};
