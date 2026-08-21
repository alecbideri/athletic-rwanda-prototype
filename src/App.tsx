import { useState, useEffect } from 'react'
import {
  Pulse,
  ArrowUpRight,
  CaretRight,
  Check,
  CirclesFour,
  ClipboardText,
  CloudSun,
  DotsThree,
  Heartbeat,
  Info,
  Lightning,
  LockKey,
  PlayCircle,
  Plus,
  ShieldCheck,
  DeviceMobile,
  WarningCircle,
  X,
} from '@phosphor-icons/react'
import { prototypeData } from './data'
import athleticx from './data/athleticx.json'

const Activity = Pulse
const { athlete, federations, matches, registry } = prototypeData

type View = 'home' | 'passport' | 'performance' | 'health' | 'ministry' | 'federation' | 'coach' | 'medical'
type Modal = 'passport' | 'performance' | 'highlights' | 'health' | 'ministry' | 'body' | 'report' | null
type MinistrySection = 'overview' | 'registry' | 'coverage' | 'governance'
type FederationSection = 'overview' | 'registry' | 'clubs' | 'readiness'
type CoachSection = 'overview' | 'squad' | 'players' | 'matches'
type MedicalSection = 'overview' | 'cases' | 'rehab' | 'clearance'
type NavItem = { id: View; label: string; icon: typeof CirclesFour; target?: string }

const features = {
  passport: {
    eyebrow: 'Your record',
    title: 'Digital Sports Passport',
    body: 'A portable, governed record of your identity, eligibility, medical status, and sporting journey. It stays with you as you move between clubs and national teams.',
  },
  performance: {
    eyebrow: 'Your progress',
    title: 'How your score and recovery work',
    body: 'Stage score — 62 means 62% through Train to Train, the share of the 8 evidence areas completed for this stage.\n\nWhen the 8 areas are sustained with wellbeing context, your coach and clinician review together whether to stay, add support, or schedule a growth check. The score never auto-selects.\n\nRecovery — Ready / Monitor / Rest — combines sleep, wellbeing (1–5), and load from your daily check-in. You see the full context; coaches see only the status.',
  },
  highlights: {
    eyebrow: 'Your story',
    title: 'Video highlight reel',
    body: 'Keep selected match moments in one place so coaches and scouts can see the context behind your numbers.',
  },
  health: {
    eyebrow: 'Your wellbeing',
    title: 'Health and wellness logs',
    body: 'Report pain, recovery, sleep, and wellbeing privately. Your medical team sees the full context while coaches receive only the operational status they need.',
  },
  ministry: {
    eyebrow: 'National oversight',
    title: 'Ministry dashboard',
    body: 'A national view of athlete registration, federation activity, match intelligence, and governed data operations. Individual medical records stay protected from this view.',
  },
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Overview', icon: CirclesFour },
  { id: 'passport', label: 'Passport', icon: ClipboardText },
  { id: 'performance', label: 'Performance', icon: Pulse },
  { id: 'health', label: 'Health', icon: Heartbeat },
]

const ministryNavItems: NavItem[] = [
  { id: 'ministry', label: 'Overview', icon: CirclesFour, target: 'ministry-overview' },
  { id: 'ministry', label: 'Registry', icon: ClipboardText, target: 'ministry-registry' },
  { id: 'ministry', label: 'Coverage', icon: Heartbeat, target: 'ministry-coverage' },
  { id: 'ministry', label: 'Governance', icon: LockKey, target: 'ministry-governance' },
]

const federationNavItems: NavItem[] = [
  { id: 'federation', label: 'Overview', icon: CirclesFour, target: 'federation-overview' },
  { id: 'federation', label: 'Player registry', icon: ClipboardText, target: 'federation-registry' },
  { id: 'federation', label: 'Club coverage', icon: Heartbeat, target: 'federation-clubs' },
  { id: 'federation', label: 'Readiness', icon: Pulse, target: 'federation-readiness' },
]

const coachNavItems: NavItem[] = [
  { id: 'coach', label: 'Overview', icon: CirclesFour, target: 'coach-overview' },
  { id: 'coach', label: 'Squad', icon: ClipboardText, target: 'coach-squad' },
  { id: 'coach', label: 'Player load', icon: Pulse, target: 'coach-players' },
  { id: 'coach', label: 'Matches', icon: PlayCircle, target: 'coach-matches' },
]

const medicalNavItems: NavItem[] = [
  { id: 'medical', label: 'Overview', icon: CirclesFour, target: 'medical-overview' },
  { id: 'medical', label: 'Active cases', icon: Heartbeat, target: 'medical-cases' },
  { id: 'medical', label: 'Rehabilitation', icon: Pulse, target: 'medical-rehab' },
  { id: 'medical', label: 'Clearance', icon: ShieldCheck, target: 'medical-clearance' },
]

// temporarily disabled routes — keep for re-enable (FERWAFA permanently disabled)
void ministryNavItems; void federationNavItems; void medicalNavItems

function App() {
  const [view, setView] = useState<View>('home')
  const [modal, setModal] = useState<Modal>(null)
  const [mobileShell, setMobileShell] = useState(true)
  const [ministrySection, setMinistrySection] = useState<MinistrySection>('overview')
  const [federationSection, setFederationSection] = useState<FederationSection>('overview')
  const [coachSection, setCoachSection] = useState<CoachSection>('overview')
  const [medicalSection, setMedicalSection] = useState<MedicalSection>('overview')
  const [reported, setReported] = useState(false)
  const [selectedBodyPart, setSelectedBodyPart] = useState('Right knee')

  const closeModal = () => setModal(null)
  const openFeature = (feature: keyof typeof features) => setModal(feature)
  const isMinistry = view === 'ministry'
  const isFederation = view === 'federation'
  const isCoach = view === 'coach'
  const isMedical = view === 'medical'

  useEffect(() => {
    if (isMinistry || isFederation || isMedical) {
      setView('home')
      setMobileShell(true)
    }
  }, [isMinistry, isFederation, isMedical])
  const go = (next: View) => {
    setView(next)
    if (next === 'ministry') setMinistrySection('overview')
    if (next === 'federation') setFederationSection('overview')
    if (next === 'coach') setCoachSection('overview')
    if (next === 'medical') setMedicalSection('overview')
    closeModal()
  }
  const selectMedicalSection = (target?: string) => {
    const section = target?.replace('medical-', '') as MedicalSection | undefined
    if (section) setMedicalSection(section)
    setView('medical')
    closeModal()
  }
  const selectCoachSection = (target?: string) => {
    const section = target?.replace('coach-', '') as CoachSection | undefined
    if (section) setCoachSection(section)
    setView('coach')
    closeModal()
  }
  const selectFederationSection = (target?: string) => {
    const section = target?.replace('federation-', '') as FederationSection | undefined
    if (section) setFederationSection(section)
    setView('federation')
    closeModal()
  }
  const selectMinistrySection = (target?: string) => {
    const section = target?.replace('ministry-', '') as MinistrySection | undefined
    if (section) setMinistrySection(section)
    setView('ministry')
    closeModal()
  }

  void selectMinistrySection; void selectFederationSection; void selectMedicalSection

  return (
    <main className="app-stage">
      <div className="stage-toolbar">
        <div className="brand-lockup"><span className="brand-mark">AR</span><span>Athletic Rwanda</span></div>
        <div className="demo-controls">
          <span className="demo-label">{isMinistry ? 'Ministry prototype' : isFederation ? 'FERWAFA prototype' : isCoach ? 'Coach prototype' : isMedical ? 'Medical prototype' : 'Athlete prototype'}</span>
          {!isCoach && <button className="role-switch" onClick={() => { setView('coach'); setCoachSection('overview'); setMobileShell(false) }}>Open Coach view</button>}
          {isCoach && <button className="role-switch" onClick={() => { setView('home'); setMobileShell(true) }}>Return to Athlete</button>}
          <button className={`shell-toggle ${mobileShell ? 'is-active' : ''}`} onClick={() => setMobileShell((current) => !current)}>
            <DeviceMobile size={16} weight="bold" />
            {mobileShell ? 'Mobile shell' : 'Responsive view'}
          </button>
        </div>
      </div>

      <div className={mobileShell ? 'device-frame' : 'device-frame is-wide'}>
        <div className="device-screen">
          <header className="topbar">
            <div className="mobile-brand"><span className="brand-mark">AR</span><span>Athletic Rwanda</span></div>
            <span className="topbar-spacer" aria-hidden="true" />
          </header>

          <div className="app-layout">
            <aside className="sidebar">
              <div className="side-intro">
                {isCoach ? <><span className="side-overline">COACH VIEW</span><strong>{athlete.club} {athlete.competitionLevel}</strong><span>Performance staff</span></> : <><span className="side-overline">ATHLETE PORTAL</span><strong>{athlete.name}</strong><span>{athlete.club} · {athlete.competitionLevel}</span></>}
              </div>
              <nav aria-label="Athlete navigation">
                {(isCoach ? coachNavItems : navItems).map(({ id, label, icon: Icon, target }, index) => (
                  <button key={`${isCoach ? 'coach' : 'athlete'}-${label}-${index}`} className={`nav-item ${isCoach ? (coachSection === (target?.replace('coach-', '') as CoachSection) ? 'is-current' : '') : (view === id ? 'is-current' : '')}`} onClick={() => isCoach ? selectCoachSection(target) : go(id)}>
                    <Icon size={18} weight={view === id ? 'fill' : 'regular'} />{label}
                  </button>
                ))}
              </nav>
              <div className="sidebar-footer"><LockKey size={16} /><span>Your data is governed</span></div>
            </aside>

            <section className="content-area">
              <div className="content-scroll">
                {view === 'home' && <HomeView onFeature={openFeature} onNavigate={go} />}
                {view === 'passport' && <PassportView onInfo={() => openFeature('passport')} />}
                {view === 'performance' && <PerformanceView onInfo={() => openFeature('performance')} onHighlights={() => openFeature('highlights')} />}
                {view === 'health' && (
                  <HealthView
                    reported={reported}
                    selectedBodyPart={selectedBodyPart}
                    onBodyPart={(part) => { setSelectedBodyPart(part); setModal('body') }}
                    onReport={() => setModal('report')}
                    onInfo={() => openFeature('health')}
                  />
                )}
                {view === 'ministry' && <MinistryView section={ministrySection} onInfo={() => openFeature('ministry')} />}
                {view === 'federation' && <FederationView section={federationSection} />}
                {view === 'coach' && <CoachView section={coachSection} />}
                {view === 'medical' && <MedicalView section={medicalSection} />}
              </div>
              <nav className="bottom-nav" aria-label="Mobile navigation">
                {(isCoach ? coachNavItems : navItems).map(({ id, label, icon: Icon, target }) => (
                  <button key={`${isCoach ? 'coach' : 'athlete'}-${label}`} className={`bottom-item ${isCoach ? (coachSection === (target?.replace('coach-', '') as CoachSection) ? 'is-current' : '') : (view === id ? 'is-current' : '')}`} onClick={() => isCoach ? selectCoachSection(target) : go(id)}>
                    <Icon size={20} weight={view === id ? 'fill' : 'regular'} /><span>{label}</span>
                  </button>
                ))}
              </nav>
            </section>
          </div>
        </div>
      </div>

      {modal && modal !== 'body' && modal !== 'report' && <FeatureModal feature={modal} onClose={closeModal} />}
      {modal === 'body' && <BodyModal bodyPart={selectedBodyPart} onClose={closeModal} onReport={() => setModal('report')} />}
      {modal === 'report' && <ReportModal bodyPart={selectedBodyPart} reported={reported} onClose={closeModal} onSubmit={() => { setReported(true); closeModal() }} />}
    </main>
  )
}

function PageHeader({ eyebrow, title, description, onInfo }: { eyebrow: string; title: string; description: string; onInfo?: () => void }) {
  return <div className="page-header"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{onInfo && <button className="info-link" onClick={onInfo}><Info size={18} />What is this?</button>}</div>
}

function HomeView({ onFeature, onNavigate }: { onFeature: (feature: keyof typeof features) => void; onNavigate: (view: View) => void }) {
  return <>
    <div className="welcome-row"><div><span className="eyebrow">ISONGA · ST JOSEPH KABGAYI</span><h1>Good morning Ishimwe Eric,</h1><p className="lede">football · St Joseph Kabgayi · Your record stays with you as you develop.</p></div><div className="weather"><CloudSun size={25} /><span>24°<small>Kabgayi</small></span></div></div>
    <div className="readiness-card">
      <div><span className="card-label">YOUR STAGE — GANZA</span><div className="readiness-score">{athlete.stageProgress}<span>/100</span></div><p className="positive-copy" style={{ color: 'var(--mint)' }}><Check size={15} weight="bold" /> {athlete.stage} · {athlete.stageProgress}% complete</p><p className="small" style={{ marginTop: 6, color: 'var(--muted)', fontSize: '11px' }}>{100 - athlete.stageProgress}% to {athlete.nextStage} · Coach review · Isonga pathway</p></div>
      <div className="readiness-ring" style={{ background: `conic-gradient(var(--mint) 0 ${athlete.stageProgress}%, rgba(255,255,255,.13) ${athlete.stageProgress}% 100%)` }}><div><strong>{athlete.stageProgress}</strong><span>stage</span></div></div>
      <button className="text-button" onClick={() => onFeature('performance')}>View pathway <ArrowUpRight size={16} /></button>
    </div>
    <div className="section-heading"><div><span className="eyebrow">YOUR RECORD</span><h2>Keep moving forward</h2></div><button className="more-button" aria-label="More options"><DotsThree size={22} /></button></div>
    <div className="feature-grid">
      <FeatureCard icon={<ClipboardText />} title="Digital Sports Passport" summary="Identity, eligibility and care in one place." accent="mint" onClick={() => onNavigate('passport')} onInfo={() => onFeature('passport')} />
      <FeatureCard icon={<Pulse />} title="Performance history" summary="Your last five matches, without the noise." accent="violet" onClick={() => onNavigate('performance')} onInfo={() => onFeature('performance')} />
      <FeatureCard icon={<Heartbeat />} title="Health & wellness logs" summary="Report how your body feels today." accent="coral" onClick={() => onNavigate('health')} onInfo={() => onFeature('health')} />
    </div>
    <div className="section-heading compact"><div><span className="eyebrow">RECENT SIGNAL</span><h2>Match rhythm</h2></div><button className="link-button" onClick={() => onNavigate('performance')}>View performance <CaretRight size={15} /></button></div>
    <div className="rhythm-card"><div className="rhythm-top"><div><strong>Minutes played</strong><span>Last 5 matches</span></div><strong className="rhythm-value">384 <small>min</small></strong></div><MiniChart /><div className="match-dots"><span>APR 12</span><span>APR 20</span><span>MAY 03</span><span>MAY 10</span><span>MAY 17</span></div></div>
    <div className="ministry-card" style={{ marginTop: 14 }}><div className="panel-title"><div><span className="eyebrow">YOUR DEVELOPMENT</span><h2>Growth is a development signal</h2></div><span className="verified-pill"><Check size={13} /> {athlete.stage}</span></div><p className="panel-intro">Your height and growth are viewed together over time — with your coach. No single measurement decides your next stage.</p><div className="coverage-detail-grid"><DetailStat label="Current stage" value={athlete.stage} detail={`${athlete.stageProgress}% complete`} /><DetailStat label="Next stage" value={athlete.nextStage} detail={`${100 - athlete.stageProgress}% remaining`} /><DetailStat label="Record" value="One record" detail="Follows you" /></div><p className="small" style={{ marginTop: 12, color: 'var(--muted)' }}>Ganza keeps your record alive — your coach reviews the next step with you.</p></div>
  </>
}

function MinistryView({ section, onInfo }: { section: MinistrySection; onInfo: () => void }) {
  const isVisible = (target: MinistrySection) => section === target ? '' : ' ministry-section-hidden'
  return <>
    <PageHeader eyebrow="NATIONAL OVERSIGHT" title="The sports system, in view." description="A governed national picture of athletes, federations, performance activity, and delivery progress." onInfo={onInfo} />
    <div id="ministry-overview" className={`ministry-hero${isVisible('overview')}`}><div><span className="card-label">PROGRAMME HEALTH</span><h2>On track for the next gate</h2><p>Registry, federation rollout, and data governance are moving together.</p></div><div className="ministry-hero-score"><strong>76%</strong><span>delivery confidence</span></div></div>
    <div className={`ministry-kpis${isVisible('overview')}`}><MinistryKpi label="Athletes registered" value={`${registry.athletesRegistered}+`} trend="+18% this quarter" icon={<Pulse />} /><MinistryKpi label="Federations active" value={`${registry.federationsActive}`} trend="1 onboarding" icon={<CirclesFour />} /><MinistryKpi label="Matches digitized" value={`${registry.matchesDigitized}+`} trend="+64 this month" icon={<Activity />} /><MinistryKpi label="Personnel trained" value={`${registry.personnelTrained}+`} trend="Across 5 federations" icon={<ClipboardText />} /></div>
    <div className="ministry-card" style={{ marginTop: 12 }}><div className="panel-title"><div><span className="eyebrow">COHORT INTELLIGENCE</span><h2>Governed view — {athleticx.cohortIntelligence.pilot} records</h2></div><span className="card-label">Isonga</span></div><p className="panel-intro">Girls {athleticx.cohortIntelligence.girls} · Boys {athleticx.cohortIntelligence.boys} · 5 provinces · 8 disciplines · Train to Train {athleticx.cohortIntelligence.trainToTrain} largest cohort · Consent {athleticx.cohortIntelligence.coverage[0].value} · Injury surveillance {athleticx.cohortIntelligence.coverage[4].value}</p><div className="registry-summary"><div><span>Current consent</span><strong>{athleticx.cohortIntelligence.consent.current}</strong></div><div><span>Renewal attention</span><strong>{athleticx.cohortIntelligence.consent.renewal}</strong></div><div><span>Missing</span><strong>{athleticx.cohortIntelligence.consent.missing}</strong></div></div></div>
    <div className={`ministry-grid ministry-grid-${section}`}>
      <section id="ministry-coverage" className={`ministry-section${isVisible('coverage')}`}>
        <div className="ministry-card"><div className="panel-title"><div><span className="eyebrow">FEDERATION COVERAGE</span><h2>Where delivery is moving</h2></div><button className="icon-button" onClick={onInfo} aria-label="Explain federation coverage"><Info size={18} /></button></div><p className="panel-intro">Coverage measures verified onboarding, active data flow, and trained federation personnel.</p>{federations.map((item, index) => <FederationRow key={item.name} name={item.name} detail={`${item.sport} · ${item.phase}`} value={`${item.coverage}%`} color={index === 0 ? 'high' : index === federations.length - 1 ? 'low' : 'mid'} />)}<div className="coverage-legend"><span><i className="dot dot-mint" /> On track</span><span><i className="dot dot-muted" /> Needs onboarding</span></div><button className="outline-button">Open federation view <ArrowUpRight size={16} /></button></div>
        <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">DELIVERY SNAPSHOT</span><h3>What the percentage means</h3></div><div className="coverage-detail-grid"><DetailStat label="Active data flows" value="18" detail="Across 5 federations" /><DetailStat label="Onboarding complete" value="3 / 5" detail="Two in rollout" /><DetailStat label="Trained personnel" value="100+" detail="Coaches and medics" /></div></div>
        <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">ROLLOUT GATES</span><h3>How federations move forward</h3></div><div className="rollout-steps"><RolloutStep number="01" title="Mandate and data agreement" status="Complete" /><RolloutStep number="02" title="Registry and passport setup" status="In progress" /><RolloutStep number="03" title="Performance pipeline activation" status="Next gate" /></div></div>
      </section>
      <section id="ministry-governance" className={`ministry-section${isVisible('governance')}`}>
        <div className="ministry-card"><div className="panel-title"><div><span className="eyebrow">DATA GOVERNANCE</span><h2>Trust status</h2></div><LockKey size={20} color="var(--mint)" /></div><div className="governance-status"><ShieldCheck size={26} weight="fill" /><div><strong>Protected and in-country</strong><p>HORAS Labs · Rwanda</p></div></div><div className="governance-list"><GovernanceItem label="Data residency" value="Compliant" /><GovernanceItem label="Access events" value="0 unresolved" /><GovernanceItem label="DPO review" value="Current" /></div><div className="audit-preview"><span className="eyebrow">LATEST CONTROL</span><strong>Medical record access is restricted</strong><p>Only authorized medical staff can view individual clinical details.</p></div></div>
        <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">ACCESS MODEL</span><h3>Who can see what</h3></div><div className="governance-detail-grid"><AccessTier title="Athlete" access="Own record" detail="Passport, wellness, self-report" /><AccessTier title="Medical staff" access="Full clinical" detail="Verified care and injury details" /><AccessTier title="Ministry" access="Aggregate only" detail="No individual medical records" /></div></div>
        <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">AUDIT TRAIL</span><h3>Recent controls</h3></div><div className="audit-list"><AuditEvent time="Today · 09:14" title="DPO review completed" detail="No unresolved findings" /><AuditEvent time="Yesterday · 16:42" title="HORAS backup verified" detail="In-country recovery point confirmed" /><AuditEvent time="12 May 2026" title="RISA pathway updated" detail="Technical review record attached" /></div><button className="link-button">View governance log <CaretRight size={15} /></button></div>
      </section>
    </div>
    <section id="ministry-registry" className={`ministry-section registry-section${isVisible('registry')}`}>
      <div className="ministry-card"><div className="panel-title"><div><span className="eyebrow">REGISTRY PULSE</span><h2>National athlete record</h2></div><button className="link-button">Open registry <ArrowUpRight size={15} /></button></div><p className="panel-intro">The registry is the national source of truth for who an athlete is, where they compete, and whether their record is eligible and governed.</p><div className="registry-summary"><div><span>Unique athlete IDs</span><strong>2,500+</strong></div><div><span>Duplicate records resolved</span><strong>38</strong></div><div><span>Records updated this week</span><strong>214</strong></div></div></div>
      <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">FIND A RECORD</span><h3>Search and filter</h3></div><div className="registry-toolbar"><span className="registry-search"><Pulse size={16} /><input aria-label="Search athlete registry" placeholder="Search athlete, club, or ID" /></span><button className="registry-filter">All federations <CaretRight size={14} /></button><button className="registry-filter">Status: Any <CaretRight size={14} /></button></div></div>
      <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">RECORD LIFECYCLE</span><h3>From capture to national use</h3></div><div className="registry-lifecycle"><RegistryStage label="Capture" detail="Profile created" active /><RegistryStage label="Verify" detail="Identity checked" active /><RegistryStage label="Govern" detail="Consent recorded" active /><RegistryStage label="Activate" detail="Ready for use" /></div></div>
      <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">FEDERATION RECORDS</span><h3>Registration by programme</h3></div><div className="registry-table"><div className="registry-row table-head"><span>Federation</span><span>Registered</span><span>Eligibility</span><span>Change</span></div><RegistryRow name="FERWAFA" sport="Football" count="1,420" status="98% cleared" change="124" /><RegistryRow name="Rwanda Athletics" sport="Track & field" count="486" status="94% cleared" change="52" /><RegistryRow name="Rwanda Volleyball" sport="Volleyball" count="318" status="91% cleared" change="38" /><RegistryRow name="Other federations" sport="4 programmes" count="276" status="88% cleared" change="19" /></div></div>
    </section>
    <div className={`ministry-footnote${section === 'overview' ? '' : ' ministry-section-hidden'}`}><Info size={16} /><span>National view uses aggregate and pseudonymized data. Individual medical records remain restricted to authorized medical staff.</span></div>
  </>
}

function MinistryKpi({ label, value, trend, icon }: { label: string; value: string; trend: string; icon: React.ReactNode }) { return <article className="ministry-kpi"><span className="ministry-kpi-icon">{icon}</span><span className="ministry-kpi-label">{label}</span><strong>{value}</strong><em>{trend}</em></article> }
function FederationView({ section }: { section: FederationSection }) {
  const isVisible = (target: FederationSection) => section === target ? '' : ' federation-section-hidden'
  return <>
    <PageHeader eyebrow="FERWAFA CONTROL ROOM" title="Football talent, in view." description="The federation's working picture of players, clubs, eligibility, match records, and national-team readiness." />
    <div className={`federation-grid federation-grid-${section}`}>
      <section id="federation-overview" className={`federation-section${isVisible('overview')}`}>
        <div className="federation-hero"><div><span className="card-label">NATIONAL FOOTBALL PICTURE</span><h2>Selection decisions with a complete record.</h2><p>Identity, eligibility, medical clearance, and performance signals connected across the federation.</p></div><div className="federation-confidence"><strong>88%</strong><span>system readiness</span></div></div>
        <div className="federation-kpis"><FederationKpi label="Registered players" value="1,420" detail="98% eligibility cleared" /><FederationKpi label="Clubs connected" value="32" detail="4 onboarding this month" /><FederationKpi label="Match records" value="500+" detail="Across 18 competitions" /><FederationKpi label="Selection pool" value="184" detail="Ready for review" /></div>
        <div className="federation-overview-grid"><OverviewCard title="Selection readiness" eyebrow="NATIONAL TEAMS" value="184" detail="Players ready for technical review" tone="mint" /><OverviewCard title="Medical clearance" eyebrow="PLAYER SAFETY" value="94%" detail="Current clearance across active players" tone="coral" /><OverviewCard title="Age verification" eyebrow="INTEGRITY" value="98%" detail="Records verified against federation requirements" tone="violet" /></div>
      </section>
      <section id="federation-registry" className={`federation-section${isVisible('registry')}`}>
        <div className="federation-card"><div className="panel-title"><div><span className="eyebrow">PLAYER REGISTRY</span><h2>Find a football record</h2></div><span className="verified-pill"><Check size={13} /> Live</span></div><p className="panel-intro">Search verified players by name, club, position, or eligibility status.</p><div className="registry-toolbar"><span className="registry-search"><Pulse size={16} /><input aria-label="Search football registry" placeholder="Search player, club, or player ID" /></span><button className="registry-filter">All clubs <CaretRight size={14} /></button><button className="registry-filter">Eligibility <CaretRight size={14} /></button></div></div>
        <div className="federation-card"><div className="card-section-heading"><span className="eyebrow">ACTIVE RECORDS</span><h3>Players requiring attention</h3></div><div className="attention-list"><AttentionRow name="Eric M." club="AS Kigali · U20" status="Medical review" tone="coral" /><AttentionRow name="Jean P." club="APR FC · Senior" status="Age verification" tone="violet" /><AttentionRow name="Samuel N." club="Rayon Sports · U20" status="Profile incomplete" tone="muted" /></div></div>
        <div className="federation-card"><div className="card-section-heading"><span className="eyebrow">REGISTERED PLAYER POOL</span><h3>Federation records</h3></div><div className="registry-table federation-table"><div className="registry-row table-head"><span>Player / club</span><span>Position</span><span>Status</span><span>Updated</span></div><FederationPlayer name="Eric M." club="AS Kigali" position="Right-back" status="Ready" updated="Today" /><FederationPlayer name="Jean P." club="APR FC" position="Midfielder" status="Review" updated="Yesterday" /><FederationPlayer name="Samuel N." club="Rayon Sports" position="Forward" status="Ready" updated="12 May" /><FederationPlayer name="Patrick K." club="Police FC" position="Goalkeeper" status="Ready" updated="10 May" /></div></div>
      </section>
      <section id="federation-clubs" className={`federation-section${isVisible('clubs')}`}>
        <div className="federation-card"><div className="panel-title"><div><span className="eyebrow">CLUB COVERAGE</span><h2>Connected clubs</h2></div><span className="card-label">32 TOTAL</span></div><p className="panel-intro">Club readiness combines registry coverage, trained staff, active data flow, and match uploads.</p><ClubRow name="AS Kigali" players="118 players" coverage="96%" status="Active" /><ClubRow name="APR FC" players="104 players" coverage="94%" status="Active" /><ClubRow name="Rayon Sports" players="96 players" coverage="82%" status="Active" /><ClubRow name="Police FC" players="74 players" coverage="61%" status="Onboarding" /><ClubRow name="Etincelles FC" players="52 players" coverage="44%" status="Onboarding" /></div>
        <div className="federation-card club-metrics"><div className="card-section-heading"><span className="eyebrow">CLUB OPERATIONS</span><h3>This month's movement</h3></div><div className="club-metric-row"><strong>4</strong><span>new clubs started onboarding</span></div><div className="club-metric-row"><strong>18</strong><span>active match data flows</span></div><div className="club-metric-row"><strong>67</strong><span>staff trained this quarter</span></div></div>
        <div className="federation-card"><div className="card-section-heading"><span className="eyebrow">ONBOARDING CHECKLIST</span><h3>What a club must complete</h3></div><ChecklistItem label="Named federation contact" done /><ChecklistItem label="Player registry import" done /><ChecklistItem label="Medical staff access" done /><ChecklistItem label="Match footage pipeline" /></div>
      </section>
      <section id="federation-readiness" className={`federation-section${isVisible('readiness')}`}>
        <div className="federation-card readiness-banner"><div><span className="eyebrow">NATIONAL TEAM READINESS</span><h2>184 players ready for technical review</h2><p>Eligibility, medical clearance, and performance history are available before selection camp.</p></div><div className="readiness-number">184</div></div>
        <div className="readiness-grid"><ReadinessCard label="Eligibility cleared" value="1,392" total="1,420 players" color="mint" /><ReadinessCard label="Medical current" value="1,335" total="1,420 players" color="coral" /><ReadinessCard label="Performance rated" value="1,104" total="1,420 players" color="violet" /></div>
        <div className="federation-card"><div className="card-section-heading"><span className="eyebrow">SELECTION REVIEW QUEUE</span><h3>Next technical review</h3></div><div className="selection-row"><div className="selection-date"><strong>18</strong><span>JUN</span></div><div><strong>U20 national team camp</strong><p>28 players · Kigali · 09:00</p></div><span className="verified-pill"><Check size={13} /> Ready</span></div><div className="selection-row"><div className="selection-date"><strong>24</strong><span>JUN</span></div><div><strong>Senior national team review</strong><p>42 players · FERWAFA HQ · 14:00</p></div><span className="verified-pill"><Check size={13} /> Ready</span></div></div>
      </section>
    </div>
  </>
}

function CoachView({ section }: { section: CoachSection }) {
  const isVisible = (target: CoachSection) => section === target ? '' : ' coach-section-hidden'
  return <>
    <PageHeader eyebrow="AS KIGALI U20 · COACH VIEW" title="Train the team in context." description="A practical coaching view of squad readiness, workload, player risk, and match evidence." />
    <div className="coach-grid">
      <section id="coach-overview" className={`coach-section${isVisible('overview')}`}>
        <div className="coach-hero"><div><span className="card-label">NEXT SESSION</span><h2>Keep the group sharp, not overloaded.</h2><p>Tuesday training · 16:00 · Amahoro Stadium · 24 players in squad</p></div><div className="session-status"><Check size={17} weight="bold" /> Planned</div></div>
        <div className="coach-kpis"><CoachKpi label="Ready to train" value="18" detail="75% of squad" tone="mint" /><CoachKpi label="Monitor load" value="4" detail="Needs adjustment" tone="coral" /><CoachKpi label="Unavailable" value="2" detail="Medical review" tone="violet" /><CoachKpi label="Training load" value="72%" detail="Squad average" tone="neutral" /></div>
        <div className="coach-overview-grid"><CoachInsight title="Today's focus" detail="Reduce high-intensity volume for the four players in the monitoring group." action="Open load view" tone="coral" /><CoachInsight title="Selection signal" detail="Eric M. is cleared and trending upward across his last five matches." action="Open player" tone="mint" /><CoachInsight title="Last match" detail="AS Kigali 2 · Rayon Sports 1 · 90 minutes of match data available." action="Review match" tone="violet" /></div>
      </section>
      <section id="coach-squad" className={`coach-section${isVisible('squad')}`}>
        <div className="coach-card"><div className="panel-title"><div><span className="eyebrow">SQUAD MANAGEMENT</span><h2>Training group</h2></div><span className="verified-pill"><Check size={13} /> 18 ready</span></div><p className="panel-intro">A shared view of availability, workload, and the next action for every player.</p><div className="registry-toolbar"><span className="registry-search"><Pulse size={16} /><input aria-label="Search squad" placeholder="Search player or position" /></span><button className="registry-filter">All positions <CaretRight size={14} /></button><button className="registry-filter">Readiness <CaretRight size={14} /></button></div></div>
        <div className="coach-card"><div className="card-section-heading"><span className="eyebrow">PLAYER GROUPS</span><h3>Where attention goes</h3></div><CoachGroup label="Ready to train" count="18" detail="Normal session plan" tone="mint" /><CoachGroup label="Monitor load" count="4" detail="Adjust high-intensity work" tone="coral" /><CoachGroup label="Medical review" count="2" detail="Await clearance" tone="violet" /></div>
        <div className="coach-card"><div className="card-section-heading"><span className="eyebrow">SQUAD TABLE</span><h3>Player readiness</h3></div><div className="registry-table coach-table"><div className="registry-row table-head"><span>Player / position</span><span>Load</span><span>Readiness</span><span>Action</span></div><CoachPlayer name="Eric M." position="Right-back" load="72%" readiness="Ready" action="Train" /><CoachPlayer name="Jean P." position="Midfielder" load="91%" readiness="Monitor" action="Reduce load" /><CoachPlayer name="Samuel N." position="Forward" load="84%" readiness="Ready" action="Train" /><CoachPlayer name="Patrick K." position="Goalkeeper" load="—" readiness="Medical" action="Review" /></div></div>
      </section>
      <section id="coach-players" className={`coach-section${isVisible('players')}`}>
        <div className="coach-card"><div className="panel-title"><div><span className="eyebrow">SELECTION PROCESS</span><h2>From squad to shortlist</h2></div><span className="verified-pill"><Check size={13} /> 4 stages</span></div><p className="panel-intro">The intelligence pipeline narrows the squad using eligibility, workload, readiness, and coach review. It does not replace the coach's decision.</p><div className="selection-process"><SelectionStep number="01" title="Eligible pool" detail="24 players" status="Complete" /><SelectionStep number="02" title="Readiness screen" detail="18 players" status="Complete" /><SelectionStep number="03" title="Load and risk review" detail="12 players" status="In progress" /><SelectionStep number="04" title="Coach shortlist" detail="11 players" status="Your decision" /></div></div>
        <div className="coach-card"><div className="card-section-heading"><span className="eyebrow">SHORTLIST CANDIDATES</span><h3>Players to review</h3></div><ShortlistRow name="Eric M." position="Right-back" signal="Low risk" metric="82 readiness" tone="mint" /><ShortlistRow name="Samuel N." position="Forward" signal="Strong form" metric="8.4 / 10" tone="violet" /><ShortlistRow name="Jean P." position="Midfielder" signal="Load high" metric="91% load" tone="coral" /><ShortlistRow name="Patrick K." position="Goalkeeper" signal="Medical review" metric="Hold" tone="muted" /></div>
        <div className="coach-card player-load-hero"><div><span className="eyebrow">SELECTED PLAYER LOAD</span><h2>Eric M. · Right-back</h2><p>Selected from the shortlist · AS Kigali U20 · Last five matches</p></div><div className="player-risk"><span>RISK</span><strong>Low</strong></div></div>
        <div className="coach-metric-grid"><CoachMetric label="Minutes" value="384" detail="+12%" /><CoachMetric label="Top speed" value="28.4" detail="km/h" /><CoachMetric label="Recovery" value="82%" detail="Ready" /><CoachMetric label="Match load" value="72%" detail="Within range" /></div>
        <div className="coach-card"><div className="panel-title"><div><span className="eyebrow">LOAD / RECOVERY</span><h2>Player trend</h2></div><span className="verified-pill"><Check size={13} /> Stable</span></div><LargeChart /></div>
        <div className="coach-card"><div className="card-section-heading"><span className="eyebrow">COACH ACTION</span><h3>What should happen next?</h3></div><div className="coach-action-list"><CoachAction title="Keep normal training plan" detail="Recovery is within the target range." /><CoachAction title="Review after next session" detail="Recalculate load after Tuesday training." /><CoachAction title="Share only operational status" detail="Medical details remain restricted to clinical staff." /></div></div>
      </section>
      <section id="coach-matches" className={`coach-section${isVisible('matches')}`}>
        <div className="coach-card"><div className="panel-title"><div><span className="eyebrow">MATCH LIBRARY</span><h2>Choose the evidence</h2></div><span className="verified-pill"><Check size={13} /> 12 processed</span></div><p className="panel-intro">Every insight below starts with an uploaded match, not an unexplained conclusion.</p><div className="match-library">{matches.map((match) => <MatchLibraryRow key={match.id} opponent={match.away} result={match.result} date={match.date} status={match.status} />)}</div></div>
        <div className="coach-card"><div className="card-section-heading"><span className="eyebrow">INTELLIGENCE PIPELINE</span><h3>How the insight is produced</h3></div><div className="pipeline-strip"><PipelineStep label="Match video" detail="Ingested" active /><PipelineStep label="Player tracking" detail="IDs assigned" active /><PipelineStep label="Pitch metrics" detail="Calibrated" active /><PipelineStep label="AI insight" detail="Generated" active /></div><p className="pipeline-note">The moat is the governed chain from ordinary match footage to decision-ready football intelligence.</p></div>
        <div className="coach-match-grid"><div className="coach-card"><div className="card-section-heading"><span className="eyebrow">AI INSIGHTS · RAYON SPORTS</span><h3>What the pipeline found</h3></div><InsightCard title="Right-side overload" detail="AS Kigali created 38% of progressive actions through Eric's side in the second half." action="Protect the channel late in matches" /><InsightCard title="Recovery window" detail="Eric's high-intensity output stayed within his established five-match range." action="Keep normal recovery plan" /><InsightCard title="Press trigger" detail="The team recovered possession 23 times within 6 seconds of losing the ball." action="Repeat the second-half press cue" /></div><div className="coach-card"><div className="card-section-heading"><span className="eyebrow">VIDEO EVIDENCE</span><h3>Selected match moments</h3></div><video className="coach-match-video" controls preload="metadata" poster="/performance-poster.svg"><source src="/performance-demo.mp4" type="video/mp4" />Your browser does not support video playback.</video><span className="video-caption">8 moments linked to the generated insights</span></div></div>
        <div className="coach-card"><div className="card-section-heading"><span className="eyebrow">COACH DECISION</span><h3>Turn intelligence into action</h3></div><div className="decision-grid"><DecisionCard title="Training plan" value="Normal load" detail="No overload intervention required" /><DecisionCard title="Tactical focus" value="Right channel" detail="Use late-match protection cue" /><DecisionCard title="Selection note" value="Eric cleared" detail="Ready for next technical review" /></div></div>
      </section>
    </div>
  </>
}

function MedicalView({ section }: { section: MedicalSection }) {
  const isVisible = (target: MedicalSection) => section === target ? '' : ' medical-section-hidden'
  return <>
    <PageHeader eyebrow="MEDICAL STAFF · AS KIGALI U20" title="Protect the athlete before the injury." description="A clinical workspace for screening, injury surveillance, rehabilitation, and return-to-play decisions." />
    <div className="medical-grid">
      <section id="medical-overview" className={`medical-section${isVisible('overview')}`}>
        <div className="medical-hero"><div><span className="card-label">CLINICAL WORKLOAD</span><h2>4 players need medical attention today.</h2><p>Prioritize the cases that affect training, selection, and safe return to play.</p></div><div className="medical-hero-count"><strong>4</strong><span>active reviews</span></div></div>
        <div className="medical-kpis"><MedicalKpi label="Active cases" value="4" detail="2 new this week" tone="coral" /><MedicalKpi label="In rehabilitation" value="3" detail="1 near clearance" tone="violet" /><MedicalKpi label="Cleared today" value="6" detail="No restrictions" tone="mint" /><MedicalKpi label="Screening due" value="8" detail="Next 14 days" tone="neutral" /></div>
        <div className="medical-overview-grid"><MedicalInsight title="Immediate review" detail="Jean P. has elevated workload and a reported hamstring concern." action="Open case" tone="coral" /><MedicalInsight title="Rehabilitation progress" detail="Patrick K. completed the current strength and mobility block." action="View rehab" tone="violet" /><MedicalInsight title="Screening programme" detail="Eight athletes are due for repeat movement and growth checks." action="Open schedule" tone="mint" /></div>
      </section>
      <section id="medical-cases" className={`medical-section${isVisible('cases')}`}>
        <div className="medical-card"><div className="panel-title"><div><span className="eyebrow">INJURY SURVEILLANCE</span><h2>Active cases</h2></div><span className="verified-pill"><Check size={13} /> Protected</span></div><p className="panel-intro">Clinical cases are visible only to authorized medical staff and are separated from coach and Ministry views.</p><div className="medical-toolbar"><span className="registry-search"><Pulse size={16} /><input aria-label="Search medical cases" placeholder="Search athlete or body region" /></span><button className="registry-filter">All statuses <CaretRight size={14} /></button></div></div>
        <div className="medical-card"><div className="card-section-heading"><span className="eyebrow">OPEN CASES</span><h3>Priority review queue</h3></div><MedicalCase name="Jean P." club="APR FC · Midfielder" region="Hamstring" mechanism="Overuse" status="Review today" tone="coral" /><MedicalCase name="Eric M." club="AS Kigali · Right-back" region="Right knee" mechanism="Training load" status="Monitoring" tone="violet" /><MedicalCase name="Patrick K." club="Police FC · Goalkeeper" region="Ankle" mechanism="Contact" status="Rehab" tone="mint" /><MedicalCase name="Samuel N." club="Rayon Sports · Forward" region="Calf" mechanism="Unknown" status="Awaiting exam" tone="muted" /></div>
        <div className="medical-card"><div className="card-section-heading"><span className="eyebrow">CASE DATA</span><h3>What gets recorded</h3></div><div className="clinical-data-grid"><ClinicalData label="Incidence" value="4" detail="New cases this month" /><ClinicalData label="Days lost" value="18" detail="Across active cases" /><ClinicalData label="Recurrence" value="1" detail="Needs follow-up" /><ClinicalData label="Top region" value="Knee" detail="32% of reports" /></div></div>
      </section>
      <section id="medical-rehab" className={`medical-section${isVisible('rehab')}`}>
        <div className="medical-card"><div className="panel-title"><div><span className="eyebrow">REHABILITATION</span><h2>Progress without guesswork</h2></div><span className="card-label">3 ACTIVE</span></div><p className="panel-intro">Track treatment milestones, functional tests, and the evidence required before clearance.</p><RehabRow name="Patrick K." injury="Ankle sprain" progress="82%" next="Single-leg stability" tone="mint" /><RehabRow name="Eric M." injury="Right knee monitoring" progress="64%" next="Repeat Y Balance" tone="violet" /><RehabRow name="Jean P." injury="Hamstring concern" progress="28%" next="Clinical assessment" tone="coral" /></div>
        <div className="medical-card"><div className="card-section-heading"><span className="eyebrow">FUNCTIONAL TESTS</span><h3>Latest assessment results</h3></div><ClinicalTest name="FMS composite" score="15 / 21" result="Acceptable" /><ClinicalTest name="Y Balance asymmetry" score="3.2 cm" result="Within target" /><ClinicalTest name="Countermovement jump" score="36 cm" result="Baseline stable" /><ClinicalTest name="Resting heart rate" score="62 bpm" result="At baseline" /></div>
        <div className="medical-card"><div className="card-section-heading"><span className="eyebrow">CARE PLAN</span><h3>Next clinical actions</h3></div><MedicalAction title="Repeat functional screen" detail="Eric M. · Before next selection review" /><MedicalAction title="Update rehabilitation plan" detail="Patrick K. · After stability test" /><MedicalAction title="Schedule DPO-safe case review" detail="Jean P. · Today at 15:00" /></div>
      </section>
      <section id="medical-clearance" className={`medical-section${isVisible('clearance')}`}>
        <div className="medical-card clearance-hero"><div><span className="eyebrow">RETURN TO PLAY</span><h2>Clearance decisions need evidence.</h2><p>Review medical status, functional test results, and workload context before a player returns to competition.</p></div><ShieldCheck size={35} color="var(--mint)" /></div>
        <div className="clearance-grid"><ClearanceCard name="Eric M." status="Monitoring" detail="Clear for normal training" tone="violet" /><ClearanceCard name="Patrick K." status="Conditional" detail="Clear after stability test" tone="mint" /><ClearanceCard name="Jean P." status="Hold" detail="Clinical review required" tone="coral" /></div>
        <div className="medical-card"><div className="card-section-heading"><span className="eyebrow">CLEARANCE QUEUE</span><h3>Decisions awaiting sign-off</h3></div><ClearanceRow name="Patrick K." decision="Conditional clearance" evidence="Rehab 82% · stability test pending" /><ClearanceRow name="Jean P." decision="Hold from high intensity" evidence="Hamstring concern · clinical exam pending" /><ClearanceRow name="Eric M." decision="Normal training" evidence="Readiness 82 · load within range" /></div>
      </section>
    </div>
  </>
}

function MedicalKpi({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: string }) { return <article className={`medical-kpi ${tone}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article> }
function MedicalInsight({ title, detail, action, tone }: { title: string; detail: string; action: string; tone: string }) { return <article className={`medical-insight ${tone}`}><span className="eyebrow">{title}</span><p>{detail}</p><button className="link-button">{action} <ArrowUpRight size={15} /></button></article> }
function MedicalCase({ name, club, region, mechanism, status, tone }: { name: string; club: string; region: string; mechanism: string; status: string; tone: string }) { return <div className="medical-case"><div><strong>{name}</strong><span>{club}</span></div><div><b>{region}</b><small>{mechanism}</small></div><em className={tone}>{status}</em><CaretRight size={15} /></div> }
function ClinicalData({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="clinical-data"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div> }
function RehabRow({ name, injury, progress, next, tone }: { name: string; injury: string; progress: string; next: string; tone: string }) { return <div className="rehab-row"><div><strong>{name}</strong><span>{injury}</span></div><div className="progress-track"><span className={tone} style={{ width: progress }} /></div><b>{progress}</b><small>{next}</small></div> }
function ClinicalTest({ name, score, result }: { name: string; score: string; result: string }) { return <div className="clinical-test"><div><strong>{name}</strong><small>{result}</small></div><b>{score}</b></div> }
function MedicalAction({ title, detail }: { title: string; detail: string }) { return <div className="medical-action"><span><Check size={14} /></span><div><strong>{title}</strong><small>{detail}</small></div></div> }
function ClearanceCard({ name, status, detail, tone }: { name: string; status: string; detail: string; tone: string }) { return <article className={`clearance-card ${tone}`}><span>{name}</span><strong>{status}</strong><small>{detail}</small></article> }
function ClearanceRow({ name, decision, evidence }: { name: string; decision: string; evidence: string }) { return <div className="clearance-row"><div><strong>{name}</strong><span>{decision}</span></div><small>{evidence}</small><CaretRight size={15} /></div> }

function CoachKpi({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: string }) { return <article className={`coach-kpi ${tone}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article> }
function CoachInsight({ title, detail, action, tone }: { title: string; detail: string; action: string; tone: string }) { return <article className={`coach-insight ${tone}`}><span className="eyebrow">{title}</span><p>{detail}</p><button className="link-button">{action} <ArrowUpRight size={15} /></button></article> }
function CoachGroup({ label, count, detail, tone }: { label: string; count: string; detail: string; tone: string }) { return <div className={`coach-group ${tone}`}><strong>{count}</strong><div><b>{label}</b><span>{detail}</span></div><CaretRight size={16} /></div> }
function CoachPlayer({ name, position, load, readiness, action }: { name: string; position: string; load: string; readiness: string; action: string }) { return <div className="registry-row coach-player"><span><strong>{name}</strong><small>{position}</small></span><b>{load}</b><span className={readiness === 'Ready' ? 'clear-status' : readiness === 'Monitor' ? 'review-status' : 'medical-status'}>{readiness}</span><span>{action}</span></div> }
function CoachMetric({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="coach-metric"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div> }
function SelectionStep({ number, title, detail, status }: { number: string; title: string; detail: string; status: string }) { return <div className="selection-step"><span>{number}</span><div><strong>{title}</strong><small>{detail}</small></div><em>{status}</em></div> }
function ShortlistRow({ name, position, signal, metric, tone }: { name: string; position: string; signal: string; metric: string; tone: string }) { return <div className="shortlist-row"><div><strong>{name}</strong><span>{position}</span></div><em className={tone}>{signal}</em><b>{metric}</b><CaretRight size={15} /></div> }
function CoachAction({ title, detail }: { title: string; detail: string }) { return <div className="coach-action"><span><Check size={14} /></span><div><strong>{title}</strong><small>{detail}</small></div></div> }
function MatchLibraryRow({ opponent, result, date, status }: { opponent: string; result: string; date: string; status: string }) { return <div className="match-library-row"><div><strong>AS Kigali vs {opponent}</strong><span>{date}</span></div><b>{result}</b><em className={status === 'Selected' ? 'selected' : ''}>{status}</em><CaretRight size={15} /></div> }
function PipelineStep({ label, detail, active }: { label: string; detail: string; active?: boolean }) { return <div className={`pipeline-step ${active ? 'active' : ''}`}><span>{label}</span><small>{detail}</small></div> }
function InsightCard({ title, detail, action }: { title: string; detail: string; action: string }) { return <div className="insight-card"><div><strong>{title}</strong><p>{detail}</p></div><span><ArrowUpRight size={15} />{action}</span></div> }
function DecisionCard({ title, value, detail }: { title: string; value: string; detail: string }) { return <div className="decision-card"><span>{title}</span><strong>{value}</strong><small>{detail}</small></div> }

function FederationKpi({ label, value, detail }: { label: string; value: string; detail: string }) { return <article className="federation-kpi"><span>{label}</span><strong>{value}</strong><small>{detail}</small></article> }
function OverviewCard({ eyebrow, title, value, detail, tone }: { eyebrow: string; title: string; value: string; detail: string; tone: string }) { return <article className={`overview-card ${tone}`}><span className="eyebrow">{eyebrow}</span><h3>{title}</h3><strong>{value}</strong><p>{detail}</p></article> }
function AttentionRow({ name, club, status, tone }: { name: string; club: string; status: string; tone: string }) { return <div className="attention-row"><div><strong>{name}</strong><span>{club}</span></div><em className={tone}>{status}</em><CaretRight size={15} /></div> }
function FederationPlayer({ name, club, position, status, updated }: { name: string; club: string; position: string; status: string; updated: string }) { return <div className="registry-row federation-player"><span><strong>{name}</strong><small>{club}</small></span><span>{position}</span><span className={status === 'Ready' ? 'clear-status' : 'review-status'}>{status === 'Ready' && <Check size={13} />}{status}</span><span>{updated}</span></div> }
function ClubRow({ name, players, coverage, status }: { name: string; players: string; coverage: string; status: string }) { return <div className="club-row"><div><strong>{name}</strong><span>{players}</span></div><div className="progress-track"><span style={{ width: coverage }} /></div><b>{coverage}</b><em className={status === 'Active' ? 'active' : ''}>{status}</em></div> }
function ChecklistItem({ label, done }: { label: string; done?: boolean }) { return <div className="checklist-item"><span className={done ? 'done' : ''}>{done ? <Check size={13} /> : ''}</span><strong>{label}</strong><small>{done ? 'Complete' : 'Next'}</small></div> }
function ReadinessCard({ label, value, total, color }: { label: string; value: string; total: string; color: string }) { return <article className={`readiness-card ${color}`}><span className="eyebrow">{label}</span><strong>{value}</strong><small>{total}</small><div className="progress-track"><span style={{ width: '88%' }} /></div></article> }
function FederationRow({ name, detail, value, color }: { name: string; detail: string; value: string; color: string }) { return <div className="federation-row"><div><strong>{name}</strong><span>{detail}</span></div><div className="progress-track"><span className={color} style={{ width: value }} /></div><b>{value}</b></div> }
function GovernanceItem({ label, value }: { label: string; value: string }) { return <div className="governance-item"><span>{label}</span><strong><Check size={14} />{value}</strong></div> }
function RegistryRow({ name, sport, count, status, change }: { name: string; sport: string; count: string; status: string; change: string }) { return <div className="registry-row"><span><strong>{name}</strong><small>{sport}</small></span><b>{count}</b><span className="clear-status"><Check size={13} />{status}</span><em>+{change}</em></div> }
function DetailStat({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="detail-stat"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div> }
function RolloutStep({ number, title, status }: { number: string; title: string; status: string }) { return <div className="rollout-step"><span>{number}</span><strong>{title}</strong><em>{status}</em></div> }
function AccessTier({ title, access, detail }: { title: string; access: string; detail: string }) { return <div className="access-tier"><span>{title}</span><strong>{access}</strong><small>{detail}</small></div> }
function AuditEvent({ time, title, detail }: { time: string; title: string; detail: string }) { return <div className="audit-event"><span>{time}</span><strong>{title}</strong><small>{detail}</small></div> }
function RegistryStage({ label, detail, active }: { label: string; detail: string; active?: boolean }) { return <div className={`registry-stage ${active ? 'is-active' : ''}`}><span>{label}</span><small>{detail}</small></div> }

function FeatureCard({ icon, title, summary, accent, onClick, onInfo }: { icon: React.ReactNode; title: string; summary: string; accent: string; onClick: () => void; onInfo: () => void }) {
  return <article className={`feature-card ${accent}`}><button className="feature-main" onClick={onClick}><span className="feature-icon">{icon}</span><span className="feature-title">{title}</span><span className="feature-summary">{summary}</span><span className="feature-arrow"><ArrowUpRight size={17} /></span></button><button className="feature-info" aria-label={`Explain ${title}`} onClick={onInfo}><Info size={15} /></button></article>
}

function PassportView({ onInfo }: { onInfo: () => void }) {
  return <><PageHeader eyebrow="YOUR RECORD" title="Ganza Passport — Isonga" description="Your Isonga record stays with you — the school is an attribute, the ID is yours. St Joseph Kabgayi is your school." onInfo={onInfo} /><div className="passport-card"><div className="passport-top"><div><span className="card-label">GANZA ID — STABLE</span><strong>{athlete.id}</strong></div><ShieldCheck size={28} weight="fill" /></div><div className="passport-person"><div className="avatar">IE</div><div><h2>{athlete.name}</h2><p>Football · {(athlete as any).school} · {athlete.competitionLevel}</p></div><span className="verified-pill"><Check size={13} /> Verified</span></div><div className="passport-grid"><DataPoint label="Eligibility" value={athlete.eligibility} /><DataPoint label="Current school" value="St Joseph Kabgayi" /><DataPoint label="Current stage" value={`${(athlete as any).stage} · ${(athlete as any).stageProgress}%`} /><DataPoint label="Home" value={`${(athlete as any).homeAddress.district} · ${(athlete as any).homeAddress.sector}`} /></div><div className="passport-grid" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)' }}><DataPoint label="Isonga centre" value="Isonga Centre at St Joseph Kabgayi" /><DataPoint label="Guardian" value={(athlete as any).homeAddress.guardian} /><DataPoint label="ID note" value="School change does not change ID" /><DataPoint label="Next review" value={athlete.nextAppointment} /></div></div><div className="section-heading compact"><div><span className="eyebrow">PASSPORT TRAIL</span><h2>Recent updates</h2></div></div><div className="timeline"><TimelineItem date="Today · 08:40" title="Wellness check completed" detail={`Stage progress ${(athlete as any).stageProgress}% — ${(athlete as any).stage}.`} icon={<Heartbeat />} /><TimelineItem date="Yesterday · 17:20" title="Match record added" detail={`${(athlete as any).school} · ${athlete.minutesPlayed} minutes.`} icon={<Activity />} /><TimelineItem date="12 May 2026" title="Eligibility verified" detail="School record confirmed for the current competition." icon={<ShieldCheck />} /></div></>
}

function PerformanceView({ onInfo, onHighlights }: { onInfo: () => void; onHighlights: () => void }) {
  return <><PageHeader eyebrow="YOUR PROGRESS" title="Performance history" description="How your development moves over time — Ganza keeps it as a trajectory." onInfo={onInfo} /><div className="performance-hero"><div><span className="card-label">CURRENT FORM — GANZA</span><h2>Steady improvement</h2><p>Personal trajectory vs your baseline (100) — same 8 evidence areas</p></div><div className="form-score">+8%<small>trend</small></div></div><div className="metric-grid"><Metric label="Power" value="+2.4 cm" change="Countermovement jump" /><Metric label="Top speed" value="28.4" unit="km/h" change="Recent eval" /><Metric label="Recovery" value="Ready" change="Monitor / Rest" /></div><div className="chart-panel"><div className="panel-title"><div><span className="eyebrow">YOUR TRAJECTORY — BASELINE 100</span><h2>Personal change vs your own start</h2></div><button className="icon-button" onClick={onInfo} aria-label="Explain trajectory"><Info size={18} /></button></div><p className="panel-intro" style={{ marginTop: 8, fontSize: '11px', color: 'var(--muted)' }}>Green = your current trajectory · Dashed = your baseline (100) — same 8 evidence areas, shown as + / − trend vs baseline. Not vs other students.</p><LargeChart /></div><div className="video-frame video-split"><div className="video-left" style={{ position: 'relative' }}><span className="video-tag">PERSONAL EVALUATION</span><video controls preload="metadata" poster="/performance-poster.svg"><source src="/performance-demo.mp4" type="video/mp4" />Your browser does not support video playback.</video><div className="video-copy"><span className="eyebrow">YOUR PREVIOUS EVALUATION — GANZA</span><h2>St Joseph Kabgayi — Recent eval by coach</h2><p>Recorded with overlays · Recent record only · Isonga Centre</p></div></div><div className="video-stats"><span className="eyebrow">OVERLAYS</span><div className="stat-row"><span>Touch</span><strong>42</strong><small>+6 vs last eval</small></div><div className="stat-row"><span>Shot</span><strong>3</strong><small>1 on target</small></div><div className="stat-row"><span>Sprint</span><strong>28.4</strong><small>km/h top</small></div><p className="small" style={{ marginTop: 12, color: 'var(--muted)', fontSize: '10px' }}>Overlays — touch, shot, sprint</p></div></div><button className="highlight-card" onClick={onHighlights}><span className="video-icon"><PlayCircle size={25} weight="fill" /></span><span><strong>Video highlight reel</strong><small>8 moments · Available in Performance</small></span><CaretRight size={19} /></button></>
}

function HealthView({ reported, selectedBodyPart, onBodyPart, onReport, onInfo }: { reported: boolean; selectedBodyPart: string; onBodyPart: (part: string) => void; onReport: () => void; onInfo: () => void }) {
  const [show3D, setShow3D] = useState(false)
  return <><PageHeader eyebrow="YOUR WELLBEING" title="Health and wellness" description="Tell us how your body feels. Your medical team sees the full context." onInfo={onInfo} /><div className={`health-alert ${reported ? 'is-reported' : ''}`}><div className="alert-icon"><WarningCircle size={22} weight="fill" /></div><div><strong>{reported ? 'Report sent for review' : 'One item needs your attention'}</strong><p>{reported ? `${selectedBodyPart} report is waiting for medical staff.` : 'Your recent check-in flagged a possible workload concern.'}</p></div><CaretRight size={18} /></div><div className="body-map-card"><div className="panel-title"><div><span className="eyebrow">BODY MAP</span><h2>Where does it hurt?</h2></div><button className="icon-button" onClick={onInfo} aria-label="Explain body map"><Info size={18} /></button></div><div className="body-map-stage"><BodyMap selected={selectedBodyPart} onSelect={onBodyPart} /><div className="body-map-legend"><span><i className="dot dot-coral" /> Needs review</span><span><i className="dot dot-mint" /> Cleared</span></div></div><button className="primary-button" onClick={onReport}><Plus size={18} weight="bold" /> Report pain or discomfort</button><button className="outline-button" onClick={() => setShow3D(true)} style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}>View 3D muscles — Écorché reference</button>{show3D && <div className="sketchfab-modal"><div className="sketchfab-frame"><div className="panel-title"><div><span className="eyebrow">3D REFERENCE — ÉCORCHÉ</span><h2>Muscle anatomy</h2></div><button className="icon-button" onClick={() => setShow3D(false)} aria-label="Close 3D view"><X size={18} /></button></div><div className="sketchfab-embed"><iframe title="Écorché Male Musclenames Anatomy — Sketchfab" src="https://sketchfab.com/models/33162ec759e04d2985dbbdf4ec908d66/embed?autostart=0&dnt=1&ui_theme=light" allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen style={{ width: '100%', height: '380px', border: 0, borderRadius: '12px' }}></iframe></div><p className="small" style={{ marginTop: 8, color: 'var(--muted)', fontSize: '10px' }}>Embedded Sketchfab viewer — muscle names baked in texture. Full chart: chrisfischer.art — Buy model at lmy.de/xvOwv for offline use. Watermark retained per Sketchfab Terms.</p><button className="outline-button" onClick={() => setShow3D(false)} style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}>Back to body map</button></div></div>}</div><div className="ministry-card"><div className="panel-title"><div><span className="eyebrow">TRAINING CONTEXT — GANZA</span><h2>Recent sessions</h2></div><span className="card-label">4 sessions</span></div><p className="panel-intro">220 min · moderate intensity · 4/7 — Isonga training context from Manus</p><div className="coverage-detail-grid"><DetailStat label="Volume" value="220 min" detail="7-day total" /><DetailStat label="Intensity" value="Moderate" detail="Coach-rated" /><DetailStat label="Frequency" value="4/7" detail="Sessions" /></div></div><div className="ministry-card"><div className="panel-title"><div><span className="eyebrow">PREVENTION & CARE — GANZA</span><h2>Open prevention alerts</h2></div><span className="verified-pill"><Check size={13} /> 3 open</span></div><p className="panel-intro">Named human owner required — signals invite a qualified conversation, never diagnose.</p><div className="audit-list"><AuditEvent time="Today" title="Load and recovery mismatch" detail="Owner Dr. Jean Niyonzima — Review today" /><AuditEvent time="Tomorrow" title="Growth review window" detail="Owner A. Mukamana — Physio" /><AuditEvent time="This week" title="Return-to-training milestone" detail="Owner S. Habimana — Coach & safeguarding" /></div></div><div className="wellness-row"><WellnessItem icon={<Heartbeat />} label="Sleep" value="6.4 h" trend="5-night trend" /><WellnessItem icon={<Lightning />} label="Energy" value="7 / 10" trend="Stable" /><WellnessItem icon={<Activity />} label="Recovery" value="82%" trend="Ready" /></div></>
}

function BodyMap({ selected, onSelect }: { selected: string; onSelect: (part: string) => void }) {
  return <div className="body-map"><div className="body-head" /><div className="body-neck" /><div className="body-torso" /><div className="body-arm left" /><div className="body-arm right" /><div className="body-leg left" /><div className="body-leg right" /><button className={`pain-point shoulder ${selected === 'Right shoulder' ? 'selected' : ''}`} onClick={() => onSelect('Right shoulder')} aria-label="Right shoulder" /><button className={`pain-point knee ${selected === 'Right knee' ? 'selected' : ''}`} onClick={() => onSelect('Right knee')} aria-label="Right knee" /><button className="pain-point ankle" onClick={() => onSelect('Left ankle')} aria-label="Left ankle" /></div>
}

function FeatureModal({ feature, onClose }: { feature: Exclude<Modal, 'body' | 'report' | null>; onClose: () => void }) {
  const content = features[feature]
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="info-modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close"><X size={19} /></button><span className="eyebrow">{content.eyebrow}</span><h2>{content.title}</h2><p>{content.body}</p><div className="modal-note"><Info size={16} /><span>Prototype explanation · details and permissions will be confirmed during pilot design.</span></div></div></div>
}

function BodyModal({ bodyPart, onClose, onReport }: { bodyPart: string; onClose: () => void; onReport: () => void }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="info-modal body-modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close"><X size={19} /></button><span className="eyebrow">BODY MAP SIGNAL</span><h2>{bodyPart}</h2><p>This area is currently marked for monitoring. You can report a new discomfort signal or view the latest medical status.</p><div className="signal-row"><span className="dot dot-coral" />Monitoring · staff review recommended</div><button className="primary-button" onClick={onReport}>Report this area</button></div></div>
}

function ReportModal({ bodyPart, reported, onClose, onSubmit }: { bodyPart: string; reported: boolean; onClose: () => void; onSubmit: () => void }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><div className="info-modal report-modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close"><X size={19} /></button><span className="eyebrow">PRIVATE CHECK-IN</span><h2>{reported ? 'Report submitted' : `How does your ${bodyPart.toLowerCase()} feel?`}</h2>{reported ? <p>Your medical staff will review the report. Coaches receive only the operational status, not private notes.</p> : <><div className="severity-grid"><button className="severity active">Mild<small>Noticeable, can train</small></button><button className="severity">Moderate<small>Changes my movement</small></button><button className="severity">Severe<small>Need help now</small></button></div><label className="field-label">Optional note<textarea placeholder="Add context for medical staff..." /></label><button className="primary-button" onClick={onSubmit}><Check size={18} weight="bold" /> Send private report</button></>}</div></div>
}

function DataPoint({ label, value, tone }: { label: string; value: string; tone?: string }) { return <div className="data-point"><span>{label}</span><strong className={tone}>{value}</strong></div> }
function TimelineItem({ date, title, detail, icon }: { date: string; title: string; detail: string; icon: React.ReactNode }) { return <div className="timeline-item"><span className="timeline-icon">{icon}</span><div><span className="timeline-date">{date}</span><strong>{title}</strong><p>{detail}</p></div></div> }
function Metric({ label, value, unit, change }: { label: string; value: string; unit?: string; change: string }) { return <div className="metric-card"><span>{label}</span><strong>{value}<small>{unit}</small></strong><em>{change}</em></div> }
function WellnessItem({ icon, label, value, trend }: { icon: React.ReactNode; label: string; value: string; trend: string }) { return <div className="wellness-item"><span className="wellness-icon">{icon}</span><span>{label}</span><strong>{value}</strong><em>{trend}</em></div> }
function MiniChart() { return <svg className="mini-chart" viewBox="0 0 500 100" role="img" aria-label="Minutes played trend"><path d="M0 75 C40 72 48 35 92 50 S145 74 190 42 S245 56 282 30 S345 63 378 35 S430 45 500 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><path d="M0 75 C40 72 48 35 92 50 S145 74 190 42 S245 56 282 30 S345 63 378 35 S430 45 500 18 V100 H0Z" fill="url(#miniFill)" opacity=".18" /><defs><linearGradient id="miniFill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#b7f36b" /><stop offset="1" stopColor="#b7f36b" stopOpacity="0" /></linearGradient></defs></svg> }
function LargeChart() { return <svg className="large-chart" viewBox="0 0 720 240" role="img" aria-label="Personal change vs baseline 100"><g className="chart-legend"><rect x="0" y="2" width="10" height="10" rx="2" fill="#15834f" /><text x="14" y="10" fontSize="9" fill="#0f1f1a">Your trajectory</text><rect x="115" y="2" width="10" height="10" rx="2" fill="none" stroke="#655dd1" strokeWidth="1.6" strokeDasharray="5 4" /><text x="129" y="10" fontSize="9" fill="#0f1f1a">Baseline 100</text></g><g className="chart-grid"><path d="M0 45H720M0 90H720M0 135H720M0 180H720" stroke="rgba(21,51,42,.09)" strokeWidth="1" /><text x="0" y="43" fontSize="8" fill="#819088">+10%</text><text x="0" y="88" fontSize="8" fill="#819088">+5%</text><text x="0" y="133" fontSize="8" fill="#0f1f1a">100</text><text x="0" y="178" fontSize="8" fill="#819088">-5%</text></g><path d="M0 135 H720" fill="none" stroke="#655dd1" strokeWidth="2" strokeDasharray="7 8" strokeLinecap="round" opacity="0.9" /><path d="M0 128 C45 110 62 134 110 94 S180 108 224 74 S280 82 330 99 S390 54 430 69 S490 63 535 36 S595 64 645 30 S690 34 720 14" fill="none" stroke="#15834f" strokeWidth="3.5" strokeLinecap="round" /><g className="chart-dots"><circle cx="224" cy="74" r="4.5" fill="#15834f" stroke="#fff" strokeWidth="1.6" /><text x="224" y="64" fontSize="8" fill="#0f1f1a" textAnchor="middle">+2.4</text><circle cx="535" cy="36" r="4.5" fill="#15834f" stroke="#fff" strokeWidth="1.6" /><circle cx="720" cy="14" r="4.5" fill="#15834f" stroke="#fff" strokeWidth="1.6" /><text x="720" y="8" fontSize="8" fill="#15834f" textAnchor="end">+8%</text></g><g className="chart-labels"><text x="0" y="238" fontSize="9" fill="#819088">APR 20</text><text x="160" y="238" fontSize="9" fill="#819088">MAY 03</text><text x="320" y="238" fontSize="9" fill="#819088">MAY 10</text><text x="480" y="238" fontSize="9" fill="#819088">MAY 17</text><text x="650" y="238" fontSize="9" fill="#819088">TODAY</text></g></svg> }

export default App
