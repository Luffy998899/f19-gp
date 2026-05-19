-- Social links managed by admins, rendered publicly.
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
  for select using (is_active = true or public.is_admin());

drop policy if exists socials_admin_all on public.social_links;
create policy socials_admin_all on public.social_links
  for all
  using (public.is_admin())
  with check (public.is_admin());
