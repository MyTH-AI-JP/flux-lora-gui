-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

----------------------
-- プロファイルテーブル関連のアップデート
----------------------

-- Create a table for user profiles (if not exists)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  subscription_tier TEXT DEFAULT 'free',
  subscription_starts_at TIMESTAMP WITH TIME ZONE,
  subscription_ends_at TIMESTAMP WITH TIME ZONE,
  image_credits INTEGER DEFAULT 0,
  image_credits_refreshed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  preferred_language TEXT DEFAULT 'ja',
  theme TEXT DEFAULT 'light'
);

-- Enable Row Level Security on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile."
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

----------------------
-- 画像生成履歴テーブル
----------------------

-- Create image_history table if not exists
CREATE TABLE IF NOT EXISTS image_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  negative_prompt TEXT,
  result_url TEXT,
  lora_id TEXT,
  lora_scale NUMERIC,
  settings JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  status TEXT DEFAULT 'processing'
);

-- Enable Row Level Security on image_history
ALTER TABLE image_history ENABLE ROW LEVEL SECURITY;

-- Create policies for image_history
CREATE POLICY "Users can view their own image history."
  ON image_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own image history."
  ON image_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create an index on user_id for better performance
CREATE INDEX IF NOT EXISTS idx_image_history_user_id ON image_history(user_id);

----------------------
-- Loraモデルテーブル
----------------------

-- Create a table for lora models
CREATE TABLE IF NOT EXISTS lora_models (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  author TEXT,
  description TEXT,
  lora_url TEXT NOT NULL,
  category TEXT,
  tags TEXT[],
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Enable Row Level Security on lora_models
ALTER TABLE lora_models ENABLE ROW LEVEL SECURITY;

-- Create policies for lora_models
CREATE POLICY "Anyone can view public lora models."
  ON lora_models FOR SELECT
  USING (is_public = true);

-- Create an index on created_at for better performance
CREATE INDEX IF NOT EXISTS idx_lora_models_created_at ON lora_models(created_at);

-- Create an index on category for better performance
CREATE INDEX IF NOT EXISTS idx_lora_models_category ON lora_models(category);

----------------------
-- ユーザーカスタムLoraテーブル
----------------------

-- Create a table for user-created lora models
CREATE TABLE IF NOT EXISTS user_lora_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  lora_url TEXT NOT NULL,
  settings JSONB,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Enable Row Level Security on user_lora_models
ALTER TABLE user_lora_models ENABLE ROW LEVEL SECURITY;

-- Create policies for user_lora_models
CREATE POLICY "Users can view their own lora models."
  ON user_lora_models FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own lora models."
  ON user_lora_models FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lora models."
  ON user_lora_models FOR DELETE
  USING (auth.uid() = user_id);

-- Create an index on user_id for better performance
CREATE INDEX IF NOT EXISTS idx_user_lora_models_user_id ON user_lora_models(user_id);

----------------------
-- お気に入りLoraテーブル
----------------------

-- Create a table for user's favorite loras
CREATE TABLE IF NOT EXISTS user_favorite_loras (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lora_id TEXT REFERENCES lora_models(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  PRIMARY KEY (user_id, lora_id)
);

-- Enable Row Level Security on user_favorite_loras
ALTER TABLE user_favorite_loras ENABLE ROW LEVEL SECURITY;

-- Create policies for user_favorite_loras
CREATE POLICY "Users can view their own favorite loras."
  ON user_favorite_loras FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorite loras."
  ON user_favorite_loras FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorite loras."
  ON user_favorite_loras FOR DELETE
  USING (auth.uid() = user_id);

----------------------
-- 3Dカルーセル用のテーブル
----------------------

-- Create a table for carousel models
CREATE TABLE IF NOT EXISTS carousel_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lora_id TEXT REFERENCES lora_models(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Enable Row Level Security on carousel_models
ALTER TABLE carousel_models ENABLE ROW LEVEL SECURITY;

-- Create policies for carousel_models
CREATE POLICY "Anyone can view carousel models."
  ON carousel_models FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create an index on position for better performance
CREATE INDEX IF NOT EXISTS idx_carousel_models_position ON carousel_models(position);

----------------------
-- 更新トリガー
----------------------

-- Create triggers to update timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_timestamp
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_image_history_timestamp
BEFORE UPDATE ON image_history
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_lora_models_timestamp
BEFORE UPDATE ON lora_models
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_user_lora_models_timestamp
BEFORE UPDATE ON user_lora_models
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_carousel_models_timestamp
BEFORE UPDATE ON carousel_models
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

----------------------
-- サンプルデータの挿入
----------------------

-- Insert sample lora models if they don't exist
INSERT INTO lora_models (id, name, image_url, author, description, lora_url, category, tags, is_public, created_at)
VALUES
  ('portrait-asian', 'アジアンビューティー', '/images/asian-portrait.jpg', 'ポートレート専門家', 'アジアの自然な美しさを引き出すスタイルを適用するLora', 'https://storage.googleapis.com/fal-flux-lora/a82719e8f8d845d4b08d792ec3e054d8_pytorch_lora_weights.safetensors', 'Portrait', ARRAY['asian', 'portrait', 'beauty'], true, now()),
  ('asian-beauty', '自然な美しさ', '/images/asian-beauty.jpg', 'ポートレートアーティスト', '自然な雰囲気と美しさを引き出すポートレートスタイル', 'https://v3.fal.media/files/koala/nTFVc1MiTbCieg6-FibkM_pytorch_lora_weights.safetensors', 'Portrait', ARRAY['asian', 'beauty'], true, now()),
  ('sakura-style', '桜スタイル', '/images/sakura.jpg', '日本風景アーティスト', '美しい桜の風景や和風のテイストを強調するLoraモデル', 'https://v3.fal.media/files/zebra/jCKae-M1MGClNffKuxVJl_pytorch_lora_weights.safetensors', 'Landscape', ARRAY['sakura', 'landscape'], true, now()),
  ('anime-style', 'アニメスタイル', '/images/anime.jpg', 'アニメ作家', 'アニメ風のスタイルを適用するLora', 'https://storage.googleapis.com/fal-flux-lora/anime-style-lora.safetensors', 'Anime', ARRAY['anime', 'style'], true, now()),
  ('watercolor', '水彩画', '/images/watercolor.jpg', '水彩画アーティスト', '水彩画風のスタイルを適用するLora', 'https://storage.googleapis.com/fal-flux-lora/watercolor-style-lora.safetensors', 'Art', ARRAY['watercolor', 'art'], true, now()),
  ('monochrome', 'モノクロ', '/images/monochrome.jpg', 'モノクロアーティスト', 'モノクロスタイルを適用するLora', 'https://storage.googleapis.com/fal-flux-lora/monochrome-style-lora.safetensors', 'Art', ARRAY['monochrome', 'art'], true, now())
ON CONFLICT (id) DO UPDATE
SET 
  name = EXCLUDED.name,
  image_url = EXCLUDED.image_url,
  author = EXCLUDED.author,
  description = EXCLUDED.description,
  lora_url = EXCLUDED.lora_url,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  is_public = EXCLUDED.is_public;

-- Insert carousel models if they don't exist
INSERT INTO carousel_models (lora_id, position, is_active, created_at)
VALUES
  ('portrait-asian', 1, true, now()),
  ('asian-beauty', 2, true, now()),
  ('sakura-style', 3, true, now()),
  ('anime-style', 4, true, now()),
  ('watercolor', 5, true, now()),
  ('monochrome', 6, true, now())
ON CONFLICT DO NOTHING;

-- Create sample image history for development (this will be executed only if the table is empty)
DO $$
BEGIN
  IF (SELECT COUNT(*) FROM image_history) = 0 THEN
    INSERT INTO image_history (user_id, prompt, negative_prompt, result_url, status, created_at)
    VALUES
      ((SELECT id FROM profiles LIMIT 1), '美しい桜の風景、春、日本', 'ぼやけた、ノイズ', '/images/sample1.jpg', 'completed', now() - interval '1 day'),
      ((SELECT id FROM profiles LIMIT 1), '水彩画風の山の風景', 'ぼやけた、ノイズ', '/images/sample2.jpg', 'completed', now() - interval '2 days'),
      ((SELECT id FROM profiles LIMIT 1), 'アニメスタイルの女性キャラクター', 'ぼやけた、ノイズ', '/images/sample3.jpg', 'completed', now() - interval '3 days');
  END IF;
END
$$; 