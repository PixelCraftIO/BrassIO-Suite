-- Create news table for BrassIO-Suite
-- This table stores news articles that will be displayed across all apps

CREATE TABLE IF NOT EXISTS public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text, -- Optional: Full content if needed
  published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS news_slug_idx ON public.news(slug);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS news_created_at_idx ON public.news(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published news (no authentication required)
CREATE POLICY "Anyone can view published news"
ON public.news FOR SELECT
USING (published = true);

-- Policy: Only authenticated users can insert news (for now, later we'll restrict to admins)
CREATE POLICY "Authenticated users can insert news"
ON public.news FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update news
CREATE POLICY "Authenticated users can update news"
ON public.news FOR UPDATE
USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can delete news
CREATE POLICY "Authenticated users can delete news"
ON public.news FOR DELETE
USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
CREATE TRIGGER set_news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample news data
INSERT INTO public.news (title, description, slug, content, published) VALUES
  (
    'Willkommen bei BrassIO-Suite!',
    'BrassIO-Suite ist dein umfassendes Ökosystem für Musikübungen. Starte jetzt mit unserem Tuner und Metronom!',
    'willkommen-bei-brassio',
    'Wir freuen uns, dich bei BrassIO-Suite begrüßen zu dürfen! Unsere Apps helfen dir dabei, deine musikalischen Fähigkeiten zu verbessern. Egal ob du Anfänger oder Profi bist - wir haben die richtigen Tools für dich.',
    true
  ),
  (
    'Neues Feature: Interval Trainer kommt bald!',
    'Übe Tonsprünge und verbessere deine Intonation mit unserem kommenden Interval Trainer.',
    'interval-trainer-kommt-bald',
    'Der Interval Trainer wird dir helfen, Tonsprünge auf deinem Blasinstrument zu üben. Mit integriertem Tuner und detaillierter Analyse deiner Fortschritte.',
    true
  ),
  (
    'Update: Metronom App v1.1',
    'Neue Features im Metronom: Tap Tempo und erweiterte Taktarten sind jetzt verfügbar!',
    'metronom-update-v1-1',
    'Wir haben das Metronom verbessert! Jetzt kannst du das Tempo per Tap-Funktion einstellen und hast Zugriff auf noch mehr Taktarten.',
    true
  );
