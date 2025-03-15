'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // マウント状態を設定
  useEffect(() => {
    setMounted(true);
    console.log('ThemeToggleコンポーネントがマウントされました');
  }, []);

  // マウントされていない場合は空のボタンを表示
  if (!mounted) {
    return (
      <button 
        disabled
        className="p-2 rounded-lg bg-gray-700/20"
        aria-label={t('themeToggle')}
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  console.log('現在のテーマ:', theme);

  // クリックイベントを強化
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('テーマ切り替えボタンがクリックされました');
    
    // テーマを切り替え
    toggleTheme();
    
    // DOMを直接操作して確実にテーマを切り替える
    const newTheme = theme === 'light' ? 'dark' : 'light';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    
    // ローカルストレージに保存
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label={t('themeToggle')}
    >
      {theme === 'light' ? (
        // 月アイコン（ダークモードへ切り替え）
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        // 太陽アイコン（ライトモードへ切り替え）
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
} 