// Sakura Loraモデルを追加するスクリプト
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase接続情報
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Supabaseクライアントの作成
const supabase = createClient(supabaseUrl, supabaseKey);

// ダミーユーザーID（実際の環境では認証済みユーザーIDを使用）
const userId = 'user-123';

// Sakuraのデータ
const sakuraLora = {
  name: 'JK Sakura',
  description: '女子高生の桜（さくら）Loraモデル。制服を着た可愛い女子高生のキャラクター。',
  image_url: '/images/jk_sakura.jpg', // publicフォルダ内のパス
  lora_url: 'https://v3.fal.media/files/panda/Lim1EF3ScgEG1RfAooimI_pytorch_lora_weights.safetensors',
  author: 'MyTH AI',
  is_public: true,
};

async function main() {
  try {
    console.log('Sakura Loraモデルを追加中...');

    // ユーザーLoraモデルを追加
    const { data: loraData, error: loraError } = await supabase
      .from('user_lora_models')
      .insert([{
        user_id: userId,
        name: sakuraLora.name,
        image_url: sakuraLora.image_url,
        description: sakuraLora.description,
        lora_url: sakuraLora.lora_url,
        is_public: sakuraLora.is_public
      }])
      .select()
      .single();

    if (loraError) {
      console.error('Loraモデルの追加に失敗しました:', loraError);
      return;
    }

    console.log('Loraモデルが正常に追加されました:', loraData);

    // カルーセルモデルに追加
    const { data: carouselData, error: carouselError } = await supabase
      .from('carousel_models')
      .insert([{
        lora_id: loraData.id,
        position: 1, // 目立つ位置に表示
        is_active: true
      }])
      .select()
      .single();

    if (carouselError) {
      console.error('カルーセルへの追加に失敗しました:', carouselError);
      return;
    }

    console.log('カルーセルに正常に追加されました:', carouselData);
    console.log('処理が完了しました');

  } catch (error) {
    console.error('予期せぬエラーが発生しました:', error);
  }
}

main(); 