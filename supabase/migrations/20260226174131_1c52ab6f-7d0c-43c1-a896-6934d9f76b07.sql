
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  company TEXT,
  project_type TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_messages
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated admins should read (for now, deny all SELECT)
CREATE POLICY "No public read access"
  ON public.contact_messages
  FOR SELECT
  USING (false);
