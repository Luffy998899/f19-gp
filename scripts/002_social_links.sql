-- Adds the social_links table used by the public site footer and the admin
-- Socials page. Idempotent: safe to run on a database that already has it.

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,           -- e.g. instagram, facebook, tiktok, youtube, x, whatsapp, linkedin, other
  label text,                       -- optional display label
  url text not null,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.social_links enable row level security;

drop policy if exists socials_public_read on public.social_links;
create policy socials_public_read on public.social_links
  for select
  using (is_active = true or auth.uid() in (select id from public.admin_profiles));

drop policy if exists socials_admin_all on public.social_links;
create policy socials_admin_all on public.social_links
  for all
  using (auth.uid() in (select id from public.admin_profiles))
  with check (auth.uid() in (select id from public.admin_profiles));

insert into public.social_links (platform, label, url, display_order)
select 'facebook', 'Facebook', 'https://facebook.com', 0
where not exists (select 1 from public.social_links where platform = 'facebook');

insert into public.social_links (platform, label, url, display_order)
select 'instagram', 'Instagram', 'https://instagram.com', 1
where not exists (select 1 from public.social_links where platform = 'instagram');
