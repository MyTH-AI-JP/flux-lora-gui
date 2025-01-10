'use client';

import React from 'react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState<ImageSizeType>('landscape_4_3');
  const [numSteps, setNumSteps] = useState(28);
  const [guidanceScale, setGuidanceScale] = useState(3.5);
  const [loraUrl, setLoraUrl] = useState('');
  const [loraScale, setLoraScale] = useState(1.3);
  const [numImages, setNumImages] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt, imageSize, numSteps, guidanceScale, loraUrl, loraScale, numImages, apiKey);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      {/* API Key Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">{t('apiSettings')}</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('apiKeyLabel')}
          </label>
          <div className="relative">
            <input
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder={t('apiKeyPlaceholder')}
              required
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showApiKey ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Prompt Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">{t('basicSettings')}</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('prompt')}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder={t('promptPlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('imageSize')}
          </label>
          <select
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value as ImageSizeType)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700">{t('advancedSettings')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('inferenceSteps')}: {numSteps}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={numSteps}
              onChange={(e) => setNumSteps(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>25</span>
              <span>50</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('guidanceScale')}: {guidanceScale}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={guidanceScale}
              onChange={(e) => setGuidanceScale(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>10</span>
              <span>20</span>
            </div>
          </div>
        </div>
      </div>

      {/* LoRA Settings Section */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700">{t('loraSettings')}</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('loraUrl')}
          </label>
          <input
            type="text"
            value={loraUrl}
            onChange={(e) => setLoraUrl(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder={t('loraUrlPlaceholder')}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('loraScale')}: {loraScale}
          </label>
          <input
            type="range"
            min="0"
            max="3"
            step="0.1"
            value={loraScale}
            onChange={(e) => setLoraScale(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
        </div>
      </div>

      {/* Generation Settings Section */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-700">{t('generationSettings')}</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('numImages')}: {numImages}
          </label>
          <input
            type="range"
            min="1"
            max="4"
            value={numImages}
            onChange={(e) => setNumImages(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('generating')}
          </span>
        ) : (
          t('generate')
        )}
      </button>
    </form>
  );
} 