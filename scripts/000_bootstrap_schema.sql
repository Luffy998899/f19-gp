-- Idempotent bootstrap script for a fresh Supabase project.
-- Run this once before deploying. Safe to re-run.

-- 1. Admin profiles ----------------------------------------------------------
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;

drop policy if exists admins_select_own on public.admin_profiles;
create policy admins_select_own on public.admin_profiles
  for select using (auth.uid() = id);

-- Trigger: auto-create an admin_profiles row whenever a new auth user is added.
create or replace function public.handle_new_admin_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', 'Admin')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_admin_created on auth.users;
create trigger on_auth_admin_created
  after insert on auth.users
  for each row execute function public.handle_new_admin_user();

-- 2. Helper: is_admin() ------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_profiles where id = auth.uid()
  );
$$;

-- 3. Site content ------------------------------------------------------------
create table if not exists public.site_content (
  key text primary key,
  value text,
  description text,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
drop policy if exists content_public_read on public.site_content;
create policy content_public_read on public.site_content for select using (true);
drop policy if exists content_admin_all on public.site_content;
create policy content_admin_all on public.site_content for all
  using (public.is_admin()) with check (public.is_admin());

-- 4. Products ----------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  description text,
  price numeric,
  size text,
  width text,
  profile text,
  image_url text,
  rating numeric default 5,
  reviews_count integer default 0,
  is_featured boolean default false,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.products enable row level security;
drop policy if exists products_public_read on public.products;
create policy products_public_read on public.products for select using (is_active = true or public.is_admin());
drop policy if exists products_admin_all on public.products;
create policy products_admin_all on public.products for all
  using (public.is_admin()) with check (public.is_admin());

-- 5. Gallery -----------------------------------------------------------------
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text,
  category text,
  image_url text not null,
  alt_text text,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamptz not null default now()
);
alter table public.gallery_images enable row level security;
drop policy if exists gallery_public_read on public.gallery_images;
create policy gallery_public_read on public.gallery_images for select using (is_active = true or public.is_admin());
drop policy if exists gallery_admin_all on public.gallery_images;
create policy gallery_admin_all on public.gallery_images for all
  using (public.is_admin()) with check (public.is_admin());

-- 6. FAQs --------------------------------------------------------------------
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  display_order integer default 0,
  is_active boolean default true,
  created_at timestamptz not null default now()
);
alter table public.faqs enable row level security;
drop policy if exists faqs_public_read on public.faqs;
create policy faqs_public_read on public.faqs for select using (is_active = true or public.is_admin());
drop policy if exists faqs_admin_all on public.faqs;
create policy faqs_admin_all on public.faqs for all
  using (public.is_admin()) with check (public.is_admin());

-- 7. Inquiries ---------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text default 'new',
  created_at timestamptz not null default now()
);
alter table public.inquiries enable row level security;
drop policy if exists inquiries_public_insert on public.inquiries;
create policy inquiries_public_insert on public.inquiries for insert with check (true);
drop policy if exists inquiries_admin_select on public.inquiries;
create policy inquiries_admin_select on public.inquiries for select using (public.is_admin());
drop policy if exists inquiries_admin_update on public.inquiries;
create policy inquiries_admin_update on public.inquiries for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists inquiries_admin_delete on public.inquiries;
create policy inquiries_admin_delete on public.inquiries for delete using (public.is_admin());
