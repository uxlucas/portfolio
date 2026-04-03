import { useMemo } from 'react'
import { motion } from 'framer-motion'
import styles from './About.module.css'

const stagger = {
  visible: { transition: { staggerChildren: 0.04 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' as const } },
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 10 10" fill="none">
      <path
        d="M2.5 5.2 4.2 7 7.5 3.5"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className={styles.contactIcon} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
      <path d="m2 5 6 4 6-4" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg className={styles.linkArrow} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9 9 3M5 3h4v4" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className={styles.linkIcon} viewBox="0 0 16 16" fill="currentColor">
      <path d="M4.32 13.5H1.78V5.86h2.54v7.64zM3.05 4.82a1.31 1.31 0 1 1 0-2.62 1.31 1.31 0 0 1 0 2.62zM14.22 13.5h-2.53V9.78c0-.89-.02-2.03-1.24-2.03-1.24 0-1.43.97-1.43 1.97v3.78H6.49V5.86h2.43v1.04h.04a2.66 2.66 0 0 1 2.4-1.32c2.57 0 3.04 1.69 3.04 3.89v4.03z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className={styles.linkIcon} viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.6 2h2.1L9.74 7.64 15.6 14h-4.56l-3.54-4.63L3.42 14H1.32l5.3-6.06L1 2h4.68l3.2 4.23L12.6 2zm-.74 10.78h1.17L4.78 3.2H3.52l8.34 9.58z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className={styles.linkIcon} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 .5A7.5 7.5 0 0 0 5.63 15.13c.37.07.5-.16.5-.36v-1.34c-2.09.45-2.53-1-2.53-1a2 2 0 0 0-.84-1.1c-.68-.47.05-.46.05-.46a1.57 1.57 0 0 1 1.15.77 1.6 1.6 0 0 0 2.18.62 1.59 1.59 0 0 1 .47-1c-1.67-.19-3.42-.83-3.42-3.7a2.9 2.9 0 0 1 .77-2.01 2.69 2.69 0 0 1 .07-1.98s.63-.2 2.07.77a7.13 7.13 0 0 1 3.76 0c1.44-.97 2.07-.77 2.07-.77a2.69 2.69 0 0 1 .07 1.98 2.9 2.9 0 0 1 .77 2.01c0 2.88-1.76 3.51-3.43 3.7a1.78 1.78 0 0 1 .51 1.38v2.05c0 .2.13.44.51.36A7.5 7.5 0 0 0 8 .5z" />
    </svg>
  )
}

function ResumeIcon() {
  return (
    <svg className={styles.linkIcon} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2H4.5a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5V5.5L9.5 2z" />
      <path d="M9.5 2v3.5H13" />
      <path d="M6 8.5h4M6 11h2.5" />
    </svg>
  )
}

function useTimezoneOffset() {
  return useMemo(() => {
    const userOffsetMin = new Date().getTimezoneOffset()
    const brasiliaOffsetMin = 180 // GMT-3 = +180 min
    const diffHours = (brasiliaOffsetMin - userOffsetMin) / 60
    const abs = Math.abs(diffHours)
    if (abs === 0) return 'same timezone as you'
    const label = abs === 1 ? 'hour' : 'hours'
    return `${abs} ${label} ${diffHours < 0 ? 'behind' : 'ahead of'} you`
  }, [])
}

const links = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lucaseduardolima/',
    icon: LinkedInIcon,
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/_lucasdesigner',
    icon: XIcon,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/uxlucas',
    icon: GitHubIcon,
  },
  {
    label: 'Resume',
    href: 'https://drive.google.com/file/d/1ilymMgkTALUpdLrCMxWurbf8KEx2CYSG/view?usp=sharing',
    icon: ResumeIcon,
  },
]

export function About() {
  const offsetText = useTimezoneOffset()

  return (
    <motion.div
      className={styles.page}
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      {/* ── Header ── */}
      <motion.div className={styles.header} variants={fadeUp}>
        <div className={styles.avatarWrap}>
          <img
            className={styles.avatar}
            src="/avatar.png"
            alt="Lucas Lima"
          />
          <div className={styles.badge}>
            <CheckIcon />
          </div>
        </div>

        <div className={styles.headerInfo}>
          <h1 className={styles.name}>Lucas Lima</h1>
          <p className={styles.title}>Senior Product Designer</p>
          <p className={styles.meta}>Curitiba, Brazil</p>
          <p className={styles.timezone}>
            Brasília (GMT-3) — {offsetText}
          </p>
        </div>
      </motion.div>

      {/* ── Contact ── */}
      <motion.div className={styles.section} variants={fadeUp}>
        <a
          href="mailto:hello@lucaslima.design"
          className={styles.contactRow}
        >
          <MailIcon />
          hello@lucaslima.design
        </a>
      </motion.div>

      {/* ── Links ── */}
      <motion.div className={styles.section} variants={fadeUp}>
        <div className={styles.linksGrid}>
          {links.map((link) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkItem}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <Icon />
                {link.label}
                <ArrowIcon />
              </motion.a>
            )
          })}
        </div>
      </motion.div>

      <motion.hr className={styles.divider} variants={fadeUp} />

      {/* ── About text ── */}
      <motion.div className={styles.aboutText} variants={fadeUp}>
        <p className={styles.greeting}>Welcome, visitor!</p>
        <p>Nice to meet you. I'm Lucas.</p>
        <p>
          I'm a Product Designer who enjoys turning complex systems into
          experiences that feel simple, intentional, and sometimes a little bit
          playful. I've spent the last 6+ years working across SaaS platforms,
          AI, internal tools, finance and e-commerce: usually somewhere between
          messy requirements and a blank canvas.
        </p>
        <p>
          I like designing spaces that invite exploration. Interfaces where
          things make sense quickly, but still reward curiosity. The small
          details: motion, hierarchy, and feedback are what make products feel
          alive to me.
        </p>
        <p>
          By day, I collaborate with product managers and engineers to untangle
          flows, define structure, and ship practical solutions. By night, I
          experiment with visuals, interactions, and creative ideas that might
          not fit inside a Jira ticket.
        </p>
        <p>
          I care a lot about clarity. About reducing friction without removing
          personality. About building systems that scale, but still feel human.
        </p>
        <p>
          This playground is a reflection of how I work: explore, click around,
          interact with things, follow what catches your attention.
        </p>
      </motion.div>

      <motion.hr className={styles.divider} variants={fadeUp} />

      {/* ── Career ── */}
      <motion.div variants={fadeUp}>
        <div className={styles.sectionTitle}>Career</div>
        <div className={styles.timeline}>
          {[
            { symbol: '/sciene-symbol.svg', company: 'Sciene', roles: [{ year: '2025', title: 'Senior Product Designer', current: true }] },
            { symbol: '/miinto-symbol.svg', company: 'Miinto', roles: [{ year: '2024', title: 'Senior Product Designer', current: true }] },
            { symbol: '/quartile-symbol.svg', company: 'Quartile', roles: [{ year: '2024', title: 'Product Designer', current: false }] },
            { symbol: '/foundey-symbol.svg', company: 'Foundey', roles: [{ year: '2023', title: 'Product Designer', current: false }] },
            { symbol: '/wicomm-symbol.svg', company: 'Wicomm Agency', roles: [{ year: '2021', title: 'Jr. UX/UI Designer', current: false }] },
          ].map((entry) => (
            <div key={entry.company} className={styles.timelineEntry}>
              <div className={styles.timelineHeader}>
                {entry.symbol && <img src={entry.symbol} alt="" className={styles.timelineSymbol} />}
                <span className={styles.timelineCompany}>{entry.company}</span>
              </div>
              {entry.roles.map((role) => (
                <div key={role.year + role.title} className={styles.timelineRole}>
                  <span className={styles.timelineYear}>{role.year}</span>
                  <span className={styles.timelineTitle}>{role.title}</span>
                  {role.current && (
                    <span className={styles.timelineBadge}>Now</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
