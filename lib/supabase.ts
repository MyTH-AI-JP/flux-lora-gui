import { createClient } from '@supabase/supabase-js';

// 環境変数からURLとキーを取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

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