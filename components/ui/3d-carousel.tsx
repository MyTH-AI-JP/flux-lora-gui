"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState, useCallback, Suspense } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { useApi } from "@/contexts/ApiContext"
import { getLoraModels, LoraModel, getCarouselModels } from "@/lib/supabase"
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useLanguage } from "@/contexts/LanguageContext"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) {
      return defaultValue
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query)
    }
    return defaultValue
  })

  const handleChange = () => {
    setMatches(getMatches(query))
  }

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()

    matchMedia.addEventListener("change", handleChange)

    return () => {
      matchMedia.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}

// Lora型をLoraModelに置き換え
type Lora = LoraModel;

// サンプルデータの代わりにSupabaseから取得したデータを使用
const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

// 3Dカルーセルのメインコンポーネント
export default function ThreeDCarousel() {
  const [models, setModels] = useState<LoraModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLora, setActiveLora] = useState<LoraModel | null>(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const { saveSelectedLoraUrl } = useApi();
  const { t } = useLanguage();
  
  // コンポーネントマウント時にLoraモデルを読み込み
  useEffect(() => {
    loadLoraModels();
  }, []);

  // Supabaseからモデルデータを取得
  const loadLoraModels = async () => {
    try {
      setLoading(true);
      
      // Supabase接続状態を確認
      console.log('カルーセルのモデルを読み込み開始');
      
      // モジュールをインポート
      const supabaseLib = await import('@/lib/supabase');
      console.log('supabaseLib imported:', Object.keys(supabaseLib));
      
      const { isConnected, error: connectionError } = await supabaseLib.checkSupabaseConnection();
      console.log('Supabase接続状態:', isConnected, connectionError);
      
      // JK Sakuraモデルを作成（必ず表示されるようにする）
      const jkSakuraModel: LoraModel = {
        id: 'jk-sakura-forced',
        name: 'JK Sakura (強制表示)',
        image_url: '/images/jk_sakura.jpg',
        author: 'MyTH AI',
        description: '女子高生の桜（さくら）Loraモデル。制服を着た可愛い女子高生のキャラクター。',
        lora_url: 'https://v3.fal.media/files/panda/Lim1EF3ScgEG1RfAooimI_pytorch_lora_weights.safetensors',
        created_at: new Date().toISOString()
      };
      
      if (!isConnected) {
        console.warn('Supabase connection error:', connectionError);
        console.log('カルーセルにはモックデータを使用します');
        
        // モックデータを使用
        try {
          const mockCarouselModels = supabaseLib.getCarouselModelsMock();
          console.log('mockCarouselModels:', mockCarouselModels);
          
          const mockLoraModels = supabaseLib.getLoraModelsMock();
          console.log('mockLoraModels:', mockLoraModels);
          
          // JK Sakuraモデルが存在するか確認
          const hasJkSakura = mockLoraModels.some(model => model.id === 'jk-sakura');
          console.log('JK Sakuraモデルが存在するか:', hasJkSakura);
          
          // カルーセルモデルにloraModelを追加
          const enrichedModels = mockCarouselModels.map(cm => ({
            ...cm,
            lora_model: mockLoraModels.find(lm => lm.id === cm.lora_id) || jkSakuraModel
          }));
          
          // loraモデル情報を抽出
          let loraModels = enrichedModels
            .filter(cm => cm.lora_model) // lora_modelが存在するもののみ
            .map(cm => cm.lora_model as LoraModel); // lora_modelを抽出
          
          // JK Sakuraが含まれていない場合は強制的に追加
          if (!loraModels.some(model => model.id === 'jk-sakura' || model.id === 'jk-sakura-forced')) {
            console.log('JK Sakuraモデルを強制的に追加します');
            loraModels = [jkSakuraModel, ...loraModels];
          }
          
          console.log('カルーセルモデル(モック):', loraModels);
          setModels(loraModels);
        } catch (mockError) {
          console.error('モックデータロード中のエラー:', mockError);
          // エラー時は少なくともJK Sakuraだけは表示
          setModels([jkSakuraModel]);
        }
        
        setLoading(false);
        return;
      }
      
      // カルーセルモデルを取得
      const carouselModels = await supabaseLib.getCarouselModels();
      console.log('取得したカルーセルモデル:', carouselModels);
      
      // カルーセルモデルからLoraモデル情報を抽出
      let loraModels = carouselModels
        .filter(cm => cm.lora_model) // lora_modelが存在するもののみ
        .map(cm => cm.lora_model as LoraModel); // lora_modelを抽出
      
      // JK Sakuraが含まれていない場合は強制的に追加
      if (!loraModels.some(model => model.id === 'jk-sakura' || model.id === 'jk-sakura-forced')) {
        console.log('JK Sakuraモデルを強制的に追加します');
        loraModels = [jkSakuraModel, ...loraModels];
      }
      
      console.log('抽出したLoraモデル:', loraModels);
      setModels(loraModels);
    } catch (err) {
      console.error('Error loading Lora models:', err);
      setError('モデルの読み込み中にエラーが発生しました');
      
      // エラー時にもモックデータを使用
      try {
        const supabaseLib = await import('@/lib/supabase');
        const mockModels = supabaseLib.getLoraModelsMock();
        
        // JK Sakuraモデルを作成（必ず表示されるようにする）
        const jkSakuraModel: LoraModel = {
          id: 'jk-sakura-forced',
          name: 'JK Sakura (強制表示)',
          image_url: '/images/jk_sakura.jpg',
          author: 'MyTH AI',
          description: '女子高生の桜（さくら）Loraモデル。制服を着た可愛い女子高生のキャラクター。',
          lora_url: 'https://v3.fal.media/files/panda/Lim1EF3ScgEG1RfAooimI_pytorch_lora_weights.safetensors',
          created_at: new Date().toISOString()
        };
        
        // JK Sakuraが含まれていない場合は強制的に追加
        let models = mockModels;
        if (!models.some(model => model.id === 'jk-sakura' || model.id === 'jk-sakura-forced')) {
          console.log('JK Sakuraモデルを強制的に追加します（エラー時）');
          models = [jkSakuraModel, ...models];
        }
        
        setModels(models);
        console.log('エラー時のフォールバック - モックデータを使用:', models);
      } catch (mockErr) {
        console.error('モックデータの取得にも失敗:', mockErr);
        
        // 最終手段としてJK Sakuraだけは表示
        const jkSakuraModel: LoraModel = {
          id: 'jk-sakura-forced',
          name: 'JK Sakura (最終手段)',
          image_url: '/images/jk_sakura.jpg',
          author: 'MyTH AI',
          description: '女子高生の桜（さくら）Loraモデル。制服を着た可愛い女子高生のキャラクター。',
          lora_url: 'https://v3.fal.media/files/panda/Lim1EF3ScgEG1RfAooimI_pytorch_lora_weights.safetensors',
          created_at: new Date().toISOString()
        };
        setModels([jkSakuraModel]);
      }
    } finally {
      setLoading(false);
    }
  };

  // 自動回転を処理する関数
  const autoRotateCarousel = useCallback(() => {
    if (autoRotate && isCarouselActive) {
      controls.start({
        rotateY: rotation.get() + 360,
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop" as const,
        },
      });
    } else {
      controls.stop();
    }
  }, [autoRotate, isCarouselActive, controls, rotation]);

  // 自動回転を開始/停止
  useEffect(() => {
    autoRotateCarousel();
  }, [autoRotate, isCarouselActive, autoRotateCarousel]);

  const handleClick = (lora: LoraModel, index: number) => {
    setActiveLora(lora);
    setIsCarouselActive(false);
    controls.stop();
    
    // Loraが選択されたらURLを保存
    if (lora.lora_url) {
      saveSelectedLoraUrl(lora.lora_url);
    }
  };

  const handleClose = () => {
    setActiveLora(null);
    setIsCarouselActive(true);
    if (autoRotate) {
      autoRotateCarousel();
    }
  };

  // エラー表示
  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  // ローディング表示
  if (loading) {
    return <div className="text-center py-8">{t('carousel.loadingModels')}</div>;
  }

  // モデルがない場合
  if (models.length === 0) {
    return <div className="text-center py-8">{t('carousel.noModelsAvailable')}</div>;
  }

  return (
    <motion.div layout className="relative">
      <div className="flex justify-end mb-2">
        <button 
          onClick={() => setAutoRotate(!autoRotate)}
          className="flex items-center text-sm bg-gray-800/70 hover:bg-gray-700/70 backdrop-blur-sm text-white px-3 py-1 rounded-full z-10"
        >
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${autoRotate ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {autoRotate ? t('carousel.autoRotateOn') : t('carousel.autoRotateOff')}
        </button>
      </div>

      <AnimatePresence mode="sync">
        {activeLora && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeLora.id}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center z-50 p-6 md:p-12"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl border border-gray-800/50">
              <div className="relative pt-8">
                <motion.img
                  layoutId={`img-${activeLora.id}`}
                  src={activeLora.image_url}
                  className="w-full max-h-[60vh] object-contain"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{
                    willChange: "transform",
                  }}
                />
                <button 
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="text-white p-6">
                <h2 className="text-2xl font-bold mb-2">{activeLora.name}</h2>
                {activeLora.author && <p className="text-gray-300 mb-2">{t('myLora.creator')}: {activeLora.author}</p>}
                {activeLora.description && <p className="text-gray-200 mb-4">{activeLora.description}</p>}
                <div className="flex justify-end">
                  <button 
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-md transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Lora selected:", activeLora);
                      handleClose();
                    }}
                  >
                    {t('carousel.useThisLora')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={models}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  );
}

// Carouselコンポーネントは変更なし
const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (lora: Lora, index: number) => void
    controls: any
    cards: Lora[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center bg-transparent"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((lora, i) => (
            <motion.div
              key={`key-${lora.id}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center rounded-xl overflow-hidden"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(lora, i)}
            >
              <motion.img
                src={lora.image_url}
                alt={`${lora.name}`}
                layoutId={`img-${lora.id}`}
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105 hover:opacity-100 cursor-pointer shadow-lg"
                initial={{ filter: "blur(4px)" }}
                animate={{ filter: "blur(0px)", opacity: 0.9 }}
                transition={transition}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

// ThreeDPhotoCarouselという名前でも同じコンポーネントをエクスポート
export const ThreeDPhotoCarousel = ThreeDCarousel; 