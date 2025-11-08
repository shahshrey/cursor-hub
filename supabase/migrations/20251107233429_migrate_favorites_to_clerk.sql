-- Migrate favorites table to support Clerk user IDs
-- This migration changes user_id from UUID (Supabase Auth) to TEXT (Clerk)
-- and removes RLS policies that depend on auth.uid()

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Users can view own favorites" ON public.favorites;
DROP POLICY IF EXISTS "Users can insert own favorites" ON public.favorites;
DROP POLICY IF EXISTS "Users can delete own favorites" ON public.favorites;

-- Drop foreign key constraint to auth.users
ALTER TABLE public.favorites DROP CONSTRAINT IF EXISTS favorites_user_id_fkey;

-- Change user_id column type from UUID to TEXT to support Clerk user IDs (user_xxx format)
ALTER TABLE public.favorites ALTER COLUMN user_id TYPE TEXT USING user_id::TEXT;

-- Disable RLS since we're using Clerk for authentication (service role key used server-side)
ALTER TABLE public.favorites DISABLE ROW LEVEL SECURITY;

-- Add comment explaining the change
COMMENT ON TABLE public.favorites IS 'User favorites table. Authentication handled by Clerk, user_id stores Clerk user IDs. Access controlled server-side via Clerk auth() check.';
COMMENT ON COLUMN public.favorites.user_id IS 'Clerk user ID (format: user_xxx). No foreign key constraint as users are managed in Clerk.';

