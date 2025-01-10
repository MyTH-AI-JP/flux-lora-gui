'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-8 py-4 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <div>
          <a 
            href="https://www.myth-ai.one" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            {t('footer.copyright')}
          </a>
        </div>
        <div className="mt-2 sm:mt-0">
          <a 
            href="https://www.myth-ai.one/privacy_policy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            {t('footer.privacyPolicy')}
          </a>
        </div>
      </div>
    </footer>
  );
} 