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
    
    try {
      // ローカルストレージから保存されたテーマを取得
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
        console.log(`ローカルストレージからテーマを読み込みました: ${savedTheme}`);
      } else {
        // システム設定からテーマを取得
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? 'dark' : 'light';
        setTheme(systemTheme);
        console.log(`システム設定からテーマを取得しました: ${systemTheme}`);
      }
    } catch (error) {
      console.error('テーマの初期化中にエラーが発生しました:', error);
      // エラー時はデフォルトのダークテーマを使用
      setTheme('dark');
    }
  }, []);

  // テーマが変更されたときにDOMとローカルストレージを更新
  useEffect(() => {
    if (!mounted) return;
    
    try {
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
    } catch (error) {
      console.error('テーマの適用中にエラーが発生しました:', error);
    }
  }, [theme, mounted]);

  // テーマの切り替え関数
  const toggleTheme = () => {
    if (!mounted) return;
    
    try {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      console.log(`テーマを切り替えます: ${theme} -> ${newTheme}`);
      
      // 即時にDOMを更新（状態更新を待たない）
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      
      // ローカルストレージに即時保存
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('テーマの切り替え中にエラーが発生しました:', error);
    }
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