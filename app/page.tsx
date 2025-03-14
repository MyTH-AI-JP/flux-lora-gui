'use client';

import { ImageGenerator } from '../components/ImageGenerator';
import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { ThemeToggle } from '../components/ThemeToggle';
import { ThreeDPhotoCarousel } from '@/components/ui/3d-carousel';
import { Squares } from '@/components/ui/squares-background';
import Link from 'next/link';

export default function Home() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t('title')} - ${t('companyName')}`;
  }, [t]);

  return (
    <main className="min-h-screen relative bg-[#060606] text-white">
      <div className="absolute inset-0 z-0">
        <Squares 
          direction="diagonal"
          speed={0.3}
          squareSize={60}
          borderColor="#353535"
          gridColor="#252525" 
          accentColor="#6d28d9"
          hoverFillColor="rgba(79, 70, 229, 0.1)"
          dotSize={1.2}
          patternDensity={10}
        />
      </div>
      
      <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
        <nav className="flex justify-between items-center mb-12 backdrop-blur-sm bg-gray-900/50 p-4 rounded-lg shadow-lg border border-gray-800">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            {t('title')}
          </h1>
          <div className="flex items-center gap-3 md:gap-5">
            <Link 
              href="/mypage" 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
            >
              マイページ
            </Link>
            <Link 
              href="/payment" 
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-md text-sm font-medium transition-all duration-200 shadow-md"
            >
              プラン
            </Link>
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </nav>
        
        <div className="mb-16 backdrop-blur-sm bg-gray-900/40 p-6 md:p-8 rounded-xl border border-gray-800 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 inline-flex items-center">
            <span className="bg-indigo-600 w-2 h-8 rounded mr-3"></span>
            人気のLoraをチェック
          </h2>
          <p className="text-gray-300 mb-6 pl-5 border-l-2 border-indigo-600">
            ドラッグでカルーセルを回転させ、お好みのLoraを選択できます。クリックすると詳細が表示されます。
          </p>
          <ThreeDPhotoCarousel />
          <div className="mt-6 flex justify-center">
            <Link 
              href="/payment" 
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z" clipRule="evenodd" />
                </svg>
                プレミアムプランでさらに多くのLoraを利用する
              </span>
            </Link>
          </div>
        </div>
        
        <div className="backdrop-blur-sm bg-gray-900/40 p-6 md:p-8 rounded-xl border border-gray-800 shadow-xl">
          <ImageGenerator />
        </div>
      </div>
    </main>
  );
} 