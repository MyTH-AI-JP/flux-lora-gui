'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, Language } from '../translations';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className="px-2 py-1 rounded border border-gray-300 dark:border-dark-border text-sm
        bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text
        hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors"
      dir={language === 'ar' || language === 'he' ? 'rtl' : 'ltr'}
    >
      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
} 