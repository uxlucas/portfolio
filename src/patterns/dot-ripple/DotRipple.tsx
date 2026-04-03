import { useRef, useState, useCallback, useEffect } from 'react'

interface Ripple {
  id: number
  x: number
  y: number
  time: number
}

const COLS = 36
const ROWS = 28
const DOT_SIZE = 3
const GAP = 9
const RIPPLE_SPEED = 0.22 // pixels per ms
const RIPPLE_WIDTH = 60 // width of the wave band in pixels
const RIPPLE_DECAY = 1800 // ms until ripple fully fades
const MAX_LIFT = 1.8 // max scale multiplier at wave peak

let nextId = 0

export default function DotRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const ripplesRef = useRef<Ripple[]>([])
  const animRef = useRef(0)
  const [, setTick] = useState(0) // force initial render

  const addRipple = useCallback((clientX: number, clientY: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    ripplesRef.current.push({
      id: nextId++,
      x: clientX - rect.left,
      y: clientY - rect.top,
      time: performance.now(),
    })
  }, [])

  const handleClick = useCallback((e: React.MouseEvent) => {
    addRipple(e.clientX, e.clientY)
  }, [addRipple])

  const handleTouch = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0]
    if (t) addRipple(t.clientX, t.clientY)
  }, [addRipple])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Handle DPR
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const draw = (now: number) => {
      const w = container.clientWidth
      const h = container.clientHeight
      ctx.clearRect(0, 0, w, h)

      const { ox, oy } = {
        ox: (w - (COLS - 1) * GAP) / 2,
        oy: (h - (ROWS - 1) * GAP) / 2,
      }

      // Get computed colors
      const style = getComputedStyle(container)
      const baseColor = style.getPropertyValue('--color-gray-400').trim() || '#dfd9d1'
      const accentColor = style.getPropertyValue('--color-pumpkin-500').trim() || '#ff6f0a'

      // Clean up dead ripples
      ripplesRef.current = ripplesRef.current.filter((r) => now - r.time < RIPPLE_DECAY)

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const dx = ox + col * GAP
          const dy = oy + row * GAP

          let scale = 1
          let blend = 0 // 0 = base, 1 = accent

          for (const ripple of ripplesRef.current) {
            const dist = Math.sqrt((dx - ripple.x) ** 2 + (dy - ripple.y) ** 2)
            const elapsed = now - ripple.time
            const waveFront = elapsed * RIPPLE_SPEED
            const distFromFront = Math.abs(dist - waveFront)

            if (distFromFront < RIPPLE_WIDTH) {
              const age = elapsed / RIPPLE_DECAY
              const fade = Math.max(0, 1 - age)
              const wave = Math.cos((distFromFront / RIPPLE_WIDTH) * Math.PI * 0.5)
              const intensity = wave * fade

              scale = Math.max(scale, 1 + (MAX_LIFT - 1) * intensity)
              blend = Math.max(blend, intensity)
            }
          }

          const r = (DOT_SIZE / 2) * scale

          // Interpolate color
          if (blend > 0.01) {
            ctx.fillStyle = accentColor
            ctx.globalAlpha = blend
            ctx.beginPath()
            ctx.arc(dx, dy, r, 0, Math.PI * 2)
            ctx.fill()

            ctx.fillStyle = baseColor
            ctx.globalAlpha = 1 - blend
            ctx.beginPath()
            ctx.arc(dx, dy, r, 0, Math.PI * 2)
            ctx.fill()

            ctx.globalAlpha = 1
          } else {
            ctx.fillStyle = baseColor
            ctx.globalAlpha = 0.5
            ctx.beginPath()
            ctx.arc(dx, dy, r, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalAlpha = 1
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, [])

  // Force a re-render to start animation
  useEffect(() => setTick(1), [])

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onTouchStart={handleTouch}
      style={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
