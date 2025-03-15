import React from "react"
import './globals.css'
import { Noto_Serif_JP } from 'next/font/google';
import { LanguageProvider } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { Footer } from '../components/Footer';
import clsx from 'clsx';
import { Metadata, Viewport } from 'next';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ApiProvider } from '../contexts/ApiContext';
import { Squares } from '@/components/ui/squares-background';

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export async function generateMetadata(): Promise<Metadata> {
  // Default to Japanese
  const title = `${translations.ja.title} - ${translations.ja.companyName}`;
  
  return {
    title,
    description: translations.ja.meta.description,
    metadataBase: new URL('https://www.myth-ai.one'),
    openGraph: {
      title,
      description: translations.ja.meta.description,
      siteName: translations.ja.meta.siteName,
      locale: translations.ja.meta.locale,
      type: 'website',
      url: '/',
      images: [{
        url: 'https://myth-hp.s3.ap-northeast-1.amazonaws.com/MyTH+(1)_nega.png',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@myth_ai_one',
      creator: '@myth_ai_one',
      images: 'https://myth-hp.s3.ap-northeast-1.amazonaws.com/MyTH+(1)_nega.png',
    },
    icons: {
      icon: [{
        url: 'https://myth-hp.s3.ap-northeast-1.amazonaws.com/MyTH_without_text.png',
        type: 'image/png',
      }],
      apple: [{
        url: 'https://myth-hp.s3.ap-northeast-1.amazonaws.com/MyTH_without_text.png',
        type: 'image/png',
      }],
    },
    alternates: {
      languages: {
        'ja-JP': '/ja',
        'en-US': '/en',
        'fr-FR': '/fr',
        'es-ES': '/es',
        'zh-TW': '/zh-Hant',
        'ko-KR': '/ko',
        'it-IT': '/it',
        'de-DE': '/de',
        'ar-SA': '/ar',
        'he-IL': '/he',
        'hi-IN': '/hi',
        'pt-BR': '/pt',
        'sw-KE': '/sw'
      }
    },
  };
}

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="dark" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        {/* テーマの初期化スクリプト - 改善版 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                  console.log('テーマ初期化完了:', theme || 'システム設定に基づく');
                } catch (e) {
                  console.error('テーマ初期化エラー:', e);
                }
              })();
            `
          }}
        />
      </head>
      <body className={clsx(
        notoSerifJP.className,
        'bg-white dark:bg-[#060606] text-gray-900 dark:text-gray-100 transition-colors duration-200'
      )}>
        <ThemeProvider>
          <LanguageProvider>
            <ApiProvider>
              <div className="min-h-screen flex flex-col relative">
                <div className="absolute inset-0 z-0">
                  <Squares 
                    direction="diagonal"
                    speed={0.3}
                    squareSize={60}
                    borderColor="#353535"
                    gridColor="#252525" 
                    accentColor="#f97316"
                    hoverFillColor="rgba(249, 115, 22, 0.1)"
                    dotSize={1.2}
                    patternDensity={10}
                  />
                </div>
                <div className="flex-grow relative z-10">
                  {children}
                </div>
                <Footer />
              </div>
            </ApiProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
