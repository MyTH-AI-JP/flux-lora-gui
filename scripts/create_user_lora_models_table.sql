-- ユーザーLoraモデルテーブル作成 (開発環境用)
CREATE TABLE IF NOT EXISTS user_lora_models (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  lora_url TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- テスト用サンプルデータ
INSERT INTO user_lora_models (id, user_id, name, image_url, description, lora_url, is_public, created_at)
VALUES
  (
    'user-portrait-asian',
    'user-123',
    'カスタムアジアンビューティー',
    '/images/asian-portrait.jpg',
    'カスタマイズしたアジアンビューティーLoraモデル',
    'https://storage.googleapis.com/fal-flux-lora/a82719e8f8d845d4b08d792ec3e054d8_pytorch_lora_weights.safetensors',
    TRUE,
    CURRENT_TIMESTAMP - INTERVAL '2 days'
  ),
  (
    'user-sakura-style',
    'user-123',
    'カスタム桜スタイル',
    '/images/sakura.jpg',
    'カスタマイズした桜の風景Loraモデル',
    'https://v3.fal.media/files/zebra/jCKae-M1MGClNffKuxVJl_pytorch_lora_weights.safetensors',
    FALSE,
    CURRENT_TIMESTAMP - INTERVAL '5 days'
  ),
  (
    'user-anime-portrait',
    'user-123',
    'アニメポートレート',
    '/images/anime-portrait.jpg',
    'アニメ風ポートレートスタイルのLoraモデル',
    'https://storage.googleapis.com/fal-flux-lora/5d798271e69e45f6b0b388b8cf3aff79_pytorch_lora_weights.safetensors',
    TRUE,
    CURRENT_TIMESTAMP - INTERVAL '10 days'
  ); 