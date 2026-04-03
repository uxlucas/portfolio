import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'
import type { Page } from './Nav'
import styles from './Professional.module.css'

interface CaseStudy {
  id: string
  title: string
  description: string
  image: string
  logo?: string
  href?: Page
  locked?: boolean
}

const cases: CaseStudy[] = [
  {
    id: 'sciene',
    title: 'Sciene',
    description: 'A customer intelligence platform that helps teams turn conversations into actionable insights.',
    image: '/sciene-cover.png',
    logo: '/Sciene_logo.svg',
    href: 'sciene',
  },
  {
    id: 'traktive',
    title: 'Traktive',
    description: 'An AI-powered platform streamlining rail operations with real-time visibility and cost intelligence.',
    image: '/traktive-cover.png',
    href: 'traktive',
  },
  {
    id: 'quartile',
    title: 'Quartile',
    description: 'AI-driven advertising platform optimizing e-commerce performance at scale for over 2000 businesses.',
    image: '/quartile-cover.png',
    locked: true,
  },
  {
    id: 'farmrio',
    title: 'Farm Rio',
    description: 'Expanding Farm Rio\'s operations across Latin America.',
    image: '/farm-rio-cover.png',
    logo: '/farm-rio-logo.svg',
    locked: true,
  },
]

function CaseCard({ study, i, onNavigate }: { study: CaseStudy; i: number; onNavigate?: (page: Page) => void }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!study.locked) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true })
  }, [study.locked])

  return (
    <motion.article
      className={`${styles.card} ${study.href ? styles.cardClickable : ''} ${study.locked ? styles.cardLocked : ''}`}
      onClick={() => !study.locked && study.href && onNavigate?.(study.href)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => study.locked && setMouse((m) => ({ ...m, active: true }))}
      onMouseLeave={() => study.locked && setMouse((m) => ({ ...m, active: false }))}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: 'easeOut', delay: i * 0.06 }}
    >
      <div className={styles.imageWrap}>
        <img
          src={study.image}
          alt={study.title}
          className={styles.image}
          draggable={false}
        />
        {!study.locked && (
          <div className={styles.hoverOverlay}>
            {study.logo ? (
              <img src={study.logo} alt={study.title} className={styles.hoverLogo} />
            ) : (
              <span className={styles.hoverTitle}>{study.title}</span>
            )}
          </div>
        )}
        {study.locked && (
          <div className={styles.lockedBadge}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="7" width="10" height="7" rx="1.5" />
              <path d="M5 7V5a3 3 0 0 1 6 0v2" />
            </svg>
          </div>
        )}
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.cardTitle}>{study.title}</span>
        <div className={styles.cardDescription}>{study.description}</div>
      </div>
      {study.locked && mouse.active && (
        <div
          className={styles.lockedTooltip}
          style={{ left: mouse.x, top: mouse.y }}
        >
          Case study locked
        </div>
      )}
    </motion.article>
  )
}

function GradientHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const rawX = useMotionValue(-20)
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.8 })
  const [ready, setReady] = useState(false)

  // Sync spring value to CSS custom property
  useEffect(() => {
    const unsubscribe = x.on('change', (v) => {
      textRef.current?.style.setProperty('--gradient-x', String(v))
    })
    return unsubscribe
  }, [x])

  // Initial sweep animation
  useEffect(() => {
    const controls = animate(rawX, 50, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
    })
    const timer = setTimeout(() => setReady(true), 1900)
    return () => {
      controls.stop()
      clearTimeout(timer)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current || !ready) return
    const rect = heroRef.current.getBoundingClientRect()
    const pct = ((e.clientX - rect.left) / rect.width) * 100
    rawX.set(pct)
  }, [ready, rawX])

  const handleMouseLeave = useCallback(() => {
    rawX.set(50)
  }, [rawX])

  return (
    <motion.div
      ref={heroRef}
      className={styles.hero}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <h1 className={styles.heroName}>
        <span ref={textRef} className={styles.heroGradientText}>
          Lucas is a Senior Product Designer crafting kick-ass interfaces rooted in empathy
        </span>
      </h1>
      <motion.p
        className={styles.heroSub}
        initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
      >
        Currently shaping end-to-end design for enterprise AI at Sciene.
      </motion.p>
    </motion.div>
  )
}

function BentoGrid() {
  return (
    <div className={styles.bento}>
      {/* Col 1: anchor */}
      <motion.div
        className={`${styles.bentoTile} ${styles.bentoAnchor}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      >
        <div className={styles.bentoValueLg}>10M+</div>
        <div className={styles.bentoLabel}>Users impacted</div>
        <div className={styles.bentoDesc}>Across B2B and B2C SaaS, fintech, e-commerce and AI Tools</div>
      </motion.div>

      {/* Col 2: revenue */}
      <motion.div
        className={`${styles.bentoTile} ${styles.bentoTall}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
      >
        <div className={styles.bentoValueLg}>$50M+</div>
        <div className={styles.bentoLabel}>Revenue influenced</div>
        <div className={styles.bentoDesc}>Through product-led design decisions</div>
      </motion.div>

      {/* Col 3: stacked pair */}
      <div className={styles.bentoStack}>
        <motion.div
          className={styles.bentoTile}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
        >
          <div className={styles.bentoLabelTop}>0 → 1 products</div>
          <div className={styles.bentoValueLg}>10+</div>
        </motion.div>

        <motion.div
          className={styles.bentoTile}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.25 }}
        >
          <div className={styles.bentoValueLg}>6 years</div>
          <div className={styles.bentoLabel}>in the game</div>
        </motion.div>
      </div>

      {/* Col 4: components */}
      <motion.div
        className={`${styles.bentoTile} ${styles.bentoNarrow}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
      >
        <div className={styles.bentoValueLg}>150+</div>
        <div className={styles.bentoLabel}>Components designed</div>
      </motion.div>
    </div>
  )
}

function PhilosophySection() {
  const [revealed, setRevealed] = useState(false)

  return (
    <motion.div
      className={styles.philosophy}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.philoLabel}>Design philosophy</div>

      <div className={styles.philoContent}>
        <h2 className={styles.philoHeading}>
          Great design is{' '}
          <span
            className={`${styles.philoReveal} ${revealed ? styles.philoRevealed : ''}`}
            onMouseEnter={() => setRevealed(true)}
            onMouseLeave={() => setRevealed(false)}
          >
            hard to see.
          </span>
        </h2>
        <p className={styles.philoBody}>
          I don't aim for visual noise or flashy interactions. I aim for clarity, structure, and decisions that remove friction. The goal isn't to impress, it's to make things feel obvious.
        </p>
        <p className={styles.philoBody} style={{ marginTop: 12 }}>
          When the experience works, design disappears. That's the standard.
        </p>
      </div>
    </motion.div>
  )
}

const tools = [
  { name: 'Figma', image: '/figma-card.png' },
  { name: 'Claude', image: '/claude-card.png' },
  { name: 'Cursor', image: '/cursor-card.png' },
]

function ToolsSection() {
  return (
    <motion.div
      className={styles.toolsSection}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.toolsLabel}>Currently working with</div>
      <div className={styles.toolsGrid}>
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            className={styles.toolCard}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 + i * 0.06 }}
          >
            <img src={tool.image} alt={tool.name} className={styles.toolImage} draggable={false} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export function Professional({ onNavigate }: { onNavigate?: (page: Page) => void }) {
  return (
    <div className={styles.page}>
      <GradientHero />
      <BentoGrid />
      <PhilosophySection />

      <div className={styles.grid}>
        {cases.map((study, i) => (
          <CaseCard key={study.id} study={study} i={i} onNavigate={onNavigate} />
        ))}
      </div>

      <ToolsSection />
    </div>
  )
}
