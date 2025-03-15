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
      name: t('freePlan'),
      price: 0,
      currency: 'JPY',
      period: 'monthly',
      features: [
        t('features.freeCredits'),
        t('features.lowResolution'),
        t('features.standardModels'),
        t('features.publicLoras'),
      ],
    },
    {
      id: billingPeriod === 'monthly' ? 'basic-monthly' : 'basic-yearly',
      name: t('basicPlan'),
      price: billingPeriod === 'monthly' ? 980 : 9800,
      currency: 'JPY',
      period: billingPeriod,
      features: [
        t('features.basicCredits'),
        t('features.mediumResolution'),
        t('features.advancedModels'),
        t('features.publicLoras'),
        t('features.advancedSettings'),
      ],
      highlight: true
    },
    {
      id: billingPeriod === 'monthly' ? 'pro-monthly' : 'pro-yearly',
      name: t('proPlan'),
      price: billingPeriod === 'monthly' ? 2980 : 29800,
      currency: 'JPY',
      period: billingPeriod,
      features: [
        t('features.proCredits'),
        t('features.highResolution'),
        t('features.allModels'),
        t('features.createLoras'),
        t('features.priorityQueue'),
        t('features.commercialUse'),
      ],
    }
  ];

  const handleSubscription = (planId: string) => {
    // Stripeの支払い処理に接続する予定
    console.log(`プラン ${planId} を選択しました`);
    alert(`${planId} ${t('planSelected')}`);
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
        <h1 className="text-3xl font-bold text-white mb-4 text-center">{t('choosePlan')}</h1>
        <p className="text-gray-300 text-center mb-8">{t('chooseBestPlan')}</p>
        
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md font-medium ${
                billingPeriod === 'monthly'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('monthly')}
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-md font-medium ${
                billingPeriod === 'yearly'
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t('yearly')}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden transition-transform duration-300 transform hover:scale-105 ${
                plan.highlight ? 'border border-orange-500 shadow-lg shadow-orange-500/10' : 'border border-gray-700'
              }`}
            >
              <div className={`p-6 ${plan.highlight ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10' : ''}`}>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-white">{formatPrice(plan.price)}</span>
                  <span className="text-gray-400 ml-1">
                    / {billingPeriod === 'monthly' ? t('month') : t('year')}
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscription(plan.id)}
                  className={`w-full py-2 rounded-md font-medium transition-colors ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {t('selectThisPlan')}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">{t('faqs')}</h2>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">{t('changePlanQuestion')}</h3>
            <p className="text-gray-300 mb-4">{t('changePlanAnswer')}</p>
          </div>
        </div>
      </div>
    </main>
  );
} 