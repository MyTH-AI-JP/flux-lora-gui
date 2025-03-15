'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでのレンダリングを確認
  useEffect(() => {
    setMounted(true);
    
    // ローカルストレージから保存されたテーマを取得
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    } else {
      // システム設定からテーマを取得
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // テーマが変更されたときにDOMとローカルストレージを更新
  useEffect(() => {
    if (!mounted) return;
    
    // HTML要素にクラスを設定
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    
    // ローカルストレージに保存
    localStorage.setItem('theme', theme);
    
    // デバッグ情報
    console.log(`テーマを変更しました: ${theme}`);
    console.log(`darkクラスは${document.documentElement.classList.contains('dark') ? '存在します' : '存在しません'}`);
  }, [theme, mounted]);

  // テーマの切り替え関数
  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    console.log('テーマ切り替えボタンがクリックされました');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 