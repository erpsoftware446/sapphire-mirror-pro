CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.site_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'info',
  link_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_notifications TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_notifications TO authenticated;
GRANT ALL ON public.site_notifications TO service_role;

ALTER TABLE public.site_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published notifications are public"
  ON public.site_notifications FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins manage notifications"
  ON public.site_notifications FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_site_notifications_updated_at
  BEFORE UPDATE ON public.site_notifications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.site_notifications (title, body, kind, link_url, sort_order) VALUES
  ('Lifetime deal live — $249', '40% OFF on the full catalog. One-time payment, lifetime access, full source code.', 'promo', '/#pricing', 1),
  ('2-hour delivery guarantee', 'Source code, database and deployment guide delivered within 2 hours of purchase.', 'info', null, 2),
  ('20 live demos available', 'Try any product before you buy — 20 fully hosted live demos across master categories.', 'info', null, 3),
  ('Vendor & reseller applications open', 'Apply as Vendor, Reseller, Author, Affiliate or Franchise partner.', 'update', '/careers?type=vendor', 4),
  ('1 year free support included', 'Every purchase includes 12 months of updates and technical support.', 'info', null, 5);