import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_DAYS = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export default function RadioDial() {
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const maxDay = MONTH_DAYS[month]

  const goToDay = useCallback((d: number) => {
    setDirection(d > day ? 1 : -1)
    setDay(d)
  }, [day])

  const prevDay = useCallback(() => {
    setDirection(-1)
    setDay((d) => (d <= 1 ? maxDay : d - 1))
  }, [maxDay])

  const nextDay = useCallback(() => {
    setDirection(1)
    setDay((d) => (d >= maxDay ? 1 : d + 1))
  }, [maxDay])

  const prevMonth = useCallback(() => {
    setMonth((m) => (m <= 0 ? 11 : m - 1))
    setDay(1)
    setDirection(-1)
  }, [])

  const nextMonth = useCallback(() => {
    setMonth((m) => (m >= 11 ? 0 : m + 1))
    setDay(1)
    setDirection(1)
  }, [])

  // Clamp day if month changes and day exceeds max
  const clampedDay = Math.min(day, maxDay)

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 16, padding: 16,
      userSelect: 'none',
    }}>

      {/* Month selector */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button onClick={prevMonth} style={arrowBtnStyle} aria-label="Previous month">
          <ChevronLeft />
        </button>
        <div style={{ width: 90, textAlign: 'center', position: 'relative', height: 18, overflow: 'hidden' }}>
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.span
              key={month}
              custom={direction}
              variants={monthVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                fontSize: 12, fontWeight: 500,
                color: 'var(--color-gray-700)',
                letterSpacing: '-0.01em',
                position: 'absolute', left: 0, right: 0,
              }}
            >
              {MONTHS[month]}
            </motion.span>
          </AnimatePresence>
        </div>
        <button onClick={nextMonth} style={arrowBtnStyle} aria-label="Next month">
          <ChevronRight />
        </button>
      </div>

      {/* Calendar card with flip */}
      <div style={{
        width: 110, height: 110,
        borderRadius: 16,
        background: 'var(--color-gray-50)',
        border: '1px solid var(--color-gray-200)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}>
        {/* Red header strip */}
        <div style={{
          height: 28, flexShrink: 0,
          background: 'linear-gradient(135deg, #E8553A 0%, #D94425 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {MONTHS[month]}
          </span>
        </div>

        {/* Day number with flip animation */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={`${month}-${clampedDay}`}
              custom={direction}
              variants={flipVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                position: 'absolute',
                fontSize: 44, fontWeight: 500,
                color: 'var(--color-gray-900)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              {clampedDay}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Day slider */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        width: '100%', maxWidth: 200,
      }}>
        <button onClick={prevDay} style={arrowBtnStyle} aria-label="Previous day">
          <ChevronLeft />
        </button>

        <div style={{ flex: 1, position: 'relative', height: 28, display: 'flex', alignItems: 'center' }}>
          <input
            type="range"
            min={1}
            max={maxDay}
            value={clampedDay}
            onChange={(e) => goToDay(Number(e.target.value))}
            style={{
              width: '100%', height: 4, appearance: 'none', WebkitAppearance: 'none',
              background: `linear-gradient(to right, var(--color-pumpkin-500) 0%, var(--color-pumpkin-500) ${((clampedDay - 1) / (maxDay - 1)) * 100}%, var(--color-gray-200) ${((clampedDay - 1) / (maxDay - 1)) * 100}%, var(--color-gray-200) 100%)`,
              borderRadius: 2, outline: 'none', cursor: 'pointer',
            }}
          />
        </div>

        <button onClick={nextDay} style={arrowBtnStyle} aria-label="Next day">
          <ChevronRight />
        </button>
      </div>

      {/* Day labels */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        width: '100%', maxWidth: 200, padding: '0 28px',
      }}>
        <span style={{ fontSize: 9, color: 'var(--color-gray-400)' }}>1</span>
        <span style={{ fontSize: 9, color: 'var(--color-gray-400)' }}>{maxDay}</span>
      </div>
    </div>
  )
}

// ── Animation variants ──

const flipVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? 40 : -40,
    opacity: 0,
    rotateX: dir > 0 ? -45 : 45,
    scale: 0.9,
  }),
  center: {
    y: 0, opacity: 1, rotateX: 0, scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -40 : 40,
    opacity: 0,
    rotateX: dir > 0 ? 45 : -45,
    scale: 0.9,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

const monthVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 30 : -30, opacity: 0,
  }),
  center: {
    x: 0, opacity: 1,
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -30 : 30, opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  }),
}

// ── Styles ──

const arrowBtnStyle: React.CSSProperties = {
  width: 24, height: 24,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  borderRadius: 6, border: 'none',
  background: 'none', cursor: 'pointer',
  color: 'var(--color-gray-400)',
  padding: 0, flexShrink: 0,
}

// ── Icons ──

function ChevronLeft() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3L5 8l5 5" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3l5 5-5 5" />
    </svg>
  )
}
