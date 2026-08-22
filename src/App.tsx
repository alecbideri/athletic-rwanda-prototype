import { useState, useEffect } from 'react'
import {
  Pulse,
  ArrowUpRight,
  Buildings,
  CaretRight,
  ChartLine,
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

const Activity = Pulse
const { athlete, coach, matches, medical, ministry } = prototypeData

type View = 'home' | 'passport' | 'performance' | 'health' | 'ministry' | 'federation' | 'coach' | 'medical'
type Modal = 'passport' | 'performance' | 'highlights' | 'health' | 'ministry' | 'body' | 'report' | null
type MinistrySection = 'overview' | 'cohort' | 'registry' | 'coverage' | 'governance'
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
  { id: 'ministry', label: 'Cohort', icon: ChartLine, target: 'ministry-cohort' },
  { id: 'ministry', label: 'Registry', icon: ClipboardText, target: 'ministry-registry' },
  { id: 'ministry', label: 'Centres', icon: Buildings, target: 'ministry-coverage' },
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
void federationNavItems

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
    if (isFederation) {
      setView('home')
      setMobileShell(true)
    }
  }, [isFederation])
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

  void selectFederationSection

  return (
    <main className="app-stage">
      <div className="stage-toolbar">
        <div className="brand-lockup"><span className="brand-mark">GZ</span><span>Ganza</span></div>
        <div className="demo-controls">
          <span className="demo-label">{isMinistry ? 'Ministry prototype' : isFederation ? 'FERWAFA prototype' : isCoach ? 'Coach prototype' : isMedical ? 'Medical prototype' : 'Athlete prototype'}</span>
          {!isCoach && !isMedical && !isMinistry && <button className="role-switch" onClick={() => { setView('coach'); setCoachSection('overview'); setMobileShell(false) }}>Open Coach view</button>}
          {!isMedical && !isCoach && !isMinistry && <button className="role-switch" onClick={() => { setView('medical'); setMedicalSection('overview'); setMobileShell(false) }}>Open Medical view</button>}
          {!isMinistry && !isCoach && !isMedical && <button className="role-switch" onClick={() => { setView('ministry'); setMinistrySection('overview'); setMobileShell(false) }}>Open Ministry view</button>}
          {isCoach && <button className="role-switch" onClick={() => { setView('home'); setMobileShell(true) }}>Return to Athlete</button>}
          {isMedical && <button className="role-switch" onClick={() => { setView('home'); setMobileShell(true) }}>Return to Athlete</button>}
          {isMinistry && <button className="role-switch" onClick={() => { setView('home'); setMobileShell(true) }}>Return to Athlete</button>}
          <button className={`shell-toggle ${mobileShell ? 'is-active' : ''}`} onClick={() => setMobileShell((current) => !current)}>
            <DeviceMobile size={16} weight="bold" />
            {mobileShell ? 'Mobile shell' : 'Responsive view'}
          </button>
        </div>
      </div>

      <div className={mobileShell ? 'device-frame' : 'device-frame is-wide'}>
        <div className="device-screen">
          <header className="topbar">
            <div className="mobile-brand"><span className="brand-mark">GZ</span><span>Ganza</span></div>
            <span className="topbar-spacer" aria-hidden="true" />
          </header>

          <div className="app-layout">
            <aside className="sidebar">
              <div className="side-intro">
                {isCoach ? <><span className="side-overline">COACH VIEW · {coach.coach.discipline}</span><strong>{coach.coach.name}</strong><span>{coach.coach.role}</span></> : isMedical ? <><span className="side-overline">MEDICAL VIEW</span><strong>{medical.staff.name}</strong><span>{medical.staff.role}</span></> : isMinistry ? <><span className="side-overline">MINISTRY VIEW</span><strong>Isonga Coordinator</strong><span>MINISPORTS · De-identified</span></> : <><span className="side-overline">ATHLETE PORTAL</span><strong>{athlete.name}</strong><span>{athlete.club} · {athlete.competitionLevel}</span></>}
              </div>
              <nav aria-label="Athlete navigation">
                {(isCoach ? coachNavItems : isMedical ? medicalNavItems : isMinistry ? ministryNavItems : navItems).map(({ id, label, icon: Icon, target }, index) => (
                  <button key={`${isCoach ? 'coach' : isMedical ? 'medical' : isMinistry ? 'ministry' : 'athlete'}-${label}-${index}`} className={`nav-item ${isCoach ? (coachSection === (target?.replace('coach-', '') as CoachSection) ? 'is-current' : '') : isMedical ? (medicalSection === (target?.replace('medical-', '') as MedicalSection) ? 'is-current' : '') : isMinistry ? (ministrySection === (target?.replace('ministry-', '') as MinistrySection) ? 'is-current' : '') : (view === id ? 'is-current' : '')}`} onClick={() => isCoach ? selectCoachSection(target) : isMedical ? selectMedicalSection(target) : isMinistry ? selectMinistrySection(target) : go(id)}>
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
                {(isCoach ? coachNavItems : isMedical ? medicalNavItems : isMinistry ? ministryNavItems : navItems).map(({ id, label, icon: Icon, target }) => (
                  <button key={`${isCoach ? 'coach' : isMedical ? 'medical' : isMinistry ? 'ministry' : 'athlete'}-${label}`} className={`bottom-item ${isCoach ? (coachSection === (target?.replace('coach-', '') as CoachSection) ? 'is-current' : '') : isMedical ? (medicalSection === (target?.replace('medical-', '') as MedicalSection) ? 'is-current' : '') : isMinistry ? (ministrySection === (target?.replace('ministry-', '') as MinistrySection) ? 'is-current' : '') : (view === id ? 'is-current' : '')}`} onClick={() => isCoach ? selectCoachSection(target) : isMedical ? selectMedicalSection(target) : isMinistry ? selectMinistrySection(target) : go(id)}>
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
  const iconMap: Record<string, React.ReactNode> = { Pulse: <Pulse />, CirclesFour: <CirclesFour />, Activity: <Activity />, ClipboardText: <ClipboardText /> }
  return <>
    <PageHeader eyebrow={ministry.persona.eyebrow} title={ministry.persona.title} description={ministry.persona.description} onInfo={onInfo} />
    <section id="ministry-overview" className={`ministry-section${isVisible('overview')}`}>
      <div className="ministry-hero" style={{ gridColumn: '1 / -1' }}><div><span className="card-label">{ministry.overview.heroLabel}</span><h2>{ministry.overview.heroTitle}</h2><p>{ministry.overview.heroText}</p></div><div className="ministry-hero-score"><strong>{ministry.overview.heroScore}</strong><span>{ministry.overview.heroScoreDetail}</span></div></div>
      <div className="ministry-kpis" style={{ gridColumn: '1 / -1' }}>{ministry.overview.kpis.map((item) => <MinistryKpi key={item.label} label={item.label} value={item.value} trend={item.trend} icon={iconMap[item.icon]} />)}</div>
      <div className="ministry-card" style={{ gridColumn: '1 / -1' }}><div className="panel-title"><div><span className="eyebrow">COHORT INTELLIGENCE</span><h2>{ministry.cohort.title}</h2></div><span className="card-label">{ministry.cohort.tag}</span></div><p className="panel-intro">{ministry.cohort.intro}</p><div className="registry-summary">{ministry.cohort.summary.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div></div>
      <div className="ministry-card" style={{ gridColumn: '1 / -1' }}><div className="card-section-heading"><span className="eyebrow">DELIVERY CONFIDENCE</span><h3>What the pilot shows</h3></div><div className="coverage-detail-grid">{ministry.cohort.breakdown.map((item) => <DetailStat key={item.label} label={item.label} value={item.value} detail={item.detail} />)}</div><div className="coverage-legend"><span><i className="dot dot-mint" /> {ministry.cohort.stageHighlight.stage} · {ministry.cohort.stageHighlight.count} students</span><span><i className="dot dot-muted" /> {ministry.cohort.stageHighlight.note}</span></div></div>
    </section>
    <section id="ministry-cohort" className={`ministry-section${isVisible('cohort')}`}>
      <div className="ministry-card"><div className="panel-title"><div><span className="eyebrow">COHORT INTELLIGENCE</span><h2>Governed view — {ministry.cohort.title}</h2></div><span className="card-label">De-identified</span></div><p className="panel-intro">{ministry.cohort.intro}</p><div className="coverage-detail-grid">{ministry.cohort.breakdown.map((item) => <DetailStat key={item.label} label={item.label} value={item.value} detail={item.detail} />)}</div><div className="coverage-legend"><span><i className="dot dot-mint" /> Largest cohort: {ministry.cohort.stageHighlight.stage} · {ministry.cohort.stageHighlight.count}</span></div></div>
      <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">RECORD COVERAGE</span><h3>Where the evidence base is strongest</h3></div>{ministry.cohort.coverage.map((item, index) => <FederationRow key={item.label} name={item.label} detail="" value={item.value} color={index === 0 ? 'high' : index === ministry.cohort.coverage.length - 1 ? 'low' : 'mid'} />)}<div className="coverage-legend"><span><i className="dot dot-mint" /> On track</span><span><i className="dot dot-muted" /> Building</span></div></div>
      <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">CONSENT STATUS</span><h3>Guardian consent at a glance</h3></div><div className="governance-list">{ministry.cohort.summary.map((item) => <GovernanceItem key={item.label} label={item.label} value={item.value} />)}</div><div className="audit-preview"><span className="eyebrow">CONSENT POLICY</span><strong>Policy v1.0 · 15 Aug 2026</strong><p>Renewal windows tracked; collection holds when consent lapses.</p></div></div>
    </section>
    <section id="ministry-registry" className={`ministry-section registry-section${isVisible('registry')}`}>
      <div className="ministry-card"><div className="panel-title"><div><span className="eyebrow">REGISTRY PULSE</span><h2>{ministry.registry.pulseTitle}</h2></div><button className="link-button">Open registry <ArrowUpRight size={15} /></button></div><p className="panel-intro">{ministry.registry.intro}</p><div className="registry-summary">{ministry.registry.summary.map((item) => <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div></div>
      <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">FIND A RECORD</span><h3>Search and filter</h3></div><div className="registry-toolbar"><span className="registry-search"><Pulse size={16} /><input aria-label="Search student registry" placeholder={ministry.registry.searchPlaceholder} /></span><button className="registry-filter">All centres <CaretRight size={14} /></button><button className="registry-filter">Status: Any <CaretRight size={14} /></button></div></div>
      <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">RECORD LIFECYCLE</span><h3>From capture to use</h3></div><div className="registry-lifecycle">{ministry.registry.lifecycle.map((item, index) => <RegistryStage key={item.label} label={item.label} detail={item.detail} active={index < 3} />)}</div></div>
      <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">CENTRE RECORDS</span><h3>{ministry.registry.tableTitle}</h3></div><div className="registry-table"><div className="registry-row table-head">{ministry.registry.tableHead.map((head) => <span key={head}>{head}</span>)}</div>{ministry.registry.rows.map((item) => <RegistryRow key={item.name} name={item.name} sport={item.sport} count={item.count} status={item.status} change={item.change} />)}</div></div>
    </section>
    <section id="ministry-coverage" className={`ministry-section${isVisible('coverage')}`}>
      <div className="ministry-card"><div className="panel-title"><div><span className="eyebrow">CENTRE COVERAGE</span><h2>{ministry.coverage.title}</h2></div><button className="icon-button" onClick={onInfo} aria-label="Explain centre coverage"><Info size={18} /></button></div><p className="panel-intro">{ministry.coverage.intro}</p>{ministry.coverage.centres.map((item) => <FederationRow key={item.name} name={item.name} detail={item.detail} value={`${item.coverage}%`} color={item.status} />)}<div className="coverage-legend"><span><i className="dot dot-mint" /> On track</span><span><i className="dot dot-muted" /> Needs onboarding</span></div></div>
      <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">DELIVERY SNAPSHOT</span><h3>What the percentage means</h3></div><div className="coverage-detail-grid">{ministry.coverage.snapshot.map((item) => <DetailStat key={item.label} label={item.label} value={item.value} detail={item.detail} />)}</div></div>
      <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">ROLLOUT GATES</span><h3>How centres move forward</h3></div><div className="rollout-steps">{ministry.coverage.gates.map((item) => <RolloutStep key={item.number} number={item.number} title={item.title} status={item.status} />)}</div></div>
    </section>
    <section id="ministry-governance" className={`ministry-section${isVisible('governance')}`}>
      <div className="ministry-card"><div className="panel-title"><div><span className="eyebrow">DATA GOVERNANCE</span><h2>{ministry.governance.title}</h2></div><LockKey size={20} color="var(--mint)" /></div><div className="governance-status"><ShieldCheck size={26} weight="fill" /><div><strong>{ministry.governance.statusTitle}</strong><p>{ministry.governance.statusDetail}</p></div></div><div className="governance-list">{ministry.governance.list.map((item) => <GovernanceItem key={item.label} label={item.label} value={item.value} />)}</div><div className="audit-preview"><span className="eyebrow">{ministry.governance.previewEyebrow}</span><strong>{ministry.governance.previewTitle}</strong><p>{ministry.governance.previewDetail}</p></div></div>
      <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">ACCESS MODEL</span><h3>Who can see what</h3></div><div className="governance-detail-grid">{ministry.governance.access.map((item) => <AccessTier key={item.title} title={item.title} access={item.access} detail={item.detail} />)}</div></div>
      <div className="ministry-card"><div className="card-section-heading"><span className="eyebrow">AUDIT TRAIL</span><h3>Recent controls</h3></div><div className="audit-list">{ministry.governance.audit.map((item) => <AuditEvent key={item.title} time={item.time} title={item.title} detail={item.detail} />)}</div><button className="link-button">View governance log <CaretRight size={15} /></button></div>
    </section>
    <div className={`ministry-footnote${section === 'overview' ? '' : ' ministry-section-hidden'}`}><Info size={16} /><span>This view uses aggregate and pseudonymized data. Individual medical records remain restricted to authorized medical staff.</span></div>
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
  const [videoMode, setVideoMode] = useState<'eval' | 'tactical'>('eval')
  const activeVideo = coach.videos[videoMode]
  return <>
    <PageHeader eyebrow={`${coach.school} · ${coach.coach.discipline} · COACH VIEW`} title="Guide the Isonga group in context." description={`${coach.coach.name} · ${coach.coach.role}. ${coach.coach.disciplines}.`} />
    <div className="coach-grid">
      <section id="coach-overview" className={`coach-section${isVisible('overview')}`}>
        <div className="coach-hero"><div><span className="card-label">NEXT SESSION</span><h2>Keep the group sharp, not overloaded.</h2><p>{coach.nextSession}</p></div><div className="session-status"><Check size={17} weight="bold" /> {coach.sessionStatus}</div></div>
        <div className="coach-kpis">{coach.kpis.map((item) => <CoachKpi key={item.label} label={item.label} value={item.value} detail={item.detail} tone={item.tone} />)}</div>
        <div className="coach-overview-grid">{coach.insights.map((item) => <CoachInsight key={item.title} title={item.title} detail={item.detail} action={item.action} tone={item.tone} />)}</div>
        <div className="coach-card" style={{ gridColumn: '1 / -1' }}><div className="panel-title"><div><span className="eyebrow">{coach.actionQueue.eyebrow}</span><h2>{coach.actionQueue.title}</h2></div><span className="verified-pill"><Check size={13} /> 4 open</span></div><p className="panel-intro">{coach.actionQueue.intro}</p><div className="coach-action-list">{coach.actionQueue.items.map((item) => <CoachAction key={item.title} title={item.title} detail={item.detail} />)}</div></div>
      </section>
      <section id="coach-squad" className={`coach-section${isVisible('squad')}`}>
        <div className="coach-card"><div className="panel-title"><div><span className="eyebrow">SQUAD MANAGEMENT</span><h2>Training group</h2></div><span className="verified-pill"><Check size={13} /> 18 ready</span></div><p className="panel-intro">A shared view of availability, workload, and the next action for every student. Coaches see operational status only.</p><div className="registry-toolbar"><span className="registry-search"><Pulse size={16} /><input aria-label="Search squad" placeholder="Search student or position" /></span><button className="registry-filter">All positions <CaretRight size={14} /></button><button className="registry-filter">Readiness <CaretRight size={14} /></button></div></div>
        <div className="coach-card"><div className="card-section-heading"><span className="eyebrow">STUDENT GROUPS</span><h3>Where attention goes</h3></div>{coach.groups.map((item) => <CoachGroup key={item.label} label={item.label} count={item.count} detail={item.detail} tone={item.tone} />)}</div>
        <div className="coach-card"><div className="card-section-heading"><span className="eyebrow">SQUAD TABLE</span><h3>Student readiness</h3></div><div className="registry-table coach-table"><div className="registry-row table-head"><span>Student / position</span><span>Load</span><span>Readiness</span><span>Action</span></div>{coach.students.map((item) => <CoachPlayer key={item.name} name={item.name} position={item.position} load={item.load} readiness={item.readiness} action={item.action} />)}</div></div>
        <div className="coach-card"><div className="panel-title"><div><span className="eyebrow">{coach.cohort.eyebrow}</span><h2>{coach.cohort.title}</h2></div><span className="verified-pill"><Check size={13} /> De-identified</span></div><p className="panel-intro">{coach.cohort.intro}</p><div className="coverage-detail-grid">{coach.cohort.stats.map((item) => <DetailStat key={item.label} label={item.label} value={item.value} detail="" />)}</div></div>
      </section>
      <section id="coach-players" className={`coach-section${isVisible('players')}`}>
        <div className="coach-card"><div className="panel-title"><div><span className="eyebrow">{coach.progression.eyebrow}</span><h2>{coach.progression.title}</h2></div><span className="verified-pill"><Check size={13} /> {coach.progression.pill}</span></div><p className="panel-intro">{coach.progression.intro}</p><div className="selection-process">{coach.progression.steps.map((step) => <SelectionStep key={step.number} number={step.number} title={step.title} detail={step.detail} status={step.status} />)}</div></div>
        <div className="coach-card"><div className="card-section-heading"><span className="eyebrow">REVIEW CANDIDATES</span><h3>Students to review</h3></div>{coach.shortlist.map((item) => <ShortlistRow key={item.name} name={item.name} position={item.position} signal={item.signal} metric={item.metric} tone={item.tone} />)}</div>
        <div className="coach-card player-load-hero"><div><span className="eyebrow">SELECTED STUDENT</span><h2>Ishimwe Eric · Right-back</h2><p>{coach.school} · Isonga Centre · Last five evaluations</p></div><div className="player-risk"><span>STAGE</span><strong>{athlete.stageProgress}%</strong></div></div>
        <div className="coach-metric-grid"><CoachMetric label="Minutes" value={`${athlete.minutesPlayed}`} detail="+12%" /><CoachMetric label="Top speed" value={`${athlete.topSpeed}`} detail="km/h" /><CoachMetric label="Recovery" value={`${athlete.recovery}%`} detail="Ready" /><CoachMetric label="Match load" value={`${athlete.matchLoad}%`} detail="Within range" /></div>
        <div className="coach-card"><div className="panel-title"><div><span className="eyebrow">LOAD / RECOVERY</span><h2>Student trend</h2></div><span className="verified-pill"><Check size={13} /> Stable</span></div><LargeChart /></div>
        <div className="coach-card"><div className="card-section-heading"><span className="eyebrow">COACH ACTION</span><h3>What should happen next?</h3></div><div className="coach-action-list">{coach.coachActions.map((item) => <CoachAction key={item.title} title={item.title} detail={item.detail} />)}</div></div>
      </section>
      <section id="coach-matches" className={`coach-section${isVisible('matches')}`}>
        <div className="coach-card"><div className="panel-title"><div><span className="eyebrow">{coach.matches.eyebrow}</span><h2>{coach.matches.title}</h2></div><span className="verified-pill"><Check size={13} /> {coach.matches.pill}</span></div><p className="panel-intro">{coach.matches.intro}</p><div className="match-library">{matches.map((match) => <MatchLibraryRow key={match.id} opponent={match.away} result={match.result} date={match.date} status={match.status} />)}</div></div>
        <div className="coach-card"><div className="card-section-heading"><span className="eyebrow">INTELLIGENCE PIPELINE</span><h3>How the {videoMode === 'eval' ? 'evaluation' : 'match'} insight is produced</h3></div><div className="pipeline-strip"><PipelineStep label={videoMode === 'eval' ? 'Evaluation video' : 'Match video'} detail="Ingested" active /><PipelineStep label="Student tracking" detail="IDs assigned" active /><PipelineStep label="Pitch metrics" detail="Calibrated" active /><PipelineStep label="AI insight" detail="Generated" active /></div><p className="pipeline-note">{videoMode === 'eval' ? 'The governed chain from a training clip to decision-ready development insight.' : 'The governed chain from match footage to decision-ready tactical insight.'}</p></div>
        <div className="coach-card" style={{ gridColumn: '1 / -1' }}><div className="card-section-heading"><span className="eyebrow">{coach.videos.eyebrow}</span><h3>{coach.videos.title}</h3></div><div className="video-mode-switch">{(['eval', 'tactical'] as const).map((mode) => <button key={mode} className={`video-mode-tab ${videoMode === mode ? 'is-active' : ''}`} onClick={() => setVideoMode(mode)}>{coach.videos[mode].label}</button>)}</div><video key={videoMode} className="coach-match-video" controls preload="metadata" poster={activeVideo.poster}><source src={activeVideo.src} type="video/mp4" />Your browser does not support video playback.</video><span className="video-caption">{activeVideo.caption}</span></div>
        <div className="coach-card" style={{ gridColumn: '1 / -1' }}><div className="card-section-heading"><span className="eyebrow">{activeVideo.insights.eyebrow}</span><h3>{activeVideo.insights.title}</h3></div><div className="insight-grid">{activeVideo.insights.items.map((item) => <InsightCard key={item.title} title={item.title} detail={item.detail} action={item.action} />)}</div></div>
        <div className="coach-card"><div className="card-section-heading"><span className="eyebrow">COACH DECISION</span><h3>Turn insight into action</h3></div><div className="decision-grid"><DecisionCard title="Training plan" value="Normal load" detail="No overload intervention required" /><DecisionCard title="Tactical focus" value="Right channel" detail="Use late-match protection cue" /><DecisionCard title="Stage note" value="Train to Train" detail="62% · review with panel" /></div></div>
      </section>
    </div>
  </>
}

function MedicalView({ section }: { section: MedicalSection }) {
  const isVisible = (target: MedicalSection) => section === target ? '' : ' medical-section-hidden'
  const ov = medical.overview
  return <>
    <PageHeader eyebrow={ov.eyebrow} title={ov.title} description={ov.description} />
    <div className="medical-grid">
      <section id="medical-overview" className={`medical-section${isVisible('overview')}`}>
        <div className="medical-hero"><div><span className="card-label">{ov.heroLabel}</span><h2>{ov.heroTitle}</h2><p>{ov.heroText}</p></div><div className="medical-hero-count"><strong>{ov.heroCount}</strong><span>{ov.heroCountLabel}</span></div></div>
        <div className="medical-kpis">{ov.kpis.map((item) => <MedicalKpi key={item.label} label={item.label} value={item.value} detail={item.detail} tone={item.tone} />)}</div>
        <div className="medical-overview-grid">{ov.insights.map((item) => <MedicalInsight key={item.title} title={item.title} detail={item.detail} action={item.action} tone={item.tone} />)}</div>
      </section>
      <section id="medical-cases" className={`medical-section${isVisible('cases')}`}>
        <div className="medical-card"><div className="panel-title"><div><span className="eyebrow">{medical.cases.eyebrow}</span><h2>{medical.cases.title}</h2></div><span className="verified-pill"><Check size={13} /> Protected</span></div><p className="panel-intro">{medical.cases.intro}</p><div className="medical-toolbar"><span className="registry-search"><Pulse size={16} /><input aria-label="Search medical cases" placeholder={medical.cases.searchPlaceholder} /></span><button className="registry-filter">All statuses <CaretRight size={14} /></button></div></div>
        <div className="medical-card" style={{ gridColumn: '1 / -1' }}><div className="card-section-heading"><span className="eyebrow">OPEN CASES</span><h3>Priority review queue</h3></div>{medical.cases.list.map((item) => <MedicalCase key={item.name} name={item.name} club={item.club} region={item.region} mechanism={item.mechanism} status={item.status} tone={item.tone} />)}</div>
        <div className="medical-card" style={{ gridColumn: '1 / -1' }}><div className="panel-title"><div><span className="eyebrow">{medical.cases.featured.eyebrow}</span><h2>{medical.cases.featured.title}</h2></div><span className="verified-pill"><Check size={13} /> {medical.cases.featured.status}</span></div><p className="panel-intro" style={{ marginTop: 6, color: 'var(--muted)', fontSize: '11px' }}>{medical.cases.featured.meta}</p><div className="case-detail"><div className="case-detail-anatomy"><div className="body-map-stage"><BodyMap selected={medical.cases.featured.bodyPart} onSelect={() => {}} /><div className="body-map-legend"><span><i className="dot dot-coral" /> Self-reported</span><span><i className="dot dot-mint" /> Reviewed</span></div></div></div><div className="case-detail-body"><p className="case-report">{medical.cases.featured.report}</p><div className="case-signals">{medical.cases.featured.signals.map((item) => <div className="clinical-data" key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>)}</div></div></div><div className="case-next"><span className="eyebrow">NEXT ACTIONS</span>{medical.cases.featured.next.map((item) => <MedicalAction key={item.title} title={item.title} detail={item.detail} />)}</div></div>
        <div className="medical-card" style={{ gridColumn: '1 / -1' }}><div className="card-section-heading"><span className="eyebrow">CASE DATA</span><h3>What gets recorded</h3></div><div className="clinical-data-grid">{medical.cases.data.map((item) => <ClinicalData key={item.label} label={item.label} value={item.value} detail={item.detail} />)}</div></div>
      </section>
      <section id="medical-rehab" className={`medical-section${isVisible('rehab')}`}>
        <div className="medical-card" style={{ gridColumn: '1 / -1' }}><div className="panel-title"><div><span className="eyebrow">{medical.rehab.eyebrow}</span><h2>{medical.rehab.title}</h2></div><span className="card-label">{medical.rehab.pill}</span></div><p className="panel-intro">{medical.rehab.intro}</p>{medical.rehab.list.map((item) => <RehabRow key={item.name} name={item.name} injury={item.injury} progress={item.progress} next={item.next} tone={item.tone} />)}</div>
        <div className="medical-card" style={{ gridColumn: '1 / -1' }}><div className="card-section-heading"><span className="eyebrow">{medical.rehab.tests.eyebrow}</span><h3>{medical.rehab.tests.title}</h3></div><div className="clinical-test-grid">{medical.rehab.tests.items.map((item) => <ClinicalTest key={item.student} student={item.student} name={item.name} score={item.score} result={item.result} />)}</div></div>
        <div className="medical-card" style={{ gridColumn: '1 / -1' }}><div className="card-section-heading"><span className="eyebrow">{medical.rehab.plan.eyebrow}</span><h3>{medical.rehab.plan.title}</h3></div>{medical.rehab.plan.items.map((item) => <MedicalAction key={item.title} title={item.title} detail={item.detail} />)}</div>
      </section>
      <section id="medical-clearance" className={`medical-section${isVisible('clearance')}`}>
        <div className="medical-card clearance-hero" style={{ gridColumn: '1 / -1' }}><div><span className="eyebrow">{medical.clearance.heroEyebrow}</span><h2>{medical.clearance.heroTitle}</h2><p>{medical.clearance.heroText}</p></div><ShieldCheck size={35} color="var(--mint)" /></div>
        <div className="clearance-grid" style={{ gridColumn: '1 / -1' }}>{medical.clearance.cards.map((item) => <ClearanceCard key={item.name} name={item.name} status={item.status} detail={item.detail} tone={item.tone} />)}</div>
        <div className="medical-card" style={{ gridColumn: '1 / -1' }}><div className="card-section-heading"><span className="eyebrow">{medical.clearance.queueEyebrow}</span><h3>{medical.clearance.queueTitle}</h3></div>{medical.clearance.queue.map((item) => <ClearanceRow key={item.name} name={item.name} decision={item.decision} evidence={item.evidence} />)}</div>
        <div className="medical-card" style={{ gridColumn: '1 / -1' }}><div className="panel-title"><div><span className="eyebrow">{medical.clearance.featured.eyebrow}</span><h2>{medical.clearance.featured.title}</h2></div><span className="verified-pill"><Check size={13} /> {medical.clearance.featured.status}</span></div><p className="panel-intro" style={{ marginTop: 6, color: 'var(--muted)', fontSize: '11px' }}>{medical.clearance.featured.meta}</p><p className="case-report" style={{ marginTop: 14 }}>{medical.clearance.featured.intro}</p><div className="clearance-process">{medical.clearance.featured.process.map((item) => <div className={`clearance-step ${item.tone}`} key={item.number}><span className="step-nb">{item.number}</span><div className="step-body"><strong>{item.title}</strong><small>{item.detail}</small></div><em>{item.status}</em></div>)}</div><div className="clearance-comments"><span className="eyebrow">REVIEW COMMENTS</span>{medical.clearance.featured.comments.map((item) => <div className="clearance-comment" key={item.when}><div className="comment-head"><strong>{item.by}</strong><small>{item.when}</small></div><p>{item.text}</p></div>)}</div></div>
      </section>
    </div>
  </>
}

function MedicalKpi({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: string }) { return <article className={`medical-kpi ${tone}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article> }
function MedicalInsight({ title, detail, action, tone }: { title: string; detail: string; action: string; tone: string }) { return <article className={`medical-insight ${tone}`}><span className="eyebrow">{title}</span><p>{detail}</p><button className="link-button">{action} <ArrowUpRight size={15} /></button></article> }
function MedicalCase({ name, club, region, mechanism, status, tone }: { name: string; club: string; region: string; mechanism: string; status: string; tone: string }) { return <div className="medical-case"><div><strong>{name}</strong><span>{club}</span></div><div><b>{region}</b><small>{mechanism}</small></div><em className={tone}>{status}</em><CaretRight size={15} /></div> }
function ClinicalData({ label, value, detail }: { label: string; value: string; detail: string }) { return <div className="clinical-data"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div> }
function RehabRow({ name, injury, progress, next, tone }: { name: string; injury: string; progress: string; next: string; tone: string }) { return <div className="rehab-row"><div><strong>{name}</strong><span>{injury}</span></div><div className="progress-track"><span className={tone} style={{ width: progress }} /></div><b>{progress}</b><small>{next}</small></div> }
function ClinicalTest({ student, name, score, result }: { student?: string; name: string; score: string; result: string }) { return <div className="clinical-test"><div><strong>{student ? `${student} · ${name}` : name}</strong><small>{result}</small></div><b>{score}</b></div> }
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
function MatchLibraryRow({ opponent, result, date, status }: { opponent: string; result: string; date: string; status: string }) { return <div className="match-library-row"><div><strong>{coach.school} vs {opponent}</strong><span>{date}</span></div><b>{result}</b><em className={status === 'Selected' ? 'selected' : ''}>{status}</em><CaretRight size={15} /></div> }
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
  return <><PageHeader eyebrow="YOUR PROGRESS" title="Performance history" description="How your development moves over time — Ganza keeps it as a trajectory." onInfo={onInfo} /><div className="performance-hero"><div><span className="card-label">CURRENT FORM — GANZA</span><h2>Steady improvement</h2><p>Personal trajectory vs your baseline (100) — same 8 evidence areas</p></div><div className="form-score">+8%<small>trend</small></div></div><div className="metric-grid"><Metric label="Power" value="+2.4 cm" change="Countermovement jump" /><Metric label="Top speed" value="28.4" unit="km/h" change="Recent eval" /><Metric label="Recovery" value="Ready" change="Monitor / Rest" /></div><div className="chart-panel"><div className="panel-title"><div><span className="eyebrow">YOUR TRAJECTORY — BASELINE 100</span><h2>Personal change vs your own start</h2></div><button className="icon-button" onClick={onInfo} aria-label="Explain trajectory"><Info size={18} /></button></div><p className="panel-intro" style={{ marginTop: 8, fontSize: '11px', color: 'var(--muted)' }}>Green = your current trajectory · Dashed = your baseline (100) — same 8 evidence areas, shown as + / − trend vs baseline. Not vs other students.</p><LargeChart /></div><div className="video-frame video-split"><div className="video-left" style={{ position: 'relative' }}><span className="video-tag">PERSONAL EVALUATION</span><video controls preload="metadata" poster="/one-kid-training-poster.jpg"><source src="/one-kid-training.mp4" type="video/mp4" />Your browser does not support video playback.</video><div className="video-copy"><span className="eyebrow">YOUR PREVIOUS EVALUATION — GANZA</span><h2>St Joseph Kabgayi — Recent eval by coach</h2><p>Recorded with overlays · Recent record only · Isonga Centre</p></div></div><div className="video-stats"><span className="eyebrow">OVERLAYS</span><div className="stat-row"><span>Touch</span><strong>42</strong><small>+6 vs last eval</small></div><div className="stat-row"><span>Shot</span><strong>3</strong><small>1 on target</small></div><div className="stat-row"><span>Sprint</span><strong>28.4</strong><small>km/h top</small></div><p className="small" style={{ marginTop: 12, color: 'var(--muted)', fontSize: '10px' }}>Overlays — touch, shot, sprint</p></div></div><button className="highlight-card" onClick={onHighlights}><span className="video-icon"><PlayCircle size={25} weight="fill" /></span><span><strong>Video highlight reel</strong><small>8 moments · Available in Performance</small></span><CaretRight size={19} /></button></>
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
