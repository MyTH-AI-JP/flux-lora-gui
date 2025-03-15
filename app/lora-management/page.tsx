"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash, Upload, Edit } from "lucide-react";
import { getLoraModels, LoraModel, upsertLoraModel, deleteLoraModel, uploadImageToSupabase } from "@/lib/supabase";

export default function LoraManagementPage() {
  const [loraModels, setLoraModels] = useState<LoraModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<LoraModel | null>(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    author: "",
    description: "",
    lora_url: "",
    image_url: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Loraモデルのデータを取得
  const fetchLoraModels = useCallback(async () => {
    setIsLoading(true);
    try {
      // 現在はローカルデータを使用（Supabase実装後は実際のデータをフェッチ）
      const models = [
        {
          id: "portrait-asian",
          name: "アジアンビューティー",
          image_url: "/images/asian-portrait.jpg", // 正しいパスに修正
          author: "ポートレート専門家",
          description: "アジアの自然な美しさを引き出すスタイルを適用するLora",
          lora_url: "https://storage.googleapis.com/fal-flux-lora/a82719e8f8d845d4b08d792ec3e054d8_pytorch_lora_weights.safetensors",
          created_at: new Date().toISOString()
        },
        {
          id: "anime-style",
          name: "アニメスタイル",
          image_url: "/images/anime.jpg",
          author: "アニメ作家",
          description: "アニメ風のスタイルを適用するLora",
          lora_url: "https://storage.googleapis.com/fal-flux-lora/anime-style-lora.safetensors",
          created_at: new Date().toISOString()
        },
        {
          id: "watercolor",
          name: "水彩画風",
          image_url: "/images/watercolor.jpg",
          author: "水彩アーティスト",
          description: "水彩画風のスタイルを適用するLora",
          lora_url: "https://storage.googleapis.com/fal-flux-lora/watercolor-style-lora.safetensors",
          created_at: new Date().toISOString()
        },
        {
          id: "monochrome",
          name: "モノクロ",
          image_url: "/images/monochrome.jpg",
          author: "モノクロアーティスト",
          description: "モノクロスタイルを適用するLora",
          lora_url: "https://storage.googleapis.com/fal-flux-lora/monochrome-style-lora.safetensors",
          created_at: new Date().toISOString()
        }
      ];
      
      // 本番ではSupabaseからデータを取得
      // const models = await getLoraModels();
      
      setLoraModels(models);
    } catch (error) {
      console.error("Loraモデルの取得に失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoraModels();
  }, [fetchLoraModels]);

  // ダイアログを開く
  const openDialog = (model?: LoraModel) => {
    if (model) {
      setSelectedModel(model);
      setFormData({
        id: model.id,
        name: model.name,
        author: model.author || "",
        description: model.description || "",
        lora_url: model.lora_url || "",
        image_url: model.image_url
      });
      setPreviewUrl(model.image_url);
    } else {
      setSelectedModel(null);
      setFormData({
        id: `model-${Date.now()}`,
        name: "",
        author: "",
        description: "",
        lora_url: "",
        image_url: ""
      });
      setPreviewUrl("");
      setImageFile(null);
    }
    setIsDialogOpen(true);
  };

  // 削除ダイアログを開く
  const openDeleteDialog = (model: LoraModel) => {
    setSelectedModel(model);
    setIsDeleteDialogOpen(true);
  };

  // フォームの変更を処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 画像ファイルの変更を処理
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // プレビューURLを作成
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // フォームの送信を処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      let imageUrl = formData.image_url;
      
      // 新しい画像がアップロードされた場合
      if (imageFile) {
        // 本番環境ではSupabaseにアップロード
        // const uploadedUrl = await uploadImageToSupabase(imageFile, 'lora-images');
        // if (uploadedUrl) {
        //   imageUrl = uploadedUrl;
        // }
        
        // 開発環境ではローカルパスを維持
      }
      
      const modelData = {
        id: formData.id,
        name: formData.name,
        author: formData.author,
        description: formData.description,
        lora_url: formData.lora_url,
        image_url: imageUrl,
      };
      
      // 本番環境ではSupabaseにデータを保存
      // await upsertLoraModel(modelData);
      
      // 開発環境では状態を更新
      if (selectedModel) {
        // 既存モデルの更新
        setLoraModels(prev => 
          prev.map(model => model.id === formData.id 
            ? { ...modelData, created_at: model.created_at } 
            : model
          )
        );
      } else {
        // 新規モデルの追加
        setLoraModels(prev => [
          ...prev, 
          { ...modelData, created_at: new Date().toISOString() }
        ]);
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Loraモデルの保存に失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Loraモデルの削除を処理
  const handleDelete = async () => {
    if (!selectedModel) return;
    
    setIsLoading(true);
    try {
      // 本番環境ではSupabaseからデータを削除
      // await deleteLoraModel(selectedModel.id);
      
      // 開発環境では状態を更新
      setLoraModels(prev => prev.filter(model => model.id !== selectedModel.id));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Loraモデルの削除に失敗しました", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Loraモデル管理</h1>
        <ButtonColorful
          onClick={() => openDialog()}
          icon={<Plus className="mr-2 h-4 w-4" />}
        >
          新規モデル追加
        </ButtonColorful>
      </div>
      
      {isLoading && <div className="text-center py-12">読み込み中...</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loraModels.map(model => (
          <div key={model.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="relative h-48">
              <img 
                src={model.image_url} 
                alt={model.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button 
                  onClick={() => openDialog(model)}
                  className="p-2 bg-gray-100 bg-opacity-80 hover:bg-opacity-100 rounded-full text-gray-700 transition"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => openDeleteDialog(model)}
                  className="p-2 bg-red-100 bg-opacity-80 hover:bg-opacity-100 rounded-full text-red-700 transition"
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
              {model.author && <p className="text-sm text-gray-500 mb-1">作者: {model.author}</p>}
              {model.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                  {model.description}
                </p>
              )}
              {model.lora_url && (
                <div className="text-xs text-gray-500 truncate mb-2">
                  <span className="font-medium">Lora URL:</span> {model.lora_url}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* 新規作成・編集ダイアログ */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{selectedModel ? "Loraモデルを編集" : "新規Loraモデルを作成"}</DialogTitle>
            <DialogDescription>
              Loraモデルの詳細情報を入力してください。
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  名前
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="col-span-3"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  作者
                </Label>
                <Input
                  id="author"
                  name="author"
                  className="col-span-3"
                  value={formData.author}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lora_url" className="text-right">
                  Lora URL
                </Label>
                <Input
                  id="lora_url"
                  name="lora_url"
                  className="col-span-3"
                  value={formData.lora_url}
                  onChange={handleChange}
                  placeholder="https://example.com/lora-weights.safetensors"
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right pt-2">
                  説明
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  className="col-span-3"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="image" className="text-right pt-2">
                  画像
                </Label>
                <div className="col-span-3">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg h-32 w-32 flex items-center justify-center overflow-hidden relative"
                    >
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <div className="text-gray-500 text-sm text-center">
                          <Upload className="h-6 w-6 mx-auto mb-1" />
                          <span>画像を選択</span>
                        </div>
                      )}
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                      />
                    </div>
                    <div className="text-sm text-gray-500">
                      画像をクリックして新しいファイルをアップロードしてください。<br />
                      JPG、PNG形式がサポートされています。
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                キャンセル
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "保存中..." : "保存"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* 削除確認ダイアログ */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Loraモデルの削除</DialogTitle>
            <DialogDescription>
              本当に「{selectedModel?.name}」を削除しますか？この操作は元に戻せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-start">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              キャンセル
            </Button>
            <Button 
              type="button" 
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "削除中..." : "削除する"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 