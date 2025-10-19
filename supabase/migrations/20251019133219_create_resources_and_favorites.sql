CREATE TABLE IF NOT EXISTS public.resources (
  slug TEXT PRIMARY KEY,
  download_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_resources_download_count ON public.resources(download_count DESC);

CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_slug TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('command', 'rule', 'mcp', 'hook')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_user_favorite UNIQUE(user_id, resource_slug)
);

CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_resource_slug ON public.favorites(resource_slug);
CREATE INDEX idx_favorites_resource_type ON public.favorites(resource_type);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Resources are viewable by everyone" ON public.resources
  FOR SELECT USING (true);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.increment_download_count(resource_slug_param TEXT)
RETURNS void AS $$
BEGIN
  INSERT INTO public.resources (slug, download_count)
  VALUES (resource_slug_param, 1)
  ON CONFLICT (slug) 
  DO UPDATE SET 
    download_count = public.resources.download_count + 1,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_popular_resources(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(slug TEXT, download_count INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT r.slug, r.download_count
  FROM public.resources r
  ORDER BY r.download_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_resources_updated_at
  BEFORE UPDATE ON public.resources
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

