# FLUX.1 Image Generator GUI

A minimal and alternative GUI for [fal.ai/flux-lora](https://fal.ai/models/flux-lora) image generation model, with censorship disabled. This project provides a clean interface for generating images using the Flux model with LoRA support.

<div align="center">
  <a href="https://flux-uncensored.myth-ai.one/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Try%20It%20Now-FLUX.1%20Image%20Generator-blue?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAydjIwbTAtMTBsLTYgNm02LTZsNiA2Ii8+PC9zdmc+" alt="Try FLUX.1 Image Generator" />
  </a>
</div>

## Preview - Yes, it's uncensored
![image](https://github.com/user-attachments/assets/947b7f56-c706-42a9-9d01-0982fb5ecd3e)

## Features

- 🎨 Clean, intuitive interface for image generation
- 🔧 Multilingual support (13 languages):
  - 日本語 (Japanese) - Default
  - English
  - Français (French)
  - Español (Spanish)
  - 繁體中文 (Traditional Chinese)
  - 한국어 (Korean)
  - Italiano (Italian)
  - Deutsch (German)
  - العربية (Arabic)
  - עברית (Hebrew)
  - हिन्दी (Hindi)
  - Português (Portuguese)
  - Kiswahili (Swahili)
- 🔧 Full control over generation parameters
- 📦 Support for custom LoRA models
- 🖼️ Generate multiple images at once (1-4 images)
- 💾 Easy image download with timestamp
- 🔍 Click-to-enlarge image viewer
- 🎛️ Advanced parameter controls:
  - Image size selection
  - Inference steps
  - Guidance scale
  - LoRA scale adjustment
- 👤 User settings management:
  - Personal My Page for user preferences
  - API key management system
  - Save and reuse API keys securely
- 🌠 Interactive 3D Carousel:
  - Visual LoRA selection
  - Previews of different style options
  - Smooth animations and interactions
- 🔄 Centralized state management:
  - API Context for global settings
  - LoRA preference persistence
  - Dark/light mode toggle
- 📊 ユーザー画像生成履歴:
  - 生成した画像の履歴をマイページで表示
  - プロンプトやステータスの記録
  - ローカル開発でもモックデータでテスト可能
- 🧰 堅牢なエラーハンドリング:
  - Supabase接続エラーの適切な処理
  - 開発環境とプロダクション環境の区別
  - テーブル不存在時の自動フォールバック機能
- 🔧 フレキシブルなローカル開発環境:
  - ローカルSupabaseとの連携
  - 本番環境と同等の開発体験
  - テーブル作成スクリプトによる簡単セットアップ

## Prerequisites

- Node.js 18+ 
- npm or yarn
- [fal.ai](https://fal.ai) account and API key
- Supabase (for local development, optional)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/flux-gui.git
cd flux-gui
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
# For production
NEXT_PUBLIC_FAL_KEY=your_fal_ai_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# For local development
# NEXT_PUBLIC_SUPABASE_URL="http://localhost:54321"
# NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Local Supabase Setup (Optional)

If you want to test the full functionality with user history:

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Start local Supabase:
```bash
npx supabase start
```

3. Create necessary tables:
```bash
npx supabase db execute -f scripts/create_image_history_table.sql
```

## Deployment

You can deploy this application to any platform that supports Next.js. Here's how to deploy to Vercel:

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Add your environment variables
5. Deploy!

## Usage

1. Set up your API key on the My Page
2. Browse and select a LoRA model from the 3D carousel
3. Input your desired prompt
4. Select image size and adjust parameters
5. Adjust LoRA scale if needed
6. Choose number of images to generate
7. Click "Generate" and wait for results
8. Click images to view larger
9. Use the download button to save images
10. Check your image generation history on the My Page

## Troubleshooting

### Local Development Issues
- If you see errors about image history, ensure your local Supabase instance is running
- Run the database scripts to create the required tables
- The application will fall back to mock data if tables don't exist

### API Connection Issues
- Verify your API keys in the .env.local file
- Check your network connection
- The application includes extensive error handling to prevent crashes

## Tech Stack

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- fal.ai API
- Supabase (for storage and user data)
- Three.js (for 3D carousel)

## License

MIT License - see [LICENSE](LICENSE) file for details

## Disclaimer

This is an unofficial GUI and is not affiliated with fal.ai. Use responsibly and in accordance with fal.ai's terms of service.
