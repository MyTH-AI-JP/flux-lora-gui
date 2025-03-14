'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Zap } from 'lucide-react';

export default function ProposalPage() {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">プロポーザル</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">AIイメージ生成サービス</h2>
          <p className="mb-4">高品質なAIイメージ生成サービスを提供します。最新のLoraモデルを使用して、あなたのアイデアを視覚化しましょう。</p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>高解像度イメージ生成</li>
            <li>カスタムLoraモデル対応</li>
            <li>リアルタイム処理</li>
            <li>ビジネス用途のライセンスオプション</li>
          </ul>
          <ButtonColorful 
            icon={<Zap className="w-4 h-4" />}
            label="詳細を見る" 
            variant="violet"
            onClick={() => console.log("詳細ページへ")} 
          />
        </div>
        
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">企業向けAIソリューション</h2>
          <p className="mb-4">あなたのビジネスニーズに合わせたカスタムAIソリューションを提供します。デモを予約して可能性を発見しましょう。</p>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>業界別カスタマイズ</li>
            <li>API統合オプション</li>
            <li>スケーラブルなソリューション</li>
            <li>専門チームによるサポート</li>
          </ul>
          <ButtonColorful 
            icon={<Zap className="w-4 h-4" />}
            label="デモを予約" 
            variant="emerald"
            onClick={() => console.log("デモ予約")} 
          />
        </div>
      </div>
    </div>
  );
} 