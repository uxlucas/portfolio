import { motion } from 'framer-motion'
import styles from './ExperienceCard.module.css'

const float = (delay: number, duration: number, y: number) => ({
  y: [0, y, 0],
  transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' as const },
})

function CameraIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="4" width="13" height="9" rx="1.5" />
      <path d="M5.5 4 6.5 2h3l1 2" />
      <circle cx="8" cy="8.5" r="2.5" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className={styles.arrow} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9 9 3M5 3h4v4" />
    </svg>
  )
}

export function ExperienceCard() {
  return (
    <motion.a
      href="https://moments-abroad.netlify.app/"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      whileHover={{ scale: 1.01, y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Ambient gradient area */}
      <div className={styles.ambient}>
        <div className={styles.gradientLayer} />

        {/* Floating orbs */}
        <motion.div
          className={`${styles.floatingOrb} ${styles.orb1}`}
          animate={float(0, 5, -6)}
        />
        <motion.div
          className={`${styles.floatingOrb} ${styles.orb2}`}
          animate={float(1.5, 4, -5)}
        />
        <motion.div
          className={`${styles.floatingOrb} ${styles.orb3}`}
          animate={float(0.8, 6, -4)}
        />

        {/* Center icon */}
        <div className={styles.iconWrap}>
          <CameraIcon />
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.label}>Experience</div>
        <div className={styles.title}>Travel Memories</div>
        <div className={styles.description}>
          A photo album of places and moments. Dreamy clouds, warm light, quiet beaches.
        </div>
        <div className={styles.footer}>
          <span className={styles.cta}>
            View experience
            <ArrowIcon />
          </span>
          <span className={styles.tag}>Photography</span>
        </div>
      </div>
    </motion.a>
  )
}
