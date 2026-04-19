import pathlib
R = pathlib.Path(r'c:\Projects\Saathighar')

# Ashram Full Profile Page
profile = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sunrise Senior Home | SaathiGhar</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css">
<link rel="stylesheet" href="assets/css/header.css">
<link rel="stylesheet" href="assets/css/home.css">
<link rel="stylesheet" href="assets/css/dashboard.css">
<style>
.profile-hero{position:relative;height:420px;overflow:hidden;}
.profile-hero img{width:100%;height:100%;object-fit:cover;}
.profile-hero::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(14,58,84,0.85) 0%,transparent 60%);}
.profile-hero-info{position:absolute;bottom:0;left:0;right:0;z-index:1;padding:40px;}
.profile-hero-info h1{color:#fff;margin-bottom:8px;}
.profile-grid{display:grid;grid-template-columns:1fr 340px;gap:32px;padding:48px 0;}
.info-card{background:#fff;border-radius:16px;box-shadow:0 2px 8px rgba(26,82,118,0.1);padding:28px;margin-bottom:24px;}
.info-card h3{color:var(--teal-dark);font-size:1.1rem;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #eee;}
.amenity-full-list{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.amenity-full-item{display:flex;align-items:center;gap:10px;font-size:0.9rem;color:var(--text-mid);background:var(--cream);padding:10px 14px;border-radius:8px;}
.amenity-full-item.yes::before{content:'&#10003;';color:var(--green);font-weight:900;}
.amenity-full-item.no{opacity:0.5;}
.amenity-full-item.no::before{content:'&#10005;';color:var(--red);font-weight:900;}
.fee-table{width:100%;border-collapse:collapse;font-size:0.9rem;}
.fee-table th{background:var(--teal-dark);color:#fff;padding:12px 16px;text-align:left;font-weight:700;}
.fee-table td{padding:12px 16px;border-bottom:1px solid #eee;}
.fee-table tr:last-child td{border-bottom:none;}
.fee-table tr:nth-child(even) td{background:var(--cream);}
.review-card{padding:20px;border-left:3px solid var(--saffron);background:var(--cream);border-radius:0 8px 8px 0;margin-bottom:16px;}
.review-meta{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;border-radius:12px;overflow:hidden;}
.gallery-item{aspect-ratio:4/3;overflow:hidden;cursor:pointer;}
.gallery-item img{width:100%;height:100%;object-fit:cover;transition:transform 0.3s;}
.gallery-item:hover img{transform:scale(1.05);}
.gallery-item.big{grid-column:span 2;grid-row:span 2;}
.sticky-cta{position:sticky;top:88px;}
.contact-card{background:linear-gradient(135deg,var(--teal-dark),var(--teal));border-radius:16px;padding:28px;color:#fff;margin-bottom:20px;}
.contact-card h3{color:#fff;margin-bottom:16px;}
.contact-form-input{width:100%;padding:11px 16px;border:none;border-radius:8px;background:rgba(255,255,255,0.12);color:#fff;font-family:inherit;font-size:0.95rem;margin-bottom:12px;outline:none;}
.contact-form-input::placeholder{color:rgba(255,255,255,0.6);}
.contact-form-input:focus{background:rgba(255,255,255,0.2);}
.contact-form-input.textarea{height:90px;resize:none;}
.availability-card{background:#fff;border-radius:16px;box-shadow:0 2px 8px rgba(26,82,118,0.1);padding:24px;text-align:center;}
.availability-num{font-size:3rem;font-weight:900;color:var(--green);line-height:1;}
.activity-list{display:flex;flex-direction:column;gap:8px;}
.activity-item{display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--cream);border-radius:8px;font-size:0.9rem;}
.activity-dot{width:10px;height:10px;border-radius:50%;background:var(--saffron);flex-shrink:0;}
@media(max-width:900px){.profile-grid{grid-template-columns:1fr;}.amenity-full-list{grid-template-columns:1fr;}}
</style>
</head>
<body>
<header class="site-header" id="siteHeader">
  <div class="container header-inner">
    <a href="index.html" class="header-logo"><img src="assets/images/logo.png" alt="SaathiGhar"><div class="logo-text"><span class="logo-name">SaathiGhar</span><span class="logo-tagline">Doori Door Nahi Karti</span></div></a>
    <nav class="main-nav"><a href="index.html" class="nav-link">Home</a><a href="find-ashrams.html" class="nav-link active">Find Ashrams</a><a href="index.html#how-it-works" class="nav-link">How It Works</a><a href="index.html#stories" class="nav-link">Stories</a><a href="index.html#donate" class="nav-link">Donate</a></nav>
    <div class="header-controls">
      <div class="font-size-toggle"><button class="fs-toggle-btn" data-scale="0.9">A-</button><button class="fs-toggle-btn active" data-scale="1">A</button><button class="fs-toggle-btn" data-scale="1.2">A+</button></div>
      <button class="sos-btn" id="sosBtn">&#128682; <span>Emergency</span></button>
      <div class="login-dropdown" id="loginDropdown"><button class="login-btn">Login &#9660;</button><div class="login-menu"><a href="dashboard.html" class="login-menu-item"><span class="menu-icon">&#128106;</span><div><strong>Family Member</strong></div></a><a href="#" class="login-menu-item" data-toast="Ashram portal coming soon!" data-toast-type="info"><span class="menu-icon">&#127969;</span><div><strong>Ashram Manager</strong></div></a></div></div>
      <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobileMenu"><a href="index.html" class="nav-link">Home</a><a href="find-ashrams.html" class="nav-link">Find Ashrams</a></div>
<div class="overlay" id="sosModal" style="display:none;"><div class="modal" style="text-align:center;"><button class="modal-close">&#10005;</button><h2 style="color:#C0392B;">Emergency Help</h2><div class="helpline-numbers" style="margin-top:16px;"><div class="helpline-item"><span>SaathiGhar</span><span class="number">1800-SAATHI</span></div><div class="helpline-item"><span>Emergency</span><span class="number">112</span></div></div><button class="btn btn-primary" style="margin-top:20px;width:100%;" onclick="document.getElementById('sosModal').style.display='none'">Close</button></div></div>

<div style="height:68px;"></div>

<!-- Breadcrumb -->
<div style="background:var(--cream);border-bottom:1px solid rgba(26,82,118,0.08);padding:14px 0;">
  <div class="container" style="font-size:0.88rem;color:var(--text-light);">
    <a href="index.html" style="color:var(--teal);">Home</a> &rsaquo; <a href="find-ashrams.html" style="color:var(--teal);">Find Ashrams</a> &rsaquo; <strong style="color:var(--text-dark);">Sunrise Senior Home</strong>
  </div>
</div>

<!-- Profile Hero Gallery -->
<div class="profile-hero">
  <img src="assets/images/hero-elderly.png" alt="Sunrise Senior Home">
  <div class="profile-hero-info">
    <div class="container">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;">
        <div>
          <span class="badge badge-verified" style="margin-bottom:12px;">&#9989; SaathiGhar Verified &mdash; Last Inspected April 2025</span>
          <h1>Sunrise Senior Home</h1>
          <div style="color:rgba(255,255,255,0.8);font-size:1rem;margin-top:6px;">&#128205; Kothrud, Pune, Maharashtra &bull; Est. 2009 &bull; Capacity: 45 Residents</div>
          <div style="margin-top:10px;display:flex;align-items:center;gap:16px;">
            <span style="color:var(--gold);font-size:1.1rem;">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span style="color:rgba(255,255,255,0.9);font-weight:700;">4.8 <span style="opacity:0.7;font-weight:400;">(142 reviews)</span></span>
            <span style="background:var(--green);color:#fff;padding:3px 12px;border-radius:20px;font-size:0.78rem;font-weight:800;">5 Beds Available</span>
          </div>
        </div>
        <div style="display:flex;gap:10px;">
          <a href="dashboard.html" class="btn btn-primary">&#127968; Register My Parent Here</a>
          <button class="btn btn-outline" data-toast="Ashram added to shortlist!" data-toast-type="success">&#11088; Shortlist</button>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="container">
  <div class="profile-grid">
    
    <!-- Main Content -->
    <div>
      
      <!-- Gallery -->
      <div class="gallery-grid" style="margin:32px 0;">
        <div class="gallery-item big"><img src="assets/images/volunteer.png" alt="Garden Area"></div>
        <div class="gallery-item"><img src="assets/images/hero-elderly.png" alt="Common Room"></div>
        <div class="gallery-item"><img src="assets/images/family-call.png" alt="Dining Hall"></div>
      </div>

      <!-- About -->
      <div class="info-card reveal">
        <h3>&#127968; About Sunrise Senior Home</h3>
        <p style="line-height:1.75;color:var(--text-mid);">Founded in 2009, Sunrise Senior Home is one of Pune's most trusted residential care facilities for elderly residents. Spread across 1.5 acres in the peaceful Kothrud neighbourhood, we provide a warm, home-like environment where every resident is known by name.<br><br>Our team of 24 trained caregivers, 2 on-call doctors, and 1 full-time physiotherapist ensures that each resident receives personalized, compassionate care. We are a SaathiGhar Certified Gold Partner — meaning we meet the highest standards in care quality, family communication, and financial transparency.</p>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:24px;text-align:center;">
          <div style="background:var(--cream);border-radius:12px;padding:16px;"><div style="font-size:1.8rem;font-weight:900;color:var(--teal);">45</div><div style="font-size:0.8rem;color:var(--text-light);font-weight:600;">Residents</div></div>
          <div style="background:var(--cream);border-radius:12px;padding:16px;"><div style="font-size:1.8rem;font-weight:900;color:var(--saffron);">24</div><div style="font-size:0.8rem;color:var(--text-light);font-weight:600;">Caregivers</div></div>
          <div style="background:var(--cream);border-radius:12px;padding:16px;"><div style="font-size:1.8rem;font-weight:900;color:var(--green);">2</div><div style="font-size:0.8rem;color:var(--text-light);font-weight:600;">Doctors On-Call</div></div>
          <div style="background:var(--cream);border-radius:12px;padding:16px;"><div style="font-size:1.8rem;font-weight:900;color:var(--gold);">15+</div><div style="font-size:0.8rem;color:var(--text-light);font-weight:600;">Years Experience</div></div>
        </div>
      </div>

      <!-- Amenities -->
      <div class="info-card reveal">
        <h3>&#127775; Amenities &amp; Facilities</h3>
        <div class="amenity-full-list">
          <div class="amenity-full-item yes">24/7 Medical Staff On-Site</div>
          <div class="amenity-full-item yes">Doctor On-Call (2 Doctors)</div>
          <div class="amenity-full-item yes">Full Wheelchair Accessibility</div>
          <div class="amenity-full-item yes">Vegetarian &amp; Jain Meals</div>
          <div class="amenity-full-item yes">High-Speed Wi-Fi</div>
          <div class="amenity-full-item yes">Prayer &amp; Meditation Room</div>
          <div class="amenity-full-item yes">Landscaped Garden &amp; Walking Path</div>
          <div class="amenity-full-item yes">Daily Physiotherapy Sessions</div>
          <div class="amenity-full-item yes">In-House Library</div>
          <div class="amenity-full-item yes">Music &amp; Yoga Classes</div>
          <div class="amenity-full-item yes">Video Call Setup (Family)</div>
          <div class="amenity-full-item yes">Ambulance Available On-Site</div>
          <div class="amenity-full-item no">Swimming Pool</div>
          <div class="amenity-full-item yes">Housekeeping (Twice Daily)</div>
          <div class="amenity-full-item yes">Personal Laundry Service</div>
          <div class="amenity-full-item yes">24/7 CCTV Monitoring</div>
        </div>
      </div>

      <!-- Fee Structure -->
      <div class="info-card reveal">
        <h3>&#128179; Monthly Fee Structure</h3>
        <p style="color:var(--text-light);font-size:0.88rem;margin-bottom:16px;">All fees include meals, basic medical care, housekeeping &amp; activities. GST extra.</p>
        <table class="fee-table">
          <thead><tr><th>Room Type</th><th>Monthly Fee</th><th>Occupancy</th><th>What's Included</th></tr></thead>
          <tbody>
            <tr><td><strong>Shared Room (2 beds)</strong></td><td><strong>&#8377;12,000</strong></td><td>2 Persons</td><td>All meals, basic care, activities</td></tr>
            <tr><td><strong>Semi-Private (1.5 beds)</strong></td><td><strong>&#8377;16,500</strong></td><td>1 Person</td><td>All meals, priority care, activities</td></tr>
            <tr><td><strong>Private Suite</strong></td><td><strong>&#8377;22,000</strong></td><td>1 Person</td><td>All + dedicated caregiver, attached bath</td></tr>
            <tr><td colspan="4" style="background:rgba(232,112,10,0.06);"><em>Extras: Physiotherapy &#8377;1,500/mo | Personal laundry &#8377;500/mo | Special diet &#8377;800/mo</em></td></tr>
          </tbody>
        </table>
      </div>

      <!-- Inspection Report -->
      <div class="info-card reveal">
        <h3>&#128203; SaathiGhar Inspection Report</h3>
        <div style="display:flex;align-items:center;gap:16px;background:var(--cream);border-radius:12px;padding:20px;margin-bottom:16px;">
          <div style="font-size:3rem;">&#9989;</div>
          <div>
            <div style="font-weight:900;font-size:1.1rem;color:var(--green);">PASSED &mdash; GOLD CERTIFIED</div>
            <div style="font-size:0.85rem;color:var(--text-light);">Last Inspection: April 2, 2025 &bull; Next Due: October 2025</div>
          </div>
          <div style="margin-left:auto;text-align:right;">
            <div style="font-size:2rem;font-weight:900;color:var(--teal);">94<span style="font-size:1rem;">/100</span></div>
            <div style="font-size:0.75rem;color:var(--text-light);">Overall Score</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:0.88rem;">
          <div style="display:flex;justify-content:space-between;padding:10px;background:var(--cream);border-radius:8px;"><span>Hygiene &amp; Cleanliness</span><strong style="color:var(--green);">96/100</strong></div>
          <div style="display:flex;justify-content:space-between;padding:10px;background:var(--cream);border-radius:8px;"><span>Medical Readiness</span><strong style="color:var(--green);">92/100</strong></div>
          <div style="display:flex;justify-content:space-between;padding:10px;background:var(--cream);border-radius:8px;"><span>Family Communication</span><strong style="color:var(--green);">98/100</strong></div>
          <div style="display:flex;justify-content:space-between;padding:10px;background:var(--cream);border-radius:8px;"><span>Financial Transparency</span><strong style="color:var(--green);">90/100</strong></div>
        </div>
      </div>

      <!-- Activity Calendar -->
      <div class="info-card reveal">
        <h3>&#128197; Monthly Activity Calendar</h3>
        <div class="activity-list">
          <div class="activity-item"><div class="activity-dot"></div><strong>Every Monday:</strong>&nbsp;Yoga &amp; Stretching (7:00 AM, Garden)</div>
          <div class="activity-item"><div class="activity-dot"></div><strong>Every Tuesday:</strong>&nbsp;Music &amp; Bhajan Session (4:00 PM, Common Room)</div>
          <div class="activity-item"><div class="activity-dot"></div><strong>Every Wednesday:</strong>&nbsp;Doctor Consultation (10:00 AM&ndash;12:00 PM)</div>
          <div class="activity-item"><div class="activity-dot"></div><strong>Every Friday:</strong>&nbsp;Movie Afternoon &amp; Snacks (3:00 PM)</div>
          <div class="activity-item"><div class="activity-dot"></div><strong>1st of Month:</strong>&nbsp;Birthday Celebrations for the Month</div>
          <div class="activity-item"><div class="activity-dot"></div><strong>Festival Days:</strong>&nbsp;Diwali, Holi, Eid &mdash; Special Events with Families</div>
          <div class="activity-item"><div class="activity-dot" style="background:var(--teal);"></div><strong>Family Visit Days:</strong>&nbsp;Saturdays &amp; Sundays (10 AM &ndash; 7 PM)</div>
        </div>
      </div>

      <!-- Reviews -->
      <div class="info-card reveal">
        <h3>&#11088; Family Reviews</h3>
        <div class="review-card">
          <div class="review-meta">
            <div><strong>Priya Venkatesh</strong> &mdash; <span style="color:var(--text-light);font-size:0.82rem;">Daughter of Resident (Room 102)</span></div>
            <div style="color:var(--gold);">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          </div>
          <p style="font-size:0.9rem;color:var(--text-mid);font-style:italic;">"Amma has been here for 8 months. The staff remembers her name, her favourite bhajans, even her tea preference. I feel more at peace being in London knowing she is here."</p>
          <div style="font-size:0.75rem;color:var(--text-light);margin-top:8px;">March 2025</div>
        </div>
        <div class="review-card">
          <div class="review-meta">
            <div><strong>Suresh Iyer</strong> &mdash; <span style="color:var(--text-light);font-size:0.82rem;">Son of Resident (Room 107)</span></div>
            <div style="color:var(--gold);">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          </div>
          <p style="font-size:0.9rem;color:var(--text-mid);font-style:italic;">"The SaathiGhar integration is brilliant. Every time I miss a check-in, the platform nudges me. I have not missed a single payment in 6 months and the ashram proactively updates me."</p>
          <div style="font-size:0.75rem;color:var(--text-light);margin-top:8px;">February 2025</div>
        </div>
        <div class="review-card">
          <div class="review-meta">
            <div><strong>Ananya Gupta</strong> &mdash; <span style="color:var(--text-light);font-size:0.82rem;">Daughter-in-law (Room 103)</span></div>
            <div style="color:var(--gold);">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
          </div>
          <p style="font-size:0.9rem;color:var(--text-mid);font-style:italic;">"Excellent facility. My only wish is that they had a swimming pool. Everything else is perfect &mdash; cleanliness, food, medical care. Papa is happier here than I expected."</p>
          <div style="font-size:0.75rem;color:var(--text-light);margin-top:8px;">January 2025</div>
        </div>
        <div style="margin-top:4px;"><button class="btn btn-sm" style="background:var(--cream);color:var(--teal);" data-toast="All reviews loading..." data-toast-type="info">Read All 142 Reviews</button></div>
      </div>

    </div>

    <!-- Sticky Sidebar -->
    <div>
      <div class="sticky-cta">

        <div class="availability-card" style="margin-bottom:20px;">
          <div class="availability-num">5</div>
          <div style="font-size:0.85rem;color:var(--text-light);font-weight:700;margin-top:4px;">Beds Available Right Now</div>
          <a href="dashboard.html" class="btn btn-primary" style="width:100%;margin-top:20px;justify-content:center;">&#127968; Register My Parent Here</a>
          <div style="font-size:0.75rem;color:var(--text-light);text-align:center;margin-top:10px;">Beds fill up fast. Shortlisted by 14 families this week.</div>
        </div>

        <div class="contact-card">
          <h3>&#128222; Contact This Ashram</h3>
          <input class="contact-form-input" type="text" placeholder="Your Full Name">
          <input class="contact-form-input" type="tel" placeholder="Your Phone Number">
          <input class="contact-form-input" type="email" placeholder="Your Email">
          <textarea class="contact-form-input textarea" placeholder="Your message or questions..."></textarea>
          <button class="btn btn-primary" style="width:100%;" data-toast="Message sent to Sunrise Senior Home!" data-toast-type="success">Send Message</button>
        </div>

        <div class="info-card" style="margin-top:20px;">
          <h3>&#128205; Location</h3>
          <div style="background:var(--cream);border-radius:8px;height:140px;display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--teal);opacity:0.5;margin-bottom:12px;">&#127758;</div>
          <p style="font-size:0.85rem;color:var(--text-mid);">Plot 12, Sinhagad Road, Kothrud, Pune &mdash; 411038, Maharashtra</p>
          <a href="https://maps.google.com" target="_blank" class="btn btn-teal btn-sm" style="width:100%;justify-content:center;margin-top:12px;">Open in Google Maps &#8594;</a>
        </div>

      </div>
    </div>

  </div>
</div>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand"><div class="logo-wrap"><img src="assets/images/logo.png" alt="Logo"><div><div class="brand-name">SaathiGhar</div><div class="brand-tagline">Doori Door Nahi Karti</div></div></div><p>India's first family accountability platform for elderly care.</p><div class="helpline-display"><span class="helpline-label">24/7 Helpline</span><span class="helpline-number">1800-SAATHI</span></div></div>
      <div class="footer-col"><h4>Quick Links</h4><div class="footer-links"><a href="index.html">Home</a><a href="find-ashrams.html">Find Ashrams</a><a href="dashboard.html">Family Dashboard</a></div></div>
      <div class="footer-col"><h4>Support</h4><div class="footer-links"><a href="mailto:support@saathighar.org">Email Support</a><a href="#">Grievance Officer</a></div></div>
      <div class="footer-col"><h4>Follow Us</h4><div class="social-links"><a class="social-link" href="#">f</a><a class="social-link" href="#">&#128247;</a><a class="social-link" href="#">X</a></div></div>
    </div>
    <div class="footer-bottom"><p>&copy; 2025 SaathiGhar. All rights reserved.</p><div class="footer-bottom-links"><a href="#">Privacy Policy</a><a href="#">Terms</a></div></div>
  </div>
</footer>
<script src="assets/js/main.js"></script>
</body></html>"""

(R / 'ashram-profile.html').write_text(profile, encoding='utf-8')
print('ashram-profile.html:', len(profile))
