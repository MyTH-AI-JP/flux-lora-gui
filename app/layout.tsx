import React from "react"
import './globals.css'
import { Noto_Serif_JP } from 'next/font/google';
import { LanguageProvider } from '../contexts/LanguageContext';
import { translations } from '../translations';

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export async function generateMetadata() {
  // Default to Japanese
  const title = `${translations.ja.title} - ${translations.ja.companyName}`;
  
  return {
    title,
    description: 'Alternative GUI for fal.ai/flux-lora',
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <title>{`${translations.ja.title} - ${translations.ja.companyName}`}</title>
      </head>
      <body className={notoSerifJP.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
