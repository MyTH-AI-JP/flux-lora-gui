'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApi } from '@/contexts/ApiContext';
import { Squares } from '@/components/ui/squares-background';
import { ButtonColorful } from '@/components/ui/button-colorful';
import { Check, Copy, Save, Edit, Trash2, Plus } from 'lucide-react';
import { 
  getUserImageHistory, 
  HistoryItem as SupabaseHistoryItem, 
  getUserLoraModels, 
  LoraModel,
  createUserLoraModel,
  updateUserLoraModel,
  deleteUserLoraModel
} from '@/lib/supabase';
import { LoraDialog } from '@/components/lora/LoraDialog';
import { DeleteConfirmDialog } from '@/components/lora/DeleteConfirmDialog';
import { Button } from '@/components/ui/button';

interface UserProfile {
  id: string;
  email: string;
  username: string | null;
  avatar_url: string | null;
  subscription_tier: string;
  subscription_status: string;
  api_key: string | null;
}

// HistoryItemをSupabaseHistoryItemを継承するように変更
interface HistoryItem extends SupabaseHistoryItem {}

// UserLoraをLoraModelを継承するように変更
interface UserLora extends LoraModel {}

export default function MyPage() {
  const { t } = useLanguage();
  const { apiKey, saveApiKey, selectedLoraUrl } = useApi();
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'loras'>('profile');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loras, setLoras] = useState<UserLora[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [pendingApiKey, setPendingApiKey] = useState('');
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  
  // Lora管理用の状態
  const [isLoraDialogOpen, setIsLoraDialogOpen] = useState(false);
  const [editingLora, setEditingLora] = useState<LoraModel | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingLora, setDeletingLora] = useState<LoraModel | null>(null);

  useEffect(() => {
    document.title = `${t('mypage')} - ${t('companyName')}`;
    
    // APIキーがあれば適用する
    if (apiKey) {
      setPendingApiKey(apiKey);
    }

    // 仮のプリセットAPIキーを設定（本来はこういう場所に置くべきではありません）
    const presetApiKey = "5db59d74-127a-4240-a028-2662d88522a4:f7e522e4afbf3486f03f771446bbfe4b";
    
    // データをロード
    async function loadUserData() {
      try {
        setIsLoading(true);
        
        // 仮のユーザーID（本来は認証から取得）
        const userId = 'user-123';
        
        // プロフィールデータの設定
        setProfile({
          id: userId,
          email: 'user@example.com',
          username: 'ユーザー名',
          avatar_url: 'https://i.pravatar.cc/150?img=3',
          subscription_tier: 'free',
          subscription_status: 'active',
          api_key: apiKey || presetApiKey
        });
        
        // Supabaseから実際の履歴データを取得
        const historyData = await getUserImageHistory(userId);
        
        // データがない場合はサンプルデータを使用
        if (historyData.length === 0) {
          setHistory([
            {
              id: 'hist-1',
              user_id: userId,
              prompt: '美しい夕日と海の風景',
              result_url: 'https://picsum.photos/400/300?sunset',
              created_at: '2023-06-15T10:30:00Z',
              status: 'completed'
            },
            {
              id: 'hist-2',
              user_id: userId,
              prompt: '山の風景と雪',
              result_url: 'https://picsum.photos/400/300?mountain',
              created_at: '2023-06-14T14:20:00Z',
              status: 'completed'
            }
          ]);
        } else {
          setHistory(historyData);
        }
        
        // SupabaseからユーザーのカスタムLoraを取得
        const loraData = await getUserLoraModels(userId);
        setLoras(loraData);
        
      } catch (error) {
        console.error('Error loading user data:', error);
        // エラー処理を追加（UI通知など）
      } finally {
        setIsLoading(false);
      }
    }
    
    loadUserData();
  }, [t, apiKey, selectedLoraUrl]);

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
      setApiKeyCopied(true);
      setTimeout(() => setApiKeyCopied(false), 2000);
    }
  };

  const saveNewApiKey = () => {
    if (pendingApiKey) {
      saveApiKey(pendingApiKey);
      setProfile(prev => prev ? {...prev, api_key: pendingApiKey} : null);
      alert('APIキーが保存されました');
    }
  };

  // 新規Lora作成ダイアログを開く
  const openCreateDialog = () => {
    setEditingLora(null);
    setIsLoraDialogOpen(true);
  };

  // Lora編集ダイアログを開く
  const openEditDialog = (lora: LoraModel) => {
    setEditingLora(lora);
    setIsLoraDialogOpen(true);
  };

  // 削除確認ダイアログを開く
  const openDeleteDialog = (lora: LoraModel) => {
    setDeletingLora(lora);
    setIsDeleteDialogOpen(true);
  };

  // Loraの保存処理（新規作成または更新）
  const handleSaveLora = async (loraData: Partial<LoraModel> & { selectedFile?: File | null }) => {
    try {
      const userId = profile?.id || 'user-123'; // 開発用に仮のIDを使用
      
      if (editingLora) {
        // 既存のLoraを更新
        const updatedLora = await updateUserLoraModel(userId, editingLora.id, loraData);
        if (updatedLora) {
          // 成功した場合、Loraリストを更新
          setLoras(prev => prev.map(lora => 
            lora.id === editingLora.id ? updatedLora : lora
          ));
          setIsLoraDialogOpen(false);
          alert('Loraを更新しました');
        }
      } else {
        // 新規Loraを作成
        const newLora = await createUserLoraModel(userId, {
          name: loraData.name || '',
          image_url: loraData.image_url || '',
          description: loraData.description || '',
          lora_url: loraData.lora_url || '',
          author: 'あなた',
          selectedFile: loraData.selectedFile
        });
        
        if (newLora) {
          // 成功した場合、Loraリストに追加
          setLoras(prev => [newLora, ...prev]);
          setIsLoraDialogOpen(false);
          alert('新しいLoraを作成しました');
        }
      }
    } catch (error) {
      console.error('Error saving Lora:', error);
      alert('Loraの保存中にエラーが発生しました');
    }
  };

  // Loraの削除処理
  const handleDeleteLora = async () => {
    if (!deletingLora) return;
    
    try {
      const userId = profile?.id || 'user-123'; // 開発用に仮のIDを使用
      const success = await deleteUserLoraModel(userId, deletingLora.id);
      
      if (success) {
        // 成功した場合、削除したLoraをリストから除外
        setLoras(prev => prev.filter(lora => lora.id !== deletingLora.id));
        setIsDeleteDialogOpen(false);
        alert('Loraを削除しました');
      } else {
        alert('Loraの削除に失敗しました');
      }
    } catch (error) {
      console.error('Error deleting Lora:', error);
      alert('Loraの削除中にエラーが発生しました');
    }
  };

  return (
    <div className="relative min-h-screen">
      <Squares 
        direction="diagonal"
        speed={0.5}
        squareSize={50}
        borderColor="#333" 
        hoverFillColor="#222"
      />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* タブナビゲーション */}
        <div className="mb-6 border-b border-gray-700 flex">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 mr-2 font-medium ${activeTab === 'profile' ? 'border-b-2 border-primary text-primary' : 'text-gray-400'}`}
          >
            {t('profile')}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 mr-2 font-medium ${activeTab === 'history' ? 'border-b-2 border-primary text-primary' : 'text-gray-400'}`}
          >
            {t('history')}
          </button>
          <button
            onClick={() => setActiveTab('loras')}
            className={`px-4 py-2 font-medium ${activeTab === 'loras' ? 'border-b-2 border-primary text-primary' : 'text-gray-400'}`}
          >
            {t('myLora.title')}
          </button>
        </div>
        
        {/* プロフィール表示 */}
        {activeTab === 'profile' && (
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-6">
              {profile?.avatar_url && (
                <img 
                  src={profile.avatar_url} 
                  alt={t('profileImage')}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
              )}
              <div>
                <h2 className="text-xl font-bold">{profile?.username || t('user')}</h2>
                <p className="text-gray-400">{profile?.email}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">{t('currentPlan')}</h3>
              <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4">
                <div>
                  <p className="font-medium">{profile?.subscription_tier === 'free' ? t('freePlan') : profile?.subscription_tier}</p>
                  <p className="text-sm text-gray-400">{t('status')}: {profile?.subscription_status}</p>
                </div>
                <ButtonColorful href="/payment" className="text-sm">
                  {t('changePlan')}
                </ButtonColorful>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">{t('apiSettings')}</h3>
              <div className="bg-gray-700/50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <label htmlFor="api-key" className="block mr-3">
                    {t('apiKeyLabel')}:
                  </label>
                  <div className="relative flex-1">
                    <input
                      id="api-key"
                      type={showApiKey ? "text" : "password"}
                      className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 pr-9"
                      value={pendingApiKey}
                      onChange={(e) => setPendingApiKey(e.target.value)}
                      placeholder={t('apiKeyPlaceholder')}
                    />
                    <button 
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? t('hidePassword') : t('showPassword')}
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button onClick={copyApiKey} variant="outline" className="flex items-center">
                    <Copy className="w-4 h-4 mr-2" />
                    {apiKeyCopied ? t('copied') : t('copy')}
                  </Button>
                  <Button onClick={saveNewApiKey} variant="default" className="bg-primary hover:bg-primary/90 flex items-center">
                    <Save className="w-4 h-4 mr-2" />
                    {t('save')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 履歴表示 */}
        {activeTab === 'history' && (
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">{t('generatedImages')}</h2>
            
            {isLoading ? (
              <div className="text-center py-10">
                <div className="spinner mb-3"></div>
                <p>{t('loading')}</p>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p>{t('noHistory')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {history.map((item) => (
                  <div key={item.id} className="bg-gray-700/50 rounded-lg overflow-hidden">
                    <img 
                      src={item.result_url} 
                      alt={item.prompt}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3">
                      <p className="line-clamp-2 text-sm mb-1">{item.prompt}</p>
                      <p className="text-xs text-gray-400">{formatDate(item.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Lora管理 */}
        {activeTab === 'loras' && (
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t('myLora.title')}</h2>
              <Button onClick={openCreateDialog} variant="default" className="bg-primary hover:bg-primary/90 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                {t('myLora.create')}
              </Button>
            </div>
            
            {isLoading ? (
              <div className="text-center py-10">
                <div className="spinner mb-3"></div>
                <p>{t('loading')}</p>
              </div>
            ) : loras.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <p>{t('myLora.noLorasFound')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loras.map((lora) => (
                  <div key={lora.id} className="bg-gray-700/50 rounded-lg overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        src={lora.image_url || '/images/lora-placeholder.jpg'} 
                        alt={lora.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <button 
                          onClick={() => openEditDialog(lora)}
                          className="p-1.5 bg-gray-800/80 backdrop-blur-sm rounded-md hover:bg-gray-700"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openDeleteDialog(lora)}
                          className="p-1.5 bg-gray-800/80 backdrop-blur-sm rounded-md hover:bg-red-900/80"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium mb-1">{lora.name}</h3>
                      <p className="text-xs text-gray-400 truncate">{lora.lora_url}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Loraの編集・作成ダイアログ */}
      <LoraDialog 
        open={isLoraDialogOpen} 
        onOpenChange={setIsLoraDialogOpen}
        lora={editingLora}
        onSave={handleSaveLora}
      />
      
      {/* Lora削除確認ダイアログ */}
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteLora}
        title={t('deleteLora')}
        description={t('deleteLoraConfirm')}
        lora={deletingLora}
      />
      
    </div>
  );
} 