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
export interface LoraModel {
  id: string;
  name: string;
  image_url: string;
  author: string;
  description: string;
  lora_url: string;
  created_at: string;
  category?: string;
  tags?: string[];
  is_public?: boolean;
}

// 履歴アイテムの型定義
export interface HistoryItem {
  id: string;
  user_id: string;
  prompt: string;
  result_url: string;
  created_at: string;
  status: 'completed' | 'failed' | 'processing';
  negative_prompt?: string;
  lora_id?: string;
  lora_scale?: number;
  settings?: Record<string, any>;
}

// カルーセルモデルの型定義
export interface CarouselModel {
  id: string;
  lora_id: string;
  position: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  lora_model?: LoraModel; // 結合クエリ用
}

/**
 * Supabaseからすべてのloraモデルを取得
 */
export async function getLoraModels(): Promise<LoraModel[]> {
  // ローカル開発環境ではSupabaseへの接続を試みる
  try {
    const { data, error } = await supabase
      .from('lora_models')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Failed to fetch Lora models from Supabase:', error);
      return getLoraModelsMock();
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching Lora models:', err);
    return getLoraModelsMock();
  }
}

/**
 * モックLoraモデルデータを返す
 */
function getLoraModelsMock(): LoraModel[] {
  return [
    {
      id: 'portrait-asian',
      name: 'アジアンビューティー',
      image_url: '/images/asian-portrait.jpg',
      author: 'ポートレート専門家',
      description: 'アジアの自然な美しさを引き出すスタイルを適用するLora',
      lora_url: 'https://storage.googleapis.com/fal-flux-lora/a82719e8f8d845d4b08d792ec3e054d8_pytorch_lora_weights.safetensors',
      created_at: new Date().toISOString(),
      category: 'Portrait',
      tags: ['asian', 'portrait', 'beauty'],
      is_public: true
    },
    {
      id: 'asian-beauty',
      name: '自然な美しさ',
      image_url: '/images/asian-beauty.jpg',
      author: 'ポートレートアーティスト',
      description: '自然な雰囲気と美しさを引き出すポートレートスタイル',
      lora_url: 'https://v3.fal.media/files/koala/nTFVc1MiTbCieg6-FibkM_pytorch_lora_weights.safetensors',
      created_at: new Date().toISOString(),
      category: 'Portrait',
      tags: ['asian', 'beauty'],
      is_public: true
    },
    {
      id: 'sakura-style',
      name: '桜スタイル',
      image_url: '/images/sakura.jpg',
      author: '日本風景アーティスト',
      description: '美しい桜の風景や和風のテイストを強調するLoraモデル',
      lora_url: 'https://v3.fal.media/files/zebra/jCKae-M1MGClNffKuxVJl_pytorch_lora_weights.safetensors',
      created_at: new Date().toISOString(),
      category: 'Landscape',
      tags: ['sakura', 'landscape'],
      is_public: true
    },
    {
      id: 'anime-style',
      name: 'アニメスタイル',
      image_url: '/images/anime.jpg',
      author: 'アニメ作家',
      description: 'アニメ風のスタイルを適用するLora',
      lora_url: 'https://storage.googleapis.com/fal-flux-lora/anime-style-lora.safetensors',
      created_at: new Date().toISOString(),
      category: 'Anime',
      tags: ['anime', 'style'],
      is_public: true
    },
    {
      id: 'watercolor',
      name: '水彩画風',
      image_url: '/images/watercolor.jpg',
      author: '水彩アーティスト',
      description: '水彩画風のスタイルを適用するLora',
      lora_url: 'https://storage.googleapis.com/fal-flux-lora/watercolor-style-lora.safetensors',
      created_at: new Date().toISOString(),
      category: 'Art',
      tags: ['watercolor', 'art'],
      is_public: true
    },
    {
      id: 'monochrome',
      name: 'モノクロ',
      image_url: '/images/monochrome.jpg',
      author: 'モノクロアーティスト',
      description: 'モノクロスタイルを適用するLora',
      lora_url: 'https://storage.googleapis.com/fal-flux-lora/monochrome-style-lora.safetensors',
      created_at: new Date().toISOString(),
      category: 'Art',
      tags: ['monochrome', 'art'],
      is_public: true
    }
  ];
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
 * 画像生成履歴を追加
 * @param historyItem 履歴アイテム
 */
export async function addImageHistoryItem(historyItem: Omit<HistoryItem, 'id' | 'created_at'>): Promise<HistoryItem | null> {
  try {
    const { data, error } = await supabase
      .from('image_history')
      .insert([historyItem])
      .select()
      .single();

    if (error) {
      console.error('Error adding image history item:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error in addImageHistoryItem:', err);
    return null;
  }
}

/**
 * ユーザーのLoraモデルを取得する関数
 * @param userId ユーザーID
 */
export async function getUserLoraModels(userId: string): Promise<LoraModel[]> {
  try {
    const { data, error } = await supabase
      .from('user_lora_models')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user Lora models:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error in getUserLoraModels:', err);
    return [];
  }
}

/**
 * カルーセル用のLoraモデルを取得
 */
export async function getCarouselModels(): Promise<CarouselModel[]> {
  try {
    const { data, error } = await supabase
      .from('carousel_models')
      .select(`
        *,
        lora_model:lora_id (*)
      `)
      .order('position', { ascending: true })
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching carousel models:', error);
      return getCarouselModelsMock();
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error in getCarouselModels:', err);
    return getCarouselModelsMock();
  }
}

/**
 * モックカルーセルデータを返す
 */
function getCarouselModelsMock(): CarouselModel[] {
  return [
    {
      id: '1',
      lora_id: 'portrait-asian',
      position: 1,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      lora_id: 'asian-beauty',
      position: 2,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      lora_id: 'sakura-style',
      position: 3,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      lora_id: 'anime-style',
      position: 4,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      lora_id: 'watercolor',
      position: 5,
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      lora_id: 'monochrome',
      position: 6,
      is_active: true,
      created_at: new Date().toISOString()
    }
  ];
}

/**
 * カルーセルにLoraモデルを追加
 * @param loraId Loraモデルのid
 * @param position 表示位置 (未指定の場合は最後に追加)
 */
export async function addLoraModelToCarousel(loraId: string, position?: number): Promise<CarouselModel | null> {
  try {
    // 位置が指定されていない場合は現在の最大位置+1を使用
    if (!position) {
      const { data } = await supabase
        .from('carousel_models')
        .select('position')
        .order('position', { ascending: false })
        .limit(1);
      
      position = data && data.length > 0 ? data[0].position + 1 : 1;
    }

    const { data, error } = await supabase
      .from('carousel_models')
      .insert([{ lora_id: loraId, position, is_active: true }])
      .select()
      .single();

    if (error) {
      console.error('Error adding Lora model to carousel:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Unexpected error in addLoraModelToCarousel:', err);
    return null;
  }
}

/**
 * カルーセルからLoraモデルを削除
 * @param carouselId カルーセルモデルのid
 */
export async function removeLoraModelFromCarousel(carouselId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('carousel_models')
      .delete()
      .eq('id', carouselId);

    if (error) {
      console.error('Error removing Lora model from carousel:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error in removeLoraModelFromCarousel:', err);
    return false;
  }
}

/**
 * カルーセル内のLoraモデルの順序を更新
 * @param carouselId カルーセルモデルのid
 * @param newPosition 新しい表示位置
 */
export async function updateCarouselModelPosition(carouselId: string, newPosition: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('carousel_models')
      .update({ position: newPosition })
      .eq('id', carouselId);

    if (error) {
      console.error('Error updating carousel model position:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Unexpected error in updateCarouselModelPosition:', err);
    return false;
  }
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