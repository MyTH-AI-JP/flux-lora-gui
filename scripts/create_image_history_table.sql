-- image_historyテーブルの作成
CREATE TABLE IF NOT EXISTS image_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  result_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT CHECK (status IN ('completed', 'failed', 'processing'))
);

-- インデックスの作成（パフォーマンス向上のため）
CREATE INDEX IF NOT EXISTS idx_image_history_user_id ON image_history(user_id);
CREATE INDEX IF NOT EXISTS idx_image_history_created_at ON image_history(created_at);

-- RLSポリシーの設定（セキュリティのため）
ALTER TABLE image_history ENABLE ROW LEVEL SECURITY;

-- 匿名ユーザーでも全ての操作を許可するポリシー（開発用、本番環境では変更すべき）
CREATE POLICY "Allow anonymous access to image_history" ON image_history FOR ALL USING (true);

-- サンプルデータの挿入
INSERT INTO image_history (user_id, prompt, result_url, status, created_at)
VALUES 
  ('user-123', '美しい夕日と海の風景', 'https://picsum.photos/400/300?sunset', 'completed', NOW() - INTERVAL '1 day'),
  ('user-123', '山の風景と雪', 'https://picsum.photos/400/300?mountain', 'completed', NOW() - INTERVAL '2 days'),
  ('user-123', '春の桜と日本庭園', 'https://picsum.photos/400/300?cherry', 'completed', NOW() - INTERVAL '3 days'),
  ('user-123', '青い海と白い砂浜', 'https://picsum.photos/400/300?beach', 'completed', NOW() - INTERVAL '4 days'); 