'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Squares } from '@/components/ui/squares-background';

interface UserProfile {
  id: string;
  email: string;
  username: string | null;
  avatar_url: string | null;
  subscription_tier: string;
  subscription_status: string;
  api_key: string | null;
}

interface HistoryItem {
  id: string;
  prompt: string;
  result_url: string;
  created_at: string;
  status: string;
}

interface UserLora {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
}

export default function MyPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'loras'>('profile');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loras, setLoras] = useState<UserLora[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = `${t('mypage')} - ${t('companyName')}`;
    
    // ここでSupabaseからデータを取得する処理を追加予定
    // 仮のダミーデータを設定
    setTimeout(() => {
      setProfile({
        id: 'user-123',
        email: 'user@example.com',
        username: 'ユーザー名',
        avatar_url: 'https://i.pravatar.cc/150?img=3',
        subscription_tier: 'free',
        subscription_status: 'active',
        api_key: 'sk-123456789'
      });
      
      setHistory([
        {
          id: 'hist-1',
          prompt: '美しい夕日と海の風景',
          result_url: 'https://picsum.photos/400/300?sunset',
          created_at: '2023-06-15T10:30:00Z',
          status: 'completed'
        },
        {
          id: 'hist-2',
          prompt: '山の風景と雪',
          result_url: 'https://picsum.photos/400/300?mountain',
          created_at: '2023-06-14T14:20:00Z',
          status: 'completed'
        }
      ]);
      
      setLoras([
        {
          id: 'lora-1',
          name: 'マイアニメスタイル',
          image_url: 'https://picsum.photos/200/200?anime',
          created_at: '2023-05-20T09:15:00Z'
        },
        {
          id: 'lora-2',
          name: 'ファンタジー背景',
          image_url: 'https://picsum.photos/200/200?fantasy',
          created_at: '2023-05-10T15:45:00Z'
        }
      ]);
      
      setIsLoading(false);
    }, 1000);
  }, [t]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyApiKey = () => {
    if (profile?.api_key) {
      navigator.clipboard.writeText(profile.api_key);
      alert('APIキーがコピーされました');
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 shadow-md">
        <div className="flex items-center space-x-4">
          {profile?.avatar_url && (
            <img 
              src={profile.avatar_url} 
              alt="プロフィール画像" 
              className="w-20 h-20 rounded-full" 
            />
          )}
          <div>
            <h2 className="text-2xl font-bold text-white">{profile?.username || 'ユーザー'}</h2>
            <p className="text-gray-300">{profile?.email}</p>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="text-xl font-semibold text-white mb-3">サブスクリプション</h3>
          <div className="flex justify-between items-center bg-gray-700 p-3 rounded">
            <div>
              <p className="text-white">現在のプラン: <span className="font-bold capitalize">{profile?.subscription_tier || 'Free'}</span></p>
              <p className="text-gray-300 text-sm">ステータス: {profile?.subscription_status === 'active' ? 'アクティブ' : '無効'}</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              アップグレード
            </button>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-700 pt-4">
          <h3 className="text-xl font-semibold text-white mb-3">APIキー</h3>
          <div className="flex items-center space-x-2">
            <input 
              type="password" 
              value={profile?.api_key || ''} 
              readOnly 
              className="bg-gray-700 text-white p-2 rounded flex-grow" 
            />
            <button 
              onClick={copyApiKey} 
              className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded"
            >
              コピー
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-2">APIキーは外部に漏らさないでください。</p>
        </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">生成履歴</h2>
      {history.length === 0 ? (
        <p className="text-gray-400">履歴がありません</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <img 
                src={item.result_url} 
                alt={item.prompt} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-4">
                <p className="text-white font-medium truncate">{item.prompt}</p>
                <p className="text-gray-400 text-sm">{formatDate(item.created_at)}</p>
                <div className="flex justify-between mt-2">
                  <span className={`text-sm px-2 py-1 rounded ${
                    item.status === 'completed' ? 'bg-green-900 text-green-300' : 
                    item.status === 'failed' ? 'bg-red-900 text-red-300' : 
                    'bg-yellow-900 text-yellow-300'
                  }`}>
                    {item.status === 'completed' ? '完了' : 
                     item.status === 'failed' ? '失敗' : '処理中'}
                  </span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    再生成
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderLorasTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">マイLora</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
          新規作成
        </button>
      </div>
      
      {loras.length === 0 ? (
        <p className="text-gray-400">登録されたLoraがありません</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loras.map((lora) => (
            <div key={lora.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <img 
                src={lora.image_url} 
                alt={lora.name} 
                className="w-full h-40 object-cover" 
              />
              <div className="p-3">
                <h3 className="text-white font-medium">{lora.name}</h3>
                <p className="text-gray-400 text-xs">{formatDate(lora.created_at)}</p>
                <div className="flex justify-between mt-2">
                  <button className="text-blue-400 hover:text-blue-300 text-xs">
                    編集
                  </button>
                  <button className="text-red-400 hover:text-red-300 text-xs">
                    削除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

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
        <h1 className="text-3xl font-bold text-white mb-8">マイページ</h1>
        
        <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl">
          <div className="border-b border-gray-800">
            <nav className="flex">
              <button
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'profile' 
                    ? 'text-white border-b-2 border-blue-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                プロフィール
              </button>
              <button
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'history' 
                    ? 'text-white border-b-2 border-blue-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('history')}
              >
                生成履歴
              </button>
              <button
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'loras' 
                    ? 'text-white border-b-2 border-blue-500' 
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveTab('loras')}
              >
                マイLora
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : (
              <>
                {activeTab === 'profile' && renderProfileTab()}
                {activeTab === 'history' && renderHistoryTab()}
                {activeTab === 'loras' && renderLorasTab()}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 