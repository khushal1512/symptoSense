-- Add api_key column to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN api_key TEXT UNIQUE;

-- Create index for faster lookups
CREATE INDEX idx_user_profiles_api_key ON user_profiles(api_key);

-- Update RLS policies to include api_key
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

CREATE POLICY "Users can view own profile"
ON user_profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id); 