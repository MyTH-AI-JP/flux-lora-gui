-- Loraモデルを保存するテーブル作成
CREATE TABLE IF NOT EXISTS user_lora_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  lora_url TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- 外部キー制約
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 更新日時を自動的に更新するトリガー
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_lora_models_updated_at
BEFORE UPDATE ON user_lora_models
FOR EACH ROW
EXECUTE PROCEDURE update_modified_column();

-- ユーザーIDでの検索を高速化するインデックス
CREATE INDEX idx_user_lora_models_user_id ON user_lora_models(user_id);

-- RLSポリシー設定：ユーザーは自分のデータのみ操作可能
ALTER TABLE user_lora_models ENABLE ROW LEVEL SECURITY;

-- 閲覧ポリシー：自分のデータと公開設定されたデータを閲覧可能
CREATE POLICY "ユーザーは自分のLoraモデルを閲覧可能" ON user_lora_models
  FOR SELECT USING (
    auth.uid() = user_id OR is_public = TRUE
  );

-- 作成ポリシー：認証済みユーザーは新規作成可能
CREATE POLICY "認証済みユーザーはLoraモデルを作成可能" ON user_lora_models
  FOR INSERT WITH CHECK (
    auth.uid() = user_id
  );

-- 更新ポリシー：自分のデータのみ更新可能
CREATE POLICY "ユーザーは自分のLoraモデルのみ更新可能" ON user_lora_models
  FOR UPDATE USING (
    auth.uid() = user_id
  );

-- 削除ポリシー：自分のデータのみ削除可能
CREATE POLICY "ユーザーは自分のLoraモデルのみ削除可能" ON user_lora_models
  FOR DELETE USING (
    auth.uid() = user_id
  ); 