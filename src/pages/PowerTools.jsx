import { useState, useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const s = {
  page: { background: '#F8F7F4', minHeight: '100vh' },
  heroBg: { position: 'relative', height: '480px', overflow: 'hidden', background: '#1A1A1A' },
  heroImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,30,20,0.9) 0%, rgba(10,30,20,0.55) 55%, rgba(10,30,20,0.1) 100%)' },
  heroContent: { position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 56px', maxWidth: '680px' },
  heroEyebrow: { fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' },
  eyebrowLine: { width: '24px', height: '1px', background: '#2A9D5C', display: 'block' },
  heroTitle: { fontFamily: 'Playfair Display, serif', fontSize: '48px', fontWeight: 700, color: '#fff', lineHeight: 1.12, marginBottom: '16px' },
  heroEm: { fontStyle: 'italic', color: '#6FD4A0' },
  heroSub: { fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontWeight: 300, maxWidth: '480px', marginBottom: '32px' },
  heroBadges: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', padding: '6px 14px', fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 },
  badgeDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#2A9D5C', flexShrink: 0 },
  section: { maxWidth: '1100px', margin: '0 auto', padding: '72px 56px' },
  sectionSm: { maxWidth: '1100px', margin: '0 auto', padding: '0 56px 72px' },
  eyebrow: { fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '10px' },
  sectionTitle: { fontFamily: 'Playfair Display, serif', fontSize: '34px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '16px' },
  sectionTitleEm: { fontStyle: 'italic', color: '#2A9D5C' },
  body: { fontSize: '13px', color: '#666', lineHeight: 1.9, fontWeight: 300, maxWidth: '720px', marginBottom: '16px' },
  splitGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', marginBottom: '72px' },
  imgMain: { width: '100%', height: '420px', objectFit: 'cover', borderRadius: '16px', display: 'block' },
  toolsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '72px' },
  toolCard: { background: '#fff', border: '1px solid #E0DBD5', borderRadius: '14px', padding: '28px', display: 'flex', gap: '20px', alignItems: 'flex-start' },
  toolIcon: { width: '44px', height: '44px', borderRadius: '12px', background: '#EDF7F2', border: '1px solid #C0E4D0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  toolTitle: { fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3, marginBottom: '6px' },
  toolBody: { fontSize: '12px', color: '#888', lineHeight: 1.65, fontWeight: 300 },
  processBlock: { background: '#0D1F0F', borderRadius: '20px', padding: '56px', marginBottom: '72px', position: 'relative', overflow: 'hidden' },
  processAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, transparent, #2A9D5C, transparent)' },
  processTitle: { fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '8px' },
  processEm: { fontStyle: 'italic', color: '#6FD4A0' },
  processSub: { fontSize: '13px', color: 'rgba(255,255,255,0.4)', fontWeight: 300, marginBottom: '40px' },
  processGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' },
  processStep: { padding: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px' },
  processNum: { fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#2A9D5C', marginBottom: '8px' },
  processStepTitle: { fontSize: '12px', fontWeight: 600, color: '#fff', marginBottom: '6px' },
  processStepBody: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontWeight: 300 },
  imageStrip: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '72px' },
  stripImg: { width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', display: 'block' },
  ctaBanner: { background: '#2A9D5C', borderRadius: '20px', padding: '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px' },
  ctaTitle: { fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '8px' },
  ctaEm: { fontStyle: 'italic', color: '#C0DD97' },
  ctaSub: { fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 300, maxWidth: '400px' },
  ctaBtn: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#2A9D5C', fontSize: '13px', fontWeight: 600, padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', flexShrink: 0 },
}

const TOOLS = [
  { title: 'Lawn Mower Repairs', body: 'From push mowers to ride-on models — we service, repair and maintain all types of lawn mowers to keep your grounds looking great.' },
  { title: 'Generator Servicing', body: 'Full service and repairs on petrol and diesel generators of all sizes. Load shedding is not a problem when your generator is in top shape.' },
  { title: 'Chainsaw Repairs', body: 'Chain sharpening, bar replacement, carburettor cleaning and full mechanical overhauls for all chainsaw makes and models.' },
  { title: 'Brushcutter Servicing', body: 'Complete service including head replacement, line refitting, engine tune-up and blade sharpening for professional brushcutters.' },
  { title: 'Small Engine Repairs', body: 'We repair all small petrol and diesel engines found in garden and construction equipment — fast turnaround guaranteed.' },
  { title: 'Blade & Cutting Head Service', body: 'Blade sharpening, balancing and replacement for all types of cutting equipment to ensure clean, efficient cuts every time.' },
]

const PROCESS = [
  { num: '01', title: 'Drop Off or Collection', body: 'Bring your machine to us or request a collection from your site.' },
  { num: '02', title: 'Full Diagnosis', body: 'Our technicians inspect and diagnose the fault — no hidden assessment fees.' },
  { num: '03', title: 'Quote & Approval', body: 'We provide a clear quote before any repair work begins. No surprises.' },
  { num: '04', title: 'Repair & Return', body: 'Your machine is repaired, tested and returned to you in full working order.' },
]

const BADGES = ['Lawn Mowers', 'Generators', 'Chainsaws', 'Brushcutters', 'Small Engines', 'All Makes & Models']

export default function PowerTools() {
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef(null)
  const sectionRef = useReveal()
  const section2Ref = useReveal()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const heroClass = loaded ? 'tools-loaded' : ''

  return (
    <>
      <style>{`
        .tools-hero-line-1 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s; }
        .tools-hero-line-2 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s; }
        .tools-hero-line-3 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s; }
        .tools-hero-line-4 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.55s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s; }
        .tools-loaded .tools-hero-line-1,
        .tools-loaded .tools-hero-line-2,
        .tools-loaded .tools-hero-line-3,
        .tools-loaded .tools-hero-line-4 { opacity: 1; transform: translateY(0); }
        .tools-underline { position: relative; display: inline-block; }
        .tools-underline::after { content: ''; position: absolute; bottom: -4px; left: 0; height: 2px; width: 0; background: #6FD4A0; border-radius: 2px; transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s; }
        .tools-loaded .tools-underline::after { width: 100%; }
        .tools-card { transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .tools-card:hover { border-color: #C0E4D0 !important; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
        .tools-img-hover { overflow: hidden; border-radius: 16px; }
        .tools-img-hover img { transition: transform 0.6s ease; display: block; width: 100%; }
        .tools-img-hover:hover img { transform: scale(1.03); }
        .tools-strip-wrap { overflow: hidden; border-radius: 12px; }
        .tools-strip-wrap img { transition: transform 0.6s ease; display: block; width: 100%; }
        .tools-strip-wrap:hover img { transform: scale(1.04); }
        .tools-cta-btn:hover { transform: translateY(-2px); }
      `}</style>

      <div style={s.page}>

        <div ref={heroRef} className={heroClass} style={s.heroBg}>
          <img src="https://static.wixstatic.com/media/836e04_a41b83bbbf6144c4a95b16ec7c40f33f~mv2.jpeg/v1/fill/w_1000,h_750,al_c,q_85,usm_0.66_1.00_0.01/836e04_a41b83bbbf6144c4a95b16ec7c40f33f~mv2.jpeg" alt="Power tools" style={s.heroImg} />
          <div style={s.heroOverlay} />
          <div style={s.heroContent}>
            <p className="tools-hero-line-1" style={s.heroEyebrow}>
              <span style={s.eyebrowLine} />
              Repairs & Servicing
            </p>
            <h1 className="tools-hero-line-2" style={s.heroTitle}>
              Power Tools &amp;<br />
              <em className="tools-underline" style={s.heroEm}>Machine Repairs.</em>
            </h1>
            <p className="tools-hero-line-3" style={s.heroSub}>
              From lawn mowers and generators to chainsaws and brushcutters — our technicians repair and service all power machines to get you back to work fast.
            </p>
            <div className="tools-hero-line-4" style={s.heroBadges}>
              {BADGES.map(function(b, i) {
                return (
                  <span key={i} style={s.badge}>
                    <span style={s.badgeDot} />{b}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        <div ref={sectionRef} style={s.section}>
          <div style={s.splitGrid}>
            <div className="reveal">
              <p style={s.eyebrow}>Our Service</p>
              <h2 style={s.sectionTitle}>
                Back to Work <em style={s.sectionTitleEm}>Fast.</em>
              </h2>
              <p style={s.body}>
                Paleko Holdings provides expert repair and servicing for all types of power machines and tools. Our experienced technicians diagnose faults quickly, source quality parts and return your equipment in full working order.
              </p>
              <p style={s.body}>
                We service lawn mowers, generators, chainsaws, brushcutters and most other petrol and diesel powered equipment. Whether it's a minor service or a major mechanical overhaul — we get it done right.
              </p>
            </div>
            <div className="reveal reveal-delay-2 tools-img-hover">
              <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80&fit=crop" alt="Power tool repair" style={s.imgMain} />
            </div>
          </div>

          <div className="reveal">
            <p style={s.eyebrow}>What We Repair</p>
            <h2 style={s.sectionTitle}>Tools &amp; Machines We <em style={s.sectionTitleEm}>Service</em></h2>
            <p style={Object.assign({}, s.body, {marginBottom:'32px'})}>We work on all makes and models. If it has an engine, we can fix it.</p>
          </div>
          <div style={s.toolsGrid}>
            {TOOLS.map(function(t, i) {
              return (
                <div key={i} className={'tools-card reveal reveal-delay-' + (i + 1)} style={s.toolCard}>
                  <div style={s.toolIcon}>
                    <svg viewBox="0 0 20 20" fill="none" style={{width:'18px',height:'18px'}}>
                      <path d="M4 16l3-3 2 2 7-7M14 4l2 2" stroke="#2A9D5C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={s.toolTitle}>{t.title}</h3>
                    <p style={s.toolBody}>{t.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div ref={section2Ref} style={s.sectionSm}>
          <div className="reveal" style={s.imageStrip}>
            <div className="tools-strip-wrap">
              <img src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=600&q=80&fit=crop" alt="Repair workshop" style={s.stripImg} />
            </div>
            <div className="tools-strip-wrap">
              <img src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80&fit=crop" alt="Lawn mower service" style={s.stripImg} />
            </div>
            <div className="tools-strip-wrap">
              <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80&fit=crop" alt="Chainsaw repair" style={s.stripImg} />
            </div>
          </div>

          <div className="reveal" style={s.processBlock}>
            <div style={s.processAccent} />
            <h2 style={s.processTitle}>Our Repair <em style={s.processEm}>Process</em></h2>
            <p style={s.processSub}>Simple, transparent and fast — here is how we handle every repair.</p>
            <div style={s.processGrid}>
              {PROCESS.map(function(p, i) {
                return (
                  <div key={i} style={s.processStep}>
                    <p style={s.processNum}>{p.num}</p>
                    <p style={s.processStepTitle}>{p.title}</p>
                    <p style={s.processStepBody}>{p.body}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="reveal" style={s.ctaBanner}>
            <div>
              <h2 style={s.ctaTitle}>Need a <em style={s.ctaEm}>Repair?</em></h2>
              <p style={s.ctaSub}>Get in touch today. We'll diagnose the problem and get back to you within 24 hours.</p>
            </div>
            <a href="/contact" className="tools-cta-btn" style={s.ctaBtn}>
              Get a Free Quote
              <svg viewBox="0 0 14 14" fill="none" style={{width:'14px',height:'14px'}}>
                <path d="M2 7h10M8 4l3 3-3 3" stroke="#2A9D5C" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </>
  )
}