// SaathiGhar — Supabase Client Configuration
const SUPABASE_URL  = 'https://hznsdikphjreklshgeyu.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bnNkaWtwaGpyZWtsc2hnZXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzQ0NjUsImV4cCI6MjA5MjQ1MDQ2NX0.BATyEw2PslvmOs4g8xn0jiV-UUUFqPDBfqEtHsPp5Ak';

// createClient from CDN global window.supabase
const sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// Portal routing by role
const PORTAL = {
  family:    '../../portals/family/dashboard.html',
  ashram:    '../../portals/ashram/ashram-dashboard.html',
  volunteer: '../../portals/volunteer/volunteer-hub.html',
  elderly:   '../../portals/elderly/elderly-dashboard.html',
  admin:     '../../portals/admin/admin-dashboard.html',
};

// Redirect to correct portal based on role in user metadata
async function routeUser(user) {
  if (!user) return;
  const role = user.user_metadata?.role || user.app_metadata?.role || 'family';
  const dest = PORTAL[role] || PORTAL.family;
  window.location.href = dest;
}

// Read current session — redirect away if already logged in
async function redirectIfLoggedIn() {
  const { data: { session } } = await sbClient.auth.getSession();
  if (session?.user) await routeUser(session.user);
}
