
-- 1. Role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admins can read roles
CREATE POLICY "Admins can view roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Update contact_messages: let admins read
DROP POLICY IF EXISTS "No public read access" ON public.contact_messages;

CREATE POLICY "Admins can read messages"
  ON public.contact_messages FOR SELECT
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can delete messages"
  ON public.contact_messages FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Site settings table (key-value)
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings (public site needs them)
CREATE POLICY "Public can read settings"
  ON public.site_settings FOR SELECT
  USING (true);

-- Only admins/editors can update
CREATE POLICY "Admins can update settings"
  ON public.site_settings FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE POLICY "Admins can insert settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4. Seed default settings from CONFIG
INSERT INTO public.site_settings (key, value) VALUES
  ('whatsapp', '{"number": "5511999999999", "message": "Olá! Vim pelo site da UniveSIA e gostaria de saber mais sobre os serviços."}'),
  ('social', '{"instagram": "https://instagram.com/univesia", "linkedin": "https://linkedin.com/company/univesia", "github": "https://github.com/univesia", "email": "contato@univesia.com"}'),
  ('counters', '{"projects": 47, "clients": 32, "years": 3}'),
  ('calendly', '{"url": "https://calendly.com/univesia"}');
