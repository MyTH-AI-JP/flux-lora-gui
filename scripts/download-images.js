const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// 画像をダウンロードする関数
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // URLからプロトコルを決定
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      // リダイレクトの処理
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        console.log(`リダイレクト: ${url} -> ${redirectUrl}`);
        return downloadImage(redirectUrl, filepath)
          .then(resolve)
          .catch(reject);
      }
      
      // エラーステータスの処理
      if (response.statusCode !== 200) {
        reject(new Error(`ダウンロード失敗: ${response.statusCode} ${response.statusMessage}`));
        return;
      }

      // 書き込みストリームの作成
      const fileStream = fs.createWriteStream(filepath);
      
      // データの書き込み
      response.pipe(fileStream);
      
      // 完了とエラーのハンドリング
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`ダウンロード完了: ${filepath}`);
        resolve(filepath);
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {});  // 失敗したファイルを削除
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// ディレクトリが存在するか確認し、なければ作成
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`ディレクトリを作成しました: ${imagesDir}`);
}

// ダウンロードする画像のリスト
const imagesToDownload = [
  {
    url: 'https://plus.unsplash.com/premium_photo-1669324357471-e33e71e3f3d8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3',
    filename: 'portrait.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1580826233653-3cbd2634e03c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3',
    filename: 'asian-portrait.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3',
    filename: 'anime.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1550531996-ff3dcede9477?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3',
    filename: 'watercolor.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3',
    filename: 'monochrome.jpg'
  }
];

// 画像をダウンロード
async function downloadAllImages() {
  console.log('画像のダウンロードを開始します...');
  
  for (const image of imagesToDownload) {
    const filepath = path.join(imagesDir, image.filename);
    
    try {
      await downloadImage(image.url, filepath);
    } catch (error) {
      console.error(`${image.filename}のダウンロード中にエラーが発生しました:`, error.message);
    }
  }
  
  console.log('すべての画像のダウンロードが完了しました！');
}

// スクリプトの実行
downloadAllImages().catch(err => {
  console.error('画像ダウンロード中にエラーが発生しました:', err);
  process.exit(1);
}); 