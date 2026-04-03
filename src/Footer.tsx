import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { Page } from './Nav'
import styles from './Footer.module.css'

interface FooterProps {
  onNavigate: (page: Page) => void
}

export function Footer({ onNavigate }: FooterProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('hello@lucaslima.design')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Email */}
        <div className={styles.emailBlock}>
          <a href="mailto:hello@lucaslima.design" className={styles.email}>
            hello@lucaslima.design
          </a>
          <motion.button
            className={styles.copyBtn}
            onClick={handleCopy}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3.5 8.5 6 11l6.5-6.5" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
                  <path d="M10.5 5.5V3.5a1.5 1.5 0 0 0-1.5-1.5H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5h2" />
                </svg>
                Copy
              </>
            )}
          </motion.button>
        </div>

        <div className={styles.divider} />

        {/* Bottom row */}
        <div className={styles.bottom}>

          {/* Nav links */}
          <nav className={styles.links}>
            <button className={styles.link} onClick={() => onNavigate('professional')}>Home</button>
            <button className={styles.link} onClick={() => onNavigate('playground')}>Playground</button>
            <button className={styles.link} onClick={() => onNavigate('about')}>About</button>
          </nav>

          {/* Social links */}
          <div className={styles.socials}>
            <a href="https://www.linkedin.com/in/lucaseduardolima/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
            <a href="https://x.com/_lucasdesigner" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>X</a>
            <a href="https://drive.google.com/file/d/1ilymMgkTALUpdLrCMxWurbf8KEx2CYSG/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Resume</a>
          </div>

          {/* Copyright */}
          <div className={styles.copy}>
            Lucas Lima {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  )
}
