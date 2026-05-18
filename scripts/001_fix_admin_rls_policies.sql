-- Fix: every "*_admin_all" policy in the bootstrap schema was created
-- FOR ALL USING (...) without a WITH CHECK clause. Postgres applies
-- USING to SELECT/UPDATE/DELETE filtering, but INSERT (and row-check on
-- UPDATE) needs WITH CHECK. Without it, every admin INSERT fails with
-- "new row violates row-level security policy for table ...".
--
-- Recreate the four affected policies with both clauses. Idempotent.

-- products
drop policy if exists products_admin_all on public.products;
create policy products_admin_all on public.products
  for all
  using (auth.uid() in (select id from public.admin_profiles))
  with check (auth.uid() in (select id from public.admin_profiles));

-- gallery_images
drop policy if exists gallery_admin_all on public.gallery_images;
create policy gallery_admin_all on public.gallery_images
  for all
  using (auth.uid() in (select id from public.admin_profiles))
  with check (auth.uid() in (select id from public.admin_profiles));

-- faqs
drop policy if exists faqs_admin_all on public.faqs;
create policy faqs_admin_all on public.faqs
  for all
  using (auth.uid() in (select id from public.admin_profiles))
  with check (auth.uid() in (select id from public.admin_profiles));

-- site_content
drop policy if exists content_admin_all on public.site_content;
create policy content_admin_all on public.site_content
  for all
  using (auth.uid() in (select id from public.admin_profiles))
  with check (auth.uid() in (select id from public.admin_profiles));
