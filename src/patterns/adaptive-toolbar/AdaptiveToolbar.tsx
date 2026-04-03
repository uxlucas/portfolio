import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const spring = { stiffness: 260, damping: 24, mass: 0.8 }
const labelTransition = { duration: 0.18, ease: 'easeOut' as const }

function CursorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2.5 3.5 11l2.5-2.5L9 12.5l1.5-.5L7.5 8 11 7z" />
    </svg>
  )
}

function LayoutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="12" height="12" rx="2" />
      <path d="M2 6h12M6 6v8" />
    </svg>
  )
}

function MotionIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c2-4 4-8 6-8s4 4 6 0" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="2" />
      <path d="M8 2v2M8 12v2M2 8h2M12 8h2M3.8 3.8l1.4 1.4M10.8 10.8l1.4 1.4M3.8 12.2l1.4-1.4M10.8 5.2l1.4-1.4" />
    </svg>
  )
}

const tools = [
  { id: 'select', label: 'Select', icon: CursorIcon },
  { id: 'layout', label: 'Layout', icon: LayoutIcon },
  { id: 'motion', label: 'Motion', icon: MotionIcon },
  { id: 'config', label: 'Config', icon: SettingsIcon },
]

export default function AdaptiveToolbar() {
  const [active, setActive] = useState('select')
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        layout
        transition={spring}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          padding: 3,
          borderRadius: 12,
          background: 'var(--color-gray-100)',
          border: '1px solid var(--color-gray-300)',
        }}
      >
        {tools.map((tool) => {
          const Icon = tool.icon
          const isActive = active === tool.id

          return (
            <motion.button
              key={tool.id}
              onClick={() => setActive(tool.id)}
              layout
              transition={spring}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: hovered || isActive ? 4 : 0,
                padding: hovered || isActive ? '5px 8px' : '5px 7px',
                borderRadius: 9,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: isActive ? 'var(--color-gray-800)' : 'var(--color-gray-500)',
                fontFamily: 'inherit',
                fontSize: 10.5,
                fontWeight: 400,
                whiteSpace: 'nowrap',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
              }}
            >
              {/* Active background pill */}
              {isActive && (
                <motion.div
                  layoutId="toolbar-bg"
                  transition={spring}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 9,
                    background: 'var(--color-gray-50)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    zIndex: 0,
                  }}
                />
              )}

              {/* Pumpkin dot */}
              {isActive && (
                <motion.div
                  layoutId="toolbar-dot"
                  transition={spring}
                  style={{
                    position: 'absolute',
                    bottom: 1,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 3,
                    height: 3,
                    borderRadius: '50%',
                    background: 'var(--color-pumpkin-500)',
                    zIndex: 2,
                  }}
                />
              )}

              {/* Icon */}
              <motion.span
                layout
                transition={spring}
                style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center' }}
              >
                <Icon />
              </motion.span>

              {/* Label — all tools on hover, active tool always on mobile */}
              <AnimatePresence>
                {(hovered || isActive) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={labelTransition}
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      overflow: 'hidden',
                      color: isActive ? 'var(--color-gray-800)' : 'var(--color-gray-500)',
                    }}
                  >
                    {tool.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
