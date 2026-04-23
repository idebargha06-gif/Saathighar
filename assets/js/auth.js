// SaathiGhar — Auth JS (Supabase)

/* ── Toast ── */
function showToast(msg, type='info'){
  const icons={success:'✅',error:'❌',info:'ℹ️',warning:'⚠️'};
  const el=document.createElement('div');
  el.className='toast '+type;
  el.innerHTML=`${icons[type]||'ℹ️'} <span>${msg}</span>`;
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),4000);
}

/* ── Loading state ── */
function setLoading(btn,on,txt){
  if(on){btn.dataset.orig=btn.innerHTML;btn.innerHTML=`<span class="spinner" style="width:18px;height:18px;border-width:2px"></span> ${txt||'Please wait…'}`;btn.classList.add('loading');}
  else{btn.innerHTML=btn.dataset.orig||btn.innerHTML;btn.classList.remove('loading');}
}

/* ── Password strength ── */
function initPasswordStrength(inId,barId,lblId){
  const inp=document.getElementById(inId),bar=document.getElementById(barId),lbl=document.getElementById(lblId);
  if(!inp||!bar||!lbl)return;
  const labels={weak:'Weak password',medium:'Medium — add a symbol',strong:'Strong password ✓'};
  inp.addEventListener('input',()=>{
    const v=inp.value,score=[v.length>=8,/[A-Z]/.test(v),/[0-9]/.test(v),/[^A-Za-z0-9]/.test(v),v.length>=12].filter(Boolean).length;
    const s=score<=2?'weak':score<=4?'medium':'strong';
    bar.className='pw-strength-fill '+(v?s:'');
    lbl.textContent=v?labels[s]:'';
  });
}

/* ── Eye toggle ── */
function initPasswordToggle(eyeId,inId){
  const e=document.getElementById(eyeId),i=document.getElementById(inId);
  if(!e||!i)return;
  e.addEventListener('click',()=>{const s=i.type==='password';i.type=s?'text':'password';e.textContent=s?'🙈':'👁️';});
}

/* ── OTP boxes ── */
function initOTPInput(containerId){
  const c=document.getElementById(containerId);
  if(!c)return;
  const digits=[...c.querySelectorAll('.otp-digit')];
  digits.forEach((d,i)=>{
    d.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!d.value&&i>0)digits[i-1].focus();});
    d.addEventListener('input',()=>{d.value=d.value.replace(/\D/g,'').slice(-1);if(d.value){d.classList.add('filled');if(i<digits.length-1)digits[i+1].focus();}else d.classList.remove('filled');});
    d.addEventListener('paste',e=>{const p=(e.clipboardData||window.clipboardData).getData('text').replace(/\D/g,'').slice(0,6);digits.forEach((dd,ii)=>{if(p[ii]){dd.value=p[ii];dd.classList.add('filled');}});e.preventDefault();});
  });
}
function getOTP(containerId){return[...document.getElementById(containerId)?.querySelectorAll('.otp-digit')||[]].map(d=>d.value).join('');}

/* ── OTP timer ── */
function startOTPTimer(timerId,resendId,sec=60){
  const t=document.getElementById(timerId),r=document.getElementById(resendId);
  if(r)r.disabled=true;
  let left=sec;
  const tick=setInterval(()=>{left--;if(t)t.textContent=`Resend in ${left}s`;if(left<=0){clearInterval(tick);if(t)t.textContent='';if(r)r.disabled=false;}},1000);
}

/* ── Multi-step form ── */
function initMultiStep(formId){
  const form=document.getElementById(formId);
  if(!form)return;
  let cur=0;
  const panels=[...form.querySelectorAll('.reg-step-panel')];
  const steps=[...form.querySelectorAll('.reg-step')];
  function goTo(n, isInit){
    panels.forEach((p,i)=>p.classList.toggle('active',i===n));
    steps.forEach((s,i)=>{s.classList.toggle('active',i===n);s.classList.toggle('completed',i<n);});
    cur=n;
    // Only scroll on user-driven step changes, not initial render
    if(!isInit) window.scrollTo({top:0, behavior:'smooth'});
  }
  form.querySelectorAll('[data-next-step]').forEach(btn=>btn.addEventListener('click',()=>{
    if(!validateStep(form,cur))return;
    goTo(parseInt(btn.dataset.nextStep));
  }));
  form.querySelectorAll('[data-prev-step]').forEach(btn=>btn.addEventListener('click',()=>goTo(parseInt(btn.dataset.prevStep))));
  goTo(0, true); // isInit=true → no scroll
}
function validateStep(form,idx){
  let ok=true;
  [...form.querySelectorAll('.reg-step-panel')][idx]?.querySelectorAll('[required]').forEach(i=>{if(!i.value.trim()){i.classList.add('error');ok=false;setTimeout(()=>i.classList.remove('error'),2000);}});
  if(!ok)showToast('Please fill in all required fields.','error');
  return ok;
}

/* ── Ashram search ── */
const ASHRAMS=[
  {name:'Sunrise Senior Home',city:'Pune'},{name:'Shanti Niwas Ashram',city:'Mumbai'},
  {name:'Anand Vriddhashram',city:'Delhi'},{name:'Prem Sagar Elder Care',city:'Bangalore'},
  {name:'Vrindavan Ashram',city:'Jaipur'},{name:'Seva Sadan Home',city:'Chennai'},
  {name:'Sneha Bhavan',city:'Kolkata'},{name:'Asha Jyoti Ashram',city:'Hyderabad'},
];
function initAshramSearch(inId,resId,hidId){
  const inp=document.getElementById(inId),res=document.getElementById(resId),hid=document.getElementById(hidId);
  if(!inp||!res)return;
  inp.addEventListener('input',()=>{
    const q=inp.value.toLowerCase().trim();
    if(!q){res.classList.remove('open');return;}
    const m=ASHRAMS.filter(a=>a.name.toLowerCase().includes(q)||a.city.toLowerCase().includes(q));
    res.innerHTML=m.length?m.map(a=>`<div class="ashram-result-item" data-name="${a.name}" data-city="${a.city}"><strong>${a.name}</strong><div class="city">📍 ${a.city}</div></div>`).join(''):'<div class="ashram-result-item" style="color:var(--text-light)">No results</div>';
    res.classList.add('open');
  });
  res.addEventListener('click',e=>{const it=e.target.closest('[data-name]');if(!it)return;inp.value=`${it.dataset.name}, ${it.dataset.city}`;if(hid)hid.value=it.dataset.name;res.classList.remove('open');});
  document.addEventListener('click',e=>{if(!inp.contains(e.target)&&!res.contains(e.target))res.classList.remove('open');});
}

/* ── File upload ── */
function initFileUpload(areaId,inputId){
  const a=document.getElementById(areaId),i=document.getElementById(inputId);
  if(!a||!i)return;
  a.addEventListener('click',()=>i.click());
  a.addEventListener('dragover',e=>{e.preventDefault();a.style.borderColor='var(--teal)';});
  a.addEventListener('dragleave',()=>a.style.borderColor='');
  a.addEventListener('drop',e=>{e.preventDefault();a.style.borderColor='';if(e.dataTransfer.files[0])handleFile(a,e.dataTransfer.files[0]);});
  i.addEventListener('change',()=>{if(i.files[0])handleFile(a,i.files[0]);});
}
function handleFile(a,f){a.classList.add('has-file');a.querySelector('.auth-file-text').innerHTML=`<strong>✅ ${f.name}</strong>`;a.querySelector('.auth-file-types').textContent=`${(f.size/1024).toFixed(0)} KB`;}

/* ── Care options ── */
function initCareOptions(){
  document.querySelectorAll('.care-options').forEach(grp=>{
    grp.querySelectorAll('.care-option').forEach(opt=>{
      opt.addEventListener('click',()=>{
        grp.querySelectorAll('.care-option').forEach(o=>o.classList.remove('selected'));
        opt.classList.add('selected');
        const hid=grp.nextElementSibling;
        if(hid?.type==='hidden')hid.value=opt.dataset.value||opt.querySelector('.opt-label')?.textContent||'';
      });
    });
  });
}

/* ============================================================
   SUPABASE AUTH FUNCTIONS
   ============================================================ */

const PORTAL={
  family:'../../portals/family/dashboard.html',
  ashram:'../../portals/ashram/ashram-dashboard.html',
  volunteer:'../../portals/volunteer/volunteer-hub.html',
  elderly:'../../portals/elderly/elderly-dashboard.html',
  admin:'../../admin/dashboard.html',
};

function getSB(){return window._sb;}

async function routeUser(user){
  if(!user)return;
  const role=user.user_metadata?.role||user.app_metadata?.role||'family';
  window.location.href=PORTAL[role]||PORTAL.family;
}

// ── Login ──
async function doLogin(email,password,role,btn){
  setLoading(btn,true,'Verifying…');
  try{
    const {data,error}=await getSB().auth.signInWithPassword({email,password});
    if(error)throw error;
    showToast('Login successful! Redirecting…','success');
    setTimeout(()=>routeUser(data.user),800);
  }catch(e){
    setLoading(btn,false);
    showToast(e.message||'Login failed. Please check your credentials.','error');
  }
}

// ── Google OAuth ──
async function doGoogleLogin(){
  const {error}=await getSB().auth.signInWithOAuth({provider:'google',options:{redirectTo:window.location.origin+'/auth/login.html'}});
  if(error)showToast(error.message,'error');
}

// ── Send phone OTP ──
async function sendPhoneOTP(phone){
  const {error}=await getSB().auth.signInWithOtp({phone});
  if(error){showToast(error.message,'error');return false;}
  showToast('OTP sent to your mobile number.','success');
  return true;
}

// ── Verify phone OTP ──
async function verifyPhoneOTP(phone,token){
  const {data,error}=await getSB().auth.verifyOtp({phone,token,type:'sms'});
  if(error){showToast(error.message,'error');return null;}
  return data.user;
}

// ── Sign-Up (email) ──
async function doSignUp(email,password,metadata){
  const {data,error}=await getSB().auth.signUp({email,password,options:{data:metadata}});
  if(error)throw error;
  return data.user;
}

// ── Sign-Out ──
async function doSignOut(){
  await getSB().auth.signOut();
  window.location.href='/index.html';
}

// ── Check session → redirect if already logged in ──
async function redirectIfLoggedIn(){
  const {data:{session}}=await getSB().auth.getSession();
  if(session?.user)await routeUser(session.user);
}

/* ============================================================
   LOGIN PAGE
   ============================================================ */
function initLoginPage(){
  // Role tabs
  document.querySelectorAll('.auth-role-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.auth-role-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.auth-login-panel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-'+tab.dataset.role)?.classList.add('active');
    });
  });

  initPasswordToggle('eye-family','pw-family');
  initPasswordToggle('eye-ashram','pw-ashram');
  initPasswordToggle('eye-volunteer','pw-volunteer');
  initOTPInput('otp-ashram-2fa');

  // Family login
  document.querySelector('.login-form[data-role="family"]')?.addEventListener('submit',async e=>{
    e.preventDefault();
    const email=e.target.querySelector('[name="email"]').value;
    const pw=e.target.querySelector('[name="password"]').value;
    if(!email||!pw){showToast('Enter email and password.','error');return;}
    await doLogin(email,pw,'family',e.target.querySelector('.auth-submit'));
  });

  // Ashram login (step 1: credentials)
  document.querySelector('.login-form[data-role="ashram"]')?.addEventListener('submit',async e=>{
    e.preventDefault();
    const email=e.target.querySelector('[name="email"]').value;
    const pw=e.target.querySelector('[name="password"]').value;
    if(!email||!pw){showToast('Enter email and password.','error');return;}
    const btn=e.target.querySelector('.auth-submit');
    setLoading(btn,true,'Verifying…');
    const {data,error}=await getSB().auth.signInWithPassword({email,password:pw});
    setLoading(btn,false);
    if(error){showToast(error.message,'error');return;}
    // Show 2FA OTP step
    document.getElementById('ashram-login-step').style.display='none';
    document.getElementById('ashram-2fa-step').style.display='block';
    // Send phone OTP for 2FA (uses phone in user metadata)
    const phone=data.user?.user_metadata?.mobile;
    if(phone)await sendPhoneOTP(phone);
    startOTPTimer('otp-timer-ashram','otp-resend-ashram',60);
  });

  // Ashram 2FA verify
  document.getElementById('btn-verify-2fa')?.addEventListener('click',async()=>{
    const otp=getOTP('otp-ashram-2fa');
    if(otp.length<6){showToast('Enter all 6 OTP digits.','error');return;}
    const btn=document.getElementById('btn-verify-2fa');
    const {data:{session}}=await getSB().auth.getSession();
    const phone=session?.user?.user_metadata?.mobile;
    setLoading(btn,true,'Verifying…');
    const user=phone?await verifyPhoneOTP(phone,otp):session?.user;
    setLoading(btn,false);
    if(user){showToast('2FA verified! Redirecting…','success');setTimeout(()=>routeUser(user),800);}
  });

  // Volunteer login
  document.querySelector('.login-form[data-role="volunteer"]')?.addEventListener('submit',async e=>{
    e.preventDefault();
    const email=e.target.querySelector('[name="email"]').value;
    const pw=e.target.querySelector('[name="password"]').value;
    await doLogin(email,pw,'volunteer',e.target.querySelector('.auth-submit'));
  });

  // Admin login
  document.querySelector('.login-form[data-role="admin"]')?.addEventListener('submit',async e=>{
    e.preventDefault();
    const email=e.target.querySelector('[name="email"]').value;
    const pw=e.target.querySelector('[name="password"]').value;
    await doLogin(email,pw,'admin',e.target.querySelector('.auth-submit'));
  });

  // Resident staff PIN
  document.getElementById('btn-staff-pin')?.addEventListener('click',()=>{
    const pin=document.getElementById('staff-pin-input')?.value;
    if(!pin||pin.length<4){showToast('Enter the ashram staff PIN.','error');return;}
    window.location.href=PORTAL.elderly;
  });

  // Google buttons
  document.querySelectorAll('.btn-google').forEach(btn=>{
    btn.addEventListener('click',()=>doGoogleLogin());
  });

  // OTP resend - ashram
  document.getElementById('otp-resend-ashram')?.addEventListener('click',async()=>{
    const {data:{session}}=await getSB().auth.getSession();
    const phone=session?.user?.user_metadata?.mobile;
    if(phone){await sendPhoneOTP(phone);startOTPTimer('otp-timer-ashram','otp-resend-ashram',60);}
  });
}

/* ============================================================
   FAMILY REGISTRATION
   ============================================================ */
function initFamilyReg(){
  initMultiStep('register-family-form');
  initPasswordStrength('pw-family-reg','pw-strength-bar','pw-strength-label');
  initPasswordToggle('eye-family-reg','pw-family-reg');
  initOTPInput('otp-family-reg');
  initAshramSearch('ashram-search-input','ashram-search-results','ashram-selected');
  initCareOptions();

  // Step 1→2: send phone OTP
  document.querySelector('#register-family-form [data-next-step="1"]')?.addEventListener('click',async()=>{
    const phone=document.getElementById('mobile-family')?.value?.trim();
    const pw=document.getElementById('pw-family-reg')?.value;
    const pwc=document.getElementById('pw-confirm-family')?.value;
    if(!phone){showToast('Enter your mobile number.','error');return;}
    if(pw!==pwc){showToast('Passwords do not match.','error');return;}
    if(document.getElementById('display-mobile-family'))document.getElementById('display-mobile-family').textContent=phone;
    await sendPhoneOTP(phone);
    startOTPTimer('otp-timer-family','otp-resend-family',60);
  });

  // OTP resend
  document.getElementById('otp-resend-family')?.addEventListener('click',async()=>{
    const phone=document.getElementById('mobile-family')?.value?.trim();
    if(phone){await sendPhoneOTP(phone);startOTPTimer('otp-timer-family','otp-resend-family',60);}
  });

  // Final submit
  document.getElementById('register-family-form')?.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!document.getElementById('terms-family')?.checked){showToast('Please accept Terms of Use.','error');return;}
    const btn=document.getElementById('btn-family-submit');
    setLoading(btn,true,'Creating account…');
    try{
      const email=document.getElementById('email-family-reg').value;
      const pw=document.getElementById('pw-family-reg').value;
      const fname=document.getElementById('fname-family').value;
      const lname=document.getElementById('lname-family').value;
      const mobile=document.getElementById('mobile-family').value;
      const otp=getOTP('otp-family-reg');
      // Verify OTP then create account
      const user=await verifyPhoneOTP(mobile,otp);
      if(!user&&otp){showToast('OTP verification failed.','error');setLoading(btn,false);return;}
      await doSignUp(email,pw,{
        role:'family',full_name:`${fname} ${lname}`,mobile,
        resident_name:document.getElementById('parent-name')?.value,
        relationship:document.getElementById('relationship-select')?.value,
        ashram:document.getElementById('ashram-selected')?.value,
        status:'active',
      });
      setLoading(btn,false);
      document.querySelectorAll('.reg-step-panel').forEach(p=>p.classList.remove('active'));
      document.getElementById('family-success-panel')?.classList.add('active');
    }catch(err){
      setLoading(btn,false);
      showToast(err.message||'Registration failed.','error');
    }
  });
}

/* ============================================================
   ASHRAM REGISTRATION
   ============================================================ */
function initAshramReg(){
  initMultiStep('register-ashram-form');
  initPasswordStrength('pw-ashram-reg','pw-ashram-strength-bar','pw-ashram-strength-label');
  initPasswordToggle('eye-ashram-reg','pw-ashram-reg');
  initFileUpload('doc-upload-area','doc-upload-input');
  initFileUpload('id-upload-area','id-upload-input');

  document.getElementById('register-ashram-form')?.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!document.getElementById('ashram-terms')?.checked||!document.getElementById('ashram-verification-consent')?.checked){
      showToast('Please accept all declarations.','error');return;
    }
    const btn=document.getElementById('btn-ashram-submit');
    setLoading(btn,true,'Submitting…');
    try{
      const email=document.getElementById('mgr-email').value;
      const pw=document.getElementById('pw-ashram-reg').value;
      await doSignUp(email,pw,{
        role:'ashram',status:'pending',
        full_name:`${document.getElementById('mgr-fname').value} ${document.getElementById('mgr-lname').value}`,
        mobile:document.getElementById('mgr-mobile').value,
        ashram_name:document.getElementById('ashram-name').value,
        ashram_city:document.getElementById('ashram-city').value,
        ashram_state:document.getElementById('ashram-state').value,
        designation:document.getElementById('mgr-designation').value,
      });
      setLoading(btn,false);
      document.querySelectorAll('.reg-step-panel').forEach(p=>p.classList.remove('active'));
      document.getElementById('ashram-success-panel')?.classList.add('active');
    }catch(err){
      setLoading(btn,false);
      showToast(err.message||'Submission failed.','error');
    }
  });
}

/* ============================================================
   VOLUNTEER REGISTRATION
   ============================================================ */
function initVolunteerReg(){
  initMultiStep('register-volunteer-form');
  initPasswordStrength('pw-vol-reg','pw-vol-strength-bar','pw-vol-strength-label');
  initPasswordToggle('eye-vol-reg','pw-vol-reg');
  initOTPInput('otp-vol-reg');
  initOTPInput('otp-aadhaar-reg');

  // Step 1→2: send phone OTP
  document.querySelector('#register-volunteer-form [data-next-step="1"]')?.addEventListener('click',async()=>{
    const phone=document.getElementById('vol-mobile')?.value?.trim();
    if(!phone){showToast('Enter your mobile number.','error');return;}
    if(document.getElementById('display-mobile-vol'))document.getElementById('display-mobile-vol').textContent=phone;
    await sendPhoneOTP(phone);
    startOTPTimer('otp-timer-vol','otp-resend-vol',60);
  });

  document.getElementById('otp-resend-vol')?.addEventListener('click',async()=>{
    const phone=document.getElementById('vol-mobile')?.value?.trim();
    if(phone){await sendPhoneOTP(phone);startOTPTimer('otp-timer-vol','otp-resend-vol',60);}
  });

  // Aadhaar OTP
  document.getElementById('btn-verify-aadhaar')?.addEventListener('click',async()=>{
    const num=document.getElementById('aadhaar-input')?.value?.replace(/\s/g,'');
    if(!num||num.length!==12){showToast('Enter a valid 12-digit Aadhaar number.','error');return;}
    document.getElementById('aadhaar-otp-step').style.display='block';
    startOTPTimer('otp-timer-aadhaar','otp-resend-aadhaar',60);
    showToast('OTP sent to Aadhaar-linked mobile (demo mode).','info');
  });

  document.getElementById('register-volunteer-form')?.addEventListener('submit',async e=>{
    e.preventDefault();
    const checks=['vol-bg-check','vol-conduct','vol-privacy'];
    if(!checks.every(id=>document.getElementById(id)?.checked)){showToast('Please accept all declarations.','error');return;}
    const btn=document.getElementById('btn-vol-submit');
    setLoading(btn,true,'Submitting…');
    try{
      const email=document.getElementById('vol-email').value;
      const pw=document.getElementById('pw-vol-reg').value;
      const phone=document.getElementById('vol-mobile').value;
      await doSignUp(email,pw,{
        role:'volunteer',status:'pending',
        full_name:`${document.getElementById('vol-fname').value} ${document.getElementById('vol-lname').value}`,
        mobile:phone,city:document.getElementById('vol-city').value,
      });
      setLoading(btn,false);
      document.querySelectorAll('.reg-step-panel').forEach(p=>p.classList.remove('active'));
      document.getElementById('volunteer-success-panel')?.classList.add('active');
    }catch(err){
      setLoading(btn,false);
      showToast(err.message||'Registration failed.','error');
    }
  });
}

/* ── Portal Switcher ── */
function initPortalSwitcher(){
  const switcher=document.getElementById('portalSwitcher');
  const menu=document.getElementById('portalSwitcherMenu');
  if(!switcher||!menu)return;
  const roles=JSON.parse(localStorage.getItem('sg_roles')||'[]');
  const cur=localStorage.getItem('sg_role')||'';
  const labels={family:'👨‍👩‍👧 Family Dashboard',volunteer:'🤝 Volunteer Hub',ashram:'🏡 Ashram Portal'};
  if(roles.length<2){switcher.style.display='none';return;}
  menu.innerHTML=roles.filter(r=>r!==cur).map(r=>`<a class="portal-switch-item" href="${PORTAL[r]||'#'}">${labels[r]||r}</a>`).join('');
  switcher.addEventListener('click',e=>{e.stopPropagation();menu.classList.toggle('open');});
  document.addEventListener('click',()=>menu.classList.remove('open'));
}

/* ── DOMContentLoaded ── */
document.addEventListener('DOMContentLoaded',()=>{
  if(document.getElementById('login-page')){redirectIfLoggedIn();initLoginPage();}
  if(document.getElementById('register-family-form'))initFamilyReg();
  if(document.getElementById('register-ashram-form'))initAshramReg();
  if(document.getElementById('register-volunteer-form'))initVolunteerReg();
  initPortalSwitcher();

  // CTA toast buttons still on homepage
  document.querySelectorAll('[data-toast]').forEach(btn=>{
    btn.addEventListener('click',()=>showToast(btn.dataset.toast,btn.dataset.toastType||'info'));
  });

  // Supabase auth state listener (for OAuth redirects)
  getSB()?.auth.onAuthStateChange(async(_event,session)=>{
    if(_event==='SIGNED_IN'&&session?.user&&!document.getElementById('login-page')){
      // already on a portal page — store role
      const role=session.user.user_metadata?.role||'family';
      localStorage.setItem('sg_role',role);
    }
  });
});
