-- ============================================================
--  SaathiGhar — Supabase PostgreSQL Schema (FIXED)
--  Tables first → RLS enable → Policies last
--  Run in Supabase Dashboard → SQL Editor
-- ============================================================

create extension if not exists "uuid-ossp";

-- ============================================================
-- STEP 1: CREATE ALL TABLES (no policies yet)
-- ============================================================

-- profiles
create table if not exists public.profiles (
  id           uuid references auth.users(id) on delete cascade primary key,
  role         text not null default 'family' check (role in ('family','ashram','volunteer','resident','admin')),
  status       text not null default 'active' check (status in ('active','pending','suspended','rejected')),
  full_name    text,
  mobile       text,
  email        text,
  city         text,
  avatar_url   text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ashrams
create table if not exists public.ashrams (
  id                uuid default uuid_generate_v4() primary key,
  manager_id        uuid references public.profiles(id),
  name              text not null,
  slug              text unique,
  address           text,
  city              text,
  state             text,
  pincode           text,
  phone             text,
  email             text,
  year_established  int,
  capacity          int,
  ashram_type       text check (ashram_type in ('trust','ngo','private','govt','religious')),
  gst_number        text,
  logo_url          text,
  cover_url         text,
  gallery_urls      text[],
  description       text,
  amenities         text[],
  rating            numeric(3,2) default 0,
  review_count      int default 0,
  is_verified       bool default false,
  is_active         bool default true,
  plan              text default 'trial' check (plan in ('trial','starter','care','complete','enterprise')),
  plan_expires_at   timestamptz,
  subscription_id   text,
  staff_pin         text,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- residents
create table if not exists public.residents (
  id                uuid default uuid_generate_v4() primary key,
  ashram_id         uuid references public.ashrams(id) on delete cascade,
  profile_id        uuid references public.profiles(id),
  full_name         text not null,
  date_of_birth     date,
  age               int,
  gender            text,
  room_number       text,
  admission_date    date,
  photo_url         text,
  religion          text,
  language_pref     text,
  medical_notes     text,
  dietary_needs     text,
  emergency_contacts jsonb,
  wellness_status   text default 'good' check (wellness_status in ('good','fair','attention','critical')),
  is_active         bool default true,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- family_links  ← must exist before any policy references it
create table if not exists public.family_links (
  id              uuid default uuid_generate_v4() primary key,
  family_id       uuid references public.profiles(id) on delete cascade,
  resident_id     uuid references public.residents(id) on delete cascade,
  ashram_id       uuid references public.ashrams(id) on delete cascade,
  relationship    text check (relationship in ('son','daughter','spouse','sibling','other')),
  status          text default 'pending' check (status in ('pending','approved','rejected')),
  call_frequency  text default 'weekly',
  visit_frequency text default 'monthly',
  created_at      timestamptz default now(),
  approved_at     timestamptz,
  unique(family_id, resident_id)
);

-- check_ins
create table if not exists public.check_ins (
  id              uuid default uuid_generate_v4() primary key,
  family_id       uuid references public.profiles(id),
  resident_id     uuid references public.residents(id),
  type            text check (type in ('call','visit','message','video_call')),
  duration_mins   int,
  notes           text,
  verified_by_ashram bool default false,
  checked_in_at   timestamptz default now()
);

-- memory_wall
create table if not exists public.memory_wall (
  id              uuid default uuid_generate_v4() primary key,
  resident_id     uuid references public.residents(id) on delete cascade,
  uploaded_by     uuid references public.profiles(id),
  uploader_role   text,
  media_type      text check (media_type in ('photo','video','audio','note')),
  cloudinary_url  text,
  cloudinary_id   text,
  thumbnail_url   text,
  caption         text,
  is_visible      bool default true,
  created_at      timestamptz default now()
);

-- wellness_logs
create table if not exists public.wellness_logs (
  id              uuid default uuid_generate_v4() primary key,
  resident_id     uuid references public.residents(id) on delete cascade,
  logged_by       uuid references public.profiles(id),
  status          text check (status in ('good','fair','attention','critical')),
  mood            text,
  activities      text[],
  meals_ok        bool,
  medication_ok   bool,
  notes           text,
  logged_at       timestamptz default now()
);

-- ashram_subscriptions
create table if not exists public.ashram_subscriptions (
  id                uuid default uuid_generate_v4() primary key,
  ashram_id         uuid references public.ashrams(id) on delete cascade,
  razorpay_sub_id   text unique,
  plan              text not null,
  amount_inr        int,
  billing_cycle     text check (billing_cycle in ('monthly','annual')),
  status            text default 'active' check (status in ('active','paused','cancelled','expired')),
  started_at        timestamptz default now(),
  next_billing_at   timestamptz,
  cancelled_at      timestamptz
);

-- resident_fee_payments
create table if not exists public.resident_fee_payments (
  id                  uuid default uuid_generate_v4() primary key,
  family_id           uuid references public.profiles(id),
  resident_id         uuid references public.residents(id),
  ashram_id           uuid references public.ashrams(id),
  amount_inr          int not null,
  method              text check (method in ('platform','direct_cash','direct_bank','auto_pay')),
  razorpay_order_id   text,
  razorpay_payment_id text,
  platform_fee_inr    int,
  status              text default 'pending' check (status in ('pending','paid','failed','refunded')),
  due_date            date,
  paid_at             timestamptz,
  notes               text,
  created_at          timestamptz default now()
);

-- donations
create table if not exists public.donations (
  id                  uuid default uuid_generate_v4() primary key,
  donor_id            uuid references public.profiles(id),
  donation_type       text check (donation_type in ('resident','ashram','platform','csr')),
  target_resident_id  uuid references public.residents(id),
  target_ashram_id    uuid references public.ashrams(id),
  amount_inr          int not null,
  platform_fee_inr    int,
  razorpay_order_id   text,
  razorpay_payment_id text,
  is_anonymous        bool default false,
  message             text,
  status              text default 'pending' check (status in ('pending','completed','failed','refunded')),
  donated_at          timestamptz default now()
);

-- volunteers
create table if not exists public.volunteers (
  id                   uuid default uuid_generate_v4() primary key,
  profile_id           uuid references public.profiles(id) on delete cascade,
  skills               text[],
  languages            text[],
  availability         text,
  max_travel_km        int,
  aadhaar_verified     bool default false,
  background_declared  bool default false,
  status               text default 'pending' check (status in ('pending','approved','suspended')),
  created_at           timestamptz default now()
);

-- volunteer_visits
create table if not exists public.volunteer_visits (
  id              uuid default uuid_generate_v4() primary key,
  volunteer_id    uuid references public.volunteers(id),
  ashram_id       uuid references public.ashrams(id),
  resident_id     uuid references public.residents(id),
  scheduled_at    timestamptz,
  duration_mins   int,
  activity_type   text,
  status          text default 'scheduled' check (status in ('scheduled','completed','cancelled','no_show')),
  ashram_verified bool default false,
  notes           text,
  created_at      timestamptz default now()
);

-- notifications
create table if not exists public.notifications (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references public.profiles(id) on delete cascade,
  type        text,
  title       text,
  body        text,
  data        jsonb,
  channel     text[],
  is_read     bool default false,
  sent_at     timestamptz default now()
);

-- sos_events
create table if not exists public.sos_events (
  id              uuid default uuid_generate_v4() primary key,
  resident_id     uuid references public.residents(id),
  ashram_id       uuid references public.ashrams(id),
  triggered_by    uuid references public.profiles(id),
  trigger_type    text check (trigger_type in ('resident_button','family_request','staff_report')),
  description     text,
  status          text default 'open' check (status in ('open','acknowledged','resolved')),
  acknowledged_by uuid references public.profiles(id),
  acknowledged_at timestamptz,
  resolved_at     timestamptz,
  created_at      timestamptz default now()
);

-- ashram_reviews
create table if not exists public.ashram_reviews (
  id          uuid default uuid_generate_v4() primary key,
  ashram_id   uuid references public.ashrams(id) on delete cascade,
  reviewer_id uuid references public.profiles(id),
  rating      int check (rating between 1 and 5),
  title       text,
  body        text,
  is_verified bool default false,
  created_at  timestamptz default now(),
  unique(ashram_id, reviewer_id)
);

-- ============================================================
-- STEP 2: ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- ============================================================
alter table public.profiles              enable row level security;
alter table public.ashrams               enable row level security;
alter table public.residents             enable row level security;
alter table public.family_links          enable row level security;
alter table public.check_ins             enable row level security;
alter table public.memory_wall           enable row level security;
alter table public.wellness_logs         enable row level security;
alter table public.ashram_subscriptions  enable row level security;
alter table public.resident_fee_payments enable row level security;
alter table public.donations             enable row level security;
alter table public.volunteers            enable row level security;
alter table public.volunteer_visits      enable row level security;
alter table public.notifications         enable row level security;
alter table public.sos_events            enable row level security;
alter table public.ashram_reviews        enable row level security;

-- ============================================================
-- STEP 3: CREATE ALL POLICIES (all tables now exist)
-- ============================================================

-- profiles
create policy "profiles_own_rw" on public.profiles
  using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_admin_read" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ashrams: public read; manager write
create policy "ashrams_public_read" on public.ashrams
  for select using (is_active = true);
create policy "ashrams_manager_write" on public.ashrams
  using (manager_id = auth.uid()) with check (manager_id = auth.uid());

-- residents: manager full access; linked family read
create policy "residents_manager_rw" on public.residents
  using (
    ashram_id in (select id from public.ashrams where manager_id = auth.uid())
  );
create policy "residents_family_read" on public.residents
  for select using (
    id in (
      select resident_id from public.family_links
      where family_id = auth.uid() and status = 'approved'
    )
  );

-- family_links
create policy "family_links_own" on public.family_links
  using (family_id = auth.uid());
create policy "family_links_ashram_manage" on public.family_links
  using (
    ashram_id in (select id from public.ashrams where manager_id = auth.uid())
  );

-- check_ins
create policy "checkins_family_rw" on public.check_ins
  using (family_id = auth.uid());
create policy "checkins_ashram_verify" on public.check_ins
  for update using (
    resident_id in (
      select id from public.residents
      where ashram_id in (select id from public.ashrams where manager_id = auth.uid())
    )
  );

-- memory_wall
create policy "memory_family_rw" on public.memory_wall
  using (
    uploaded_by = auth.uid()
    or resident_id in (
      select resident_id from public.family_links
      where family_id = auth.uid() and status = 'approved'
    )
  );
create policy "memory_ashram_rw" on public.memory_wall
  using (
    resident_id in (
      select id from public.residents
      where ashram_id in (select id from public.ashrams where manager_id = auth.uid())
    )
  );

-- wellness_logs
create policy "wellness_ashram_write" on public.wellness_logs
  using (
    resident_id in (
      select id from public.residents
      where ashram_id in (select id from public.ashrams where manager_id = auth.uid())
    )
  );
create policy "wellness_family_read" on public.wellness_logs
  for select using (
    resident_id in (
      select resident_id from public.family_links
      where family_id = auth.uid() and status = 'approved'
    )
  );

-- ashram_subscriptions
create policy "subscriptions_ashram_read" on public.ashram_subscriptions
  for select using (
    ashram_id in (select id from public.ashrams where manager_id = auth.uid())
  );

-- resident_fee_payments
create policy "fees_family_rw" on public.resident_fee_payments
  using (family_id = auth.uid());
create policy "fees_ashram_read" on public.resident_fee_payments
  for select using (
    ashram_id in (select id from public.ashrams where manager_id = auth.uid())
  );

-- donations
create policy "donations_donor_read" on public.donations
  for select using (donor_id = auth.uid());

-- volunteers
create policy "volunteers_own" on public.volunteers
  using (profile_id = auth.uid());

-- volunteer_visits
create policy "visits_volunteer_own" on public.volunteer_visits
  using (
    volunteer_id in (select id from public.volunteers where profile_id = auth.uid())
  );
create policy "visits_ashram_manage" on public.volunteer_visits
  using (
    ashram_id in (select id from public.ashrams where manager_id = auth.uid())
  );

-- notifications
create policy "notifications_own" on public.notifications
  using (user_id = auth.uid());

-- sos_events
create policy "sos_ashram_manage" on public.sos_events
  using (
    ashram_id in (select id from public.ashrams where manager_id = auth.uid())
  );
create policy "sos_family_read" on public.sos_events
  for select using (
    resident_id in (
      select resident_id from public.family_links
      where family_id = auth.uid() and status = 'approved'
    )
  );

-- ashram_reviews
create policy "reviews_public_read" on public.ashram_reviews
  for select using (true);
create policy "reviews_own_write" on public.ashram_reviews
  using (reviewer_id = auth.uid()) with check (reviewer_id = auth.uid());

-- ============================================================
-- STEP 4: TRIGGERS
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger tr_profiles_updated
  before update on public.profiles
  for each row execute function handle_updated_at();

create trigger tr_ashrams_updated
  before update on public.ashrams
  for each row execute function handle_updated_at();

create trigger tr_residents_updated
  before update on public.residents
  for each row execute function handle_updated_at();

-- Auto-create profile row on new Supabase Auth signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, role, status, full_name, mobile, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'family'),
    coalesce(new.raw_user_meta_data->>'status', 'active'),
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'mobile',
    new.email
  )
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- STEP 5: REALTIME
-- ============================================================
alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.memory_wall;
alter publication supabase_realtime add table public.wellness_logs;
alter publication supabase_realtime add table public.sos_events;
alter publication supabase_realtime add table public.check_ins;
