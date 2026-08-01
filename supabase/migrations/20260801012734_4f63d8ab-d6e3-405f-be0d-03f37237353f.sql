-- site_settings
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_settings public read" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "site_settings admin write" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- announcements
CREATE TABLE public.announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  badge text NOT NULL DEFAULT '',
  text text NOT NULL DEFAULT '',
  icon_name text NOT NULL DEFAULT 'PartyPopper',
  gradient text NOT NULL DEFAULT 'from-amber-500 via-orange-500 to-red-500',
  position integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.announcements TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.announcements TO authenticated;
GRANT ALL ON public.announcements TO service_role;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "announcements public read" ON public.announcements FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "announcements admin write" ON public.announcements FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- feature_strip_items
CREATE TABLE public.feature_strip_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  icon_name text NOT NULL DEFAULT 'ShieldCheck',
  color_class text NOT NULL DEFAULT 'text-cyan-300',
  position integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.feature_strip_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.feature_strip_items TO authenticated;
GRANT ALL ON public.feature_strip_items TO service_role;
ALTER TABLE public.feature_strip_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feature_strip public read" ON public.feature_strip_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "feature_strip admin write" ON public.feature_strip_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- homepage_sections
CREATE TABLE public.homepage_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL UNIQUE,
  label text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.homepage_sections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.homepage_sections TO authenticated;
GRANT ALL ON public.homepage_sections TO service_role;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "homepage_sections public read" ON public.homepage_sections FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "homepage_sections admin write" ON public.homepage_sections FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- updated_at helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- updated_at triggers
CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_announcements_updated BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_feature_strip_updated BEFORE UPDATE ON public.feature_strip_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_homepage_sections_updated BEFORE UPDATE ON public.homepage_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- seed: settings
INSERT INTO public.site_settings (key, value) VALUES
  ('brand', '{"name":"Software Vala","tagline":"- The Name of Trust"}'::jsonb),
  ('header_badges', '{"lifetime_deal":"$249 Lifetime Deal","discount":"40% OFF","show_manager_link":true,"show_boss_portal":true}'::jsonb),
  ('footer', '{"copyright":"© 2024 Software Vala - The Name of Trust. All rights reserved.","tagline":"55 Master Categories • Software Solutions • 20 Live Demos Ready"}'::jsonb);

-- seed: announcements
INSERT INTO public.announcements (title, badge, text, icon_name, gradient, position) VALUES
  ('🎉 Mega Software Sale —', 'Flat 40% OFF', 'Lifetime access on all products!', 'PartyPopper', 'from-amber-500 via-orange-500 to-red-500', 0),
  ('⚡ Instant Deployment —', '2-Hour Delivery', 'Source code + setup delivered same day.', 'Truck', 'from-amber-500 via-orange-500 to-red-500', 1),
  ('🔒 Buyer Protection —', 'No Advance Payment', 'Pay only after live demo approval.', 'ShieldCheck', 'from-amber-500 via-orange-500 to-red-500', 2),
  ('🌍 Global Support —', '24×7 Live Help', 'Human + AI assistance in 12 languages.', 'Headphones', 'from-amber-500 via-orange-500 to-red-500', 3);

-- seed: feature strip
INSERT INTO public.feature_strip_items (label, icon_name, color_class, position) VALUES
  ('No Advance Payment', 'ShieldCheck', 'text-emerald-300', 0),
  ('2-Hour Delivery', 'Clock', 'text-cyan-300', 1),
  ('No Hidden Charges', 'BadgeCheck', 'text-amber-300', 2),
  ('Trademark Protected', 'Lock', 'text-rose-300', 3),
  ('204+ Solutions', 'Boxes', 'text-violet-300', 4),
  ('20 Live Demos', 'Zap', 'text-fuchsia-300', 5),
  ('Global Support', 'Globe2', 'text-sky-300', 6);

-- seed: homepage sections
INSERT INTO public.homepage_sections (section_key, label, position) VALUES
  ('announcement', 'Announcement Banner', 0),
  ('feature_strip', 'Feature Strip', 1),
  ('hero', 'Hero Carousel', 2),
  ('industry_grid', 'Industry Grid', 3),
  ('category_slider', 'Category Slider', 4),
  ('stats', 'Stats / Trust Badges', 5),
  ('catalog', 'Product Catalog Rows', 6),
  ('ai_zone', 'AI Zone', 7),
  ('success_stories', 'Success Stories', 8),
  ('awards', 'Awards Row', 9),
  ('live_activity', 'Live Activity', 10),
  ('vala_tv', 'Vala TV', 11),
  ('academy', 'Vala Academy', 12),
  ('partners', 'Partner Ecosystem', 13),
  ('faq', 'FAQ', 14),
  ('enterprise_cta', 'Enterprise CTA', 15),
  ('footer', 'Footer', 16);