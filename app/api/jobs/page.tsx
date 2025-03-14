'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Metadata, Viewport } from 'next';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'API Jobs',
  };
};

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

export default function APIJobsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">APIジョブ管理</h1>
      
      <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">ジョブリスト</h2>
        <p className="text-gray-300 mb-6">現在進行中または完了したAPIジョブの一覧です。</p>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">ジョブが見つかりません</h3>
                <p className="text-gray-400 text-sm">ジョブはまだ作成されていません</p>
              </div>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                準備完了
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 