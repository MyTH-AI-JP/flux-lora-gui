'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useApi } from '@/contexts/ApiContext';

export type ImageSizeType = 'square_hd' | 'square' | 'portrait_4_3' | 'portrait_16_9' | 'landscape_4_3' | 'landscape_16_9';

interface GeneratorFormProps {
  onSubmit: (
    prompt: string,
    imageSize: ImageSizeType,
    numSteps: number,
    guidanceScale: number,
    loraUrl: string,
    loraScale: number,
    numImages: number,
    apiKey: string
  ) => Promise<void>;
  isLoading: boolean;
}

export function GeneratorForm({ onSubmit, isLoading }: GeneratorFormProps) {
  const { t } = useLanguage();
  const { apiKey, selectedLoraUrl } = useApi();
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState<ImageSizeType>('landscape_4_3');
  const [numSteps, setNumSteps] = useState(28);
  const [guidanceScale, setGuidanceScale] = useState(3.5);
  const [loraUrl, setLoraUrl] = useState('https://storage.googleapis.com/fal-flux-lora/a82719e8f8d845d4b08d792ec3e054d8_pytorch_lora_weights.safetensors');
  const [loraScale, setLoraScale] = useState(1.3);
  const [numImages, setNumImages] = useState(1);

  // LoraのURLを取得
  useEffect(() => {
    if (selectedLoraUrl) {
      setLoraUrl(selectedLoraUrl);
    } else {
      // デフォルトLoraURLを設定
      setLoraUrl('https://storage.googleapis.com/fal-flux-lora/a82719e8f8d845d4b08d792ec3e054d8_pytorch_lora_weights.safetensors');
    }
  }, [selectedLoraUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      alert('マイページでAPIキーを設定してください');
      return;
    }
    onSubmit(prompt, imageSize, numSteps, guidanceScale, loraUrl, loraScale, numImages, apiKey);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-dark-card p-6 rounded-lg shadow-md">
      {!apiKey && (
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 
          text-yellow-700 dark:text-yellow-400 rounded-lg">
          <p className="text-sm font-medium">APIキーが設定されていません。マイページで設定してください。</p>
        </div>
      )}

      {/* Prompt Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-dark-text">{t('basicSettings')}</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
            {t('prompt')}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-dark-border rounded-md shadow-sm 
              focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-dark-text"
            rows={4}
            placeholder={t('promptPlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
            {t('imageSize')}
          </label>
          <select
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value as ImageSizeType)}
            className="w-full p-3 border border-gray-300 dark:border-dark-border rounded-md shadow-sm 
              focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg dark:text-dark-text"
          >
            <option value="square_hd">Square HD (1024x1024)</option>
            <option value="square">Square (512x512)</option>
            <option value="portrait_4_3">Portrait 4:3 (768x1024)</option>
            <option value="portrait_16_9">Portrait 16:9 (576x1024)</option>
            <option value="landscape_4_3">Landscape 4:3 (1024x768)</option>
            <option value="landscape_16_9">Landscape 16:9 (1024x576)</option>
          </select>
        </div>
      </div>

      {/* Advanced Settings Section */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-dark-border">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-dark-text">{t('advancedSettings')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              {t('inferenceSteps')}: {numSteps}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={numSteps}
              onChange={(e) => setNumSteps(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1</span>
              <span>25</span>
              <span>50</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
              {t('guidanceScale')}: {guidanceScale}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={guidanceScale}
              onChange={(e) => setGuidanceScale(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1</span>
              <span>10</span>
              <span>20</span>
            </div>
          </div>
        </div>
      </div>

      {/* LoRA Settings Section */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-dark-border">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-dark-text">{t('loraSettings')}</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
            {t('loraUrl')}
          </label>
          <div className="relative">
            <input
              type="text"
              value={loraUrl}
              readOnly
              className="w-full p-3 border border-gray-300 dark:border-dark-border rounded-md shadow-sm bg-gray-100 dark:bg-gray-800
                text-gray-600 dark:text-gray-400"
            />
            <div className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-500">
              <span>※ 3Dカルーセルで選択</span>
            </div>
          </div>
          {selectedLoraUrl && (
            <p className="text-xs text-green-500 mt-1">カルーセルで選択されたLoraが使用されます</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
            {t('loraScale')}: {loraScale}
          </label>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={loraScale}
            onChange={(e) => setLoraScale(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
        </div>
      </div>

      {/* Generation Settings Section */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-dark-border">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-dark-text">{t('generationSettings')}</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-2">
            {t('numImages')}: {numImages}
          </label>
          <input
            type="range"
            min="1"
            max="4"
            value={numImages}
            onChange={(e) => setNumImages(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !apiKey}
        className={`w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : !apiKey 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('generating')}
          </div>
        ) : (
          t('generate')
        )}
      </button>
    </form>
  );
} 