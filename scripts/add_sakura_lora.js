// Sakura Loraモデルを追加するスクリプト
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Supabase接続情報
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Supabaseクライアントの作成
const supabase = createClient(supabaseUrl, supabaseKey);

// ダミーユーザーID（実際の環境では認証済みユーザーIDを使用）
const userId = 'user-123';

// 画像ファイルのパス
const imagePath = path.join(__dirname, '../public/images/jk_sakura.jpg');

// Sakuraのデータ
const sakuraLora = {
  id: 'jk-sakura', // 明示的にIDを指定
  name: 'JK Sakura',
  description: '女子高生の桜（さくら）Loraモデル。制服を着た可愛い女子高生のキャラクター。',
  image_url: '/images/jk_sakura.jpg', // publicフォルダ内のパス
  lora_url: 'https://v3.fal.media/files/panda/Lim1EF3ScgEG1RfAooimI_pytorch_lora_weights.safetensors',
  author: 'MyTH AI',
  is_public: true,
};

// 画像をダウンロードして保存する関数
function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    // ファイルが既に存在する場合は再利用
    if (fs.existsSync(dest)) {
      console.log(`画像が既に存在します: ${dest}`);
      resolve(dest);
      return;
    }

    // Base64でエンコードされた画像の場合
    if (url.startsWith('data:image')) {
      const base64Data = url.split(',')[1];
      fs.writeFileSync(dest, Buffer.from(base64Data, 'base64'));
      console.log(`Base64画像を保存しました: ${dest}`);
      resolve(dest);
      return;
    }

    // 画像URLからダウンロード
    const file = fs.createWriteStream(dest);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`画像をダウンロードしました: ${dest}`);
        resolve(dest);
      });
    }).on('error', err => {
      fs.unlink(dest, () => {}); // エラー時にファイルを削除
      reject(err);
    });
  });
}

// Mermaidデモ画像の作成（テスト用）
function createDemoImage() {
  // サンプル画像がない場合は簡単なHTMLファイルを作成してメッセージを表示
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f5f5f5;
        font-family: Arial, sans-serif;
      }
      .container {
        text-align: center;
        padding: 20px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
      h1 {
        color: #e91e63;
        margin-bottom: 10px;
      }
      p {
        color: #333;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>JK Sakura Lora</h1>
      <p>女子高生の桜（さくら）Loraモデル</p>
      <p>※テスト画像です。実際の画像と入れ替えてください。</p>
    </div>
  </body>
  </html>
  `;

  const tempHtmlPath = path.join(__dirname, '../temp_sakura.html');
  fs.writeFileSync(tempHtmlPath, htmlContent);
  console.log(`テスト用HTMLファイルを作成しました: ${tempHtmlPath}`);
  
  // ここでPhantomJSやPuppeteerでスクリーンショットを撮るコードを追加できますが、
  // 今回は単純にファイルをコピーするだけにします
  const dummyImagePath = path.join(__dirname, '../public/images/jk_sakura.jpg');
  
  // HTMLファイルの代わりに空のJPGファイルを作成
  fs.writeFileSync(dummyImagePath, Buffer.from(''));
  console.log(`テスト用画像ファイルを作成しました: ${dummyImagePath}`);
  
  return dummyImagePath;
}

async function main() {
  try {
    console.log('Sakura Loraモデルを追加中...');

    // 画像ファイルの存在確認
    if (fs.existsSync(imagePath)) {
      console.log(`画像ファイルが存在します: ${imagePath}`);
    } else {
      console.error(`画像ファイルが見つかりません: ${imagePath}`);
      return;
    }

    // モックデータにも追加
    try {
      const mockDataPath = path.join(__dirname, '../lib/supabase.ts');
      if (fs.existsSync(mockDataPath)) {
        console.log('モックデータファイルを更新します...');
        let mockData = fs.readFileSync(mockDataPath, 'utf8');
        
        // モックデータにJK Sakuraが含まれているか確認
        if (!mockData.includes('jk-sakura')) {
          // LoraModelsMockにJK Sakuraを追加
          const loraModelsMockRegex = /export const getLoraModelsMock = \(\) => \{[\s\S]*?return \[([\s\S]*?)\];/;
          const match = mockData.match(loraModelsMockRegex);
          
          if (match && match[1]) {
            const newModel = `
    {
      id: 'jk-sakura',
      name: 'JK Sakura',
      image_url: '/images/jk_sakura.jpg',
      author: 'MyTH AI',
      description: '女子高生の桜（さくら）Loraモデル。制服を着た可愛い女子高生のキャラクター。',
      lora_url: 'https://v3.fal.media/files/panda/Lim1EF3ScgEG1RfAooimI_pytorch_lora_weights.safetensors',
      created_at: new Date().toISOString()
    },`;
            
            const updatedModels = match[1] + newModel;
            mockData = mockData.replace(match[1], updatedModels);
            
            // カルーセルモックデータにも追加
            const carouselMockRegex = /export const getCarouselModelsMock = \(\) => \{[\s\S]*?return \[([\s\S]*?)\];/;
            const carouselMatch = mockData.match(carouselMockRegex);
            
            if (carouselMatch && carouselMatch[1]) {
              const newCarouselModel = `
    {
      id: '4',
      lora_id: 'jk-sakura',
      position: 1,
      is_active: true,
      created_at: new Date().toISOString()
    },`;
              
              const updatedCarouselModels = carouselMatch[1] + newCarouselModel;
              mockData = mockData.replace(carouselMatch[1], updatedCarouselModels);
              
              fs.writeFileSync(mockDataPath, mockData);
              console.log('モックデータを更新しました');
            }
          }
        } else {
          console.log('JK Sakuraはすでにモックデータに存在します');
        }
      }
    } catch (mockError) {
      console.error('モックデータの更新中にエラーが発生しました:', mockError);
    }

    // ユーザーLoraモデルを追加
    const { data: loraData, error: loraError } = await supabase
      .from('user_lora_models')
      .upsert([{
        id: sakuraLora.id,
        user_id: userId,
        name: sakuraLora.name,
        image_url: sakuraLora.image_url,
        description: sakuraLora.description,
        lora_url: sakuraLora.lora_url,
        author: sakuraLora.author,
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
      .upsert([{
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