import pathlib
ROOT = pathlib.Path(r'c:\Projects\Saathighar')

page = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Family Dashboard | SaathiGhar</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css">
<link rel="stylesheet" href="assets/css/dashboard.css">
</head>
<body>

<div class="dashboard-wrapper">
  
  <!-- Sidebar -->
  <aside class="dashboard-sidebar">
    <div class="sidebar-brand">
      <img src="assets/images/logo.png" alt="Logo">
      <div class="brand-text">
        <div class="brand-name">SaathiGhar</div>
        <div class="brand-sub">FAMILY PORTAL</div>
      </div>
      <div class="sidebar-close" id="sidebarToggle">&#10005;</div>
    </div>
    
    <div class="sidebar-user">
      <div class="sidebar-avatar">&#128105;</div>
      <div class="sidebar-user-info">
        <div class="user-name">Priya Sharma</div>
        <div class="user-role">Daughter &bull; Primary Contact</div>
      </div>
    </div>
    
    <nav class="sidebar-nav">
      <div class="sidebar-section-label">Main Menu</div>
      <button class="sidebar-nav-item active" data-section="overview"><span class="nav-icon">&#127968;</span> Overview</button>
      <button class="sidebar-nav-item" data-section="parent"><span class="nav-icon">&#128105;&#8205;&#9877;&#65039;</span> My Parent</button>
      <button class="sidebar-nav-item" data-section="checkins"><span class="nav-icon">&#128197;</span> Check-In Tracker</button>
      
      <div class="sidebar-section-label" style="margin-top:16px;">Services</div>
      <button class="sidebar-nav-item" data-section="payments"><span class="nav-icon">&#128179;</span> Payments <span class="nav-badge">Due</span></button>
      <button class="sidebar-nav-item" data-section="memory"><span class="nav-icon">&#128248;</span> Memory Wall</button>
      <button class="sidebar-nav-item" data-section="calls"><span class="nav-icon">&#128249;</span> Video Calls</button>
      
      <div class="sidebar-section-label" style="margin-top:16px;">Support</div>
      <button class="sidebar-nav-item" data-section="care"><span class="nav-icon">&#129309;</span> Care Requests</button>
    </nav>
    
    <div class="sidebar-footer">
      <a href="index.html">&#8592; Back to Website</a>
      <a href="#">&#9881;&#65039; Settings</a>
      <a href="#" style="color:var(--red);">&#128682; Logout</a>
    </div>
  </aside>
  
  <!-- Main Content -->
  <main class="dashboard-main">
    
    <header class="dashboard-topbar">
      <div style="display:flex;align-items:center;gap:16px;">
        <button id="sidebarToggle" class="topbar-icon-btn" style="display:none;" aria-label="Menu">&#9776;</button>
        <div class="topbar-greeting">
          <h2>Namaste, Priya.</h2>
          <p>Your Amma is doing well today.</p>
        </div>
      </div>
      <div class="topbar-actions">
        <button class="topbar-icon-btn" title="Search">&#128269;</button>
        <button class="topbar-icon-btn" title="Notifications">&#128276;<span class="notif-dot"></span></button>
      </div>
    </header>
    
    <div class="dashboard-content">
      
      <!-- Section: Overview -->
      <div id="section-overview" class="dash-section">
        
        <div class="parent-card animate-fade-up">
          <div class="parent-card-inner">
            <img src="assets/images/hero-elderly.png" class="parent-photo" alt="Savitri Devi">
            <div class="parent-info">
              <div class="parent-name">Savitri Devi</div>
              <div class="parent-details">74 years old &bull; Sunrise Senior Home, Pune &bull; Room 102</div>
              <div class="parent-wellness"><span class="wellness-dot green"></span> Wellness Status: Excellent</div>
              <div class="parent-last-checkin">&#128336; You last visited 12 days ago. Next scheduled: In 3 days.</div>
            </div>
            <div class="parent-quick-actions">
              <button class="quick-action-btn saffron" data-toast="Video call initiating..." data-toast-type="success">&#128249; Call Now</button>
              <button class="quick-action-btn" data-toast="Visit scheduler opening..." data-toast-type="info">&#128197; Schedule Visit</button>
              <button class="quick-action-btn" data-toast="Message sent to Ashram!" data-toast-type="success">&#128172; Send Message</button>
              <button class="quick-action-btn" onclick="document.querySelector('[data-section=\\'payments\\']').click();">&#128179; Pay Fees</button>
            </div>
          </div>
        </div>
        
        <div class="dashboard-grid animate-fade-up delay-1">
          
          <div class="widget">
            <div class="widget-header">
              <div class="widget-title">Recent Updates</div>
              <div class="widget-action" onclick="document.querySelector('[data-section=\\'checkins\\']').click();">View All</div>
            </div>
            <div class="widget-body">
              <div class="notif-feed">
                <div class="notif-item success">
                  <div class="notif-icon">&#128248;</div>
                  <div><div class="notif-text">Ashram added a new photo to the Memory Wall</div><div class="notif-time">2 hours ago</div></div>
                </div>
                <div class="notif-item info">
                  <div class="notif-icon">&#128138;</div>
                  <div><div class="notif-text">Health log updated. Blood pressure is normal.</div><div class="notif-time">Yesterday</div></div>
                </div>
                <div class="notif-item warning">
                  <div class="notif-icon">&#128179;</div>
                  <div><div class="notif-text">Monthly fee is due in 5 days.</div><div class="notif-time">2 days ago</div></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="widget">
            <div class="widget-header">
              <div class="widget-title">Check-In Streak</div>
              <div class="widget-action" onclick="document.querySelector('[data-section=\\'checkins\\']').click();">Details</div>
            </div>
            <div class="widget-body" style="text-align:center;">
              <div style="font-size:3.5rem;line-height:1;margin-bottom:8px;">&#128293;</div>
              <div class="streak-badge">4 Weeks Streak</div>
              <p style="font-size:0.85rem;color:var(--text-mid);margin-top:16px;">You're doing great! Keep your promise.</p>
              
              <div class="checkin-mini-calendar">
                <div class="cal-day checked">M</div><div class="cal-day checked">T</div><div class="cal-day checked">W</div><div class="cal-day today">T</div><div class="cal-day future">F</div><div class="cal-day future">S</div><div class="cal-day future">S</div>
              </div>
            </div>
          </div>
          
        </div>
        
        <div class="dashboard-grid-3 animate-fade-up delay-2">
          
          <div class="widget">
            <div class="widget-header"><div class="widget-title">Current Payment</div></div>
            <div class="widget-body">
              <div class="payment-status-card due">
                <div><div class="payment-label">April 2025</div><div class="payment-amount">&#8377;12,500</div></div>
                <span class="payment-pill due">DUE IN 5 DAYS</span>
              </div>
              <button class="btn btn-teal" style="width:100%;">Pay Now</button>
            </div>
          </div>
          
          <div class="widget" style="grid-column: span 2;">
            <div class="widget-header">
              <div class="widget-title">Recent Memories</div>
              <div class="widget-action" onclick="document.querySelector('[data-section=\\'memory\\']').click();">Go to Wall</div>
            </div>
            <div class="widget-body">
              <div class="memory-grid" style="grid-template-columns: repeat(4, 1fr);">
                <div class="memory-thumb" style="background:#FFF3E0;">&#127881;</div>
                <div class="memory-thumb"><img src="assets/images/hero-elderly.png" alt="Memory"></div>
                <div class="memory-thumb" style="background:#E3F2FD;">&#127926;</div>
                <div class="memory-thumb" style="background:var(--cream);color:var(--saffron);font-size:1rem;font-weight:800;">+12 More</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <!-- /Overview -->

      <!-- Section: Payments -->
      <div id="section-payments" class="dash-section" style="display:none;">
        <div class="section-header" style="text-align:left;margin-bottom:30px;">
          <h2>Payment Manager</h2>
          <p>Track your ashram fees and manage auto-pay.</p>
        </div>
        
        <div class="widget">
          <div class="widget-body" style="padding:32px;">
            <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #eee;padding-bottom:24px;margin-bottom:24px;">
              <div>
                <h3 style="color:var(--teal-dark);">Amount Due</h3>
                <div style="font-size:2.5rem;font-weight:900;color:var(--saffron);">&#8377;12,500</div>
                <p style="color:var(--text-light);font-size:0.9rem;">Due by April 5, 2025</p>
              </div>
              <div style="text-align:right;">
                <button class="btn btn-primary btn-lg" data-toast="Payment gateway opening..." data-toast-type="success">Pay via UPI / Card</button>
                <div style="margin-top:12px;font-size:0.85rem;"><label><input type="checkbox"> Set up Auto-Pay</label></div>
              </div>
            </div>
            
            <h4>Fee Breakdown</h4>
            <table style="width:100%;margin-top:16px;border-collapse:collapse;font-size:0.9rem;">
              <tr style="border-bottom:1px solid #eee;"><td style="padding:12px 0;">Base Room Fee (Shared)</td><td style="text-align:right;font-weight:700;">&#8377;8,000</td></tr>
              <tr style="border-bottom:1px solid #eee;"><td style="padding:12px 0;">Meals &amp; Nutrition Plan</td><td style="text-align:right;font-weight:700;">&#8377;3,000</td></tr>
              <tr style="border-bottom:1px solid #eee;"><td style="padding:12px 0;">Routine Medical Care</td><td style="text-align:right;font-weight:700;">&#8377;1,500</td></tr>
              <tr><td style="padding:12px 0;font-weight:800;color:var(--teal);">Total Expected</td><td style="text-align:right;font-weight:900;color:var(--teal);">&#8377;12,500</td></tr>
            </table>
          </div>
        </div>
      </div>
      <!-- /Payments -->

      <!-- Section: Care Requests -->
      <div id="section-care" class="dash-section" style="display:none;">
        <div class="section-header" style="text-align:left;margin-bottom:30px;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>Care Requests</h2>
            <p>Raise and track specific requests with the ashram staff.</p>
          </div>
          <button class="btn btn-primary" data-toast="New request form opening..." data-toast-type="info">+ New Request</button>
        </div>
        
        <div class="widget">
          <div class="widget-body">
            <div class="request-list">
              <div class="request-item pending">
                <div class="request-ticket">#REQ-8042</div>
                <div class="request-desc">Need an extra woolen blanket for Amma (nights are getting colder).</div>
                <div class="request-status pending">Pending Ashram</div>
              </div>
              <div class="request-item resolved">
                <div class="request-ticket">#REQ-7911</div>
                <div class="request-desc">Please ensure BP medicine is given after breakfast, not before.</div>
                <div class="request-status resolved">Resolved</div>
              </div>
              <div class="request-item resolved">
                <div class="request-ticket">#REQ-7820</div>
                <div class="request-desc">Vegetarian soup request for dinner.</div>
                <div class="request-status resolved">Resolved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Care Requests -->

      <!-- Section: Other tabs placeholder -->
      <div id="section-parent" class="dash-section" style="display:none;">
        <div class="section-header" style="text-align:left;"><h2>My Parent's Profile</h2><p>Health logs, preferences, and emergency contacts.</p></div>
        <div class="widget"><div class="widget-body" style="text-align:center;padding:60px;"><div style="font-size:3rem;opacity:0.3;margin-bottom:16px;">&#128105;&#8205;&#9877;&#65039;</div><h3>Full Medical &amp; Care Profile</h3><p style="color:var(--text-light);">This section contains encrypted medical data.</p></div></div>
      </div>
      <div id="section-checkins" class="dash-section" style="display:none;">
        <div class="section-header" style="text-align:left;"><h2>Check-In Tracker</h2><p>Your visit and call history.</p></div>
        <div class="widget"><div class="widget-body" style="text-align:center;padding:60px;"><div style="font-size:3rem;opacity:0.3;margin-bottom:16px;">&#128197;</div><h3>Calendar View</h3></div></div>
      </div>
      <div id="section-memory" class="dash-section" style="display:none;">
        <div class="section-header" style="text-align:left;"><h2>Memory Wall</h2><p>A private scrapbook shared with your parent.</p></div>
        <div class="widget"><div class="widget-body" style="text-align:center;padding:60px;"><div style="font-size:3rem;opacity:0.3;margin-bottom:16px;">&#128248;</div><h3>Photo &amp; Voice Message Timeline</h3></div></div>
      </div>
      <div id="section-calls" class="dash-section" style="display:none;">
        <div class="section-header" style="text-align:left;"><h2>Video Calls</h2><p>Schedule or start a video call.</p></div>
        <div class="widget"><div class="widget-body" style="text-align:center;padding:60px;"><div style="font-size:3rem;opacity:0.3;margin-bottom:16px;">&#128249;</div><h3>Integrated Calling System</h3></div></div>
      </div>

    </div>
  </main>
</div>

<!-- Mobile Sidebar Overlay -->
<div class="overlay" id="sidebarOverlay" style="display:none;z-index:799;"></div>

<script src="assets/js/main.js"></script>
<script>
  // Extra responsive logic for dashboard
  const st = document.getElementById('sidebarToggle');
  const sb = document.querySelector('.dashboard-sidebar');
  const so = document.getElementById('sidebarOverlay');
  
  if (window.innerWidth <= 1024) {
    document.querySelector('.topbar-icon-btn#sidebarToggle').style.display = 'flex';
  }
  
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 1024) {
      document.querySelector('.topbar-icon-btn#sidebarToggle').style.display = 'flex';
    } else {
      document.querySelector('.topbar-icon-btn#sidebarToggle').style.display = 'none';
      sb.classList.remove('open');
      if(so) so.style.display = 'none';
    }
  });
  
  document.querySelectorAll('#sidebarToggle').forEach(btn => {
    btn.addEventListener('click', () => {
      sb.classList.toggle('open');
      if (so) so.style.display = sb.classList.contains('open') ? 'block' : 'none';
    });
  });
  
  if(so) so.addEventListener('click', () => {
    sb.classList.remove('open');
    so.style.display = 'none';
  });
</script>
</body>
</html>"""

(ROOT / 'dashboard.html').write_text(page, encoding='utf-8')
print('dashboard.html written:', len(page), 'chars')
