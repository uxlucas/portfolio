import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const containerSpring = { type: 'spring' as const, stiffness: 200, damping: 28, mass: 1 }
const SETTLE_DELAY = 200
const ITEM_STAGGER = 40
const COLLAPSE_DURATION = 150

interface Task {
  id: string
  label: string
}

const initialTasks: Task[] = [
  { id: 'a', label: 'Adjust easing curves' },
  { id: 'b', label: 'Reduce bounce overshoot' },
  { id: 'c', label: 'Test transition timing' },
  { id: 'd', label: 'Ship final polish' },
]

type Phase = 'idle' | 'expanding' | 'expanded' | 'collapsing' | 'complete'

export default function TaskCapsule() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [itemsVisible, setItemsVisible] = useState(false)
  const capsuleRef = useRef<HTMLDivElement>(null)

  const checkedCount = checked.size
  const totalCount = initialTasks.length
  const allDone = checkedCount === totalCount
  const progress = checkedCount / totalCount

  const isOpen = phase === 'expanding' || phase === 'expanded'
  const isComplete = phase === 'complete'

  // Progress ring animation
  const progressDash = useSpring(0, { stiffness: 300, damping: 30 })
  const progressStrokeDash = useTransform(progressDash, (d) => `${d} 44`)
  useEffect(() => { progressDash.set(progress * 44) }, [progress, progressDash])

  // Completion check scale
  const checkScale = useMotionValue(0)
  const smoothCheck = useSpring(checkScale, containerSpring)

  const toggleTask = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // Expand
  const handleClick = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('expanding')
    setTimeout(() => {
      setItemsVisible(true)
      setPhase('expanded')
    }, SETTLE_DELAY)
  }, [phase])

  // Collapse
  const collapse = useCallback(() => {
    if (phase !== 'expanded') return
    setPhase('collapsing')
    setItemsVisible(false)
    setTimeout(() => setPhase('idle'), COLLAPSE_DURATION + 350)
  }, [phase])

  // Click outside
  useEffect(() => {
    if (phase !== 'expanded') return
    const handler = (e: MouseEvent) => {
      if (capsuleRef.current && !capsuleRef.current.contains(e.target as Node)) {
        collapse()
      }
    }
    const t = setTimeout(() => document.addEventListener('pointerdown', handler), 100)
    return () => { clearTimeout(t); document.removeEventListener('pointerdown', handler) }
  }, [phase, collapse])

  // All done → completion
  useEffect(() => {
    if (allDone && phase === 'expanded') {
      setItemsVisible(false)
      setTimeout(() => {
        checkScale.set(1)
        setPhase('complete')
      }, COLLAPSE_DURATION + 150)
    }
  }, [allDone, phase, checkScale])

  // Complete → reset
  useEffect(() => {
    if (phase === 'complete') {
      const timer = setTimeout(() => {
        checkScale.set(0)
        setPhase('idle')
        setChecked(new Set())
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [phase, checkScale])

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <motion.div
        ref={capsuleRef}
        onClick={handleClick}
        animate={{
          width: isOpen ? 220 : 'auto',
          borderRadius: isOpen ? 16 : 24,
          padding: isOpen ? '14px 16px' : '10px 16px',
        }}
        transition={containerSpring}
        style={{
          background: 'var(--color-gray-800)',
          cursor: phase === 'idle' ? 'pointer' : 'default',
          overflow: 'hidden',
          transformOrigin: 'top center',
        }}
      >
        {/* ── Header — always present ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          {/* Progress ring / check */}
          <div style={{
            width: 18, height: 18, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, position: 'relative',
          }}>
            {/* Ring */}
            <svg
              width="18" height="18" viewBox="0 0 18 18"
              style={{
                position: 'absolute',
                opacity: isComplete ? 0 : 1,
                transition: 'opacity 0.2s ease',
              }}
            >
              <circle cx="9" cy="9" r="7" fill="none" stroke="var(--color-gray-600)" strokeWidth="1.5" />
              <motion.circle
                cx="9" cy="9" r="7" fill="none"
                stroke="var(--color-pumpkin-500)"
                strokeWidth="1.5" strokeLinecap="round"
                style={{ strokeDasharray: progressStrokeDash }}
                transform="rotate(-90 9 9)"
              />
            </svg>

            {/* Check — scales in */}
            <motion.div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'var(--color-pumpkin-500)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              scale: smoothCheck,
            }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2.5 5.2 4.2 7 7.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </div>

          {/* Title */}
          <span style={{
            fontSize: 12, fontWeight: 500,
            color: isComplete ? 'var(--color-pumpkin-400)' : 'var(--color-gray-100)',
            whiteSpace: 'nowrap', userSelect: 'none', flex: 1,
            transition: 'color 0.25s ease',
          }}>
            {isComplete ? 'Motion refined' : 'Refining motion'}
          </span>

          {/* Counter */}
          <span style={{
            fontSize: 10, color: 'var(--color-gray-500)',
            whiteSpace: 'nowrap',
            opacity: isComplete ? 0 : 1,
            transition: 'opacity 0.2s ease',
          }}>
            {checkedCount}/{totalCount}
          </span>
        </div>

        {/* ── Checklist ── */}
        <motion.div
          animate={{
            height: isOpen ? 'auto' : 0,
            marginTop: isOpen ? 10 : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={containerSpring}
          style={{ overflow: 'hidden' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {initialTasks.map((task, i) => {
              const isChecked = checked.has(task.id)
              return (
                <motion.button
                  key={task.id}
                  animate={{
                    opacity: itemsVisible ? 1 : 0,
                    y: itemsVisible ? 0 : 6,
                  }}
                  transition={{
                    duration: 0.18,
                    ease: 'easeOut',
                    delay: itemsVisible ? i * (ITEM_STAGGER / 1000) : (initialTasks.length - 1 - i) * 0.02,
                  }}
                  onClick={(e) => { e.stopPropagation(); toggleTask(task.id) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 4px', height: 32,
                    border: 'none', background: 'transparent',
                    cursor: 'pointer', borderRadius: 6,
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent'
                  }}
                >
                  <div style={{
                    width: 14, height: 14, borderRadius: 4,
                    border: `1.5px solid ${isChecked ? 'var(--color-pumpkin-500)' : 'var(--color-gray-600)'}`,
                    background: isChecked ? 'var(--color-pumpkin-500)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'all 0.15s ease',
                  }}>
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none"
                      style={{ transform: isChecked ? 'scale(1)' : 'scale(0)', transition: 'transform 0.12s ease' }}
                    >
                      <path d="M2.5 5.2 4.2 7 7.5 3.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{
                    fontSize: 11,
                    color: isChecked ? 'var(--color-gray-500)' : 'var(--color-gray-300)',
                    textDecoration: isChecked ? 'line-through' : 'none',
                    transition: 'color 0.15s ease', textAlign: 'left',
                  }}>
                    {task.label}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
