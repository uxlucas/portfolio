import { motion } from 'framer-motion'
import styles from './ScieneCaseStudy.module.css'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.42, ease: 'easeOut' },
}

function Section({ id, label, children }: { id?: string; label?: string; children: React.ReactNode }) {
  return (
    <motion.section id={id} className={styles.section} {...fadeUp}>
      {label && <div className={styles.sectionLabel}>{label}</div>}
      {children}
    </motion.section>
  )
}

export function ScieneCaseStudy() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <motion.div className={styles.hero} {...fadeUp}>
        <div className={styles.heroMeta}>
          <span className={styles.heroTag}>Product Design</span>
          <span className={styles.heroTag}>2025 · Ongoing</span>
        </div>
        <h1 className={styles.heroTitle}>Redesigning a complex AI platform from the ground up</h1>
        <p className={styles.heroSub}>
          Sciene is an enterprise AI platform built for highly regulated industries. I joined as the sole designer to bring clarity to a product that had grown faster than its design foundations.
        </p>
      </motion.div>

      {/* ── Cover image ── */}
      <motion.div
        className={styles.coverWrap}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
      >
        <img src="/sciene-cover.png" alt="Sciene Meeting Hub interface" className={styles.coverImage} />
      </motion.div>

      {/* ── Meta strip ── */}
      <Section>
        <div className={styles.metaStrip}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Role</span>
            <span className={styles.metaValue}>Sole Product Designer</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Timeline</span>
            <span className={styles.metaValue}>2025 · Ongoing</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Team</span>
            <span className={styles.metaValue}>AI Engineers, Developers, QA, Sales, CSM</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Platform</span>
            <span className={styles.metaValue}>Web App (Enterprise SaaS)</span>
          </div>
        </div>
      </Section>

      <div className={styles.divider} />

      {/* ── Context ── */}
      <Section id="context" label="Context">
        <p className={styles.body}>
          Sciene provides secure, customizable AI solutions for enterprise customers in industries where trust and compliance are non-negotiable. When I joined, the product had strong technical foundations but a fragmented user experience. Teams were building workarounds in Notion and spreadsheets because the product couldn't keep up with their workflows.
        </p>
        <blockquote className={styles.pullQuote}>
          CSMs were spending nearly half of every client call navigating the platform instead of discussing strategy, while clients maintained separate spreadsheets to track the action items the product should have surfaced automatically.
        </blockquote>
      </Section>

      {/* ── Challenges ── */}
      <Section id="challenges" label="Key Challenges">
        <div className={styles.challengeGrid}>

          {/* 01 — No design system */}
          <div className={styles.challengeCard}>
            <div className={styles.challengeCardTitle}>Inconsistent visual language &amp; no Design System</div>
            <div className={styles.illustration}>
              <svg viewBox="0 0 260 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="16" y="28" width="80" height="26" rx="4" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="112" y="28" width="64" height="26" rx="4" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="16" y="72" width="96" height="28" rx="4" fill="#FF6F0A"/>
                <rect x="128" y="72" width="84" height="28" rx="14" stroke="#C8C4BC" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className={styles.challengeCardBody}>Each feature had been built independently, resulting in mismatched patterns and no shared documentation.</div>
          </div>

          {/* 02 — Cluttered screens */}
          <div className={styles.challengeCard}>
            <div className={styles.challengeCardTitle}>Cluttered Screens &amp; Unclear Hierarchy</div>
            <div className={styles.illustration}>
              <svg viewBox="0 0 260 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="16" y="20" width="68" height="16" rx="2" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="96" y="20" width="52" height="16" rx="2" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="160" y="20" width="84" height="16" rx="2" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="16" y="48" width="44" height="16" rx="2" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="72" y="48" width="36" height="16" rx="2" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="120" y="44" width="124" height="24" rx="2" fill="#FF6F0A"/>
                <rect x="16" y="76" width="88" height="16" rx="2" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="116" y="76" width="60" height="16" rx="2" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="188" y="76" width="56" height="16" rx="2" stroke="#C8C4BC" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className={styles.challengeCardBody}>Too much competing information made it hard for users to identify the next action at a glance.</div>
          </div>

          {/* 03 — Fragmented navigation */}
          <div className={styles.challengeCard}>
            <div className={styles.challengeCardTitle}>Fragmented Interactions &amp; Navigation Friction</div>
            <div className={styles.illustration}>
              <svg viewBox="0 0 260 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="16" y="36" width="52" height="40" rx="3" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="104" y="36" width="52" height="40" rx="3" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="192" y="36" width="52" height="40" rx="3" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="72" y="53" width="8" height="8" rx="1" fill="#C74007"/>
                <rect x="160" y="53" width="8" height="8" rx="1" fill="#C74007"/>
                <rect x="32" y="84" width="28" height="20" rx="2" stroke="#C8C4BC" strokeWidth="1.2" strokeDasharray="3 2"/>
                <line x1="42" y1="76" x2="42" y2="84" stroke="#C8C4BC" strokeWidth="1.2"/>
                <rect x="70" y="90" width="28" height="20" rx="2" stroke="#C8C4BC" strokeWidth="1.2" strokeDasharray="3 2"/>
                <line x1="82" y1="76" x2="78" y2="90" stroke="#C8C4BC" strokeWidth="1.2"/>
              </svg>
            </div>
            <div className={styles.challengeCardBody}>Moving between features felt disjointed. There was no clear mental model for how the platform was organized.</div>
          </div>

          {/* 04 — Accessibility gaps */}
          <div className={styles.challengeCard}>
            <div className={styles.challengeCardTitle}>Accessibility &amp; Alignment Gaps</div>
            <div className={styles.illustration}>
              <svg viewBox="0 0 260 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="48" y1="14" x2="48" y2="116" stroke="#C8C4BC" strokeWidth="1" strokeDasharray="3 3"/>
                <rect x="56" y="20" width="140" height="24" rx="3" stroke="#E05252" strokeWidth="1.5"/>
                <rect x="68" y="56" width="100" height="16" rx="2" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="56" y="82" width="130" height="16" rx="2" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="62" y="104" width="116" height="12" rx="2" stroke="#C8C4BC" strokeWidth="1.2"/>
              </svg>
            </div>
            <div className={styles.challengeCardBody}>Inconsistent spacing, contrast, and alignment created barriers across the product for a wide range of users.</div>
          </div>

        </div>
      </Section>

      <div className={styles.divider} />

      {/* ── Key Insights from Research ── */}
      <Section id="insights" label="Key Insights">
        <p className={styles.body} style={{ marginBottom: 24 }}>
          Before designing anything, I spent three weeks immersed in the product: shadowing CSM calls, running a full usability audit, and interviewing customers, Sales, and engineering. Three findings shaped everything that followed.
        </p>
        <div className={styles.insightGrid}>
          <div className={styles.insightCard}>
            <div className={styles.insightNumber}>01</div>
            <div className={styles.insightTitle}>CSMs were the real power users, but the product wasn't built for them</div>
            <p className={styles.insightBody}>
              Contextual interviews revealed that Customer Success Managers were the heaviest daily users, yet every workflow was optimized for initial setup by engineers. CSMs had built parallel tracking systems in Notion because the product had no unified view of client conversations, action items, or follow-ups.
            </p>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightNumber}>02</div>
            <div className={styles.insightTitle}>Users trusted the AI output but couldn't control the input</div>
            <p className={styles.insightBody}>
              In usability testing, 7 out of 9 users described the AI features as "powerful but unpredictable." They didn't know what prompts to use, what context the model had, or how to adjust results. The AI surface was built for engineers who understood the underlying models, not for the business users who relied on them daily.
            </p>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightNumber}>03</div>
            <div className={styles.insightTitle}>Navigation mirrored the engineering architecture, not user mental models</div>
            <p className={styles.insightBody}>
              The product's information architecture reflected how the backend was organized: by API service, not by task. Users needed to visit three different sections to complete what they saw as a single workflow. Card sorting sessions with 12 participants revealed a task-based mental model that was fundamentally different from the existing structure.
            </p>
          </div>
        </div>
      </Section>

      <div className={styles.divider} />

      {/* ── Approach ── */}
      <Section id="approach" label="Approach">
        <p className={styles.body}>
          These insights pointed to a clear sequence: fix the information architecture first, then establish a design system to make execution consistent, then redesign individual surfaces starting with the highest-pain workflows.
        </p>
        <div className={styles.phaseGrid}>
          <div className={styles.phaseCard}>
            <div className={styles.phaseLabel}>Discovery · 3 weeks</div>
            <ul className={styles.phaseList}>
              <li>Shadowed 8 CSM client calls to observe real workflows and pain points</li>
              <li>Full usability audit: documented 47 inconsistencies across 12 core screens</li>
              <li>Card sorting sessions with 12 users to validate a new IA model</li>
              <li>Competitive analysis across 6 enterprise AI platforms (Gong, Chorus, Clari, etc.)</li>
            </ul>
          </div>
          <div className={styles.phaseCard}>
            <div className={styles.phaseLabel}>Execution · Ongoing</div>
            <ul className={styles.phaseList}>
              <li>Restructured IA from service-based to task-based navigation (validated with tree testing)</li>
              <li>Built a token-based design system: 24 components, shared with engineering via Storybook</li>
              <li>Prototyped 3 rounds of Meeting Hub with live customer testing between each</li>
              <li>Shipped annotated specs with embedded video walkthroughs for every handoff</li>
            </ul>
          </div>
        </div>
      </Section>

      <div className={styles.divider} />

      {/* ── Design Decisions — deep dives ── */}
      <Section id="decisions" label="Design Decisions">

        {/* Decision 1 — Meeting Hub */}
        <div className={styles.decisionBlock}>
          <div className={styles.decisionHeader}>
            <span className={styles.decisionTag}>Meeting Hub</span>
            <h3 className={styles.decisionTitle}>Replacing five tools with one unified view</h3>
          </div>
          <div className={styles.decisionColumns}>
            <div className={styles.decisionText}>
              <p className={styles.decisionLabel}>The problem</p>
              <p className={styles.body}>
                CSMs were tracking meetings in Google Calendar, notes in Notion, action items in spreadsheets, AI summaries in the Sciene dashboard, and follow-ups in email. No single surface connected these. After a client call, the average CSM spent 12 minutes reconstructing context across tools before they could act on anything.
              </p>
              <p className={styles.decisionLabel} style={{ marginTop: 20 }}>What I explored</p>
              <p className={styles.body}>
                The first iteration was a timeline-based feed: every meeting chronologically, with expandable cards. Testing showed CSMs didn't think chronologically; they thought by client. The second iteration grouped by account, but surfacing action items required too many clicks. The final design used a split-panel layout: client list on the left, meeting detail with integrated AI assistant on the right. One click to context, zero navigation to act.
              </p>
              <p className={styles.decisionLabel} style={{ marginTop: 20 }}>Why this direction won</p>
              <p className={styles.body}>
                In the third round of prototype testing, CSMs completed the "review and follow up on a client meeting" task 3× faster than in the existing product, and none of them opened a separate tool to finish the workflow. The split-panel pattern was familiar from tools they already used (Slack, Linear) which reduced the learning curve.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.dividerLight} />

        {/* Decision 2 — AI Interaction */}
        <div className={styles.decisionBlock}>
          <div className={styles.decisionHeader}>
            <span className={styles.decisionTag}>Conversational AI</span>
            <h3 className={styles.decisionTitle}>Making AI inputs feel intuitive, not technical</h3>
          </div>
          <div className={styles.decisionColumns}>
            <div className={styles.decisionText}>
              <p className={styles.decisionLabel}>The problem</p>
              <p className={styles.body}>
                The existing AI interface was a blank text field with no guidance. Users who weren't familiar with prompt engineering either avoided it entirely or wrote vague queries that produced poor results. Support tickets about "AI not working" were the second most common category, but the AI was working fine. The input design was failing.
              </p>
              <p className={styles.decisionLabel} style={{ marginTop: 20 }}>What I explored</p>
              <p className={styles.body}>
                I tested three approaches: (1) a template library where users picked pre-built prompts, (2) a guided wizard that walked through prompt construction step by step, and (3) contextual suggestions that appeared based on what the user was looking at. The template approach felt rigid; users wanted to ask their own questions. The wizard was too slow for repeat usage. Contextual suggestions struck the balance: they taught by example without blocking the freeform input.
              </p>
              <p className={styles.decisionLabel} style={{ marginTop: 20 }}>The trade-off</p>
              <p className={styles.body}>
                Engineering pushed back on contextual suggestions because it required the frontend to be aware of page context and user history, a meaningful technical investment. I built a cost-benefit case showing that 68% of support tickets about AI could be eliminated by better input design, which would save more engineering time than the implementation cost within two quarters.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.dividerLight} />

        {/* Decision 3 — Design System */}
        <div className={styles.decisionBlock}>
          <div className={styles.decisionHeader}>
            <span className={styles.decisionTag}>Design System</span>
            <h3 className={styles.decisionTitle}>Convincing the team to build foundations before features</h3>
          </div>
          <div className={styles.decisionColumns}>
            <div className={styles.decisionText}>
              <p className={styles.decisionLabel}>How I made the case</p>
              <p className={styles.body}>
                I audited the last quarter's development cycle and found that 30% of engineering time was spent on visual inconsistency bugs: padding mismatches, color discrepancies, and component re-implementations. I presented this data alongside a prototype showing how the same feature could be built in 2 days with a system vs. 8 days without. Leadership approved a 3-week sprint to build the foundation, with the condition that it had to be usable by engineers from day one, not a Figma-only artifact.
              </p>
              <p className={styles.decisionLabel} style={{ marginTop: 20 }}>The outcome</p>
              <p className={styles.body}>
                The system shipped with 24 components in Storybook, shared tokens across Figma and code, and a contribution model so engineers could extend it. The three pending features were built using the system and shipped ahead of their original timeline. Design-to-dev handoff time dropped from an average of 4 days to 1.5 days over the following quarter.
              </p>
            </div>
          </div>
        </div>

      </Section>

      {/* ── Gallery ── */}
      <div id="gallery" className={styles.gallery}>
        {/* Row 1 — two side by side */}
        <div className={styles.galleryRow2}>
          <div className={styles.galleryImgWrap}><img src="/sciene-case-1.png" alt="Sciene case study screenshot 1" className={styles.galleryImg} /></div>
          <div className={styles.galleryImgWrap}><img src="/scienecase2.png" alt="Sciene case study screenshot 2" className={styles.galleryImg} /></div>
        </div>
        {/* Row 2 — full-width video */}
        <div className={styles.galleryRow1}>
          <div className={styles.galleryImgWrap}>
            <video
              src="/sciene-case-3.mp4"
              className={styles.galleryImg}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
        {/* Row 3 — two side by side */}
        <div className={styles.galleryRow2}>
          <div className={styles.galleryImgWrap}><img src="/sciene-case-4.png" alt="Sciene case study screenshot 4" className={styles.galleryImg} /></div>
          <div className={`${styles.galleryImgWrap} ${styles.galleryPlaceholder}`} />
        </div>
        {/* Row 4 — single full-width */}
        <div className={styles.galleryRow1}>
          <div className={styles.galleryImgWrap}><img src="/sciene-case-6.png" alt="Sciene case study screenshot 6" className={styles.galleryImg} /></div>
        </div>
      </div>

      <div className={styles.divider} />

      {/* ── Impact ── */}
      <Section id="impact" label="Impact">
        <p className={styles.body} style={{ marginBottom: 24 }}>
          Measured over the 8 weeks following the phased rollout to 3 onboarded enterprise teams, compared against a 3-month pre-launch baseline tracked in Mixpanel and internal tooling.
        </p>
        <div className={styles.metricsGrid}>
          {[
            { value: '+34%', label: 'Increase in weekly active feature usage across Meeting Hub and AI Assistant, measured via Mixpanel' },
            { value: '2.6×', label: 'Reduction in avg. design-to-dev handoff time, from 4 days to 1.5 days per feature, tracked across 11 shipped components' },
            { value: '84%', label: 'Feature adoption rate across 3 onboarded enterprise teams within the first 6 weeks of rollout' },
            { value: '−68%', label: 'Reduction in AI-related support tickets after redesigning the conversational input surfaces' },
          ].map((m) => (
            <div key={m.label} className={styles.metricCard}>
              <div className={styles.metricValue}>{m.value}</div>
              <div className={styles.metricLabel}>{m.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <div className={styles.divider} />

      {/* ── Reflection ── */}
      <Section id="reflection" label="Reflection">
        <p className={styles.body}>
          Working as the sole designer on a product this complex pushed me to balance breadth and depth carefully. The biggest lesson was that the design system decision, which felt like a detour, ended up being the single highest-leverage thing I did. Every surface I designed after that point shipped faster and more consistently.
        </p>
        <p className={styles.body} style={{ marginTop: 16 }}>
          The hardest moment was the first two weeks. I had a backlog of feature requests from Sales, urgent bug reports from CSMs, and a leadership team that expected visible output immediately. I chose to push back and spend that time on research instead of shipping pixels, presenting my findings to the team in a structured readout that reframed the conversation from "we need more features" to "we need to fix how existing features connect." That shift in framing changed how the entire team prioritized for the rest of the quarter.
        </p>
        <p className={styles.body} style={{ marginTop: 16 }}>
          This work is ongoing. The next phase focuses on expanding the AI assistant's contextual awareness and building an analytics layer that helps enterprise decision-makers see patterns across their entire client portfolio, not just individual meetings.
        </p>
      </Section>

    </div>
  )
}
