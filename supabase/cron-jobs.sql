-- ============================================================
--  SaathiGhar — Notification Cron Jobs (pg_cron)
--  Run AFTER schema.sql in Supabase SQL Editor
--  Requires: pg_cron extension + Supabase Pro plan
-- ============================================================

-- ── 1. Check-in Reminder — 8:00 AM daily ──
select cron.schedule(
  'check_in_reminder',
  '0 8 * * *',
  $$
  insert into public.notifications (user_id, type, title, body, channel)
  select
    fl.family_id,
    'check_in_reminder',
    'Time to check in with ' || r.full_name || ' 💛',
    'Your commitment is due in the next 3 days. A quick call means the world to them.',
    array['push','whatsapp']
  from public.family_links fl
  join public.residents r on r.id = fl.resident_id
  left join public.check_ins ci on ci.family_id = fl.family_id
    and ci.resident_id = fl.resident_id
    and ci.checked_in_at > now() - interval '3 days'
  where fl.status = 'approved'
    and ci.id is null;
  $$
);

-- ── 2. Overdue Check-in Alert — 9:00 AM daily (14+ days no contact) ──
select cron.schedule(
  'overdue_checkin_alert',
  '0 9 * * *',
  $$
  insert into public.notifications (user_id, type, title, body, channel)
  select
    fl.family_id,
    'overdue_checkin',
    r.full_name || ' may be missing you 💔',
    'It has been over 14 days since your last check-in. They notice.',
    array['push','sms','email']
  from public.family_links fl
  join public.residents r on r.id = fl.resident_id
  left join public.check_ins ci on ci.family_id = fl.family_id
    and ci.resident_id = fl.resident_id
    and ci.checked_in_at > now() - interval '14 days'
  where fl.status = 'approved'
    and ci.id is null;
  $$
);

-- ── 3. Payment Due Reminder — 10:00 AM daily ──
select cron.schedule(
  'payment_due_reminder',
  '0 10 * * *',
  $$
  insert into public.notifications (user_id, type, title, body, channel, data)
  select
    rfp.family_id,
    'payment_due',
    'Care fee payment due in ' ||
      (rfp.due_date - current_date) || ' day(s)',
    'Monthly care fee for ' || r.full_name || ' is due on ' || to_char(rfp.due_date,'DD Mon YYYY') || '.',
    array['push','sms','whatsapp'],
    jsonb_build_object('payment_id', rfp.id, 'amount', rfp.amount_inr)
  from public.resident_fee_payments rfp
  join public.residents r on r.id = rfp.resident_id
  where rfp.status = 'pending'
    and rfp.due_date between current_date and current_date + 7;
  $$
);

-- ── 4. Payment Overdue Escalation — 10:00 AM daily ──
select cron.schedule(
  'payment_overdue_alert',
  '5 10 * * *',
  $$
  -- Notify family when 7 days overdue
  insert into public.notifications (user_id, type, title, body, channel)
  select rfp.family_id, 'payment_overdue',
    'Payment overdue — action needed',
    'Care fees for your parent are now ' || (current_date - rfp.due_date) || ' days overdue.',
    array['sms','email','whatsapp']
  from public.resident_fee_payments rfp
  where rfp.status = 'pending'
    and rfp.due_date < current_date - 7
    and rfp.due_date > current_date - 46;

  -- Alert ashram at 30 days overdue
  insert into public.notifications (user_id, type, title, body, channel)
  select a.manager_id, 'payment_30d_overdue',
    'Payment 30 days overdue — resident ' || r.full_name,
    'Fee payment from family is 30+ days overdue. Manual follow-up recommended.',
    array['push','email']
  from public.resident_fee_payments rfp
  join public.residents r on r.id = rfp.resident_id
  join public.ashrams a on a.id = rfp.ashram_id
  where rfp.status = 'pending'
    and rfp.due_date < current_date - 30;
  $$
);

-- ── 5. Birthday Reminder — 7:00 AM daily ──
select cron.schedule(
  'birthday_reminder',
  '0 7 * * *',
  $$
  insert into public.notifications (user_id, type, title, body, channel)
  select
    fl.family_id,
    'birthday_reminder',
    '🎂 ' || r.full_name || '''s birthday is in 7 days!',
    'Plan something special — a call, a visit, or a surprise gift through the platform.',
    array['push','whatsapp']
  from public.residents r
  join public.family_links fl on fl.resident_id = r.id and fl.status = 'approved'
  where extract(month from r.date_of_birth) = extract(month from current_date + 7)
    and extract(day from r.date_of_birth) = extract(day from current_date + 7);
  $$
);

-- ── 6. Weekly Wellness Digest — Every Sunday 9:00 AM ──
select cron.schedule(
  'weekly_wellness_digest',
  '0 9 * * 0',
  $$
  insert into public.notifications (user_id, type, title, body, channel, data)
  select distinct
    fl.family_id,
    'weekly_digest',
    'Weekly update on ' || r.full_name || ' 💛',
    'Your weekly care summary is ready. See wellness updates, new photos, and activities.',
    array['email','push'],
    jsonb_build_object('resident_id', r.id, 'week_ending', current_date)
  from public.family_links fl
  join public.residents r on r.id = fl.resident_id
  where fl.status = 'approved';
  $$
);

-- ── 7. Abandoned Resident Flag — Every Monday 6:00 AM ──
select cron.schedule(
  'abandoned_resident_flag',
  '0 6 * * 1',
  $$
  insert into public.notifications (user_id, type, title, body, channel, data)
  select
    p.id as admin_id,
    'abandoned_resident',
    'Resident with no family contact — ' || r.full_name,
    r.full_name || ' at ' || a.name || ' has had zero family contact in 30+ days.',
    array['email'],
    jsonb_build_object('resident_id', r.id, 'ashram_id', r.ashram_id)
  from public.residents r
  join public.ashrams a on a.id = r.ashram_id
  cross join (select id from public.profiles where role = 'admin') p
  left join public.check_ins ci on ci.resident_id = r.id
    and ci.checked_in_at > now() - interval '30 days'
  where r.is_active = true and ci.id is null;
  $$
);

-- ── 8. Volunteer Visit Reminder — runs every hour, checks 24h ahead ──
select cron.schedule(
  'volunteer_visit_reminder',
  '0 * * * *',
  $$
  insert into public.notifications (user_id, type, title, body, channel, data)
  select
    vol.profile_id,
    'visit_reminder',
    'Your visit is tomorrow — ' || a.name,
    'You have a scheduled visit at ' || a.name || ' tomorrow. We''re looking forward to seeing you!',
    array['push','whatsapp'],
    jsonb_build_object('visit_id', vv.id, 'ashram', a.name, 'scheduled_at', vv.scheduled_at)
  from public.volunteer_visits vv
  join public.volunteers vol on vol.id = vv.volunteer_id
  join public.ashrams a on a.id = vv.ashram_id
  where vv.status = 'scheduled'
    and vv.scheduled_at between now() + interval '23 hours' and now() + interval '25 hours';
  $$
);
