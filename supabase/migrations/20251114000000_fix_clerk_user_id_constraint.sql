ALTER TABLE public.favorites DROP CONSTRAINT IF EXISTS unique_user_favorite;

ALTER TABLE public.favorites 
  ADD CONSTRAINT unique_user_favorite UNIQUE(user_id, resource_slug);

COMMENT ON CONSTRAINT unique_user_favorite ON public.favorites IS 'Ensures each user can only favorite a resource once. user_id is Clerk user ID (TEXT).';

