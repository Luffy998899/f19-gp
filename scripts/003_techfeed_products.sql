-- TechFeed catalog import support.
-- Safe to re-run.

alter table public.products
  add column if not exists sku text;

create unique index if not exists products_sku_unique
  on public.products (sku)
  where sku is not null;

create index if not exists products_category_idx
  on public.products (category);

create index if not exists products_featured_idx
  on public.products (is_featured)
  where is_featured = true;

-- Track whether the TechFeed seed has completed (idempotent deploy hook).
insert into public.site_content (key, value, description)
values (
  'techfeed_imported_at',
  '',
  'ISO timestamp when TechFeed.zip was last imported. Empty means not yet imported.'
)
on conflict (key) do nothing;
