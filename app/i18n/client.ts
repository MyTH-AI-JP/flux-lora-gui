'use client';

import { useLanguage } from '@/contexts/LanguageContext';

// アプリケーションで既にLanguageContextとLanguageProviderが実装されているため、
// それらを再利用します。このファイルではuseTranslationフックを提供します。
export const useTranslation = () => {
  return useLanguage();
}; 