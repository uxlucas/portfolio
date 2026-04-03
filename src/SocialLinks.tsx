import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './SocialLinks.module.css'

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4.32 13.5H1.78V5.86h2.54v7.64zM3.05 4.82a1.31 1.31 0 1 1 0-2.62 1.31 1.31 0 0 1 0 2.62zM14.22 13.5h-2.53V9.78c0-.89-.02-2.03-1.24-2.03-1.24 0-1.43.97-1.43 1.97v3.78H6.49V5.86h2.43v1.04h.04a2.66 2.66 0 0 1 2.4-1.32c2.57 0 3.04 1.69 3.04 3.89v4.03z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.6 2h2.1L9.74 7.64 15.6 14h-4.56l-3.54-4.63L3.42 14H1.32l5.3-6.06L1 2h4.68l3.2 4.23L12.6 2zm-.74 10.78h1.17L4.78 3.2H3.52l8.34 9.58z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="12" height="10" rx="1.5" />
      <path d="M2 5l6 4 6-4" />
    </svg>
  )
}

function ResumeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2H4.5a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5V5.5L9.5 2z" />
      <path d="M9.5 2v3.5H13" />
      <path d="M6 8.5h4M6 11h2.5" />
    </svg>
  )
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollUp = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={styles.scrollTop}
          onClick={scrollUp}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 13V3M3.5 7L8 2.5L12.5 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export function SocialLinks() {
  return (
    <div className={styles.wrapper}>
      <ScrollToTop />
      <div className={styles.container}>
      <a
        href="mailto:hello@lucaslima.design"
        className={styles.link}
        aria-label="Email"
      >
        <EmailIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/lucaseduardolima/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
      </a>
      <a
        href="https://x.com/_lucasdesigner"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="X"
      >
        <XIcon />
      </a>
      <a
        href="https://drive.google.com/file/d/1ilymMgkTALUpdLrCMxWurbf8KEx2CYSG/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="Resume"
      >
        <ResumeIcon />
      </a>
      </div>
    </div>
  )
}
