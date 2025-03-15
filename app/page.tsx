'use client';

import { ImageGenerator } from '../components/ImageGenerator';
import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';
import { ThemeToggle } from '../components/ThemeToggle';
import { ThreeDPhotoCarousel } from '@/components/ui/3d-carousel';
import { Squares } from '@/components/ui/squares-background';
import Link from 'next/link';
import { User, CreditCard } from 'lucide-react';

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
          accentColor="#f97316"
          hoverFillColor="rgba(249, 115, 22, 0.1)"
          dotSize={1.2}
          patternDensity={10}
        />
      </div>
      
      <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
        <nav className="flex justify-between items-center mb-12 backdrop-blur-sm bg-gray-900/50 dark:bg-gray-900/50 bg-white/50 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
            {t('title')}
          </h1>
          <div className="flex items-center gap-3 md:gap-5">
            <Link 
              href="/mypage" 
              className="flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
            >
              <User className="w-4 h-4 mr-2" />
              マイページ
            </Link>
            <Link 
              href="/payment" 
              className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-md text-sm font-medium transition-all duration-200 shadow-md"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              プラン
            </Link>
            <div className="flex items-center justify-center p-1 rounded-lg" id="theme-toggle-wrapper">
              <ThemeToggle />
            </div>
            <LanguageSelector />
          </div>
        </nav>

        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            選択可能なLoraモデル
          </h2>
          <div className="h-[500px]">
            <ThreeDPhotoCarousel />
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            {t('heading')}
          </h2>
          <ImageGenerator />
        </div>
      </div>
    </main>
  );
} 