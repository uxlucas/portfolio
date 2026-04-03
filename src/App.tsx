import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import { motion, AnimatePresence } from 'framer-motion'
import { patterns } from './patterns'
import { PatternCard } from './patterns/PatternCard'
import { Hero, type Section } from './Hero'
import { Nav, type Page } from './Nav'
import { About } from './About'
import { Professional } from './Professional'
import { ScieneCaseStudy } from './ScieneCaseStudy'
import { TraktiveCaseStudy } from './TraktiveCaseStudy'
import { ExperienceCard } from './ExperienceCard'
import { SocialLinks } from './SocialLinks'
import { Footer } from './Footer'

const pageTransition = {
  duration: 0.28,
  ease: 'easeOut' as const,
}

const pageVariants = {
  enter: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
}

export default function App() {
  const [page, setPage] = useState<Page>('professional')
  const [section, setSection] = useState<Section>('explorations')

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="min-h-screen">
      <Nav page={page} onNavigate={setPage} />

      <AnimatePresence mode="wait">
        {page === 'playground' && (
          <motion.div
            key="playground"
            variants={pageVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={pageTransition}
          >
            <Hero activeSection={section} onSectionChange={setSection} />

            <main className="max-w-5xl mx-auto px-6 pb-20 sm:px-10 lg:px-16">
              <AnimatePresence mode="wait">
                {section === 'explorations' && (
                  <motion.div
                    key="explorations"
                    variants={pageVariants}
                    initial="enter"
                    animate="visible"
                    exit="exit"
                    transition={pageTransition}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {patterns.map((pattern, i) => (
                      <PatternCard key={pattern.id} pattern={pattern} index={i} />
                    ))}
                  </motion.div>
                )}

                {section === 'experiences' && (
                  <motion.div
                    key="experiences"
                    variants={pageVariants}
                    initial="enter"
                    animate="visible"
                    exit="exit"
                    transition={pageTransition}
                    className="flex justify-center"
                    style={{ paddingTop: '2rem', paddingBottom: '4rem' }}
                  >
                    <ExperienceCard />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </motion.div>
        )}

        {page === 'professional' && (
          <motion.div
            key="professional"
            variants={pageVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={pageTransition}
          >
            <Professional onNavigate={setPage} />
          </motion.div>
        )}

        {page === 'sciene' && (
          <motion.div
            key="sciene"
            variants={pageVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={pageTransition}
          >
            <ScieneCaseStudy />
          </motion.div>
        )}

        {page === 'traktive' && (
          <motion.div
            key="traktive"
            variants={pageVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={pageTransition}
          >
            <TraktiveCaseStudy />
          </motion.div>
        )}

        {page === 'about' && (
          <motion.div
            key="about"
            variants={pageVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={pageTransition}
          >
            <About />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onNavigate={setPage} />
      <SocialLinks />
    </div>
  )
}
