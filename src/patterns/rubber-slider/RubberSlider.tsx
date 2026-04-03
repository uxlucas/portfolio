import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const SLIDER_MIN = 0
const SLIDER_MAX = 100
const TRACK_TICKS = 12
const RUBBER_MAX = 18 // max pixels of rubber overstretch

const spring = { stiffness: 300, damping: 28, mass: 0.6 }

export default function RubberSlider() {
  const [value, setValue] = useState(25)
  const [isDragging, setIsDragging] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const [inputText, setInputText] = useState('25')
  const trackRef = useRef<HTMLDivElement>(null)

  // Rubber overstretch amount (-1 to 1, where magnitude > 0 means past bounds)
  const rubberAmount = useMotionValue(0)
  const smoothRubber = useSpring(rubberAmount, spring)

  // Track container shifts when rubber stretching
  const trackShiftX = useTransform(smoothRubber, [-1, 0, 1], [RUBBER_MAX, 0, -RUBBER_MAX])


  const getValueFromPosition = useCallback((clientX: number) => {
    const track = trackRef.current
    if (!track) return value
    const rect = track.getBoundingClientRect()
    const ratio = (clientX - rect.left) / rect.width
    return Math.round(ratio * (SLIDER_MAX - SLIDER_MIN) + SLIDER_MIN)
  }, [value])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    setIsDragging(true)
    const el = e.currentTarget as HTMLElement
    el.setPointerCapture(e.pointerId)

    const raw = getValueFromPosition(e.clientX)
    const clamped = Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, raw))
    setValue(clamped)
    setInputText(String(clamped))

    if (raw < SLIDER_MIN) {
      rubberAmount.set(Math.max(-1, (raw - SLIDER_MIN) / 30))
    } else if (raw > SLIDER_MAX) {
      rubberAmount.set(Math.min(1, (raw - SLIDER_MAX) / 30))
    } else {
      rubberAmount.set(0)
    }
  }, [getValueFromPosition, rubberAmount])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    const raw = getValueFromPosition(e.clientX)
    const clamped = Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, raw))
    setValue(clamped)
    setInputText(String(clamped))

    if (raw < SLIDER_MIN) {
      rubberAmount.set(Math.max(-1, (raw - SLIDER_MIN) / 30))
    } else if (raw > SLIDER_MAX) {
      rubberAmount.set(Math.min(1, (raw - SLIDER_MAX) / 30))
    } else {
      rubberAmount.set(0)
    }
  }, [isDragging, getValueFromPosition, rubberAmount])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
    rubberAmount.set(0)
  }, [rubberAmount])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }, [])

  const handleInputBlur = useCallback(() => {
    setInputFocused(false)
    const num = parseInt(inputText, 10)
    if (!isNaN(num)) {
      const clamped = Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, num))
      setValue(clamped)
      setInputText(String(clamped))
    } else {
      setInputText(String(value))
    }
  }, [inputText, value])

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur()
    }
  }, [])

  // Sync inputText when value changes from drag
  useEffect(() => {
    if (!inputFocused) {
      setInputText(String(value))
    }
  }, [value, inputFocused])

  const ratio = (value - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px',
    }}>
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 280,
          background: 'var(--color-gray-50)',
          border: '1px solid var(--color-gray-300)',
          borderRadius: 14,
          padding: '8px 12px',
          gap: 10,
          position: 'relative',
          overflow: 'hidden',
          x: trackShiftX,
        }}
      >
        {/* Rubber glow at edges */}
        <motion.div style={{
          position: 'absolute',
          top: 0, bottom: 0, left: 0, width: 24,
          background: 'linear-gradient(to right, var(--color-pumpkin-400), transparent)',
          opacity: useTransform(smoothRubber, (v) => v < 0 ? Math.abs(v) * 0.3 : 0),
          pointerEvents: 'none',
          borderRadius: '14px 0 0 14px',
        }} />
        <motion.div style={{
          position: 'absolute',
          top: 0, bottom: 0, right: 0, width: 24,
          background: 'linear-gradient(to left, var(--color-pumpkin-400), transparent)',
          opacity: useTransform(smoothRubber, (v) => v > 0 ? v * 0.3 : 0),
          pointerEvents: 'none',
          borderRadius: '0 14px 14px 0',
        }} />

        {/* Label */}
        <span style={{
          fontSize: 12, color: 'var(--color-gray-500)',
          fontWeight: 400, flexShrink: 0, userSelect: 'none',
          minWidth: 28,
        }}>
          Size
        </span>

        {/* Track area */}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            flex: 1,
            height: 28,
            position: 'relative',
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'none',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Tick marks */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1px',
          }}>
            {Array.from({ length: TRACK_TICKS + 1 }, (_, i) => {
              const tickRatio = i / TRACK_TICKS
              const isNearHandle = Math.abs(tickRatio - ratio) < 0.06
              return (
                <div
                  key={i}
                  style={{
                    width: 1,
                    height: isNearHandle ? 12 : 8,
                    borderRadius: 1,
                    background: tickRatio <= ratio
                      ? 'var(--color-gray-500)'
                      : 'var(--color-gray-300)',
                    transition: 'height 0.15s ease, background 0.15s ease',
                    opacity: isNearHandle ? 1 : 0.7,
                  }}
                />
              )
            })}
          </div>

          {/* Handle */}
          <motion.div
            style={{
              position: 'absolute',
              left: `${ratio * 100}%`,
              transform: 'translateX(-50%)',
              width: 2,
              height: 18,
              borderRadius: 1,
              background: isDragging ? 'var(--color-pumpkin-500)' : 'var(--color-gray-700)',
              transition: isDragging ? 'none' : 'background 0.15s ease',
              zIndex: 2,
            }}
          />
        </div>

        {/* Value input */}
        <input
          type="text"
          inputMode="numeric"
          value={inputText}
          onChange={handleInputChange}
          onFocus={() => { setInputFocused(true); }}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          style={{
            width: 32,
            fontSize: 13,
            fontWeight: 500,
            fontFamily: 'inherit',
            color: inputFocused ? 'var(--color-pumpkin-600)' : 'var(--color-gray-800)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            textAlign: 'right',
            padding: 0,
            flexShrink: 0,
            caretColor: 'var(--color-pumpkin-500)',
          }}
        />
      </motion.div>
    </div>
  )
}
