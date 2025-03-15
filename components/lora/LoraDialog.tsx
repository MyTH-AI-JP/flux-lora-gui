import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LoraModel } from '@/lib/supabase';
import { Upload, ImageIcon } from 'lucide-react';

interface LoraDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loraData: Partial<LoraModel>) => void;
  editData?: LoraModel | null;
}

export function LoraDialog({ isOpen, onClose, onSave, editData }: LoraDialogProps) {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loraUrl, setLoraUrl] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (editData) {
      setName(editData.name || '');
      setImageUrl(editData.image_url || '');
      setDescription(editData.description || '');
      setLoraUrl(editData.lora_url || '');
      setPreviewUrl(editData.image_url || null);
    } else {
      // 新規作成時は初期化
      setName('');
      setImageUrl('');
      setDescription('');
      setLoraUrl('');
      setPreviewUrl(null);
      setSelectedFile(null);
    }
    setErrors({});
  }, [editData, isOpen]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Lora名は必須です';
    }
    
    if (!loraUrl.trim()) {
      newErrors.loraUrl = 'Lora URLは必須です';
    } else if (!isValidLoraUrl(loraUrl)) {
      newErrors.loraUrl = '有効なLoraファイルURLを入力してください (.safetensors, .pt, .bin, .ckpt)';
    }
    
    if (!imageUrl.trim() && !selectedFile) {
      newErrors.imageUrl = '画像URLは必須です、または画像をアップロードしてください';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Lora URLのバリデーション - 相対パスも許可
  const isValidLoraUrl = (url: string) => {
    // URLの形式をチェック（http, https, または /で始まるパス）
    return (
      url.match(/^https?:\/\/.+/i) !== null || // http/https URL
      url.match(/^\/.+/i) !== null || // 相対パス
      url.match(/\.(safetensors|pt|bin|ckpt)$/i) !== null // ファイル拡張子で判断
    );
  };

  // 画像URLのバリデーション - 相対パスも許可
  const isValidImageUrl = (url: string) => {
    // URLの形式をチェック（http, https, または /で始まるパス）
    return (
      url.match(/^https?:\/\/.+/i) !== null || // http/https URL
      url.match(/^\/.+/i) !== null || // 相対パス
      url.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null // 一般的な画像拡張子
    );
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // 選択された画像がある場合は、その情報を使用
      // 注意: 実際のアップロード処理はここでは行わず、呼び出し元で処理
      onSave({
        name,
        image_url: imageUrl, // フォームに入力されたURLを優先
        description,
        lora_url: loraUrl,
        selectedFile: selectedFile // 選択されたファイルも送信
      });
    }
  };

  // ドラッグ&ドロップのハンドラー
  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  // ドロップ処理
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, []);

  // ファイル選択処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  // ファイル処理共通関数
  const handleFile = (file: File) => {
    // 画像ファイルかチェック
    if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/i)) {
      setErrors(prev => ({ ...prev, imageUpload: '画像ファイル（JPEG, PNG, GIF, WEBP）を選択してください' }));
      return;
    }

    setSelectedFile(file);
    setErrors(prev => ({ ...prev, imageUrl: '', imageUpload: '' }));
    
    // プレビューURLを作成
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 画像URLを直接入力した場合
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    
    if (url && !isValidImageUrl(url)) {
      setErrors(prev => ({ ...prev, imageUrl: '有効な画像URLを入力してください' }));
    } else {
      setErrors(prev => ({ ...prev, imageUrl: '' }));
      // 入力されたURLをプレビューに設定
      setPreviewUrl(url);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gray-900 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {editData ? 'Loraを編集' : '新規Lora登録'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Lora名 *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例: マイカスタムスタイル"
              className={`bg-gray-800 border-gray-700 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="loraUrl">Lora URL (.safetensors) *</Label>
            <Input
              id="loraUrl"
              value={loraUrl}
              onChange={(e) => setLoraUrl(e.target.value)}
              placeholder="https://example.com/my_lora.safetensors"
              className={`bg-gray-800 border-gray-700 ${errors.loraUrl ? 'border-red-500' : ''}`}
            />
            {errors.loraUrl && <p className="text-red-500 text-xs">{errors.loraUrl}</p>}
          </div>
          
          <div className="space-y-2">
            <Label>サムネイル画像 *</Label>
            
            {/* 画像プレビュー */}
            {previewUrl && (
              <div className="mb-2 relative">
                <img 
                  src={previewUrl} 
                  alt="プレビュー"
                  className="w-full h-40 object-cover rounded border border-gray-700" 
                  onError={() => setPreviewUrl(null)}
                />
              </div>
            )}
            
            {/* 画像URL入力 */}
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="https://example.com/thumbnail.jpg"
              className={`bg-gray-800 border-gray-700 ${errors.imageUrl ? 'border-red-500' : ''}`}
            />
            {errors.imageUrl && <p className="text-red-500 text-xs">{errors.imageUrl}</p>}
            
            {/* ドラッグ&ドロップエリア */}
            <div 
              className={`mt-2 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                ${dragActive ? 'border-blue-500 bg-blue-900/20' : 'border-gray-600'}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-400">
                  {selectedFile 
                    ? `選択済み: ${selectedFile.name}`
                    : 'クリックまたはドラッグ&ドロップで画像をアップロード'
                  }
                </p>
              </div>
            </div>
            {errors.imageUpload && <p className="text-red-500 text-xs">{errors.imageUpload}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="このLoraモデルの説明..."
              className="bg-gray-800 border-gray-700 h-24"
            />
          </div>
        </div>
        
        <DialogFooter className="gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit}>
            {editData ? '更新' : '登録'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}