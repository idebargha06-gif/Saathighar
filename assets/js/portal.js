// ============================================================
//  SaathiGhar — Portal Shared Header
//  Injects topbar, wires notification bell, handles logout
//  Call initPortalHeader({ role, logoHref }) in each portal
// ============================================================

async function initPortalHeader(opts = {}) {
  const role   = opts.role   || 'family';
  const logoHref = opts.logoHref || '../index.html';

  const roleLabels = {
    family:    'Family Portal',
    ashram:    'Ashram Portal',
    volunteer: 'Volunteer Hub',
    resident:  'Resident Home',
    admin:     'Admin Panel',
  };

  // ── Get current user ──
  const { data: { session } } = await getSB().auth.getSession();
  if (!session) { window.location.href = '../auth/login-' + role + '.html'; return; }

  const { data: profile } = await getSB()
    .from('profiles').select('*').eq('id', session.user.id).single();

  // ── Inject topbar if placeholder exists ──
  const topbar = document.getElementById('portal-topbar');
  if (topbar) {
    topbar.className = 'portal-topbar';
    topbar.innerHTML = `
      <a href="${logoHref}" class="portal-topbar-logo">
        <img src="../assets/images/logo.png" alt="SaathiGhar">
        <div>
          <div class="portal-topbar-logo-name">SaathiGhar</div>
          <div class="portal-topbar-logo-role">${roleLabels[role] || role}</div>
        </div>
      </a>
      <div class="portal-topbar-actions">
        <div id="sg-notification-bell"></div>
        <div class="portal-user-menu" id="portal-user-menu">
          <div class="portal-user-avatar" id="portal-avatar">
            ${profile?.avatar_url
              ? `<img src="${profile.avatar_url}" alt="Avatar">`
              : '👤'}
          </div>
          <div>
            <div class="portal-user-name">${profile?.full_name || session.user.email}</div>
            <div class="portal-user-role">${roleLabels[role]}</div>
          </div>
        </div>
        <button class="portal-logout-btn" id="portal-logout-btn">Sign Out</button>
      </div>`;

    document.getElementById('portal-logout-btn')?.addEventListener('click', async () => {
      await getSB().auth.signOut();
      window.location.href = '../auth/login-' + role + '.html';
    });
  }

  // ── Init notification bell ──
  if (typeof initNotificationBell === 'function') {
    await initNotificationBell();
  }

  // ── Store profile globally for portal pages ──
  window.sgProfile  = profile;
  window.sgSession  = session;
  window.sgUserId   = session.user.id;

  return { profile, session };
}

// ============================================================
//  Cloudinary Upload Helper (with progress + preview)
// ============================================================
async function uploadWithPreview(file, folder, previewContainerId) {
  const preview = document.getElementById(previewContainerId);

  // Progress bar
  const progress = document.createElement('div');
  progress.className = 'sg-upload-progress';
  progress.innerHTML = '<div class="sg-upload-progress-bar" id="sg-prog-bar"></div>';
  preview?.parentElement?.appendChild(progress);

  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', CLOUDINARY.uploadPreset);
  fd.append('folder', `saathighar/${folder}`);
  fd.append('quality', 'auto');

  // XHR for progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', CLOUDINARY.apiBase + '/image/upload');
    xhr.upload.addEventListener('progress', e => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        const bar = document.getElementById('sg-prog-bar');
        if (bar) bar.style.width = pct + '%';
      }
    });
    xhr.addEventListener('load', () => {
      progress.remove();
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        // Show thumbnail preview
        if (preview) {
          const img = document.createElement('img');
          img.src = CLOUDINARY.thumb(data.public_id);
          img.className = 'sg-upload-thumb';
          preview.appendChild(img);
        }
        resolve({ url: data.secure_url, publicId: data.public_id, thumb: CLOUDINARY.thumb(data.public_id) });
      } else {
        reject(new Error('Upload failed'));
      }
    });
    xhr.addEventListener('error', () => { progress.remove(); reject(new Error('Network error')); });
    xhr.send(fd);
  });
}

// ============================================================
//  SOS Trigger (portal-wide)
// ============================================================
function initSOSButton(btnId) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener('click', async () => {
    if (!confirm('🚨 Trigger Emergency SOS?\n\nThis will immediately alert ashram staff and notify your primary family contact.')) return;
    try {
      const residentId = window.sgProfile?.resident_id || null;
      const ashramId   = window.sgProfile?.ashram_id   || null;
      await triggerSOS(residentId, ashramId, window.sgUserId, 'Emergency button pressed');
      btn.textContent = '✅';
      btn.style.animation = 'none';
      showPortalToast('Emergency alert sent to ashram staff and family.', 'error');
      setTimeout(() => { btn.textContent = '🆘'; btn.style.animation = ''; }, 5000);
    } catch (e) {
      showPortalToast('Could not send SOS. Please call ashram directly.', 'error');
    }
  });
}

// ============================================================
//  Portal Toast (smaller, in-portal variant)
// ============================================================
function showPortalToast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.innerHTML = `${icons[type] || 'ℹ️'} <span>${msg}</span>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4500);
}

// ============================================================
//  Pay Fees Button — wires payment to a button
// ============================================================
function initPayFeesButton(btnId, { residentId, ashramId, amountInr, residentName, ashramName }) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener('click', async () => {
    if (!window.Razorpay) {
      showPortalToast('Loading payment service…', 'info');
      await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    }
    await initiateResidentFeePayment({
      familyId: window.sgUserId,
      residentId, ashramId, amountInr, residentName, ashramName,
    });
  });
}

// ── Load external script dynamically ──
function loadScript(src) {
  return new Promise(resolve => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src; s.onload = resolve;
    document.head.appendChild(s);
  });
}
