'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ApiContextType {
  apiKey: string;
  saveApiKey: (key: string) => void;
  selectedLoraUrl: string;
  saveSelectedLoraUrl: (url: string) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKey] = useState<string>('');
  const [selectedLoraUrl, setSelectedLoraUrl] = useState<string>('');

  // ローカルストレージから値を読み込み
  useEffect(() => {
    const savedApiKey = localStorage.getItem('api_key');
    const savedLoraUrl = localStorage.getItem('selected_lora_url');
    
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    
    if (savedLoraUrl) {
      setSelectedLoraUrl(savedLoraUrl);
    }
  }, []);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('api_key', key);
  };

  const saveSelectedLoraUrl = (url: string) => {
    setSelectedLoraUrl(url);
    localStorage.setItem('selected_lora_url', url);
  };

  return (
    <ApiContext.Provider value={{ apiKey, saveApiKey, selectedLoraUrl, saveSelectedLoraUrl }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
} 