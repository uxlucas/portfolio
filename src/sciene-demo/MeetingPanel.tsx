import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { meeting } from './data'
import styles from './MeetingPanel.module.css'

const ease = [0.25, 0.1, 0.25, 1] as const

function CheckmarkIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 5.2 4 7.2 8 3" />
    </svg>
  )
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <motion.svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: expanded ? 90 : 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <path d="M3.5 2 6.5 5 3.5 8" />
    </motion.svg>
  )
}

export function MeetingPanel() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [notesExpanded, setNotesExpanded] = useState(false)
  const [hoveredParticipant, setHoveredParticipant] = useState<string | null>(null)
  const [clientHovered, setClientHovered] = useState(false)

  const toggleItem = useCallback((id: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const checkedCount = checkedItems.size
  const totalCount = meeting.actionItems.length

  return (
    <div className={styles.panel}>
      {/* Meeting header */}
      <div className={styles.header}>
        <div className={styles.meetingTitle}>{meeting.title}</div>
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>{meeting.date}</span>
          <span className={styles.metaDot}>·</span>
          <span className={styles.metaItem}>{meeting.duration}</span>
        </div>
      </div>

      {/* Client badge */}
      <div
        className={styles.clientBadge}
        onMouseEnter={() => setClientHovered(true)}
        onMouseLeave={() => setClientHovered(false)}
      >
        <span className={styles.clientName}>{meeting.client.name}</span>

        <AnimatePresence>
          {clientHovered && (
            <motion.div
              className={styles.clientPopover}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18, ease }}
            >
              <div className={styles.popoverCompany}>{meeting.client.company}</div>
              <div className={styles.popoverRole}>{meeting.client.role}</div>
              <div className={styles.popoverContext}>{meeting.client.context}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Participant avatars */}
      <div className={styles.avatarRow}>
        {meeting.participants.map((p, i) => (
          <div
            key={p.id}
            className={styles.avatar}
            style={{
              backgroundColor: p.color,
              marginLeft: i > 0 ? -6 : 0,
              zIndex: meeting.participants.length - i,
            }}
            onMouseEnter={() => setHoveredParticipant(p.id)}
            onMouseLeave={() => setHoveredParticipant(null)}
          >
            {p.initials}

            <AnimatePresence>
              {hoveredParticipant === p.id && (
                <motion.div
                  className={styles.avatarTooltip}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 2 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  <span className={styles.tooltipName}>{p.name}</span>
                  <span className={styles.tooltipRole}>{p.role}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Action items */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Action Items</span>
          <span className={styles.progressCount}>
            {checkedCount}/{totalCount}
          </span>
        </div>

        <div className={styles.checklist}>
          {meeting.actionItems.map((item) => {
            const checked = checkedItems.has(item.id)
            return (
              <div
                key={item.id}
                className={styles.checklistItem}
                onClick={() => toggleItem(item.id)}
              >
                <div className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''}`}>
                  {checked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.12, ease: 'easeOut' }}
                    >
                      <CheckmarkIcon />
                    </motion.div>
                  )}
                </div>
                <span
                  className={`${styles.itemText} ${checked ? styles.itemTextChecked : ''}`}
                >
                  {item.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Meeting notes */}
      <div className={styles.section}>
        <button
          className={styles.notesToggle}
          onClick={() => setNotesExpanded((v) => !v)}
        >
          <ChevronIcon expanded={notesExpanded} />
          <span className={styles.sectionLabel}>Meeting Notes</span>
        </button>

        <AnimatePresence initial={false}>
          {notesExpanded && (
            <motion.div
              className={styles.notesContent}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease }}
              style={{ overflow: 'hidden' }}
            >
              <ul className={styles.notesList}>
                {meeting.notes.map((note, i) => (
                  <li key={i} className={styles.noteItem}>{note}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
