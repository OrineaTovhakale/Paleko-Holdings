import { useState, useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const s = {
  page: { background: '#F8F7F4', minHeight: '100vh' },
  heroBg: { position: 'relative', height: '480px', overflow: 'hidden', background: '#1A1A1A' },
  heroImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(5,20,10,0.92) 0%, rgba(5,20,10,0.55) 55%, rgba(5,20,10,0.1) 100%)' },
  heroContent: { position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 56px', maxWidth: '680px' },
  heroEyebrow: { fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#5DCAA5', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' },
  eyebrowLine: { width: '24px', height: '1px', background: '#5DCAA5', display: 'block' },
  heroTitle: { fontFamily: 'Playfair Display, serif', fontSize: '48px', fontWeight: 700, color: '#fff', lineHeight: 1.12, marginBottom: '16px' },
  heroEm: { fontStyle: 'italic', color: '#9FE1CB' },
  heroSub: { fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontWeight: 300, maxWidth: '480px', marginBottom: '32px' },
  heroBadges: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', padding: '6px 14px', fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 },
  badgeDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#5DCAA5', flexShrink: 0 },
  section: { maxWidth: '1100px', margin: '0 auto', padding: '72px 56px' },
  sectionSm: { maxWidth: '1100px', margin: '0 auto', padding: '0 56px 72px' },
  eyebrow: { fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0F6E56', marginBottom: '10px' },
  sectionTitle: { fontFamily: 'Playfair Display, serif', fontSize: '34px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '16px' },
  sectionTitleEm: { fontStyle: 'italic', color: '#0F6E56' },
  body: { fontSize: '13px', color: '#666', lineHeight: 1.9, fontWeight: 300, maxWidth: '720px', marginBottom: '16px' },
  splitGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', marginBottom: '72px' },
  imgMain: { width: '100%', height: '420px', objectFit: 'cover', borderRadius: '16px', display: 'block' },
  servicesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '72px' },
  serviceCard: { background: '#fff', border: '1px solid #E0DBD5', borderRadius: '14px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' },
  serviceIcon: { width: '40px', height: '40px', borderRadius: '10px', background: '#E1F5EE', border: '1px solid #9FE1CB', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  serviceTitle: { fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 },
  serviceBody: { fontSize: '12px', color: '#888', lineHeight: 1.65, fontWeight: 300 },
  pcoBlock: { background: '#04342C', borderRadius: '20px', padding: '56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center', marginBottom: '72px', position: 'relative', overflow: 'hidden' },
  pcoAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, transparent, #5DCAA5, transparent)' },
  pcoTitle: { fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '14px' },
  pcoEm: { fontStyle: 'italic', color: '#9FE1CB' },
  pcoBody: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, fontWeight: 300, marginBottom: '24px' },
  pcoBtn: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1D9E75', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '13px 24px', borderRadius: '8px', textDecoration: 'none' },
  pcoStats: { display: 'flex', flexDirection: 'column', gap: '16px' },
  pcoStat: { padding: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px' },
  pcoStatNum: { fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#5DCAA5', marginBottom: '4px' },
  pcoStatLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 },
  imageStrip: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '72px' },
  stripImg: { width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', display: 'block' },
  ctaBanner: { background: '#0F6E56', borderRadius: '20px', padding: '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px' },
  ctaTitle: { fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '8px' },
  ctaEm: { fontStyle: 'italic', color: '#9FE1CB' },
  ctaSub: { fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 300, maxWidth: '400px' },
  ctaBtn: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#0F6E56', fontSize: '13px', fontWeight: 600, padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', flexShrink: 0 },
}

const SERVICES = [
  { title: 'Grass Cutting', body: 'Professional lawn mowing and grass cutting services for residential, commercial and industrial properties of all sizes.' },
  { title: 'Tree Felling', body: 'Safe and efficient tree felling by experienced operators. We handle everything from small garden trees to large commercial felling jobs.' },
  { title: 'Weed Control', body: 'Targeted weed removal and control using professional-grade herbicides and manual clearing techniques.' },
  { title: 'Herbicide Application', body: 'Reg PCO licensed herbicide application for effective control of unwanted vegetation on driveways, pathways and open areas.' },
]

const PCO_STATS = [
  { num: 'Reg PCO', label: 'Registered Pest Control Operator licensed for herbicide application' },
  { num: '100%', label: 'Safe and compliant herbicide application on every job' },
  { num: 'All SA', label: 'Herbicide products approved for use across South Africa' },
]

const BADGES = ['Grass Cutting', 'Tree Felling', 'Weed Control', 'Herbicide Application', 'Reg PCO Licensed']

export default function VegetationServices() {
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef(null)
  const sectionRef = useReveal()
  const section2Ref = useReveal()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const heroClass = loaded ? 'veg-loaded' : ''

  return (
    <>
      <style>{`
        .veg-hero-line-1 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s; }
        .veg-hero-line-2 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s; }
        .veg-hero-line-3 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s; }
        .veg-hero-line-4 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.55s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s; }
        .veg-loaded .veg-hero-line-1,
        .veg-loaded .veg-hero-line-2,
        .veg-loaded .veg-hero-line-3,
        .veg-loaded .veg-hero-line-4 { opacity: 1; transform: translateY(0); }
        .veg-underline { position: relative; display: inline-block; }
        .veg-underline::after { content: ''; position: absolute; bottom: -4px; left: 0; height: 2px; width: 0; background: #9FE1CB; border-radius: 2px; transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s; }
        .veg-loaded .veg-underline::after { width: 100%; }
        .veg-service-card { transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .veg-service-card:hover { border-color: #9FE1CB !important; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
        .veg-img-hover { overflow: hidden; border-radius: 16px; }
        .veg-img-hover img { transition: transform 0.6s ease; display: block; width: 100%; }
        .veg-img-hover:hover img { transform: scale(1.03); }
        .veg-strip-wrap { overflow: hidden; border-radius: 12px; }
        .veg-strip-wrap img { transition: transform 0.6s ease; display: block; width: 100%; }
        .veg-strip-wrap:hover img { transform: scale(1.04); }
        .veg-cta-btn:hover { transform: translateY(-2px); }
      `}</style>

      <div style={s.page}>

        <div ref={heroRef} className={heroClass} style={s.heroBg}>
          <img src="https://images.squarespace-cdn.com/content/v1/67a0fc26e44aa03348912c8b/278dda95-7b97-495f-8c92-16c840090432/ND7_8815.jpg" alt="Vegetation services" style={s.heroImg} />
          <div style={s.heroOverlay} />
          <div style={s.heroContent}>
            <p className="veg-hero-line-1" style={s.heroEyebrow}>
              <span style={s.eyebrowLine} />
              Grounds Management
            </p>
            <h1 className="veg-hero-line-2" style={s.heroTitle}>
              Professional Vegetation<br />
              <em className="veg-underline" style={s.heroEm}>Services.</em>
            </h1>
            <p className="veg-hero-line-3" style={s.heroSub}>
              Grass cutting, tree felling, weed control and Reg PCO herbicide application — keeping your outdoor spaces clean, safe and well-maintained.
            </p>
            <div className="veg-hero-line-4" style={s.heroBadges}>
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
                Clean, Orderly <em style={s.sectionTitleEm}>Outdoor Spaces.</em>
              </h2>
              <p style={s.body}>
                Paleko Holdings offers comprehensive vegetation and grounds management services for residential, commercial and industrial clients across South Africa.
              </p>
              <p style={s.body}>
                Our experienced team handles everything from routine grass cutting to large-scale tree felling and chemical weed control. We are a Reg PCO licensed operator, meaning our herbicide applications are safe, legal and effective.
              </p>
            </div>
            <div className="reveal reveal-delay-2 veg-img-hover">
              <img src="https://images.pexels.com/photos/8961251/pexels-photo-8961251.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Vegetation management" style={s.imgMain} />
            </div>
          </div>

          <div className="reveal">
            <p style={s.eyebrow}>What We Offer</p>
            <h2 style={s.sectionTitle}>Our Vegetation <em style={s.sectionTitleEm}>Services</em></h2>
            <p style={Object.assign({}, s.body, {marginBottom:'32px'})}>From grass to trees and everything in between — we keep your grounds in excellent condition.</p>
          </div>
          <div style={s.servicesGrid}>
            {SERVICES.map(function(svc, i) {
              return (
                <div key={i} className={'veg-service-card reveal reveal-delay-' + (i + 1)} style={s.serviceCard}>
                  <div style={s.serviceIcon}>
                    <svg viewBox="0 0 20 20" fill="none" style={{width:'18px',height:'18px'}}>
                      <path d="M10 18V8M6 14s1-4 4-6M14 14s-1-4-4-6" stroke="#0F6E56" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 style={s.serviceTitle}>{svc.title}</h3>
                  <p style={s.serviceBody}>{svc.body}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div ref={section2Ref} style={s.sectionSm}>
          <div className="reveal" style={s.imageStrip}>
            <div className="veg-strip-wrap">
              <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&fit=crop" alt="Lawn cutting" style={s.stripImg} />
            </div>
            <div className="veg-strip-wrap">
              <img src="https://images.unsplash.com/photo-1563909671921-5db64c428fcc?w=600&q=80&fit=crop" alt="Tree felling" style={s.stripImg} />
            </div>
            <div className="veg-strip-wrap">
              <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=600&q=80&fit=crop" alt="Weed control" style={s.stripImg} />
            </div>
          </div>

          <div className="reveal" style={s.pcoBlock}>
            <div style={s.pcoAccent} />
            <div>
              <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#5DCAA5',marginBottom:'14px',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{width:'24px',height:'1px',background:'#5DCAA5',display:'block'}} />
                Herbicide Application
              </p>
              <h2 style={s.pcoTitle}>Reg PCO Licensed <em style={s.pcoEm}>Herbicide Application</em></h2>
              <p style={s.pcoBody}>
                Paleko Holdings is a registered Pest Control Operator (Reg PCO) licensed to apply herbicides for the control of unwanted vegetation. Our herbicide applications are safe, compliant with South African regulations and highly effective for driveways, open areas, pathways and commercial grounds.
              </p>
              <a href="/contact" style={s.pcoBtn}>
                Request a Quote
                <svg viewBox="0 0 14 14" fill="none" style={{width:'13px',height:'13px'}}>
                  <path d="M2 7h10M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            <div style={s.pcoStats}>
              {PCO_STATS.map(function(ps, i) {
                return (
                  <div key={i} style={s.pcoStat}>
                    <p style={s.pcoStatNum}>{ps.num}</p>
                    <p style={s.pcoStatLabel}>{ps.label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="reveal" style={s.ctaBanner}>
            <div>
              <h2 style={s.ctaTitle}>Need Your Grounds <em style={s.ctaEm}>Maintained?</em></h2>
              <p style={s.ctaSub}>Get a free no-obligation quote today. Our team responds within 24 hours.</p>
            </div>
            <a href="/contact" className="veg-cta-btn" style={s.ctaBtn}>
              Get a Free Quote
              <svg viewBox="0 0 14 14" fill="none" style={{width:'14px',height:'14px'}}>
                <path d="M2 7h10M8 4l3 3-3 3" stroke="#0F6E56" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </>
  )
}