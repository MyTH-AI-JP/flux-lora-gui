'use client';

import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DatasetJobsPage() {
  const { t } = useLanguage();
  
  // useEffectでタイトルを設定
  useEffect(() => {
    document.title = 'Dataset Jobs';
  }, []);
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">データセットジョブ管理</h1>
      
      <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">データセットジョブ</h2>
        <p className="text-gray-300 mb-6">データセット処理ジョブの状態を確認できます。</p>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">ジョブが見つかりません</h3>
                <p className="text-gray-400 text-sm">データセットジョブはまだ作成されていません</p>
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