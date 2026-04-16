import { useState, useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

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
        .veg-hero-line-1 { opacity:0; transform:translateY(24px); transition:opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s; }
        .veg-hero-line-2 { opacity:0; transform:translateY(24px); transition:opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s; }
        .veg-hero-line-3 { opacity:0; transform:translateY(24px); transition:opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s; }
        .veg-hero-line-4 { opacity:0; transform:translateY(24px); transition:opacity 0.8s ease 0.55s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s; }
        .veg-loaded .veg-hero-line-1,
        .veg-loaded .veg-hero-line-2,
        .veg-loaded .veg-hero-line-3,
        .veg-loaded .veg-hero-line-4 { opacity:1; transform:translateY(0); }
        .veg-underline { position:relative; display:inline-block; }
        .veg-underline::after { content:''; position:absolute; bottom:-4px; left:0; height:2px; width:0; background:#9FE1CB; border-radius:2px; transition:width 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s; }
        .veg-loaded .veg-underline::after { width:100%; }
        .veg-service-card { transition:border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .veg-service-card:hover { border-color:#9FE1CB !important; transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,0.07); }
        .veg-img-hover { overflow:hidden; border-radius:16px; }
        .veg-img-hover img { transition:transform 0.6s ease; display:block; width:100%; }
        .veg-img-hover:hover img { transform:scale(1.03); }
        .veg-strip-wrap { overflow:hidden; border-radius:12px; }
        .veg-strip-wrap img { transition:transform 0.6s ease; display:block; width:100%; }
        .veg-strip-wrap:hover img { transform:scale(1.04); }
        .veg-cta-btn:hover { transform:translateY(-2px); }
      `}</style>

      <div style={{ background: '#F8F7F4', minHeight: '100vh' }}>

        <div ref={heroRef} className={heroClass} style={{ position: 'relative', height: '480px', overflow: 'hidden', background: '#1A1A1A' }}>
          <img
            src="https://images.pexels.com/photos/7728086/pexels-photo-7728086.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Vegetation services"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(5,20,10,0.92) 0%, rgba(5,20,10,0.55) 55%, rgba(5,20,10,0.1) 100%)' }} />
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px,6vw,80px) clamp(24px,5vw,56px)', maxWidth: '680px' }}>
            <p className="veg-hero-line-1" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#5DCAA5', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '24px', height: '1px', background: '#5DCAA5', display: 'block' }} />
              Grounds Management
            </p>
            <h1 className="veg-hero-line-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, color: '#fff', lineHeight: 1.12, marginBottom: '16px' }}>
              Professional Vegetation<br />
              <em className="veg-underline" style={{ fontStyle: 'italic', color: '#9FE1CB' }}>Services.</em>
            </h1>
            <p className="veg-hero-line-3" style={{ fontSize: 'clamp(12px,2vw,13px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontWeight: 300, maxWidth: '480px', marginBottom: '24px' }}>
              Grass cutting, tree felling, weed control and Reg PCO herbicide application — keeping your outdoor spaces clean, safe and well-maintained.
            </p>
            <div className="veg-hero-line-4 badges-wrap">
              {BADGES.map(function(b, i) {
                return (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', padding: '6px 14px', fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#5DCAA5', flexShrink: 0 }} />{b}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        <div ref={sectionRef} className="page-section">
          <div className="page-split">
            <div className="reveal">
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0F6E56', marginBottom: '10px' }}>Our Service</p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '16px' }}>
                Clean, Orderly <em style={{ fontStyle: 'italic', color: '#0F6E56' }}>Outdoor Spaces.</em>
              </h2>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.9, fontWeight: 300, marginBottom: '16px' }}>
                Paleko Holdings offers comprehensive vegetation and grounds management services for residential, commercial and industrial clients across South Africa.
              </p>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.9, fontWeight: 300, marginBottom: '16px' }}>
                Our experienced team handles everything from routine grass cutting to large-scale tree felling and chemical weed control. We are a Reg PCO licensed operator, meaning our herbicide applications are safe, legal and effective.
              </p>
            </div>
            <div className="reveal reveal-delay-2 veg-img-hover">
              <img
                src="https://images.pexels.com/photos/4792480/pexels-photo-4792480.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Vegetation management worker"
                className="img-main-responsive"
              />
            </div>
          </div>

          <div className="reveal">
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0F6E56', marginBottom: '10px' }}>What We Offer</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '16px' }}>
              Our Vegetation <em style={{ fontStyle: 'italic', color: '#0F6E56' }}>Services</em>
            </h2>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.9, fontWeight: 300, marginBottom: '32px' }}>
              From grass to trees and everything in between — we keep your grounds in excellent condition.
            </p>
          </div>
          <div className="cards-2-grid">
            {SERVICES.map(function(svc, i) {
              return (
                <div key={i} className="veg-service-card reveal" style={{ background: '#fff', border: '1px solid #E0DBD5', borderRadius: '14px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#E1F5EE', border: '1px solid #9FE1CB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 20 20" fill="none" style={{ width: '18px', height: '18px' }}>
                      <path d="M10 18V8M6 14s1-4 4-6M14 14s-1-4-4-6" stroke="#0F6E56" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 }}>{svc.title}</h3>
                  <p style={{ fontSize: '12px', color: '#888', lineHeight: 1.65, fontWeight: 300 }}>{svc.body}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div ref={section2Ref} className="page-section-sm">
          <div className="strip-grid reveal">
            <div className="veg-strip-wrap">
              <img
                src="https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Lawn mowing"
                className="strip-img-fixed"
              />
            </div>
            <div className="veg-strip-wrap">
              <img
                src="https://images.pexels.com/photos/6231693/pexels-photo-6231693.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Tree cutting worker"
                className="strip-img-fixed"
              />
            </div>
            <div className="veg-strip-wrap">
              <img
                src="https://images.pexels.com/photos/6231682/pexels-photo-6231682.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Grounds maintenance team"
                className="strip-img-fixed"
              />
            </div>
          </div>

          <div className="reveal" style={{ background: '#04342C', borderRadius: '20px', padding: 'clamp(32px,5vw,56px)', marginBottom: '56px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, transparent, #5DCAA5, transparent)' }} />
            <div className="dark-block-grid">
              <div>
                <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#5DCAA5', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '24px', height: '1px', background: '#5DCAA5', display: 'block' }} />
                  Herbicide Application
                </p>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '14px' }}>
                  Reg PCO Licensed <em style={{ fontStyle: 'italic', color: '#9FE1CB' }}>Herbicide Application</em>
                </h2>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, fontWeight: 300, marginBottom: '24px' }}>
                  Paleko Holdings is a registered Pest Control Operator licensed to apply herbicides for the control of unwanted vegetation. Our applications are safe, compliant with South African regulations and highly effective.
                </p>
                <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1D9E75', color: '#fff', fontSize: '12px', fontWeight: 600, padding: '13px 24px', borderRadius: '8px', textDecoration: 'none' }}>
                  Request a Quote
                  <svg viewBox="0 0 14 14" fill="none" style={{ width: '13px', height: '13px' }}>
                    <path d="M2 7h10M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {PCO_STATS.map(function(ps, i) {
                  return (
                    <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px' }}>
                      <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#5DCAA5', marginBottom: '4px' }}>{ps.num}</p>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{ps.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="reveal cta-banner-flex" style={{ background: '#0F6E56' }}>
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,3vw,28px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '8px' }}>
                Need Your Grounds <em style={{ fontStyle: 'italic', color: '#9FE1CB' }}>Maintained?</em>
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 300, maxWidth: '400px' }}>
                Get a free no-obligation quote today. Our team responds within 24 hours.
              </p>
            </div>
            <a href="/contact" className="veg-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#0F6E56', fontSize: '13px', fontWeight: 600, padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', flexShrink: 0 }}>
              Get a Free Quote
              <svg viewBox="0 0 14 14" fill="none" style={{ width: '14px', height: '14px' }}>
                <path d="M2 7h10M8 4l3 3-3 3" stroke="#0F6E56" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </>
  )
}