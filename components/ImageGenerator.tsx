'use client';

import { useState } from 'react';
import { fal } from '@fal-ai/client';
import { ImageSizeType, GeneratorForm } from './GeneratorForm';
import React from 'react';
import { ImageModal } from './ImageModal';
import { useLanguage } from '../contexts/LanguageContext';

fal.config({
  credentials: process.env.NEXT_PUBLIC_FAL_KEY
});

export function ImageGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useLanguage();

  const generateImage = async (
    prompt: string,
    imageSize: ImageSizeType,
    numSteps: number,
    guidanceScale: number,
    loraUrl: string,
    loraScale: number,
    numImages: number,
    apiKey: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      fal.config({
        credentials: apiKey
      });

      const result = await fal.subscribe('fal-ai/flux-lora', {
        input: {
          prompt,
          image_size: imageSize,
          num_inference_steps: numSteps,
          guidance_scale: guidanceScale,
          enable_safety_checker: false,
          num_images: numImages,
          loras: [
            {
              path: loraUrl,
              scale: loraScale
            }
          ],
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === 'IN_PROGRESS') {
            console.log(update.logs.map((log) => log.message));
          }
        },
      });

      if (result.data.images) {
        setGeneratedImages(result.data.images.map(img => img.url));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '画像生成中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Panel */}
        <div className="lg:w-1/2">
          <GeneratorForm onSubmit={generateImage} isLoading={isLoading} />
        </div>

        {/* Results Panel */}
        <div className="lg:w-1/2 space-y-8">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
              text-red-700 dark:text-red-400 rounded-lg">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                {t('error')}
              </div>
            </div>
          )}

          {!error && !generatedImages.length && !isLoading && (
            <div className="h-full flex items-center justify-center bg-white dark:bg-dark-card p-8 rounded-lg shadow-md">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                {t('waitingMessage')}
              </p>
            </div>
          )}

          {isLoading && (
            <div className="h-full flex items-center justify-center bg-white dark:bg-dark-card p-8 rounded-lg shadow-md">
              <div className="text-center">
                <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">{t('loadingMessage')}</p>
              </div>
            </div>
          )}

          {generatedImages.length > 0 && !isLoading && (
            <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-dark-text">{t('generatedImages')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {generatedImages.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <div 
                      className="relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer"
                    >
                      <div
                        className="w-full h-full group"
                        onClick={() => setSelectedImage(imageUrl)}
                      >
                        <img
                          src={imageUrl}
                          alt={`Generated ${index + 1}`}
                          className="w-full h-full object-contain bg-gray-100 transition-transform duration-200 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <a
                        href={imageUrl}
                        download={`generated-image-${index + 1}.png`}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        onClick={(e) => {
                          e.preventDefault();
                          const downloadImage = async () => {
                            try {
                              const response = await fetch(imageUrl);
                              const blob = await response.blob();
                              const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                              const url = window.URL.createObjectURL(blob);
                              
                              const a = document.createElement('a');
                              a.style.display = 'none';
                              a.href = url;
                              a.download = `generated-image-${timestamp}.png`;
                              document.body.appendChild(a);
                              a.click();
                              
                              setTimeout(() => {
                                document.body.removeChild(a);
                                window.URL.revokeObjectURL(url);
                              }, 100);
                            } catch (error) {
                              console.error('Download failed:', error);
                            }
                          };
                          
                          downloadImage();
                        }}
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {t('download')}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
} 