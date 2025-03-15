# Supabaseセットアップガイド

このプロジェクトはSupabaseをバックエンドとして使用しています。以下の手順に従ってSupabaseをセットアップしてください。

## 1. アカウント作成とプロジェクト設定

1. [Supabase](https://supabase.com/)にアクセスし、アカウントを作成します。
2. 新しいプロジェクトを作成します。
3. プロジェクトが作成されたら、「Settings」→「API」から以下の情報を取得します：
   - Project URL
   - anon public key

## 2. 環境変数の設定

プロジェクトのルートディレクトリに`.env.local`ファイルを作成し、以下の内容を追加します：

```env
NEXT_PUBLIC_SUPABASE_URL=あなたのプロジェクトURL
NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたの匿名キー
```

## 3. テーブルの作成

### 方法1: SQLエディタを使用する
1. Supabaseダッシュボードから「SQL Editor」に移動します。
2. 新しいクエリを作成し、`scripts/create_image_history_table.sql`の内容をコピー＆ペーストします。
3. クエリを実行します。

### 方法2: Table Editorを使用する
1. Supabaseダッシュボードから「Table Editor」に移動します。
2. 「+ Create a new table」をクリックします。
3. 以下の設定でテーブルを作成します：

#### image_historyテーブル
- テーブル名: `image_history`
- スキーマ: `public`
- 列:
  - `id`: UUID (Primary Key, Default: `gen_random_uuid()`)
  - `user_id`: text (Not Null)
  - `prompt`: text (Not Null)
  - `result_url`: text (Not Null)
  - `created_at`: timestamptz (Default: `now()`)
  - `status`: text (Check: `status IN ('completed', 'failed', 'processing')`)

4. テーブルを保存します。

## 4. Row Level Securityの設定

1. 作成したテーブルの「Auth Policies」タブに移動します。
2. 「Enable RLS」をクリックしてRow Level Securityを有効にします。
3. 「Add Policy」をクリックして、新しいポリシーを作成します：
   - Policy name: `Allow anonymous access to image_history`
   - Policy definition: `ALL`
   - Using expression: `true`（開発用、本番環境では変更する）

## 5. テストデータの挿入（オプション）

1. SQLエディタで新しいクエリを作成します。
2. 以下のSQLを実行して、テストデータを挿入します：

```sql
INSERT INTO image_history (user_id, prompt, result_url, status, created_at)
VALUES 
  ('user-123', '美しい夕日と海の風景', 'https://picsum.photos/400/300?sunset', 'completed', NOW() - INTERVAL '1 day'),
  ('user-123', '山の風景と雪', 'https://picsum.photos/400/300?mountain', 'completed', NOW() - INTERVAL '2 days'),
  ('user-123', '春の桜と日本庭園', 'https://picsum.photos/400/300?cherry', 'completed', NOW() - INTERVAL '3 days'),
  ('user-123', '青い海と白い砂浜', 'https://picsum.photos/400/300?beach', 'completed', NOW() - INTERVAL '4 days');
```

## トラブルシューティング

### テーブルが存在しないエラー
- Supabaseダッシュボードで正しいテーブルが作成されているか確認してください。
- テーブル名の大文字小文字が正しいか確認してください。

### 認証エラー
- 環境変数が正しく設定されているか確認してください。
- プロジェクトURLとanonキーが最新のものであるか確認してください。

### データが表示されない
- RLSポリシーが正しく設定されているか確認してください。
- クエリで使用しているユーザーIDが挿入したデータのユーザーIDと一致しているか確認してください。 