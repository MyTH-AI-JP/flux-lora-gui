'use client';

import { ImageGenerator } from '../components/ImageGenerator';
import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from '../components/LanguageSelector';

export default function Home() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t('title')} - ${t('companyName')}`;
  }, [t]);

  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-center">
          {t('title')}
        </h1>
        <LanguageSelector />
      </div>
      <ImageGenerator />
    </main>
  );
} 