import pathlib
R = pathlib.Path(r'c:\Projects\Saathighar')

# Read existing dashboard and replace placeholder sections with full implementations
dash = (R/'dashboard.html').read_text(encoding='utf-8')

# ── MY PARENT TAB ──
parent_tab = """
      <div id="section-parent" class="dash-section" style="display:none;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;">
          <div><h2 style="color:var(--teal-dark);">My Parent's Profile</h2><p>Health, preferences &amp; documents for Savitri Devi.</p></div>
          <button class="btn btn-teal btn-sm" data-toast="Profile update request sent to ashram!" data-toast-type="success">&#9998; Request Update</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
          <div class="widget"><div class="widget-header"><div class="widget-title">&#128138; Medical Information</div></div><div class="widget-body">
            <div class="notif-feed">
              <div class="notif-item info"><div class="notif-icon">&#128138;</div><div><div class="notif-text"><strong>Conditions:</strong> Hypertension, Type 2 Diabetes</div></div></div>
              <div class="notif-item info"><div class="notif-icon">&#128138;</div><div><div class="notif-text"><strong>Medications:</strong> Metformin 500mg (morning), Amlodipine 5mg (evening)</div></div></div>
              <div class="notif-item info"><div class="notif-icon">&#128101;</div><div><div class="notif-text"><strong>Doctor:</strong> Dr. Rekha Joshi — +91 98220 44512</div></div></div>
              <div class="notif-item success"><div class="notif-icon">&#128200;</div><div><div class="notif-text"><strong>BP Today:</strong> 128/82 — Normal</div><div class="notif-time">Updated this morning</div></div></div>
            </div>
          </div></div>
          <div class="widget"><div class="widget-header"><div class="widget-title">&#128149; Personal Preferences</div></div><div class="widget-body">
            <div class="notif-feed">
              <div class="notif-item"><div class="notif-icon">&#127857;</div><div><div class="notif-text"><strong>Diet:</strong> Pure Vegetarian, no onion/garlic on Tuesdays</div></div></div>
              <div class="notif-item"><div class="notif-icon">&#127926;</div><div><div class="notif-text"><strong>Music:</strong> Classical Carnatic, old Bollywood</div></div></div>
              <div class="notif-item"><div class="notif-icon">&#128367;</div><div><div class="notif-text"><strong>Prayer:</strong> Morning puja 6:30 AM, no disturbances</div></div></div>
              <div class="notif-item"><div class="notif-icon">&#127774;</div><div><div class="notif-text"><strong>Sleep:</strong> Nap 2–4 PM, bedtime 9:30 PM</div></div></div>
            </div>
          </div></div>
          <div class="widget"><div class="widget-header"><div class="widget-title">&#128222; Emergency Contacts</div></div><div class="widget-body">
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--cream);border-radius:8px;"><div><strong>Priya Sharma</strong><div style="font-size:0.78rem;color:var(--text-light);">Daughter — Primary Contact</div></div><a href="tel:+919820012345" class="btn btn-teal btn-sm">&#128222; Call</a></div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--cream);border-radius:8px;"><div><strong>Rahul Sharma</strong><div style="font-size:0.78rem;color:var(--text-light);">Son-in-law — Secondary</div></div><a href="tel:+919820098765" class="btn btn-teal btn-sm">&#128222; Call</a></div>
              <button class="btn btn-sm" style="background:var(--cream);color:var(--teal);" data-toast="Contact management coming soon!" data-toast-type="info">+ Add Emergency Contact</button>
            </div>
          </div></div>
          <div class="widget"><div class="widget-header"><div class="widget-title">&#128196; Document Vault</div></div><div class="widget-body">
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--cream);border-radius:8px;font-size:0.9rem;"><div>&#128196; Aadhar Card</div><span class="badge badge-teal">Uploaded</span></div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--cream);border-radius:8px;font-size:0.9rem;"><div>&#128195; Medical Insurance</div><span class="badge badge-teal">Uploaded</span></div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(232,112,10,0.08);border-radius:8px;font-size:0.9rem;border-left:3px solid var(--saffron);"><div>&#128203; Hospital Records</div><span class="badge badge-saffron">Pending Upload</span></div>
            </div>
            <button class="btn btn-sm" style="background:var(--cream);color:var(--teal);margin-top:12px;" data-toast="Encrypted upload opening..." data-toast-type="info">&#128274; Upload Document</button>
          </div></div>
        </div>
        <div class="widget" style="margin-top:24px;"><div class="widget-header"><div class="widget-title">&#127880; Upcoming Reminders</div></div><div class="widget-body">
          <div style="display:flex;gap:16px;flex-wrap:wrap;">
            <div style="flex:1;min-width:200px;background:linear-gradient(135deg,var(--saffron),var(--gold));border-radius:12px;padding:16px;color:#fff;text-align:center;"><div style="font-size:1.5rem;">&#127874;</div><div style="font-weight:800;margin-top:4px;">Birthday in 12 days</div><div style="font-size:0.8rem;opacity:0.85;">May 1 — Plan a special call!</div></div>
            <div style="flex:1;min-width:200px;background:linear-gradient(135deg,var(--teal),var(--teal-light));border-radius:12px;padding:16px;color:#fff;text-align:center;"><div style="font-size:1.5rem;">&#128197;</div><div style="font-weight:800;margin-top:4px;">Visit due in 3 days</div><div style="font-size:0.8rem;opacity:0.85;">You committed to monthly visits</div></div>
          </div>
        </div></div>
      </div>"""

# ── CHECK-INS TAB ──
checkins_tab = """
      <div id="section-checkins" class="dash-section" style="display:none;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;">
          <div><h2 style="color:var(--teal-dark);">Check-In Tracker</h2><p>Your complete visit and call history with Amma.</p></div>
          <div style="display:flex;gap:10px;align-items:center;">
            <div class="streak-badge">&#128293; 4 Week Streak!</div>
            <button class="btn btn-primary btn-sm" data-toast="Check-in logged successfully!" data-toast-type="success">+ Log Check-In</button>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px;">
          <div class="widget"><div class="widget-header"><div class="widget-title">&#127945; Your Commitment</div></div><div class="widget-body">
            <p style="font-size:0.9rem;color:var(--text-mid);margin-bottom:16px;">You set a goal to check in at least once a week.</p>
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div><div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:6px;"><span>Weekly Calls</span><strong style="color:var(--green);">On Track</strong></div><div class="progress-bar"><div class="progress-fill" style="width:85%;"></div></div></div>
              <div><div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:6px;"><span>Monthly Visits</span><strong style="color:var(--saffron);">1 Remaining</strong></div><div class="progress-bar"><div class="progress-fill" style="width:60%;"></div></div></div>
              <div><div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:6px;"><span>Payments</span><strong style="color:var(--green);">All Timely</strong></div><div class="progress-bar"><div class="progress-fill" style="width:100%;"></div></div></div>
            </div>
          </div></div>
          <div class="widget"><div class="widget-header"><div class="widget-title">&#128197; This Month</div></div><div class="widget-body">
            <div class="checkin-mini-calendar" style="grid-template-columns:repeat(7,1fr);">
              <div class="cal-day" style="font-size:0.65rem;font-weight:800;color:var(--text-light);">M</div><div class="cal-day" style="font-size:0.65rem;font-weight:800;color:var(--text-light);">T</div><div class="cal-day" style="font-size:0.65rem;font-weight:800;color:var(--text-light);">W</div><div class="cal-day" style="font-size:0.65rem;font-weight:800;color:var(--text-light);">T</div><div class="cal-day" style="font-size:0.65rem;font-weight:800;color:var(--text-light);">F</div><div class="cal-day" style="font-size:0.65rem;font-weight:800;color:var(--text-light);">S</div><div class="cal-day" style="font-size:0.65rem;font-weight:800;color:var(--text-light);">S</div>
              <div class="cal-day future">1</div><div class="cal-day future">2</div><div class="cal-day future">3</div><div class="cal-day future">4</div><div class="cal-day future">5</div><div class="cal-day checked">6</div><div class="cal-day checked">7</div>
              <div class="cal-day missed">8</div><div class="cal-day future">9</div><div class="cal-day checked">10</div><div class="cal-day checked">11</div><div class="cal-day future">12</div><div class="cal-day future">13</div><div class="cal-day future">14</div>
              <div class="cal-day future">15</div><div class="cal-day checked">16</div><div class="cal-day future">17</div><div class="cal-day today">18</div><div class="cal-day future">19</div><div class="cal-day future">20</div><div class="cal-day future">21</div>
              <div class="cal-day future">22</div><div class="cal-day future">23</div><div class="cal-day future">24</div><div class="cal-day future">25</div><div class="cal-day future">26</div><div class="cal-day future">27</div><div class="cal-day future">28</div>
            </div>
            <div style="display:flex;gap:12px;margin-top:14px;font-size:0.75rem;font-weight:700;">
              <span style="display:flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;border-radius:2px;background:var(--teal);display:inline-block;"></span>Checked</span>
              <span style="display:flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;border-radius:2px;background:#FFEBEE;display:inline-block;"></span>Missed</span>
              <span style="display:flex;align-items:center;gap:4px;"><span style="width:10px;height:10px;border-radius:2px;background:var(--saffron);display:inline-block;"></span>Today</span>
            </div>
          </div></div>
        </div>
        <div class="widget"><div class="widget-header"><div class="widget-title">&#128203; Check-In Log</div><div class="widget-action">Export PDF</div></div><div class="widget-body">
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div class="timeline">
              <div class="timeline-item"><strong>April 18 &mdash; Video Call</strong><div style="font-size:0.85rem;color:var(--text-mid);">Duration: 24 mins &bull; "Amma seemed happy, talked about the garden."</div></div>
              <div class="timeline-item"><strong>April 16 &mdash; Voice Call</strong><div style="font-size:0.85rem;color:var(--text-mid);">Duration: 12 mins &bull; Reminded about medication schedule.</div></div>
              <div class="timeline-item"><strong>April 11 &mdash; Physical Visit</strong><div style="font-size:0.85rem;color:var(--text-mid);">3.5 hours &bull; Took her to the garden, shared lunch. Added memory to wall.</div></div>
              <div class="timeline-item"><strong>April 6 &mdash; Video Call</strong><div style="font-size:0.85rem;color:var(--text-mid);">Duration: 18 mins &bull; Birthday planning discussed.</div></div>
            </div>
          </div>
        </div></div>
      </div>"""

# ── MEMORY WALL TAB ──
memory_tab = """
      <div id="section-memory" class="dash-section" style="display:none;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;">
          <div><h2 style="color:var(--teal-dark);">Memory Wall</h2><p>A private scrapbook shared between you and Amma.</p></div>
          <div style="display:flex;gap:10px;">
            <button class="btn btn-sm" style="background:var(--cream);color:var(--teal);" data-toast="PDF album export coming soon!" data-toast-type="info">&#128196; Export Album</button>
            <button class="btn btn-primary btn-sm" data-toast="Upload panel opening..." data-toast-type="info">+ Add Memory</button>
          </div>
        </div>
        <div class="timeline">
          <div class="timeline-item">
            <div class="widget" style="margin-left:0;">
              <div class="widget-body" style="padding:20px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
                  <div style="width:36px;height:36px;background:linear-gradient(135deg,var(--teal),var(--teal-light));border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;">&#127969;</div>
                  <div><strong>Sunrise Senior Home Staff</strong><div style="font-size:0.75rem;color:var(--text-light);">April 18, 2025</div></div>
                </div>
                <p style="font-size:0.9rem;color:var(--text-mid);margin-bottom:12px;">Savitri Ji attended the Diwali photo exhibition today and loved the old photographs. She spent 20 minutes pointing out places she recognised!</p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><div class="memory-thumb"><img src="assets/images/hero-elderly.png" alt="Memory"></div><div class="memory-thumb" style="background:var(--cream);font-size:2rem;display:flex;align-items:center;justify-content:center;">&#127881;</div></div>
                <div style="margin-top:12px;display:flex;gap:8px;"><button class="btn btn-sm" style="background:var(--cream);" data-toast="&#10084; Reaction sent to Ashram!" data-toast-type="success">&#10084; React</button><button class="btn btn-sm" style="background:var(--cream);color:var(--text-mid);" data-toast="Reply coming soon!" data-toast-type="info">&#128172; Reply</button></div>
              </div>
            </div>
          </div>
          <div class="timeline-item">
            <div class="widget" style="margin-left:0;">
              <div class="widget-body" style="padding:20px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
                  <div style="width:36px;height:36px;background:linear-gradient(135deg,var(--saffron),var(--gold));border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;">&#128105;</div>
                  <div><strong>Priya Sharma (You)</strong><div style="font-size:0.75rem;color:var(--text-light);">April 11, 2025</div></div>
                </div>
                <p style="font-size:0.9rem;color:var(--text-mid);margin-bottom:12px;">Had the most beautiful afternoon with Amma in the garden. She told me stories about her childhood in Mysore that I had never heard before.</p>
                <div style="background:var(--cream);border-radius:8px;padding:14px;display:flex;align-items:center;gap:10px;margin-bottom:12px;"><span style="font-size:1.5rem;">&#127908;</span><div><div style="font-size:0.85rem;font-weight:700;">Voice Message — 3:24</div><div style="font-size:0.75rem;color:var(--text-light);">Amma's favourite bhajan recorded</div></div><button class="btn btn-sm" style="margin-left:auto;background:var(--teal);color:#fff;" data-toast="Playing audio..." data-toast-type="info">&#9654; Play</button></div>
                <div style="display:flex;gap:8px;"><span style="background:#E8F5E9;color:var(--green);padding:4px 12px;border-radius:20px;font-size:0.78rem;font-weight:700;">&#10084; Amma Reacted!</span></div>
              </div>
            </div>
          </div>
          <div class="timeline-item">
            <div class="widget" style="margin-left:0;">
              <div class="widget-body" style="padding:20px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
                  <div style="width:36px;height:36px;background:linear-gradient(135deg,var(--teal),var(--teal-light));border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1rem;">&#127969;</div>
                  <div><strong>Sunrise Senior Home Staff</strong><div style="font-size:0.75rem;color:var(--text-light);">April 6, 2025</div></div>
                </div>
                <p style="font-size:0.9rem;color:var(--text-mid);">Savitri Ji celebrated her 74th birthday with all the residents today! The kitchen made her favourite payasam. She kept saying she wished her family could have been here.</p>
                <div style="margin-top:12px;"><button class="btn btn-sm" style="background:var(--cream);" data-toast="&#10084; Reaction sent!" data-toast-type="success">&#10084; React</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>"""

# ── VIDEO CALL TAB ──
calls_tab = """
      <div id="section-calls" class="dash-section" style="display:none;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;">
          <div><h2 style="color:var(--teal-dark);">Video Calls</h2><p>Schedule or start a call with Amma via the ashram tablet.</p></div>
          <button class="btn btn-primary" data-toast="Calling Sunrise Senior Home..." data-toast-type="success">&#128249; Start Call Now</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px;">
          <div class="widget"><div class="widget-header"><div class="widget-title">&#128197; Schedule a Call</div></div><div class="widget-body">
            <p style="font-size:0.88rem;color:var(--text-mid);margin-bottom:16px;">Book a time slot and the ashram will set up the tablet for Amma.</p>
            <div class="input-group" style="margin-bottom:12px;"><label>Select Date</label><input type="date" class="form-input"></div>
            <div class="input-group" style="margin-bottom:12px;"><label>Select Time</label><select class="form-input form-select"><option>10:00 AM</option><option>11:00 AM</option><option>2:00 PM</option><option>4:00 PM</option><option>6:00 PM</option></select></div>
            <div class="input-group" style="margin-bottom:16px;"><label>Call Type</label><select class="form-input form-select"><option>Video Call (Recommended)</option><option>Voice Call Only</option><option>Group Call (Invite Family)</option></select></div>
            <button class="btn btn-teal" style="width:100%;" data-toast="Call scheduled! Ashram notified." data-toast-type="success">&#128197; Schedule Call</button>
          </div></div>
          <div class="widget"><div class="widget-header"><div class="widget-title">&#128203; Call History</div></div><div class="widget-body">
            <div class="timeline">
              <div class="timeline-item"><strong>April 18 &mdash; 10:22 AM</strong><div style="font-size:0.85rem;color:var(--text-mid);">&#128249; Video &bull; 24 mins &bull; Initiated by you</div><div style="font-size:0.78rem;color:var(--text-light);margin-top:2px;font-style:italic;">"Amma sounded cheerful, talked about the garden flowers"</div></div>
              <div class="timeline-item"><strong>April 16 &mdash; 8:14 PM</strong><div style="font-size:0.85rem;color:var(--text-mid);">&#128222; Voice &bull; 12 mins &bull; Initiated by you</div></div>
              <div class="timeline-item"><strong>April 11 &mdash; 3:45 PM</strong><div style="font-size:0.85rem;color:var(--text-mid);">&#128249; Video &bull; 18 mins &bull; During physical visit</div></div>
              <div class="timeline-item"><strong>April 6 &mdash; 12:00 PM</strong><div style="font-size:0.85rem;color:var(--text-mid);">&#128249; Group Video &bull; 45 mins &bull; Birthday call with siblings</div></div>
            </div>
          </div></div>
        </div>
        <div class="widget"><div class="widget-header"><div class="widget-title">&#128100; Upcoming Scheduled Calls</div></div><div class="widget-body">
          <div style="background:linear-gradient(135deg,var(--teal-dark),var(--teal));border-radius:12px;padding:20px;color:#fff;display:flex;align-items:center;justify-content:space-between;">
            <div><div style="font-size:1.1rem;font-weight:800;">Tomorrow &mdash; April 19, 2025</div><div style="opacity:0.8;margin-top:4px;">4:00 PM &bull; Video Call &bull; Ashram notified &#10003;</div></div>
            <div style="display:flex;gap:8px;"><button class="btn btn-sm" style="background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3);" data-toast="Call reschedule coming soon!" data-toast-type="info">Reschedule</button><button class="btn btn-sm" style="background:var(--saffron);color:#fff;" data-toast="Calling now..." data-toast-type="success">Join Early</button></div>
          </div>
          <p style="text-align:center;color:var(--text-light);font-size:0.85rem;margin-top:16px;">No other scheduled calls. <button style="background:none;border:none;color:var(--saffron);font-weight:700;cursor:pointer;" data-toast="Scheduling a new call..." data-toast-type="info">Schedule one now</button></p>
        </div></div>
      </div>"""

# Replace placeholders in dashboard with full content
replacements = [
    ('      <div id="section-parent" class="dash-section" style="display:none;">\n        <div class="section-header" style="text-align:left;"><h2>My Parent\'s Profile</h2><p>Health logs, preferences, and emergency contacts.</p></div>\n        <div class="widget"><div class="widget-body" style="text-align:center;padding:60px;"><div style="font-size:3rem;opacity:0.3;margin-bottom:16px;">&#128105;&#8205;&#9877;&#65039;</div><h3>Full Medical &amp; Care Profile</h3><p style="color:var(--text-light);">This section contains encrypted medical data.</p></div></div>\n      </div>',
     parent_tab),
    ('      <div id="section-checkins" class="dash-section" style="display:none;">\n        <div class="section-header" style="text-align:left;"><h2>Check-In Tracker</h2><p>Your visit and call history.</p></div>\n        <div class="widget"><div class="widget-body" style="text-align:center;padding:60px;"><div style="font-size:3rem;opacity:0.3;margin-bottom:16px;">&#128197;</div><h3>Calendar View</h3></div></div>\n      </div>',
     checkins_tab),
    ('      <div id="section-memory" class="dash-section" style="display:none;">\n        <div class="section-header" style="text-align:left;"><h2>Memory Wall</h2><p>A private scrapbook shared with your parent.</p></div>\n        <div class="widget"><div class="widget-body" style="text-align:center;padding:60px;"><div style="font-size:3rem;opacity:0.3;margin-bottom:16px;">&#128248;</div><h3>Photo &amp; Voice Message Timeline</h3></div></div>\n      </div>',
     memory_tab),
    ('      <div id="section-calls" class="dash-section" style="display:none;">\n        <div class="section-header" style="text-align:left;"><h2>Video Calls</h2><p>Schedule or start a video call.</p></div>\n        <div class="widget"><div class="widget-body" style="text-align:center;padding:60px;"><div style="font-size:3rem;opacity:0.3;margin-bottom:16px;">&#128249;</div><h3>Integrated Calling System</h3></div></div>\n      </div>',
     calls_tab),
]

new_dash = dash
for old, new in replacements:
    if old in new_dash:
        new_dash = new_dash.replace(old, new)
        print(f'Replaced section')
    else:
        print(f'NOT FOUND - will use line search')

(R/'dashboard.html').write_text(new_dash, encoding='utf-8')
print(f'dashboard.html written: {len(new_dash)} chars')
