'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Squares } from '@/components/ui/squares-background';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: 'monthly' | 'yearly';
  features: string[];
  highlight?: boolean;
}

export default function PaymentPage() {
  const { t } = useLanguage();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  // 支払いプランの定義
  const pricingPlans: PricingPlan[] = [
    {
      id: 'free',
      name: 'フリープラン',
      price: 0,
      currency: 'JPY',
      period: 'monthly',
      features: [
        '月10クレジット',
        '512x512の解像度',
        '標準モデルのみ',
        '公開Loraの使用',
      ],
    },
    {
      id: billingPeriod === 'monthly' ? 'basic-monthly' : 'basic-yearly',
      name: 'ベーシック',
      price: billingPeriod === 'monthly' ? 980 : 9800,
      currency: 'JPY',
      period: billingPeriod,
      features: [
        '月100クレジット',
        '1024x1024の解像度',
        '標準モデル + 高度なモデル',
        '公開Loraの使用',
        '高度な設定',
      ],
      highlight: true
    },
    {
      id: billingPeriod === 'monthly' ? 'pro-monthly' : 'pro-yearly',
      name: 'プロフェッショナル',
      price: billingPeriod === 'monthly' ? 2980 : 29800,
      currency: 'JPY',
      period: billingPeriod,
      features: [
        '月1000クレジット',
        '2048x2048の解像度',
        'すべてのモデル',
        'Loraの作成と保存',
        '優先生成キュー',
        '商用利用可能',
      ],
    }
  ];

  const handleSubscription = (planId: string) => {
    // Stripeの支払い処理に接続する予定
    console.log(`プラン ${planId} を選択しました`);
    alert(`${planId} プランを選択しました。実際のStripe決済機能は実装予定です。`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <Squares 
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="#333" 
          hoverFillColor="#222"
        />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">プラン選択</h1>
        <p className="text-gray-300 text-center mb-8">あなたのニーズに最適なプランをお選びください</p>
        
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 p-1 rounded-lg inline-flex">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === 'monthly' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              月払い
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                billingPeriod === 'yearly' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setBillingPeriod('yearly')}
            >
              年払い <span className="text-xs text-green-400">（16%お得）</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform transition-all duration-200 ${
                plan.highlight ? 'border-2 border-blue-500 scale-105 md:-mt-2' : ''
              }`}
            >
              <div className={`p-6 ${plan.highlight ? 'bg-blue-600' : 'bg-gray-800'}`}>
                <h2 className="text-xl font-bold text-white">{plan.name}</h2>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white">{formatPrice(plan.price)}</span>
                  <span className="ml-2 text-gray-300">/{plan.period === 'monthly' ? '月' : '年'}</span>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="ml-2 text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <button
                    onClick={() => handleSubscription(plan.id)}
                    className={`w-full py-3 px-4 rounded-md font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      plan.price === 0
                        ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500'
                        : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                    }`}
                  >
                    {plan.price === 0 ? '現在のプラン' : '選択する'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">よくある質問</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-white font-medium">クレジットとは何ですか？</h3>
              <p className="text-gray-300 mt-1">クレジットは画像生成に使用される単位です。1回の生成につき1クレジットが消費されます。</p>
            </div>
            <div>
              <h3 className="text-white font-medium">いつでもプランを変更できますか？</h3>
              <p className="text-gray-300 mt-1">はい、いつでもプランのアップグレードまたはダウングレードが可能です。変更はすぐに反映されます。</p>
            </div>
            <div>
              <h3 className="text-white font-medium">支払い方法はどのようなものがありますか？</h3>
              <p className="text-gray-300 mt-1">クレジットカード（Visa, Mastercard, AMEX, JCB）、PayPay、銀行振込に対応しています。</p>
            </div>
            <div>
              <h3 className="text-white font-medium">解約はいつでもできますか？</h3>
              <p className="text-gray-300 mt-1">はい、いつでも解約可能です。解約後も契約期間の終了まではサービスをご利用いただけます。</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 