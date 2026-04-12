import { useState, useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const s = {
  page: { background: '#F8F7F4', minHeight: '100vh' },
  heroBg: { position: 'relative', height: '480px', overflow: 'hidden', background: '#F0EEE9' },
  heroImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 },
  heroContent: { position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 56px', maxWidth: '720px' },
  heroEyebrow: { fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' },
  eyebrowLine: { width: '24px', height: '1px', background: '#2A9D5C', display: 'block' },
  heroTitle: { fontFamily: 'Playfair Display, serif', fontSize: '52px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, marginBottom: '18px' },
  heroEm: { fontStyle: 'italic', color: '#1C5FAD' },
  heroSub: { fontSize: '14px', color: '#666', lineHeight: 1.8, fontWeight: 300, maxWidth: '520px', marginBottom: '32px' },
  heroBadges: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff', border: '1px solid #E0DBD5', borderRadius: '20px', padding: '6px 14px', fontSize: '11px', color: '#444', fontWeight: 400 },
  badgeDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#2A9D5C', flexShrink: 0 },
  section: { maxWidth: '1100px', margin: '0 auto', padding: '72px 56px' },
  sectionSm: { maxWidth: '1100px', margin: '0 auto', padding: '0 56px 72px' },
  eyebrow: { fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '10px' },
  sectionTitle: { fontFamily: 'Playfair Display, serif', fontSize: '34px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '16px' },
  sectionTitleEm: { fontStyle: 'italic', color: '#1C5FAD' },
  body: { fontSize: '13px', color: '#666', lineHeight: 1.9, fontWeight: 300, maxWidth: '720px', marginBottom: '16px' },
  splitGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', marginBottom: '72px' },
  imgMain: { width: '100%', height: '420px', objectFit: 'cover', borderRadius: '16px', display: 'block' },
  servicesGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '72px' },
  serviceCard: { background: '#fff', border: '1px solid #E0DBD5', borderRadius: '14px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' },
  serviceIcon: { width: '40px', height: '40px', borderRadius: '10px', background: '#EDF4FF', border: '1px solid #C8D8EE', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  serviceTitle: { fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 },
  serviceBody: { fontSize: '12px', color: '#888', lineHeight: 1.65, fontWeight: 300 },
  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '72px' },
  whyItem: { display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '20px', background: '#fff', border: '1px solid #E0DBD5', borderRadius: '12px' },
  whyNum: { fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 700, color: '#E0DBD5', flexShrink: 0, lineHeight: 1 },
  whyTitle: { fontSize: '13px', fontWeight: 600, color: '#1A1A1A', marginBottom: '4px' },
  whyBody: { fontSize: '12px', color: '#888', lineHeight: 1.6, fontWeight: 300 },
  cocBlock: { background: '#1A1A1A', borderRadius: '20px', padding: '56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center', marginBottom: '72px', position: 'relative', overflow: 'hidden' },
  cocAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, transparent, #1C5FAD, transparent)' },
  cocTitle: { fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '14px' },
  cocEm: { fontStyle: 'italic', color: '#85B7EB' },
  cocBody: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, fontWeight: 300, marginBottom: '24px' },
  cocBtn: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1C5FAD', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '13px 24px', borderRadius: '8px', textDecoration: 'none' },
  cocSteps: { display: 'flex', flexDirection: 'column', gap: '12px' },
  cocStep: { display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px' },
  cocStepNum: { width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(28,95,173,0.3)', border: '1px solid rgba(28,95,173,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, color: '#85B7EB', flexShrink: 0 },
  cocStepTitle: { fontSize: '12px', fontWeight: 500, color: '#fff', marginBottom: '2px' },
  cocStepText: { fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontWeight: 300 },
  imageStrip: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '72px' },
  stripImg: { width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', display: 'block' },
  ctaBanner: { background: '#1C5FAD', borderRadius: '20px', padding: '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px' },
  ctaTitle: { fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '8px' },
  ctaEm: { fontStyle: 'italic', color: '#A8DFBF' },
  ctaSub: { fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 300, maxWidth: '400px' },
  ctaBtn: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#1C5FAD', fontSize: '13px', fontWeight: 600, padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', flexShrink: 0 },
}

const SERVICES = [
  { title: 'Electrical Installations', body: 'Full wiring and installation services for new builds, renovations and extensions. All work is done to SANS 10142 standards.' },
  { title: 'Electrical Repairs', body: 'Fast, reliable repairs for faults, trips, short circuits, damaged wiring and all other electrical issues in your home or business.' },
  { title: 'Distribution Boards', body: 'Installation, replacement and upgrading of distribution boards, circuit breakers and meter boxes for safe power distribution.' },
  { title: 'Certificate of Compliance', body: 'We issue legally required COC certificates for property sales, new installations and insurance purposes.' },
  { title: 'Residential Electrical', body: 'Complete home electrical services — from plug points and lighting to full rewiring and load shedding solutions.' },
  { title: 'Commercial Electrical', body: 'High-capacity electrical solutions for offices, retail spaces, warehouses and industrial facilities of all sizes.' },
]

const WHY = [
  { num: '01', title: 'COC Certified Electricians', body: 'Every member of our team is registered and certified in accordance with South African electrical standards.' },
  { num: '02', title: 'SANS 10142 Compliant', body: 'All our work strictly follows the South African National Standard for safe electrical installations.' },
  { num: '03', title: 'Fast Response Times', body: 'We understand urgency. Our team is dispatched quickly to minimise downtime for your home or business.' },
  { num: '04', title: 'Transparent Pricing', body: 'No hidden costs. You receive a clear, itemised quote before any work begins — no surprises.' },
]

const COC_STEPS = [
  { title: 'Site Assessment', body: 'We inspect your entire electrical installation for compliance and safety.' },
  { title: 'Fault Identification', body: 'Any non-compliant or unsafe elements are identified and documented.' },
  { title: 'Rectification', body: 'We carry out all necessary repairs and upgrades to bring the installation up to standard.' },
  { title: 'Certificate Issued', body: 'Once compliant, a legally valid COC is issued by our registered electrician.' },
]

const BADGES = ['COC Certified', 'SANS 10142 Compliant', 'Residential & Commercial', 'Fast Response', 'Reg PCO Licensed']

export default function ElectricalServices() {
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef(null)
  const sectionRef = useReveal()
  const section2Ref = useReveal()
  const section3Ref = useReveal()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const heroClass = loaded ? 'elec-loaded' : ''

  return (
    <>
      <style>{`
        .elec-hero-line-1 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s; }
        .elec-hero-line-2 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s; }
        .elec-hero-line-3 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s; }
        .elec-hero-line-4 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.55s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s; }
        .elec-loaded .elec-hero-line-1,
        .elec-loaded .elec-hero-line-2,
        .elec-loaded .elec-hero-line-3,
        .elec-loaded .elec-hero-line-4 { opacity: 1; transform: translateY(0); }
        .elec-underline { position: relative; display: inline-block; }
        .elec-underline::after { content: ''; position: absolute; bottom: -4px; left: 0; height: 2px; width: 0; background: #1C5FAD; border-radius: 2px; transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s; }
        .elec-loaded .elec-underline::after { width: 100%; }
        .elec-service-card { transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .elec-service-card:hover { border-color: #B5D4F4 !important; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
        .elec-why-item { transition: border-color 0.2s ease, transform 0.2s ease; }
        .elec-why-item:hover { border-color: #1C5FAD !important; transform: translateX(4px); }
        .elec-img-hover { overflow: hidden; border-radius: 16px; }
        .elec-img-hover img { transition: transform 0.6s ease; display: block; width: 100%; }
        .elec-img-hover:hover img { transform: scale(1.03); }
        .elec-strip-img-wrap { overflow: hidden; border-radius: 12px; }
        .elec-strip-img-wrap img { transition: transform 0.6s ease; display: block; width: 100%; }
        .elec-strip-img-wrap:hover img { transform: scale(1.04); }
        .elec-cta-btn:hover { transform: translateY(-2px); }
        .elec-badge { transition: border-color 0.2s ease, transform 0.2s ease; }
        .elec-badge:hover { border-color: #2A9D5C !important; transform: translateY(-1px); }
      `}</style>

      <div style={s.page}>

        <div ref={heroRef} className={heroClass} style={s.heroBg}>
          <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1400&q=80&fit=crop" alt="Electrical meter box" style={s.heroImg} />
          <div style={s.heroContent}>
            <p className="elec-hero-line-1" style={s.heroEyebrow}>
              <span style={s.eyebrowLine} />
              Electrical Services
            </p>
            <h1 className="elec-hero-line-2" style={s.heroTitle}>
              Reliable Electrical Services<br />
              <em className="elec-underline" style={s.heroEm}>You Can Count On.</em>
            </h1>
            <p className="elec-hero-line-3" style={s.heroSub}>
              At Paleko Holdings, we pride ourselves on providing top-notch electrical services. Our certified electricians ensure your electrical needs are met with professionalism and efficiency.
            </p>
            <div className="elec-hero-line-4" style={s.heroBadges}>
              {BADGES.map(function(b, i) {
                return (
                  <span key={i} className="elec-badge" style={s.badge}>
                    <span style={s.badgeDot} />
                    {b}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        <div ref={sectionRef} style={s.section}>
          <div style={s.splitGrid}>
            <div className="reveal">
              <p style={s.eyebrow}>Our Approach</p>
              <h2 style={s.sectionTitle}>
                Professional Electrical Work,<br />
                <em style={s.sectionTitleEm}>Done Right.</em>
              </h2>
              <p style={s.body}>At Paleko Holdings, we pride ourselves on providing top-notch electrical services. Our team of experienced electricians is dedicated to ensuring that your electrical needs are met with the utmost professionalism and efficiency.</p>
              <p style={s.body}>Whether you need routine maintenance, repairs, or installations, we have the expertise to get the job done right. We understand that electrical issues can be stressful, which is why we strive to make the process as seamless and stress-free as possible.</p>
              <p style={s.body}>Contact us today to schedule an appointment and experience the difference that our exceptional service can make.</p>
            </div>
            <div className="reveal reveal-delay-2 elec-img-hover">
              <img src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=700&q=80&fit=crop" alt="Electrician working on circuit breaker" style={s.imgMain} />
            </div>
          </div>

          <div className="reveal">
            <p style={s.eyebrow}>What We Do</p>
            <h2 style={s.sectionTitle}>Our Electrical <em style={s.sectionTitleEm}>Services</em></h2>
            <p style={Object.assign({}, s.body, {marginBottom:'32px'})}>From minor repairs to major commercial installations — we cover every aspect of electrical work.</p>
          </div>
          <div style={s.servicesGrid}>
            {SERVICES.map(function(svc, i) {
              return (
                <div key={i} className={'elec-service-card reveal reveal-delay-' + (i + 1)} style={s.serviceCard}>
                  <div style={s.serviceIcon}>
                    <svg viewBox="0 0 20 20" fill="none" style={{width:'18px',height:'18px'}}>
                      <path d="M10 3v5l3 2-3 2v5M7 8h6" stroke="#1C5FAD" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 style={s.serviceTitle}>{svc.title}</h3>
                  <p style={s.serviceBody}>{svc.body}</p>
                </div>
              )
            })}
          </div>

          <div className="reveal">
            <p style={s.eyebrow}>Why Choose Us</p>
            <h2 style={s.sectionTitle}>What Sets Us <em style={s.sectionTitleEm}>Apart</em></h2>
          </div>
          <div style={Object.assign({}, s.whyGrid, {marginTop:'32px'})}>
            {WHY.map(function(w, i) {
              return (
                <div key={i} className={'elec-why-item reveal reveal-delay-' + (i + 1)} style={s.whyItem}>
                  <span style={s.whyNum}>{w.num}</span>
                  <div>
                    <p style={s.whyTitle}>{w.title}</p>
                    <p style={s.whyBody}>{w.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div ref={section2Ref} style={s.sectionSm}>
          <div className="reveal" style={s.imageStrip}>
            <div className="elec-strip-img-wrap">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop" alt="Electrical panel" style={s.stripImg} />
            </div>
            <div className="elec-strip-img-wrap">
              <img src="https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=600&q=80&fit=crop" alt="Circuit breaker box" style={s.stripImg} />
            </div>
            <div className="elec-strip-img-wrap">
              <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80&fit=crop" alt="Electrician at work" style={s.stripImg} />
            </div>
          </div>
        </div>

        <div ref={section3Ref} style={s.sectionSm}>
          <div className="reveal" style={s.cocBlock}>
            <div style={s.cocAccent} />
            <div>
              <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#85B7EB',marginBottom:'14px',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{width:'24px',height:'1px',background:'#85B7EB',display:'block'}} />
                Certificate of Compliance
              </p>
              <h2 style={s.cocTitle}>What is a <em style={s.cocEm}>COC</em> and Why Do You Need One?</h2>
              <p style={s.cocBody}>A Certificate of Compliance is a legally required document confirming that your electrical installation meets SANS 10142. It is required when selling a property, completing new electrical work, or for insurance purposes.</p>
              <a href="/contact" style={s.cocBtn}>
                Request a COC Inspection
                <svg viewBox="0 0 14 14" fill="none" style={{width:'13px',height:'13px'}}>
                  <path d="M2 7h10M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            <div style={s.cocSteps}>
              {COC_STEPS.map(function(step, i) {
                return (
                  <div key={i} style={s.cocStep}>
                    <div style={s.cocStepNum}>{i + 1}</div>
                    <div>
                      <p style={s.cocStepTitle}>{step.title}</p>
                      <p style={s.cocStepText}>{step.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="reveal" style={s.ctaBanner}>
            <div>
              <h2 style={s.ctaTitle}>Need an <em style={s.ctaEm}>Electrician?</em></h2>
              <p style={s.ctaSub}>Get a free no-obligation quote today. Our team responds within 24 hours.</p>
            </div>
            <a href="/contact" className="elec-cta-btn" style={s.ctaBtn}>
              Get a Free Quote
              <svg viewBox="0 0 14 14" fill="none" style={{width:'14px',height:'14px'}}>
                <path d="M2 7h10M8 4l3 3-3 3" stroke="#1C5FAD" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </>
  )
}