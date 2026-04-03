import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { initialMessages, models, demoResponses } from './data'
import type { ChatMessage } from './types'
import styles from './ChatPanel.module.css'

const ease = [0.25, 0.1, 0.25, 1] as const

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 12V2M3 6l4-4 4 4" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3 4 5 6 3" />
    </svg>
  )
}

function TypingIndicator() {
  return (
    <div className={styles.typingWrapper}>
      <div className={styles.typingBubble}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={styles.typingDot}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  )
}

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([...initialMessages])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedModel, setSelectedModel] = useState(models[1].id)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const msgCounter = useRef(0)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, scrollToBottom])

  // Close dropdown on click-outside
  useEffect(() => {
    if (!dropdownOpen) return
    const handler = (e: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [dropdownOpen])

  const sendMessage = useCallback(() => {
    const text = inputValue.trim()
    if (!text || isTyping) return

    msgCounter.current += 1
    const userMsg: ChatMessage = {
      id: `user-msg-${msgCounter.current}`,
      role: 'user',
      content: text,
    }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    const delay = 1200 + Math.random() * 800
    setTimeout(() => {
      msgCounter.current += 1
      const response: ChatMessage = {
        id: `ai-msg-${msgCounter.current}`,
        role: 'assistant',
        content: demoResponses[Math.floor(Math.random() * demoResponses.length)],
      }
      setIsTyping(false)
      setMessages((prev) => [...prev, response])
    }, delay)
  }, [inputValue, isTyping])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
      }
    },
    [sendMessage]
  )

  const selectedModelLabel = models.find((m) => m.id === selectedModel)?.label ?? ''

  return (
    <div className={styles.panel}>
      {/* Chat history */}
      <div className={styles.chatHistory}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            className={`${styles.messageWrapper} ${
              msg.role === 'user' ? styles.messageWrapperUser : styles.messageWrapperAssistant
            }`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease }}
          >
            <div
              className={`${styles.messageBubble} ${
                msg.role === 'user' ? styles.userBubble : styles.assistantBubble
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      <div className={styles.inputArea}>
        {/* Model selector */}
        <div className={styles.modelSelectorWrap} ref={dropdownRef}>
          <button
            className={styles.modelSelector}
            onClick={() => setDropdownOpen((v) => !v)}
          >
            <span>{selectedModelLabel}</span>
            <ChevronDownIcon />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                className={styles.modelDropdown}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                {models.map((model) => (
                  <button
                    key={model.id}
                    className={`${styles.modelOption} ${
                      model.id === selectedModel ? styles.modelOptionActive : ''
                    }`}
                    onClick={() => {
                      setSelectedModel(model.id)
                      setDropdownOpen(false)
                    }}
                  >
                    {model.label}
                    {model.id === selectedModel && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 5.2 4 7 8 3" />
                      </svg>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input field */}
        <input
          className={styles.inputField}
          type="text"
          placeholder="Ask anything about this meeting..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Send button */}
        <button
          className={`${styles.sendButton} ${
            inputValue.trim() ? styles.sendButtonActive : styles.sendButtonInactive
          }`}
          onClick={sendMessage}
          disabled={!inputValue.trim() || isTyping}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  )
}
