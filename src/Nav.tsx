import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './useTheme'
import styles from './Nav.module.css'

export type Page = 'professional' | 'playground' | 'about' | 'sciene' | 'traktive'

interface NavItemDef {
  id: string
  label: string
  type: 'internal' | 'external'
  href?: string
}

const navItems: NavItemDef[] = [
  { id: 'professional', label: 'Home', type: 'internal' },
  { id: 'playground', label: 'Playground', type: 'internal' },
  { id: 'about', label: 'About', type: 'internal' },
  { id: 'sciene', label: 'Sciene', type: 'internal' },
  { id: 'traktive', label: 'Traktive', type: 'internal' },
]

// Breadcrumb back-navigation info per page
const pageParent: Partial<Record<Page, { label: string; dest: Page }>> = {
  about: { label: 'Home', dest: 'professional' },
  sciene: { label: 'Home', dest: 'professional' },
  traktive: { label: 'Home', dest: 'professional' },
}

// Pages that should NOT appear in the main nav (true sub-pages)
const hiddenFromNav = new Set<Page>(['sciene', 'traktive'])

const transition = { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const }

function ExternalArrow() {
  return (
    <svg
      className={styles.externalIcon}
      viewBox="0 0 8 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 7 7 1M3 1h4v4" />
    </svg>
  )
}

interface NavProps {
  page: Page
  onNavigate: (page: Page) => void
}

export function Nav({ page, onNavigate }: NavProps) {
  const isHome = page === 'playground' || page === 'professional'
  const parent = pageParent[page]
  const { theme, toggle: toggleTheme } = useTheme()

  const [ghostState, setGhostState] = useState<{
    label: string
    active: boolean
  } | null>(null)

  const handleExternalClick = useCallback((item: NavItemDef) => {
    setGhostState({ label: item.label, active: true })
    setTimeout(() => {
      window.open(item.href, '_blank', 'noopener,noreferrer')
      setGhostState(null)
    }, 300)
  }, [])

  // Visible nav items for the home state
  const visibleItems = navItems.filter((item) => !hiddenFromNav.has(item.id as Page))

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <AnimatePresence mode="wait" initial={false}>
          {isHome ? (
            /* ── Full nav ── */
            <motion.div
              key="full-nav"
              className={styles.navRow}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={transition}
            >
              {visibleItems.map((item) => {
                const isActive = item.id === page

                return (
                  <button
                    key={item.id}
                    className={styles.navItem}
                    onClick={() => {
                      if (item.type === 'external') {
                        handleExternalClick(item)
                      } else {
                        onNavigate(item.id as Page)
                      }
                    }}
                  >
                    {/* Pumpkin indicator */}
                    {isActive && (
                      <motion.div
                        className={styles.indicator}
                        layoutId="nav-indicator"
                        transition={transition}
                      />
                    )}

                    {item.type === 'internal' ? (
                      <span>{item.label}</span>
                    ) : (
                      <>
                        <span>{item.label}</span>
                        <ExternalArrow />
                      </>
                    )}

                    {/* Ghost for external links */}
                    {ghostState?.active && ghostState.label === item.label && (
                      <motion.span
                        className={styles.ghost}
                        initial={{ opacity: 0.6, x: 0, y: 0, scale: 1 }}
                        animate={{ opacity: 0, x: 8, y: -8, scale: 1.02 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                      >
                        {item.label}
                        <ExternalArrow />
                      </motion.span>
                    )}
                  </button>
                )
              })}
            </motion.div>
          ) : (
            /* ── Breadcrumb nav ── */
            <motion.div
              key="breadcrumb-nav"
              className={styles.navRow}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={transition}
            >
              <button
                className={styles.homeLink}
                onClick={() => onNavigate(parent?.dest ?? 'professional')}
              >
                {parent?.label ?? 'Home'}
              </button>
              <span className={styles.separator}>/</span>
              <span className={styles.navItemBreadcrumb}>
                <motion.div
                  className={styles.activeDot}
                  layoutId="nav-indicator"
                  transition={transition}
                />
                <span className={styles.activeLabelText}>
                  {navItems.find((i) => i.id === page)?.label}
                </span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Theme toggle — always visible, outside AnimatePresence */}
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === 'light' ? (
              <motion.svg
                key="moon"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 30 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="sun"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, rotate: 30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -30 }}
                transition={{ duration: 0.2 }}
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>
    </nav>
  )
}
