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

// 3Dカルーセルのメインコンポーネント
export default function ThreeDCarousel() {
  const [models, setModels] = useState<LoraModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // コンポーネントマウント時にLoraモデルを読み込み
  useEffect(() => {
    loadLoraModels();
  }, []);

  // Supabaseからモデルデータを取得
  const loadLoraModels = async () => {
    try {
      setLoading(true);
      // カルーセルモデルを取得
      const carouselModels = await getCarouselModels();
      
      // カルーセルモデルからLoraモデル情報を抽出
      const loraModels = carouselModels
        .filter(cm => cm.lora_model) // lora_modelが存在するもののみ
        .map(cm => cm.lora_model as LoraModel); // lora_modelを抽出
      
      setModels(loraModels);
    } catch (err) {
      console.error('Error loading Lora models:', err);
      setError('モデルの読み込み中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // エラー表示
  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  // ローディング表示
  if (loading) {
    return <div className="text-center py-8">モデルを読み込み中...</div>;
  }

  // モデルがない場合
  if (models.length === 0) {
    return <div className="text-center py-8">表示できるモデルがありません</div>;
  }

  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <Carousel models={models} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
} 