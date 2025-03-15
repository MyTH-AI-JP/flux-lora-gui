-- lora_modelsテーブルの作成
CREATE TABLE IF NOT EXISTS lora_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  author TEXT,
  description TEXT,
  lora_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックスの作成（パフォーマンス向上のため）
CREATE INDEX IF NOT EXISTS idx_lora_models_created_at ON lora_models(created_at);

-- RLSポリシーの設定（セキュリティのため）
ALTER TABLE lora_models ENABLE ROW LEVEL SECURITY;

-- 匿名ユーザーでも全ての操作を許可するポリシー（開発用、本番環境では変更すべき）
CREATE POLICY "Allow anonymous access to lora_models" ON lora_models FOR ALL USING (true);

-- サンプルデータの挿入
INSERT INTO lora_models (id, name, image_url, author, description, lora_url, created_at)
VALUES 
  ('portrait-asian', 'アジアンビューティー', '/images/asian-portrait.jpg', 'ポートレート専門家', 'アジアの自然な美しさを引き出すスタイルを適用するLora', 'https://storage.googleapis.com/fal-flux-lora/a82719e8f8d845d4b08d792ec3e054d8_pytorch_lora_weights.safetensors', NOW() - INTERVAL '4 days'),
  ('asian-beauty', '自然な美しさ', '/images/asian-beauty.jpg', 'ポートレートアーティスト', '自然な雰囲気と美しさを引き出すポートレートスタイル', 'https://v3.fal.media/files/koala/nTFVc1MiTbCieg6-FibkM_pytorch_lora_weights.safetensors', NOW() - INTERVAL '3 days'),
  ('sakura-style', '桜スタイル', '/images/sakura.jpg', '日本風景アーティスト', '美しい桜の風景や和風のテイストを強調するLoraモデル', 'https://v3.fal.media/files/zebra/jCKae-M1MGClNffKuxVJl_pytorch_lora_weights.safetensors', NOW() - INTERVAL '2 days'),
  ('anime-style', 'アニメスタイル', '/images/anime.jpg', 'アニメ作家', 'アニメ風のスタイルを適用するLora', 'https://storage.googleapis.com/fal-flux-lora/anime-style-lora.safetensors', NOW() - INTERVAL '1 day'),
  ('watercolor', '水彩画風', '/images/watercolor.jpg', '水彩アーティスト', '水彩画風のスタイルを適用するLora', 'https://storage.googleapis.com/fal-flux-lora/watercolor-style-lora.safetensors', NOW() - INTERVAL '12 hours'),
  ('monochrome', 'モノクロ', '/images/monochrome.jpg', 'モノクロアーティスト', 'モノクロスタイルを適用するLora', 'https://storage.googleapis.com/fal-flux-lora/monochrome-style-lora.safetensors', NOW() - INTERVAL '6 hours'); 

-- 既存のレコードがある場合は競合を避ける（開発環境でのエラー防止）
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  image_url = EXCLUDED.image_url,
  author = EXCLUDED.author,
  description = EXCLUDED.description,
  lora_url = EXCLUDED.lora_url; 