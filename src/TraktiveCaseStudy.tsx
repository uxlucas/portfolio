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

export function TraktiveCaseStudy() {
  return (
    <div className={styles.page}>

      {/* ── Hero ── */}
      <motion.div className={styles.hero} {...fadeUp}>
        <div className={styles.heroMeta}>
          <span className={styles.heroTag}>Product Design</span>
          <span className={styles.heroTag}>2024</span>
        </div>
        <h1 className={styles.heroTitle}>Designing an all-in-one platform for rail logistics from scratch</h1>
        <p className={styles.heroSub}>
          Traktive is a B2B, AI-powered platform that streamlines rail operations, with a focus on cost-saving insights for smarter decision-making. I led discovery and design from zero to launch-ready prototype.
        </p>
      </motion.div>

      {/* ── Cover image ── */}
      <motion.div
        className={styles.coverWrap}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
      >
        <img src="/traktive-cover.png" alt="Traktive platform interface" className={styles.coverImage} />
      </motion.div>

      {/* ── Meta strip ── */}
      <Section>
        <div className={styles.metaStrip}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Role</span>
            <span className={styles.metaValue}>Discovery, Competitor Analysis, Prototyping, Usability Testing</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Timeline</span>
            <span className={styles.metaValue}>2024</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Team</span>
            <span className={styles.metaValue}>Product Manager, Engineers, Business Stakeholders</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Platform</span>
            <span className={styles.metaValue}>Web App (B2B SaaS)</span>
          </div>
        </div>
      </Section>

      <div className={styles.divider} />

      {/* ── Context ── */}
      <Section id="context" label="Context">
        <p className={styles.body}>
          Rail yard operations are often hampered by inefficient workflows, data silos, and limited visibility into real-time conditions. Traktive set out to build a centralized data hub that simplifies the complexity of logistics management, giving operators the tools to make faster, smarter decisions.
        </p>
        <blockquote className={styles.pullQuote}>
          Operators were stitching together insights from disconnected legacy systems, spreadsheets, and phone calls, losing hours every day to manual coordination that the platform should handle automatically.
        </blockquote>
      </Section>

      {/* ── Challenges ── */}
      <Section id="challenges" label="Key Challenges">
        <div className={styles.challengeGrid}>

          <div className={styles.challengeCard}>
            <div className={styles.challengeCardTitle}>Fragmented data across disconnected systems</div>
            <div className={styles.illustration}>
              <svg viewBox="0 0 260 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="16" y="28" width="60" height="36" rx="4" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="96" y="28" width="60" height="36" rx="4" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="176" y="28" width="60" height="36" rx="4" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="56" y="80" width="60" height="36" rx="4" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="136" y="80" width="60" height="36" rx="4" stroke="#C8C4BC" strokeWidth="1.5"/>
                <line x1="46" y1="64" x2="86" y2="80" stroke="#C74007" strokeWidth="1.5" strokeDasharray="4 3"/>
                <line x1="126" y1="64" x2="166" y2="80" stroke="#C74007" strokeWidth="1.5" strokeDasharray="4 3"/>
              </svg>
            </div>
            <div className={styles.challengeCardBody}>Lack of tailored software created data bottlenecks and fragmented access across teams and locations.</div>
          </div>

          <div className={styles.challengeCard}>
            <div className={styles.challengeCardTitle}>No real-time visibility into operations</div>
            <div className={styles.illustration}>
              <svg viewBox="0 0 260 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="130" cy="65" r="40" stroke="#C8C4BC" strokeWidth="1.5"/>
                <circle cx="130" cy="65" r="24" stroke="#C8C4BC" strokeWidth="1.2"/>
                <circle cx="130" cy="65" r="8" fill="#FF6F0A"/>
                <line x1="138" y1="57" x2="180" y2="30" stroke="#C8C4BC" strokeWidth="1.2" strokeDasharray="3 3"/>
                <rect x="180" y="22" width="48" height="16" rx="2" stroke="#C8C4BC" strokeWidth="1.2"/>
              </svg>
            </div>
            <div className={styles.challengeCardBody}>Legacy systems failed to provide holistic, real-time operational views for informed decision-making.</div>
          </div>

          <div className={styles.challengeCard}>
            <div className={styles.challengeCardTitle}>Time-consuming manual processes</div>
            <div className={styles.illustration}>
              <svg viewBox="0 0 260 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="30" width="80" height="70" rx="4" stroke="#C8C4BC" strokeWidth="1.5"/>
                <line x1="42" y1="50" x2="98" y2="50" stroke="#C8C4BC" strokeWidth="1.2"/>
                <line x1="42" y1="62" x2="98" y2="62" stroke="#C8C4BC" strokeWidth="1.2"/>
                <line x1="42" y1="74" x2="80" y2="74" stroke="#C8C4BC" strokeWidth="1.2"/>
                <line x1="42" y1="86" x2="90" y2="86" stroke="#C8C4BC" strokeWidth="1.2"/>
                <path d="M140 65 L170 45 L200 70 L230 35" stroke="#FF6F0A" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <circle cx="140" cy="65" r="3" fill="#FF6F0A"/>
                <circle cx="230" cy="35" r="3" fill="#FF6F0A"/>
              </svg>
            </div>
            <div className={styles.challengeCardBody}>Error-prone manual workflows resulted in costly business mistakes and wasted operational hours.</div>
          </div>

          <div className={styles.challengeCard}>
            <div className={styles.challengeCardTitle}>Inefficient asset tracking and record keeping</div>
            <div className={styles.illustration}>
              <svg viewBox="0 0 260 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="25" width="70" height="20" rx="3" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="40" y="55" width="70" height="20" rx="3" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="40" y="85" width="70" height="20" rx="3" stroke="#C8C4BC" strokeWidth="1.5"/>
                <circle cx="30" cy="35" r="4" fill="#E05252"/>
                <circle cx="30" cy="65" r="4" fill="#E05252"/>
                <circle cx="30" cy="95" r="4" stroke="#C8C4BC" strokeWidth="1.5"/>
                <rect x="150" y="40" width="70" height="50" rx="4" stroke="#C8C4BC" strokeWidth="1.5" strokeDasharray="4 3"/>
                <line x1="160" y1="55" x2="210" y2="55" stroke="#C8C4BC" strokeWidth="1"/>
                <line x1="160" y1="65" x2="200" y2="65" stroke="#C8C4BC" strokeWidth="1"/>
                <line x1="160" y1="75" x2="205" y2="75" stroke="#C8C4BC" strokeWidth="1"/>
              </svg>
            </div>
            <div className={styles.challengeCardBody}>Record keeping and asset tracking were scattered, making it impossible to maintain accurate fleet oversight.</div>
          </div>

        </div>
      </Section>

      <div className={styles.divider} />

      {/* ── Key Insights ── */}
      <Section id="insights" label="Key Insights">
        <p className={styles.body} style={{ marginBottom: 24 }}>
          I conducted user interviews with business owners, operators, and logistics coordinators to understand who the users are, how they work, and what challenges they face daily. Three patterns emerged.
        </p>
        <div className={styles.insightGrid}>
          <div className={styles.insightCard}>
            <div className={styles.insightNumber}>01</div>
            <div className={styles.insightTitle}>Operators needed a single source of truth, not another tool</div>
            <p className={styles.insightBody}>
              Every operator we spoke to was already using 3-5 different systems. They didn't want a new dashboard on top of the pile. They wanted one place that replaced the fragmented stack entirely, consolidating data into actionable, organized, easily accessible information.
            </p>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightNumber}>02</div>
            <div className={styles.insightTitle}>Cost visibility was reactive, never proactive</div>
            <p className={styles.insightBody}>
              Business owners only discovered cost overruns after the fact, buried in monthly reports. They needed real-time cost tracking tied directly to operational events, so they could course-correct before small inefficiencies became expensive problems.
            </p>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightNumber}>03</div>
            <div className={styles.insightTitle}>The mental model was spatial, not tabular</div>
            <p className={styles.insightBody}>
              Operators thought about their rail yards as physical spaces with assets moving through them, not as rows in a spreadsheet. Any solution had to reflect that spatial awareness, showing where things are and where they need to go.
            </p>
          </div>
        </div>
      </Section>

      <div className={styles.divider} />

      {/* ── Approach ── */}
      <Section id="approach" label="Approach">
        <p className={styles.body}>
          The insights made the sequence clear: start with the operator's mental model (spatial, not tabular), build real-time visibility first, then layer in cost intelligence and decision-support tools.
        </p>
        <div className={styles.phaseGrid}>
          <div className={styles.phaseCard}>
            <div className={styles.phaseLabel}>Discovery</div>
            <ul className={styles.phaseList}>
              <li>User interviews with rail operators, business owners, and logistics coordinators</li>
              <li>Competitor analysis across rail logistics and fleet management platforms</li>
              <li>Mapped existing workflows to identify friction points and redundancies</li>
              <li>Requirements gathering and pain point prioritization with stakeholders</li>
            </ul>
          </div>
          <div className={styles.phaseCard}>
            <div className={styles.phaseLabel}>Execution</div>
            <ul className={styles.phaseList}>
              <li>Low-fidelity wireframes to validate information architecture with users</li>
              <li>High-fidelity prototypes built around spatial awareness and real-time data</li>
              <li>Usability testing sessions with operators to validate core workflows</li>
              <li>Iterative refinement based on testing feedback before handoff</li>
            </ul>
          </div>
        </div>
      </Section>

      <div className={styles.divider} />

      {/* ── Design Decisions ── */}
      <Section id="decisions" label="Design Decisions">

        <div className={styles.decisionBlock}>
          <div className={styles.decisionHeader}>
            <span className={styles.decisionTag}>Operational Dashboard</span>
            <h3 className={styles.decisionTitle}>Giving operators a real-time spatial view of their yard</h3>
          </div>
          <div className={styles.decisionColumns}>
            <div className={styles.decisionText}>
              <p className={styles.decisionLabel}>The problem</p>
              <p className={styles.body}>
                Operators had no way to see the current state of their rail yard at a glance. They relied on radio calls, physical walk-throughs, and outdated spreadsheets to know where assets were. By the time they had a picture, it was already stale.
              </p>
              <p className={styles.decisionLabel} style={{ marginTop: 20 }}>What I explored</p>
              <p className={styles.body}>
                The first iteration was a traditional table-based dashboard listing all assets with status columns. Testing showed operators constantly re-mapping table data to their mental image of the yard. The second iteration introduced a map-based view with asset overlays. Operators immediately responded: "This is how I actually think about it." The final design combined a spatial yard map with a filterable sidebar for detailed asset data.
              </p>
              <p className={styles.decisionLabel} style={{ marginTop: 20 }}>Why this direction won</p>
              <p className={styles.body}>
                In usability testing, operators located and assessed assets 4x faster with the spatial view compared to the table. The hybrid approach (map + sidebar) gave power users the detail they needed without forcing everyone through a spreadsheet-first experience.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.dividerLight} />

        <div className={styles.decisionBlock}>
          <div className={styles.decisionHeader}>
            <span className={styles.decisionTag}>Cost Intelligence</span>
            <h3 className={styles.decisionTitle}>Turning reactive cost reports into proactive alerts</h3>
          </div>
          <div className={styles.decisionColumns}>
            <div className={styles.decisionText}>
              <p className={styles.decisionLabel}>The problem</p>
              <p className={styles.body}>
                Cost overruns were discovered weeks after they happened, buried in monthly financial reports. Business owners had no way to connect operational decisions to their financial impact in real time. By the time they saw the numbers, the damage was done.
              </p>
              <p className={styles.decisionLabel} style={{ marginTop: 20 }}>What I explored</p>
              <p className={styles.body}>
                I tested three approaches: (1) a financial dashboard with charts and historical trends, (2) inline cost annotations on operational views, and (3) proactive alert cards that surfaced when costs deviated from expected patterns. The standalone dashboard felt disconnected from daily work. Inline annotations added noise to the spatial view. Alert cards, shown contextually in the operator's workflow, struck the right balance.
              </p>
              <p className={styles.decisionLabel} style={{ marginTop: 20 }}>The trade-off</p>
              <p className={styles.body}>
                Alert-based cost intelligence required establishing baseline cost models for each operation type, which meant a longer onboarding period. I designed a guided setup flow that learned from historical data during the first two weeks, so the system could start surfacing meaningful alerts without requiring operators to manually configure thresholds.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.dividerLight} />

        <div className={styles.decisionBlock}>
          <div className={styles.decisionHeader}>
            <span className={styles.decisionTag}>Data Consolidation</span>
            <h3 className={styles.decisionTitle}>Replacing five disconnected systems with one unified view</h3>
          </div>
          <div className={styles.decisionColumns}>
            <div className={styles.decisionText}>
              <p className={styles.decisionLabel}>How I made the case</p>
              <p className={styles.body}>
                Through workflow mapping, I documented that operators were switching between 3-5 systems for a single task: checking asset status in one tool, updating records in another, communicating via radio, and logging costs in a spreadsheet. I presented this as a time-cost analysis: 2.5 hours per operator per day lost to system-switching, multiplied across a team of 12 operators.
              </p>
              <p className={styles.decisionLabel} style={{ marginTop: 20 }}>The outcome</p>
              <p className={styles.body}>
                The consolidated platform brought asset tracking, operational planning, cost monitoring, and communication into a single interface. In prototype testing, operators completed end-to-end workflows (receiving a shipment, assigning yard space, updating records, and flagging costs) without leaving the platform. What previously required four tools and 15 minutes took three clicks and under two minutes.
              </p>
            </div>
          </div>
        </div>

      </Section>

      {/* ── Gallery ── */}
      <div id="gallery" className={styles.gallery} style={{ gap: 24 }}>
        <div className={styles.galleryRow1}>
          <img src="/traktive-1.png" alt="Traktive screenshot 1" className={styles.galleryImg} style={{ borderRadius: 12 }} />
        </div>
        <div className={styles.galleryRow1}>
          <img src="/traktive-2.png" alt="Traktive screenshot 2" className={styles.galleryImg} style={{ borderRadius: 12 }} />
        </div>
        <div className={styles.galleryRow1}>
          <img src="/traktive-3.png" alt="Traktive screenshot 3" className={styles.galleryImg} style={{ borderRadius: 12 }} />
        </div>
        <div className={styles.galleryRow1}>
          <img src="/traktive-4.png" alt="Traktive screenshot 4" className={styles.galleryImg} style={{ borderRadius: 12 }} />
        </div>
        <div className={styles.galleryRow1}>
          <img src="/traktive-5.png" alt="Traktive screenshot 5" className={styles.galleryImg} style={{ borderRadius: 12 }} />
        </div>
      </div>

      <div className={styles.divider} />

      {/* ── Reflection ── */}
      <Section id="reflection" label="Reflection">
        <p className={styles.body}>
          Designing for rail logistics meant entering a domain I had no prior experience in. The most valuable thing I did was resist the temptation to start designing screens and instead spend the first weeks understanding how operators actually think about their work. The spatial mental model insight changed everything.
        </p>
        <p className={styles.body} style={{ marginTop: 16 }}>
          Building a 0-to-1 product also meant making constant scope trade-offs. Every feature had to justify its place in the first release. I learned to frame these conversations around user evidence rather than opinion, presenting test results and workflow data to help the team prioritize what would ship first versus what could wait.
        </p>
        <p className={styles.body} style={{ marginTop: 16 }}>
          The platform launched as a prototype for stakeholder validation and early adopter testing. The next phase focuses on integrating real-time IoT sensor data and expanding the cost intelligence engine with predictive analytics.
        </p>
      </Section>

    </div>
  )
}
