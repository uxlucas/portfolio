import { motion } from 'framer-motion'
import styles from './Hero.module.css'

export type Section = 'explorations' | 'experiences'

const float = (delay: number, duration: number, y: number) => ({
  y: [0, y, 0],
  transition: {
    duration,
    delay,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
})

interface HeroProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <path d="m10.5 5.5-1.7 3.3-3.3 1.7 1.7-3.3z" />
    </svg>
  )
}

function WindowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="3.5" width="11" height="9" rx="1.5" />
      <path d="M2.5 6.5h11" />
    </svg>
  )
}

const tabs: { id: Section; label: string; icon: React.ComponentType }[] = [
  { id: 'explorations', label: 'Explorations', icon: CompassIcon },
  { id: 'experiences', label: 'Experiences', icon: WindowIcon },
]

export function Hero({ activeSection, onSectionChange }: HeroProps) {
  return (
    <header className={styles.hero}>
      <div className={styles.shapes}>
        <motion.div className={styles.toggle} animate={float(0, 6, -10)} />
        <motion.div className={styles.slider} animate={float(1.2, 5.5, -8)} />
        <motion.div className={styles.cardSurface} animate={float(0.6, 7, -6)} />
        <motion.div className={styles.segmented} animate={float(2, 5, -9)} />
        <motion.div className={styles.checkbox} animate={float(1.8, 6.5, -7)} />
        <motion.div className={styles.cursor} animate={float(0.4, 4.5, -5)} />
        <motion.div className={styles.miniBtn} animate={float(2.2, 5.8, -8)} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          A quiet space for
          <br />
          ideas in motion
        </h1>
        <p className={styles.subtitle}>
          Exploring interaction, motion, and feel.
          <br />
          One pattern at a time.
        </p>

        <div className={styles.tabs}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`${styles.tab} ${activeSection === id ? styles.tabActive : ''}`}
              onClick={() => onSectionChange(id)}
            >
              {activeSection === id && (
                <motion.div
                  className={styles.tabIndicator}
                  layoutId="tab-indicator"
                  transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
                />
              )}
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
