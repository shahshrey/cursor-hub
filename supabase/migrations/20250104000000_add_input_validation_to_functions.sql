CREATE OR REPLACE FUNCTION public.increment_download_count(resource_slug_param TEXT)
RETURNS void AS $$
BEGIN
  IF resource_slug_param IS NULL OR length(resource_slug_param) = 0 THEN
    RAISE EXCEPTION 'Invalid slug parameter: cannot be null or empty';
  END IF;
  
  IF NOT (resource_slug_param ~ '^[a-z0-9-]+$') THEN
    RAISE EXCEPTION 'Invalid slug format: must contain only lowercase letters, numbers, and hyphens';
  END IF;
  
  IF length(resource_slug_param) > 255 THEN
    RAISE EXCEPTION 'Invalid slug: length exceeds maximum of 255 characters';
  END IF;
  
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
  IF limit_count IS NULL OR limit_count < 1 THEN
    RAISE EXCEPTION 'Invalid limit: must be greater than 0';
  END IF;
  
  IF limit_count > 1000 THEN
    RAISE EXCEPTION 'Invalid limit: cannot exceed 1000';
  END IF;
  
  RETURN QUERY
  SELECT r.slug, r.download_count
  FROM public.resources r
  ORDER BY r.download_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

