-- RLSはすでに有効になっているので、この行は削除
-- ALTER DATABASE postgres SET "auth.enable_row_level_security" = on;

-- UUID拡張を有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- プロファイルテーブル (ユーザー情報)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  avatar_url TEXT,
  api_key TEXT,
  subscription_tier TEXT DEFAULT 'free', -- free, basic, pro
  subscription_status TEXT DEFAULT 'active', -- active, canceled, past_due
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- APIキーの使用制限を格納するテーブル
CREATE TABLE subscription_limits (
  tier TEXT PRIMARY KEY,
  monthly_credits INTEGER NOT NULL,
  max_file_size INTEGER NOT NULL, -- バイト単位
  max_resolution TEXT NOT NULL, -- 例: "1024x1024"
  concurrent_jobs INTEGER NOT NULL,
  features JSONB NOT NULL -- 利用可能な機能
);

-- Loraテンプレートテーブル
CREATE TABLE loras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  author_id UUID REFERENCES profiles(id),
  image_url TEXT NOT NULL,
  lora_url TEXT NOT NULL, -- safetensorsファイルへのURL
  tags TEXT[],
  category TEXT,
  is_public BOOLEAN DEFAULT false,
  download_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ユーザーのお気に入りLoraテーブル
CREATE TABLE user_favorite_loras (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lora_id UUID REFERENCES loras(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, lora_id)
);

-- 生成履歴テーブル
CREATE TABLE generation_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  lora_id UUID REFERENCES loras(id) ON DELETE SET NULL,
  prompt TEXT NOT NULL,
  negative_prompt TEXT,
  settings JSONB NOT NULL, -- 生成設定
  result_url TEXT, -- 生成された画像のURL
  status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, completed, failed
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 支払い履歴テーブル
CREATE TABLE payment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  stripe_payment_id TEXT,
  amount DECIMAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'jpy',
  status TEXT NOT NULL, -- succeeded, failed, pending
  subscription_tier TEXT,
  subscription_period TEXT, -- monthly, yearly
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLSポリシーの設定
-- プロファイルテーブルのRLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "プロファイルは本人のみ編集可能" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "プロファイルは本人のみ参照可能" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

-- Loraテーブルのポリシー
ALTER TABLE loras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "公開Loraは誰でも閲覧可能" 
  ON loras FOR SELECT 
  USING (is_public = true OR auth.uid() = author_id);

CREATE POLICY "Loraは作者のみ編集可能" 
  ON loras FOR UPDATE 
  USING (auth.uid() = author_id);

CREATE POLICY "Loraは作者のみ削除可能" 
  ON loras FOR DELETE 
  USING (auth.uid() = author_id);

CREATE POLICY "認証済みユーザーはLoraを作成可能" 
  ON loras FOR INSERT 
  WITH CHECK (auth.uid() = author_id);

-- お気に入りLoraのポリシー
ALTER TABLE user_favorite_loras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ユーザーは自分のお気に入りのみ参照可能" 
  ON user_favorite_loras FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のお気に入りのみ編集可能" 
  ON user_favorite_loras FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ユーザーは自分のお気に入りのみ削除可能" 
  ON user_favorite_loras FOR DELETE 
  USING (auth.uid() = user_id);

-- 生成履歴のポリシー
ALTER TABLE generation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ユーザーは自分の生成履歴のみ参照可能" 
  ON generation_history FOR SELECT 
  USING (auth.uid() = user_id);

-- 支払い履歴のポリシー
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ユーザーは自分の支払い履歴のみ参照可能" 
  ON payment_history FOR SELECT 
  USING (auth.uid() = user_id);

-- サブスクリプション制限の初期データ
INSERT INTO subscription_limits (tier, monthly_credits, max_file_size, max_resolution, concurrent_jobs, features)
VALUES 
  ('free', 10, 5242880, '512x512', 1, '{"basic_generation": true, "advanced_settings": false, "priority_queue": false}'::jsonb),
  ('basic', 100, 10485760, '1024x1024', 2, '{"basic_generation": true, "advanced_settings": true, "priority_queue": false}'::jsonb),
  ('pro', 1000, 20971520, '2048x2048', 5, '{"basic_generation": true, "advanced_settings": true, "priority_queue": true, "commercial_use": true}'::jsonb);

-- サンプルLoraデータ
INSERT INTO loras (name, description, image_url, lora_url, tags, category, is_public)
VALUES 
  ('アニメスタイル', 'アニメ風のスタイルを適用するLora', 'https://v3.fal.media/files/zebra/jCKae-M1MGClNffKuxVJl_pytorch_lora_weights.safetensors', 'https://v3.fal.media/files/zebra/jCKae-M1MGClNffKuxVJl_pytorch_lora_weights.safetensors', ARRAY['anime', 'style'], 'アニメ', true),
  ('水彩画風', '水彩画風のスタイルを適用するLora', 'https://picsum.photos/200/300?watercolor', 'https://example.com/loras/watercolor.safetensors', ARRAY['watercolor', 'painting'], '絵画', true),
  ('モノクロ', 'モノクロスタイルを適用するLora', 'https://picsum.photos/200/300?monochrome', 'https://example.com/loras/monochrome.safetensors', ARRAY['monochrome', 'black and white'], '写真', true);

-- トリガー：プロファイル更新日時の自動更新
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loras_updated_at
BEFORE UPDATE ON loras
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_generation_history_updated_at
BEFORE UPDATE ON generation_history
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column(); 