import { useState } from 'react'
import { motion } from 'framer-motion'
import { MeetingPanel } from './MeetingPanel'
import { ChatPanel } from './ChatPanel'
import styles from './ScieneDemoCard.module.css'

function ResetIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 2v3h3" />
      <path d="M2.1 7.5a4.5 4.5 0 1 0 .4-4L1.5 5" />
    </svg>
  )
}

interface ScieneDemoCardProps {
  title: string
  description: string
}

export function ScieneDemoCard({ title, description }: ScieneDemoCardProps) {
  const [resetKey, setResetKey] = useState(0)

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: 'easeOut' }}
    >
      {/* Off-white card background */}
      <div className={styles.background} />

      {/* Inner content — sits above the background */}
      <div className={styles.inner}>
        {/* Reset button */}
        <button
          className={styles.resetButton}
          onClick={() => setResetKey((k) => k + 1)}
          aria-label="Reset interactions"
        >
          <ResetIcon />
          <span>Reset</span>
        </button>

        {/* App window */}
        <div className={styles.appWindow} key={resetKey}>
          {/* Title bar */}
          <div className={styles.titleBar}>
            <div className={styles.titleBarDots}>
              <span style={{ background: '#FF5F57' }} />
              <span style={{ background: '#FFBD2E' }} />
              <span style={{ background: '#27C93F' }} />
            </div>
            <span className={styles.titleBarTitle}>Sciene Meeting Hub</span>
            <div className={styles.titleBarSpacer} />
          </div>

          {/* Two-panel content */}
          <div className={styles.content}>
            <MeetingPanel />
            <ChatPanel />
          </div>
        </div>

        {/* Title & description inside the card */}
        <div className={styles.cardInfo}>
          <div className={styles.cardTitle}>{title}</div>
          <div className={styles.cardDescription}>{description}</div>
        </div>
      </div>
    </motion.div>
  )
}
