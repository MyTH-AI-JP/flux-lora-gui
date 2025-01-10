import React from "react"
import './globals.css'
import { Noto_Serif_JP } from 'next/font/google';
import { LanguageProvider } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { Footer } from '../components/Footer';
import clsx from 'clsx';
import { Metadata } from 'next';

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
    viewport: {
      width: 'device-width',
      initialScale: 1,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={clsx(notoSerifJP.className)} suppressHydrationWarning>
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
