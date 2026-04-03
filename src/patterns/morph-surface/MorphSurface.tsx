import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const springConfig = { stiffness: 200, damping: 24, mass: 0.6 }

function EditIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.5 1.5a2.12 2.12 0 0 1 3 3L5 14l-4 1 1-4z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 1.5 2 4 4.5.7-3.3 3.1.8 4.5L8 11.5l-4 2.3.8-4.5L1.5 6.2 6 5.5z" />
    </svg>
  )
}

function ArchiveIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="2" width="14" height="4" rx="1" />
      <path d="M2 6v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6M6.5 9.5h3" />
    </svg>
  )
}

export default function MorphSurface() {
  const containerRef = useRef<HTMLDivElement>(null)
  const proximity = useMotionValue(1)
  const smoothProximity = useSpring(proximity, springConfig)

  const actionOpacity = useTransform(smoothProximity, [0.35, 0.18], [0, 1])
  const actionX = useTransform(smoothProximity, [0.35, 0.18], [8, 0])

  const borderColor = useTransform(
    smoothProximity,
    [0.4, 0.15],
    ['var(--color-gray-300)', 'var(--color-gray-400)'],
  )

  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const cardRect = cardRef.current?.getBoundingClientRect()
      if (!cardRect) return
      // Distance from the card edge (not center) — 0 when inside/near, increases when far
      const dx = Math.max(0, cardRect.left - e.clientX, e.clientX - cardRect.right)
      const dy = Math.max(0, cardRect.top - e.clientY, e.clientY - cardRect.bottom)
      const containerRect = containerRef.current?.getBoundingClientRect()
      if (!containerRect) return
      const maxDist = Math.max(containerRect.width, containerRect.height) * 0.5
      proximity.set(Math.sqrt(dx * dx + dy * dy) / maxDist)
    },
    [proximity],
  )

  const handleMouseLeave = useCallback(() => {
    proximity.set(1)
  }, [proximity])

  const actions = [
    { icon: EditIcon, label: 'Edit' },
    { icon: StarIcon, label: 'Star' },
    { icon: ArchiveIcon, label: 'Archive' },
  ]

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
        padding: 12,
      }}
    >
      <div ref={cardRef} style={{ display: 'flex', alignItems: 'start', gap: 6, width: '100%' }}>
        {/* Email-like content card */}
        <motion.div
          style={{
            flex: 1,
            padding: '14px 16px',
            borderRadius: 10,
            background: 'var(--color-gray-50)',
            border: '1px solid',
            borderColor,
          }}
        >
          {/* Header row: avatar + sender */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'var(--color-pumpkin-100)',
              border: '1px solid var(--color-pumpkin-200)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 600, color: 'var(--color-pumpkin-600)',
            }}>
              A
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-gray-800)', lineHeight: 1.2 }}>
                Anna Cooper
              </div>
              <div style={{ fontSize: 9, color: 'var(--color-gray-400)', marginTop: 1 }}>
                2 min ago
              </div>
            </div>
          </div>

          {/* Subject */}
          <div style={{
            fontSize: 11, fontWeight: 500, color: 'var(--color-gray-700)',
            marginBottom: 4, lineHeight: 1.3,
          }}>
            Design review notes
          </div>

          {/* Preview text */}
          <div style={{
            fontSize: 10, color: 'var(--color-gray-500)',
            lineHeight: 1.5, marginBottom: 10,
          }}>
            Hey Lucas, I left some feedback on the latest iteration. The spacing on the header feels much better now...
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 4 }}>
            <span style={{
              fontSize: 9, padding: '2px 6px', borderRadius: 4,
              background: 'var(--color-gray-100)', color: 'var(--color-gray-500)',
              border: '1px solid var(--color-gray-200)',
            }}>
              Design
            </span>
            <span style={{
              fontSize: 9, padding: '2px 6px', borderRadius: 4,
              background: 'var(--color-pumpkin-50)', color: 'var(--color-pumpkin-600)',
              border: '1px solid var(--color-pumpkin-100)',
            }}>
              Review
            </span>
          </div>
        </motion.div>

        {/* Action bar — slides in from the right on proximity */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            opacity: actionOpacity,
            x: actionX,
            paddingTop: 14,
          }}
        >
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.08, backgroundColor: 'var(--color-gray-200)' }}
                transition={{ duration: 0.12 }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  border: '1px solid var(--color-gray-300)',
                  background: 'var(--color-gray-50)',
                  color: 'var(--color-gray-500)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                }}
                aria-label={action.label}
              >
                <Icon />
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
