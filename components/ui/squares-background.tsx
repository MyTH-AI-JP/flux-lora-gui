"use client"

import { useRef, useEffect, useState } from "react"

interface SquaresProps {
  direction?: "right" | "left" | "up" | "down" | "diagonal"
  speed?: number
  borderColor?: string
  squareSize?: number
  hoverFillColor?: string
  className?: string
  gridColor?: string
  accentColor?: string
  dotSize?: number
  patternDensity?: number
}

export function Squares({
  direction = "diagonal",
  speed = 1,
  borderColor = "#333",
  squareSize = 40,
  hoverFillColor = "#222",
  className,
  gridColor = "#2a2a2a",
  accentColor = "#3b82f6", // blue-500
  dotSize = 1.5,
  patternDensity = 8,
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef<number | null>(null)
  const numSquaresX = useRef<number>(0)
  const numSquaresY = useRef<number>(0)
  const gridOffset = useRef({ x: 0, y: 0 })
  const [hoveredSquare, setHoveredSquare] = useState<{
    x: number
    y: number
  } | null>(null)
  const [mousePosition, setMousePosition] = useState<{x: number, y: number} | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas background
    canvas.style.background = "#060606"

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize

      // メインのグリッド線を描画
      ctx.lineWidth = 0.5
      ctx.strokeStyle = gridColor

      // グリッド線を描画
      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        const squareX = x - (gridOffset.current.x % squareSize)
        ctx.beginPath()
        ctx.moveTo(squareX, 0)
        ctx.lineTo(squareX, canvas.height)
        ctx.stroke()
      }

      for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
        const squareY = y - (gridOffset.current.y % squareSize)
        ctx.beginPath()
        ctx.moveTo(0, squareY)
        ctx.lineTo(canvas.width, squareY)
        ctx.stroke()
      }

      // ドットパターンを描画
      ctx.fillStyle = borderColor
      
      for (let x = startX; x < canvas.width + squareSize; x += squareSize / patternDensity) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize / patternDensity) {
          const dotX = x - (gridOffset.current.x % squareSize)
          const dotY = y - (gridOffset.current.y % squareSize)
          
          if (
            (Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0
          ) {
            ctx.beginPath()
            ctx.arc(dotX, dotY, dotSize / 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // マウスの位置に効果を付ける
      if (mousePosition) {
        const { x, y } = mousePosition
        const radius = squareSize * 3
        
        // グロー効果
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `${accentColor}40`) // 半透明
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        
        // アクセントの円
        ctx.strokeStyle = accentColor
        ctx.lineWidth = 1
        
        // 内側の円
        ctx.beginPath()
        ctx.arc(x, y, squareSize / 2, 0, Math.PI * 2)
        ctx.stroke()
        
        // 外側の円
        ctx.beginPath()
        ctx.arc(x, y, squareSize, 0, Math.PI * 2)
        ctx.stroke()
      }

      // ホバーした四角形を描画
      if (hoveredSquare) {
        const squareX = Math.floor(hoveredSquare.x / squareSize) * squareSize
        const squareY = Math.floor(hoveredSquare.y / squareSize) * squareSize
        
        ctx.fillStyle = hoverFillColor
        ctx.fillRect(squareX, squareY, squareSize, squareSize)
      }

      // 全体にオーバーレイグラデーション
      const overlay = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2)) / 1.5
      )
      overlay.addColorStop(0, "rgba(6, 6, 6, 0)")
      overlay.addColorStop(1, "#060606")

      ctx.fillStyle = overlay
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1)

      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize
          break
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize
          break
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize
          break
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize
          break
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize
          break
      }

      drawGrid()
      requestRef.current = requestAnimationFrame(updateAnimation)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      
      setMousePosition({ x: mouseX, y: mouseY })

      const squareX = Math.floor(mouseX / squareSize) * squareSize
      const squareY = Math.floor(mouseY / squareSize) * squareSize
      
      setHoveredSquare({ x: squareX, y: squareY })
    }

    const handleMouseLeave = () => {
      setMousePosition(null)
      setHoveredSquare(null)
    }

    // Event listeners
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Initial setup
    requestRef.current = requestAnimationFrame(updateAnimation)

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [
    direction, 
    speed, 
    borderColor, 
    hoverFillColor, 
    hoveredSquare, 
    squareSize, 
    gridColor,
    accentColor,
    dotSize,
    patternDensity,
    mousePosition
  ])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none block ${className}`}
    />
  )
} 