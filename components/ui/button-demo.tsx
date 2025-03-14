import { ButtonColorful } from "@/components/ui/button-colorful";
import { Button, buttonVariants } from "@/components/ui/button";
import { LucideIcon, Play, Zap, Download, Check, X, MessageSquare, Home } from "lucide-react";

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-8 p-6 bg-gray-900/70 backdrop-blur-sm rounded-xl">
      <div>
        <h2 className="text-xl font-bold mb-4">カラフルボタン</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ButtonColorful 
            icon={<Play className="w-4 h-4" />}
            label="実行する" 
            onClick={() => console.log("生成開始")} 
          />
          <ButtonColorful 
            icon={<Zap className="w-4 h-4" />}
            label="高速モード" 
            variant="violet"
            onClick={() => console.log("高速モード")} 
          />
          <ButtonColorful 
            icon={<Download className="w-4 h-4" />}
            label="ダウンロード" 
            variant="emerald"
            onClick={() => console.log("ダウンロード")} 
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">シンプルボタン</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">デフォルトバリアント</h3>
            <div className="flex flex-wrap gap-2">
              <Button>デフォルト</Button>
              <Button variant="secondary">セカンダリ</Button>
              <Button variant="destructive">破壊的</Button>
              <Button variant="outline">アウトライン</Button>
              <Button variant="ghost">ゴースト</Button>
              <Button variant="link">リンク</Button>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">アイコン付きボタン</h3>
            <div className="flex flex-wrap gap-2">
              <Button>
                <Check className="mr-2 h-4 w-4" /> 承認
              </Button>
              <Button variant="destructive">
                <X className="mr-2 h-4 w-4" /> キャンセル
              </Button>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" /> メッセージ
              </Button>
              <Button variant="ghost">
                <Home className="mr-2 h-4 w-4" /> ホーム
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">サイズバリエーション</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="lg">大</Button>
          <Button>デフォルト</Button>
          <Button size="sm">小</Button>
          <Button size="icon">
            <Home className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
} 