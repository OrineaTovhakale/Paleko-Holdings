import { useState, useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const STATS = [
  { num: '10+', label: 'Installations completed across 5 provinces' },
  { num: '2+ MWh', label: 'Green energy contribution since 2021' },
  { num: '97%', label: 'Overall customer satisfaction rate' },
  { num: '7yr', label: 'Minimum warranty on all battery inverter systems' },
]

const VALUES = [
  'Integrity & Honesty in everything we do',
  'Team Work — we win together',
  'Uncompromised Safety on every job',
  'Customer Satisfaction is our benchmark',
  'High Quality Standards, always',
  'Doing the job right the first time',
]

const SERVICES = [
  { tag: 'Electrical', tagColor: '#1C5FAD', title: 'Electrical Services & COC', body: 'Full electrical repairs, installations and Certificates of Compliance for residential, commercial and industrial properties.', href: '/services/electrical' },
  { tag: 'Renewable Energy', tagColor: '#B07A18', title: 'Solar Power Installation', body: 'Helping clients harness renewable energy to reduce carbon footprint and save on electricity costs.', href: '/services/solar' },
  { tag: 'Repairs & Servicing', tagColor: '#2A9D5C', title: 'Power Tools & Machine Repairs', body: 'Lawn mowers, generators, chainsaws and brushcutters — fully serviced and repaired to keep you working.', href: '/services/power-tools' },
  { tag: 'Grounds Management', tagColor: '#0F6E56', title: 'Vegetation Services', body: 'Grass cutting, tree felling, weed control and Reg PCO herbicide application for clean outdoor spaces.', href: '/services/vegetation' },
]

const LOCATIONS = [
  { city: 'Johannesburg', province: 'Gauteng' },
  { city: 'Pretoria', province: 'Gauteng' },
  { city: 'Durban', province: 'KwaZulu-Natal' },
  { city: 'Newcastle', province: 'KwaZulu-Natal' },
]

function ServiceCard({ tag, tagColor, title, body, href }) {
  const tagStyle = { fontSize: '9px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: tagColor, marginBottom: '8px' }
  return (
    <a href={href} className="about-service-card" style={{ background: '#fff', border: '1px solid #E0DBD5', borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', textDecoration: 'none' }}>
      <p style={tagStyle}>{tag}</p>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '15px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 }}>{title}</h3>
      <p style={{ fontSize: '12px', color: '#888', lineHeight: 1.65, fontWeight: 300 }}>{body}</p>
      <span style={{ fontSize: '11px', fontWeight: 500, color: '#1C5FAD', marginTop: '4px' }}>Learn more →</span>
    </a>
  )
}

export default function AboutPage() {
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef(null)
  const sectionRef = useReveal()
  const section2Ref = useReveal()
  const section3Ref = useReveal()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const parallax = el.querySelector('.about-parallax')
    if (!parallax) return
    function onMove(e) {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX / rect.width - 0.5) * 14
      const y = (e.clientY / rect.height - 0.5) * 8
      parallax.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    }
    function onLeave() { parallax.style.transform = 'translate(0px, 0px)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])

  const heroClass = loaded ? 'about-loaded' : ''

  return (
    <>
      <style>{`
        .about-parallax { transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .about-hero-line-1 { opacity:0; transform:translateY(24px); transition:opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s; }
        .about-hero-line-2 { opacity:0; transform:translateY(24px); transition:opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s; }
        .about-hero-line-3 { opacity:0; transform:translateY(24px); transition:opacity 0.8s ease 0.45s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s; }
        .about-loaded .about-hero-line-1,
        .about-loaded .about-hero-line-2,
        .about-loaded .about-hero-line-3 { opacity:1; transform:translateY(0); }
        .about-underline { position:relative; display:inline-block; }
        .about-underline::after { content:''; position:absolute; bottom:-3px; left:0; height:2px; width:0; background:#6FD4A0; border-radius:2px; transition:width 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s; }
        .about-loaded .about-underline::after { width:100%; }
        .about-stat-item:hover { background:#F8F7F4 !important; }
        .about-img-hover { overflow:hidden; border-radius:12px; }
        .about-img-hover img { transition:transform 0.6s ease; display:block; width:100%; }
        .about-img-hover:hover img { transform:scale(1.04); }
        .about-service-card { transition:border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .about-service-card:hover { border-color:#B5D4F4 !important; transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,0.07); }
        .about-value-item { transition:border-color 0.2s ease, transform 0.2s ease; }
        .about-value-item:hover { border-color:#2A9D5C !important; transform:translateX(4px); }
        .about-location-card { transition:border-color 0.2s ease, transform 0.2s ease; }
        .about-location-card:hover { border-color:#1C5FAD !important; transform:translateY(-2px); }
        .about-mission-stat { transition:background 0.2s ease; }
        .about-mission-stat:hover { background:rgba(255,255,255,0.08) !important; }
        .about-cta-btn:hover { transform:translateY(-2px); }
      `}</style>

      <div style={{ background: '#F8F7F4', minHeight: '100vh' }}>

        {/* Hero */}
        <div ref={heroRef} className={heroClass} style={{ position: 'relative', height: '480px', overflow: 'hidden', background: '#1A1A1A' }}>
          <div className="about-parallax" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80&fit=crop"
              alt="Paleko Holdings team"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
            />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,20,40,0.92) 0%, rgba(10,20,40,0.5) 60%, rgba(10,20,40,0.1) 100%)' }} />
          <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(32px,6vw,80px) clamp(24px,5vw,56px)', maxWidth: '680px' }}>
            <p className="about-hero-line-1" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '24px', height: '1px', background: '#2A9D5C', display: 'block' }} />
              About Us
            </p>
            <h1 className="about-hero-line-2" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, color: '#fff', lineHeight: 1.12, marginBottom: '16px' }}>
              Built on Purpose.<br />
              <em className="about-underline" style={{ fontStyle: 'italic', color: '#6FD4A0' }}>Driven by Community.</em>
            </h1>
            <p className="about-hero-line-3" style={{ fontSize: 'clamp(12px,2vw,13px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontWeight: 300, maxWidth: '480px' }}>
              A leading South African service provider committed to quality, safety and the empowerment of the communities we serve.
            </p>
          </div>
        </div>

        {/* Stats + Who We Are + Image Grid + Services */}
        <div ref={sectionRef} className="page-section">

          <div className="reveal stats-grid-responsive">
            {STATS.map(function(s, i) {
              return (
                <div key={i} className="about-stat-item" style={{ background: '#fff', padding: 'clamp(20px,3vw,32px) clamp(16px,2vw,28px)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px,4vw,36px)', fontWeight: 700, color: '#1A1A1A' }}>{s.num}</span>
                  <span style={{ fontSize: '11px', color: '#888', fontWeight: 400, lineHeight: 1.4 }}>{s.label}</span>
                </div>
              )
            })}
          </div>

          <div className="page-split">
            <div className="reveal">
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '10px' }}>Who We Are</p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '16px' }}>
                A Team That Delivers <em style={{ fontStyle: 'italic', color: '#1C5FAD' }}>Every Time</em>
              </h2>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.9, fontWeight: 300, marginBottom: '16px' }}>
                Paleko Holdings is a leading electrical service provider company that offers a wide range of services to meet the needs of residential, commercial, and industrial clients. With a team of highly skilled and experienced professionals, Paleko Holdings specializes in electrical work and COCs, ensuring that all electrical installations and repairs are conducted safely and efficiently.
              </p>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.9, fontWeight: 300, marginBottom: '16px' }}>
                With a commitment to excellence and customer satisfaction, Paleko Holdings is dedicated to providing top-notch services and products that meet the needs of its clients — delivering quality solutions tailored to your specific requirements.
              </p>
            </div>
            <div className="reveal reveal-delay-2 about-img-hover">
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80&fit=crop"
                alt="Electrician team at work"
                className="img-main-responsive"
              />
            </div>
          </div>

          <div className="image-grid-3">
            <div className="reveal reveal-delay-1 about-img-hover">
              <img src="https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=600&q=80&fit=crop" alt="Electrical panel work" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', display: 'block' }} />
            </div>
            <div className="reveal reveal-delay-2 about-img-hover">
              <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80&fit=crop" alt="Solar installation" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', display: 'block' }} />
            </div>
            <div className="reveal reveal-delay-3 about-img-hover">
              <img src="https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=600&q=80&fit=crop" alt="Grounds maintenance" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', display: 'block' }} />
            </div>
          </div>

          <div className="reveal">
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '10px' }}>What We Offer</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '16px' }}>
              Our Core <em style={{ fontStyle: 'italic', color: '#1C5FAD' }}>Services</em>
            </h2>
            <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.9, fontWeight: 300, marginBottom: '32px' }}>
              From electrical installations to solar power, power tool repairs and vegetation management — we bring expertise, reliability and quality to every job.
            </p>
          </div>
          <div className="service-cards-2">
            {SERVICES.map(function(svc, i) {
              return (
                <ServiceCard key={i} tag={svc.tag} tagColor={svc.tagColor} title={svc.title} body={svc.body} href={svc.href} />
              )
            })}
          </div>

        </div>

        {/* Mission Block */}
        <div ref={section2Ref} className="page-section-sm">
          <div className="reveal" style={{ background: '#0D1F0F', borderRadius: '20px', padding: 'clamp(32px,5vw,56px)', marginBottom: '56px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, transparent, #2A9D5C, transparent)' }} />
            <div className="mission-grid-responsive">
              <div>
                <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '24px', height: '1px', background: '#2A9D5C', display: 'block' }} />
                  Our Vision
                </p>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '16px' }}>
                  To Be South Africa's Most <em style={{ fontStyle: 'italic', color: '#6FD4A0' }}>Trusted</em> Service Partner
                </h2>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
                  To be a successful, safety conscious and most preferred growing company that offers quality services and emphasizes on the development and empowerment of the present and future generations whilst contributing to the economic growth of South Africa.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[{ num: '5+', label: 'Provinces served across South Africa' }, { num: '2021', label: 'Year Paleko Holdings was established' }, { num: '100%', label: 'Commitment to safety on every single job' }].map(function(ms, i) {
                  return (
                    <div key={i} className="about-mission-stat" style={{ padding: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}>
                      <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{ms.num}</p>
                      <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{ms.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Values + Locations + CTA */}
        <div ref={section3Ref} className="page-section-sm">

          <div className="page-split">
            <div className="reveal about-img-hover">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&q=80&fit=crop"
                alt="Construction team on site"
                className="img-main-responsive"
              />
            </div>
            <div className="reveal reveal-delay-2">
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '10px' }}>Our Values</p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,3vw,34px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '16px' }}>
                What We <em style={{ fontStyle: 'italic', color: '#1C5FAD' }}>Stand For</em>
              </h2>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.9, fontWeight: 300, marginBottom: '20px' }}>
                Our values are not just words on a page — they are the principles that guide every decision we make, every job we take on, and every relationship we build.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {VALUES.map(function(v, i) {
                  return (
                    <div key={i} className="about-value-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 16px', background: '#fff', border: '1px solid #E0DBD5', borderRadius: '10px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2A9D5C', flexShrink: 0, marginTop: '4px' }} />
                      <span style={{ fontSize: '12px', color: '#444', lineHeight: 1.5, fontWeight: 400 }}>{v}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="reveal" style={{ background: '#fff', border: '1px solid #E0DBD5', borderRadius: '16px', padding: 'clamp(24px,4vw,40px)', marginBottom: '56px' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '8px' }}>Where We Operate</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(18px,3vw,22px)', fontWeight: 700, color: '#1A1A1A', marginBottom: '6px' }}>Currently Serving 5 Provinces</h2>
            <p style={{ fontSize: '12px', color: '#888', fontWeight: 300, marginBottom: '24px' }}>
              We are momentarily operating across these locations and are actively expanding to serve more communities across South Africa.
            </p>
            <div className="location-grid-responsive">
              {LOCATIONS.map(function(l, i) {
                return (
                  <div key={i} className="about-location-card" style={{ background: '#F8F7F4', border: '1px solid #E0DBD5', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#EDF4FF', border: '1px solid #C8D8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                      <svg viewBox="0 0 16 16" fill="none" style={{ width: '14px', height: '14px' }}>
                        <path d="M8 2C5.24 2 3 4.24 3 7c0 4 5 8 5 8s5-4 5-8c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#1C5FAD" />
                      </svg>
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A' }}>{l.city}</p>
                    <p style={{ fontSize: '11px', color: '#888', fontWeight: 300 }}>{l.province}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="reveal cta-banner-flex" style={{ background: '#1C5FAD' }}>
            <div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '8px' }}>
                Ready to Work with <em style={{ fontStyle: 'italic', color: '#A8DFBF' }}>Paleko?</em>
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 300, maxWidth: '400px' }}>
                Get a free no-obligation quote today. Our team responds within 24 hours.
              </p>
            </div>
            <a href="/contact" className="about-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#1C5FAD', fontSize: '13px', fontWeight: 600, padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', flexShrink: 0 }}>
              Get a Free Quote
              <svg viewBox="0 0 14 14" fill="none" style={{ width: '14px', height: '14px' }}>
                <path d="M2 7h10M8 4l3 3-3 3" stroke="#1C5FAD" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </>
  )
}