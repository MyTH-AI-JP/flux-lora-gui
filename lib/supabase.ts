import { createClient } from '@supabase/supabase-js';

// 環境変数からURLとキーを取得
const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// URLが有効かチェック
let supabaseUrl = 'https://your-project-url.supabase.co';
try {
  // URLが正しい形式かチェック
  new URL(rawSupabaseUrl);
  supabaseUrl = rawSupabaseUrl;
} catch (e) {
  console.warn('Invalid Supabase URL format, using default URL instead', e);
}

// Supabaseクライアントの作成
export const supabase = createClient(supabaseUrl, supabaseKey);

// Loraモデルの型定義
export type LoraModel = {
  id: string;
  name: string;
  image_url: string;
  author?: string;
  description?: string;
  lora_url?: string;
  created_at: string;
};

// 履歴アイテムの型定義
export type HistoryItem = {
  id: string;
  user_id: string;
  prompt: string;
  result_url: string;
  created_at: string;
  status: 'completed' | 'failed' | 'processing';
};

/**
 * Supabaseからすべてのloraモデルを取得
 */
export async function getLoraModels(): Promise<LoraModel[]> {
  const { data, error } = await supabase
    .from('lora_models')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching lora models:', error);
    return [];
  }

  return data || [];
}

/**
 * Supabaseから特定のloraモデルを取得
 * @param id モデルのID
 */
export async function getLoraModelById(id: string): Promise<LoraModel | null> {
  const { data, error } = await supabase
    .from('lora_models')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching lora model with id ${id}:`, error);
    return null;
  }

  return data;
}

/**
 * 新しいloraモデルを作成または更新
 * @param model loraモデルデータ
 */
export async function upsertLoraModel(model: Omit<LoraModel, 'created_at'>): Promise<LoraModel | null> {
  const { data, error } = await supabase
    .from('lora_models')
    .upsert({
      ...model,
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error('Error upserting lora model:', error);
    return null;
  }

  return data;
}

/**
 * loraモデルを削除
 * @param id モデルのID
 */
export async function deleteLoraModel(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('lora_models')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting lora model with id ${id}:`, error);
    return false;
  }

  return true;
}

/**
 * 画像をSupabaseのストレージにアップロード
 * @param file アップロードするファイル
 * @param path 保存先のパス
 */
export async function uploadImageToSupabase(file: File, path: string = 'lora-images'): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    // アップロード処理
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // 公開URLを取得
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
}

/**
 * ストレージから画像を削除
 * @param url 画像のURL
 */
export async function deleteImageFromSupabase(url: string): Promise<boolean> {
  try {
    // URLからパスを抽出（例：https://example.com/storage/v1/object/public/images/path/to/image.jpg）
    const urlObj = new URL(url);
    const pathSegments = urlObj.pathname.split('/');
    const bucketIndex = pathSegments.findIndex(segment => segment === 'public');
    
    if (bucketIndex === -1 || bucketIndex + 2 >= pathSegments.length) {
      throw new Error('Invalid storage URL format');
    }
    
    const bucket = pathSegments[bucketIndex + 1];
    const path = pathSegments.slice(bucketIndex + 2).join('/');
    
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
}

/**
 * ユーザーの画像生成履歴を取得
 * @param userId ユーザーID
 */
export async function getUserImageHistory(userId: string): Promise<HistoryItem[]> {
  try {
    // ローカル開発環境ではモックデータを返す（テーブルが存在しない場合の対応）
    if (supabaseUrl.includes('localhost')) {
      console.log('開発環境では履歴データをモックしています');
      return getSampleImageHistory(userId);
    }

    // Supabaseの設定が正しく行われているか確認
    if (!supabaseUrl || supabaseUrl === 'https://your-project-url.supabase.co' || 
        !supabaseKey || supabaseKey === 'your-anon-key') {
      console.warn('Supabase credentials not configured properly. Using sample data instead.');
      return getSampleImageHistory(userId);
    }

    const { data, error } = await supabase
      .from('image_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      // テーブルがない場合など特定のエラーコードを処理
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.warn('The image_history table does not exist. Please create it using the SQL script provided.');
      } else {
        console.error(`Error fetching image history for user ${userId}:`, error);
      }
      // エラー時にはモックデータを返す
      return getSampleImageHistory(userId);
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error in getUserImageHistory:', err);
    return getSampleImageHistory(userId);
  }
}

/**
 * サンプルの画像生成履歴を返す（開発用）
 */
function getSampleImageHistory(userId: string): HistoryItem[] {
  return [
    {
      id: 'hist-1',
      user_id: userId,
      prompt: '美しい夕日と海の風景',
      result_url: 'https://picsum.photos/400/300?sunset',
      created_at: '2023-06-15T10:30:00Z',
      status: 'completed'
    },
    {
      id: 'hist-2',
      user_id: userId,
      prompt: '山の風景と雪',
      result_url: 'https://picsum.photos/400/300?mountain',
      created_at: '2023-06-14T14:20:00Z',
      status: 'completed'
    },
    {
      id: 'hist-3',
      user_id: userId,
      prompt: '春の桜と日本庭園',
      result_url: 'https://picsum.photos/400/300?cherry',
      created_at: '2023-06-13T09:15:00Z',
      status: 'completed'
    },
    {
      id: 'hist-4',
      user_id: userId,
      prompt: '青い海と白い砂浜',
      result_url: 'https://picsum.photos/400/300?beach',
      created_at: '2023-06-12T16:45:00Z',
      status: 'completed'
    }
  ];
}

/**
 * 新しい画像生成履歴を追加
 * @param historyItem 履歴項目
 */
export async function addImageHistoryItem(historyItem: Omit<HistoryItem, 'id' | 'created_at'>): Promise<HistoryItem | null> {
  try {
    // ローカル開発環境ではモックデータを返す（テーブルが存在しない場合の対応）
    if (supabaseUrl.includes('localhost')) {
      console.log('開発環境では履歴データをモックしています');
      return createMockHistoryItem(historyItem);
    }

    // Supabaseの設定が正しく行われているか確認
    if (!supabaseUrl || supabaseUrl === 'https://your-project-url.supabase.co' || 
        !supabaseKey || supabaseKey === 'your-anon-key') {
      console.warn('Supabase credentials not configured properly. Using mock data instead.');
      // 開発環境ではモックデータを返す
      return createMockHistoryItem(historyItem);
    }

    const { data, error } = await supabase
      .from('image_history')
      .insert({
        ...historyItem,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      // テーブルがない場合など特定のエラーコードを処理
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        console.warn('The image_history table does not exist. Please create it using the SQL script provided.');
      } else {
        console.error('Error adding image history item:', error);
      }
      // エラー時にはモックデータを返す
      return createMockHistoryItem(historyItem);
    }

    return data;
  } catch (err) {
    console.error('Unexpected error in addImageHistoryItem:', err);
    // 例外発生時にもモックデータを返す
    return createMockHistoryItem(historyItem);
  }
}

/**
 * モック履歴アイテムを作成（開発・エラー時用）
 */
function createMockHistoryItem(historyItem: Omit<HistoryItem, 'id' | 'created_at'>): HistoryItem {
  return {
    id: `mock-hist-${Date.now()}`,
    ...historyItem,
    created_at: new Date().toISOString()
  };
}

/**
 * 履歴項目のステータスを更新
 * @param id 履歴項目ID
 * @param status 新しいステータス
 */
export async function updateImageHistoryStatus(id: string, status: HistoryItem['status']): Promise<boolean> {
  try {
    // Supabaseの設定が正しく行われているか確認
    if (!supabaseUrl || supabaseUrl === 'https://your-project-url.supabase.co' || 
        !supabaseKey || supabaseKey === 'your-anon-key') {
      console.warn('Supabase credentials not configured properly. Cannot update status in development mode.');
      return true; // 開発環境では成功したとみなす
    }

    const { error } = await supabase
      .from('image_history')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error(`Error updating image history status for item ${id}:`, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error in updateImageHistoryStatus:', err);
    return false;
  }
}

// ユーザーのLoraモデルを取得する関数
export async function getUserLoraModels(userId: string): Promise<LoraModel[]> {
  // 通常はここでユーザーIDに紐づくLoraをSupabaseから取得する
  // 現在はサンプルデータを返す
  return [
    {
      id: 'portrait-asian',
      name: 'アジアンビューティー',
      image_url: '/images/asian-portrait.jpg',
      author: 'ポートレート専門家',
      description: 'アジアの自然な美しさを引き出すスタイルを適用するLora',
      lora_url: 'https://storage.googleapis.com/fal-flux-lora/a82719e8f8d845d4b08d792ec3e054d8_pytorch_lora_weights.safetensors',
      created_at: new Date().toISOString()
    },
    {
      id: 'anime-style',
      name: 'アニメスタイル',
      image_url: '/images/anime.jpg',
      author: 'アニメ作家',
      description: 'アニメ風のスタイルを適用するLora',
      lora_url: 'https://storage.googleapis.com/fal-flux-lora/anime-style-lora.safetensors',
      created_at: new Date().toISOString()
    }
  ];
}

// ローカルSupabaseサーバーのステータスをチェックする関数
export async function checkSupabaseConnection(): Promise<{ isConnected: boolean; error?: string }> {
  try {
    // 簡単なクエリを実行してみる
    const { data, error } = await supabase.from('image_history').select('id').limit(1);
    
    if (error) {
      if (error.code === '42P01' || error.message?.includes('does not exist')) {
        return { 
          isConnected: false, 
          error: 'image_historyテーブルが存在しません。スクリプトを実行してテーブルを作成してください。' 
        };
      } else {
        return { 
          isConnected: false, 
          error: `Supabase接続エラー: ${error.message}` 
        };
      }
    }
    
    return { isConnected: true };
  } catch (err) {
    return { 
      isConnected: false, 
      error: `予期しないエラー: ${err instanceof Error ? err.message : String(err)}` 
    };
  }
} 