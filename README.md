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

## Prerequisites

- Node.js 18+ 
- npm or yarn
- [fal.ai](https://fal.ai) account and API key

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
NEXT_PUBLIC_FAL_KEY=your_fal_ai_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

You can deploy this application to any platform that supports Next.js. Here's how to deploy to Vercel:

1. Push your code to a GitHub repository
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Add your environment variables
5. Deploy!

## Usage

1. Enter your fal.ai API key
2. Input your desired prompt
3. Select image size and adjust parameters
4. Add your LoRA URL and adjust scale
5. Choose number of images to generate
6. Click "Generate" and wait for results
7. Click images to view larger
8. Use the download button to save images

## Tech Stack

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- fal.ai API

## License

MIT License - see [LICENSE](LICENSE) file for details

## Disclaimer

This is an unofficial GUI and is not affiliated with fal.ai. Use responsibly and in accordance with fal.ai's terms of service.
