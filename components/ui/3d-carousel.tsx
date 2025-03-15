"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState, useCallback } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { useApi } from "@/contexts/ApiContext"
import { getLoraModels, LoraModel } from "@/lib/supabase"

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

function ThreeDPhotoCarousel() {
  const [activeLora, setActiveLora] = useState<Lora | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const [autoRotate, setAutoRotate] = useState(true) 
  const controls = useAnimation()
  const [cards, setCards] = useState<Lora[]>([])
  const rotation = useMotionValue(0)
  const { saveSelectedLoraUrl } = useApi()

  // Supabaseからデータを取得
  useEffect(() => {
    async function loadLoraModels() {
      try {
        // Supabaseからデータを取得
        const models = await getLoraModels();
        setCards(models);
        console.log("Lora models loaded:", models);
      } catch (error) {
        console.error("Error loading Lora models:", error);
      }
    }
    
    loadLoraModels();
  }, []);

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
      })
    } else {
      controls.stop()
    }
  }, [autoRotate, isCarouselActive, controls, rotation])

  // 自動回転を開始/停止
  useEffect(() => {
    autoRotateCarousel()
  }, [autoRotate, isCarouselActive, autoRotateCarousel])

  const handleClick = (lora: Lora) => {
    setActiveLora(lora)
    setIsCarouselActive(false)
    controls.stop()
    
    // Loraが選択されたらURLを保存
    if (lora.lora_url) {
      saveSelectedLoraUrl(lora.lora_url)
    }
  }

  const handleClose = () => {
    setActiveLora(null)
    setIsCarouselActive(true)
    if (autoRotate) {
      autoRotateCarousel()
    }
  }

  return (
    <motion.div layout className="relative">
      <div className="flex justify-end mb-2">
        <button 
          onClick={() => setAutoRotate(!autoRotate)}
          className="flex items-center text-sm bg-gray-800/70 hover:bg-gray-700/70 backdrop-blur-sm text-white px-3 py-1 rounded-full z-10"
        >
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${autoRotate ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {autoRotate ? '自動回転: ON' : '自動回転: OFF'}
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
              <div className="relative">
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
                {activeLora.author && <p className="text-gray-300 mb-2">作者: {activeLora.author}</p>}
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
                    このLoraを使用する
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
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel }; 