import { useState, useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const styles = {
  page: { background: '#F8F7F4', minHeight: '100vh' },
  heroBg: { position: 'relative', height: '480px', overflow: 'hidden', background: '#1A1A1A' },
  heroImg: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(10,20,40,0.92) 0%, rgba(10,20,40,0.5) 60%, rgba(10,20,40,0.1) 100%)' },
  heroContent: { position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 56px', maxWidth: '680px' },
  heroEyebrow: { fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' },
  eyebrowLine: { width: '24px', height: '1px', background: '#2A9D5C', display: 'block' },
  heroTitle: { fontFamily: 'Playfair Display, serif', fontSize: '48px', fontWeight: 700, color: '#fff', lineHeight: 1.12, marginBottom: '16px' },
  heroEm: { fontStyle: 'italic', color: '#6FD4A0' },
  heroSub: { fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontWeight: 300, maxWidth: '480px' },
  section: { maxWidth: '1100px', margin: '0 auto', padding: '72px 56px' },
  sectionSm: { maxWidth: '1100px', margin: '0 auto', padding: '0 56px 72px' },
  eyebrow: { fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '10px' },
  sectionTitle: { fontFamily: 'Playfair Display, serif', fontSize: '34px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: '16px' },
  sectionTitleEm: { fontStyle: 'italic', color: '#1C5FAD' },
  body: { fontSize: '13px', color: '#666', lineHeight: 1.9, fontWeight: 300, maxWidth: '720px', marginBottom: '16px' },
  divider: { width: '100%', height: '1px', background: '#E0DBD5', margin: '0' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#E0DBD5', border: '1px solid #E0DBD5', borderRadius: '16px', overflow: 'hidden', marginBottom: '72px' },
  statItem: { background: '#fff', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '6px' },
  statNum: { fontFamily: 'Playfair Display, serif', fontSize: '36px', fontWeight: 700, color: '#1A1A1A' },
  statLabel: { fontSize: '11px', color: '#888', fontWeight: 400, lineHeight: 1.4 },
  statAccent: { color: '#2A9D5C' },
  imageGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '72px' },
  imageGridTall: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px', marginBottom: '72px' },
  img: { width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px', display: 'block' },
  imgTall: { width: '100%', height: '360px', objectFit: 'cover', borderRadius: '12px', display: 'block' },
  imgSmall: { width: '100%', height: '172px', objectFit: 'cover', borderRadius: '12px', display: 'block' },
  splitGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', marginBottom: '72px' },
  valuesList: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' },
  valueItem: { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', background: '#fff', border: '1px solid #E0DBD5', borderRadius: '10px' },
  valueDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#2A9D5C', flexShrink: 0, marginTop: '4px' },
  valueText: { fontSize: '12px', color: '#444', lineHeight: 1.5, fontWeight: 400 },
  serviceCards: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '40px' },
  serviceCard: { background: '#fff', border: '1px solid #E0DBD5', borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' },
  serviceTag: { fontSize: '9px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' },
  serviceTitle: { fontFamily: 'Playfair Display, serif', fontSize: '16px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 },
  serviceBody: { fontSize: '12px', color: '#888', lineHeight: 1.65, fontWeight: 300 },
  missionBlock: { background: '#0D1F0F', borderRadius: '20px', padding: '56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center', marginBottom: '72px', position: 'relative', overflow: 'hidden' },
  missionTitle: { fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '16px' },
  missionEm: { fontStyle: 'italic', color: '#6FD4A0' },
  missionBody: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, fontWeight: 300 },
  missionAccent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, transparent, #2A9D5C, transparent)' },
  missionRight: { display: 'flex', flexDirection: 'column', gap: '16px' },
  missionStat: { padding: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' },
  missionStatNum: { fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '4px' },
  missionStatLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 },
  mapSection: { background: '#fff', border: '1px solid #E0DBD5', borderRadius: '16px', padding: '40px', marginBottom: '72px' },
  mapTitle: { fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' },
  mapSub: { fontSize: '12px', color: '#888', fontWeight: 300, marginBottom: '28px' },
  locationGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' },
  locationCard: { background: '#F8F7F4', border: '1px solid #E0DBD5', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' },
  locationPin: { width: '28px', height: '28px', borderRadius: '8px', background: '#EDF4FF', border: '1px solid #C8D8EE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' },
  locationCity: { fontSize: '13px', fontWeight: 600, color: '#1A1A1A' },
  locationProvince: { fontSize: '11px', color: '#888', fontWeight: 300 },
  teamSection: { marginBottom: '72px' },
  ctaBanner: { background: '#1C5FAD', borderRadius: '20px', padding: '48px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px' },
  ctaBannerTitle: { fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '8px' },
  ctaBannerEm: { fontStyle: 'italic', color: '#A8DFBF' },
  ctaBannerSub: { fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 300, maxWidth: '400px' },
  ctaBannerBtn: { display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#1C5FAD', fontSize: '13px', fontWeight: 600, padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', flexShrink: 0 },
}

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
  const tagStyle = Object.assign({}, styles.serviceTag, { color: tagColor })
  return (
    <a href={href} className="about-service-card" style={Object.assign({}, styles.serviceCard, {textDecoration:'none'})}>
      <p style={tagStyle}>{tag}</p>
      <h3 style={styles.serviceTitle}>{title}</h3>
      <p style={styles.serviceBody}>{body}</p>
      <span style={{fontSize:'11px',fontWeight:500,color:'#1C5FAD',marginTop:'4px'}}>Learn more →</span>
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
    function onLeave() {
      parallax.style.transform = 'translate(0px, 0px)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const heroClass = loaded ? 'about-loaded' : ''

  return (
    <>
      <style>{`
        .about-parallax { transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .about-hero-line-1 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s; }
        .about-hero-line-2 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s; }
        .about-hero-line-3 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.45s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s; }
        .about-loaded .about-hero-line-1,
        .about-loaded .about-hero-line-2,
        .about-loaded .about-hero-line-3 { opacity: 1; transform: translateY(0); }
        .about-underline { position: relative; display: inline-block; }
        .about-underline::after { content: ''; position: absolute; bottom: -3px; left: 0; height: 2px; width: 0; background: #6FD4A0; border-radius: 2px; transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s; }
        .about-loaded .about-underline::after { width: 100%; }
        .about-stat-item:hover { background: #F8F7F4 !important; }
        .about-img-hover { overflow: hidden; border-radius: 12px; }
        .about-img-hover img { transition: transform 0.6s ease; display: block; width: 100%; }
        .about-img-hover:hover img { transform: scale(1.04); }
        .about-img-hover-tall { overflow: hidden; border-radius: 12px; }
        .about-img-hover-tall img { transition: transform 0.6s ease; display: block; width: 100%; }
        .about-img-hover-tall:hover img { transform: scale(1.04); }
        .about-service-card { transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .about-service-card:hover { border-color: #B5D4F4 !important; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
        .about-value-item { transition: border-color 0.2s ease, transform 0.2s ease; }
        .about-value-item:hover { border-color: #2A9D5C !important; transform: translateX(4px); }
        .about-location-card { transition: border-color 0.2s ease, transform 0.2s ease; }
        .about-location-card:hover { border-color: #1C5FAD !important; transform: translateY(-2px); }
        .about-mission-stat { transition: background 0.2s ease; }
        .about-mission-stat:hover { background: rgba(255,255,255,0.08) !important; }
        .about-cta-btn:hover { transform: translateY(-2px); }
      `}</style>

      <div style={styles.page}>

        {/* Hero */}
        <div ref={heroRef} className={heroClass} style={styles.heroBg}>
          <div className="about-parallax" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80&fit=crop"
              alt="Paleko Holdings engineering team"
              style={styles.heroImg}
            />
          </div>
          <div style={styles.heroOverlay} />
          <div style={styles.heroContent}>
            <p className="about-hero-line-1" style={styles.heroEyebrow}>
              <span style={styles.eyebrowLine} />
              About Us
            </p>
            <h1 className="about-hero-line-2" style={styles.heroTitle}>
              Built on Purpose.<br />
              <em className="about-underline" style={styles.heroEm}>Driven by Community.</em>
            </h1>
            <p className="about-hero-line-3" style={styles.heroSub}>
              A leading South African service provider committed to quality, safety and the empowerment of the communities we serve.
            </p>
          </div>
        </div>

        {/* Stats + Who we are + Image grid + Services */}
        <div ref={sectionRef} style={styles.section}>

          <div className="reveal" style={styles.statsGrid}>
            {STATS.map(function(s, i) {
              return (
                <div key={i} className="about-stat-item reveal" style={styles.statItem}>
                  <span style={styles.statNum}>{s.num}</span>
                  <span style={styles.statLabel}>{s.label}</span>
                </div>
              )
            })}
          </div>

          <div style={styles.splitGrid}>
            <div className="reveal">
              <p style={styles.eyebrow}>Who We Are</p>
              <h2 style={styles.sectionTitle}>
                A Team That Delivers <em style={styles.sectionTitleEm}>Every Time</em>
              </h2>
              <p style={styles.body}>
                Paleko Holdings is a leading electrical service provider company that offers a wide range of services to meet the needs of residential, commercial, and industrial clients. With a team of highly skilled and experienced professionals, Paleko Holdings specializes in electrical work and COCs, ensuring that all electrical installations and repairs are conducted safely and efficiently.
              </p>
              <p style={styles.body}>
                With a commitment to excellence and customer satisfaction, Paleko Holdings is dedicated to providing top-notch services and products that meet the needs of its clients — delivering quality solutions tailored to your specific requirements.
              </p>
            </div>
            <div className="reveal reveal-delay-2 about-img-hover-tall">
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80&fit=crop"
                alt="Electrician team at work"
                style={styles.imgTall}
              />
            </div>
          </div>

          <div style={styles.imageGrid}>
            <div className="reveal reveal-delay-1 about-img-hover">
              <img
                src="https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=600&q=80&fit=crop"
                alt="Electrical panel work"
                style={styles.img}
              />
            </div>
            <div className="reveal reveal-delay-2 about-img-hover">
              <img
                src="https://assets.isu.pub/document-structure/240619114507-160beffd5a50f7046b69b1da9c2f511a/v1/575df4fb75cc44af3ec6086a0d122d6a.jpeg"
                alt="Solar installation"
                style={styles.img}
              />
            </div>
            <div className="reveal reveal-delay-3 about-img-hover">
              <img
                src="https://cdn.mos.cms.futurecdn.net/5pfvC4Fw4KmYD955F7w3vU.jpg"
                alt="Grounds maintenance"
                style={styles.img}
              />
            </div>
          </div>

          <div className="reveal">
            <p style={styles.eyebrow}>What We Offer</p>
            <h2 style={styles.sectionTitle}>
              Our Core <em style={styles.sectionTitleEm}>Services</em>
            </h2>
            <p style={styles.body}>
              From electrical installations to solar power, power tool repairs and vegetation management — we bring expertise, reliability and quality to every job.
            </p>
          </div>
          <div className="reveal reveal-delay-1" style={styles.serviceCards}>
            {SERVICES.map(function(svc, i) {
              return (
                <ServiceCard
                  key={i}
                  tag={svc.tag}
                  tagColor={svc.tagColor}
                  title={svc.title}
                  body={svc.body}
                  href={svc.href}
                />
              )
            })}
          </div>

        </div>

        {/* Mission block */}
        <div ref={section2Ref} style={styles.sectionSm}>
          <div className="reveal" style={styles.missionBlock}>
            <div style={styles.missionAccent} />
            <div>
              <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#2A9D5C',marginBottom:'14px',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{width:'24px',height:'1px',background:'#2A9D5C',display:'block'}} />
                Our Vision
              </p>
              <h2 style={styles.missionTitle}>
                To Be South Africa's Most <em style={styles.missionEm}>Trusted</em> Service Partner
              </h2>
              <p style={styles.missionBody}>
                To be a successful, safety conscious and most preferred growing company that offers quality services and emphasizes on the development and empowerment of the present and future generations whilst contributing to the economic growth of South Africa.
              </p>
            </div>
            <div style={styles.missionRight}>
              <div className="about-mission-stat" style={styles.missionStat}>
                <p style={styles.missionStatNum}>5+</p>
                <p style={styles.missionStatLabel}>Provinces served across South Africa</p>
              </div>
              <div className="about-mission-stat" style={styles.missionStat}>
                <p style={styles.missionStatNum}>2021</p>
                <p style={styles.missionStatLabel}>Year Paleko Holdings was established</p>
              </div>
              <div className="about-mission-stat" style={styles.missionStat}>
                <p style={styles.missionStatNum}>100%</p>
                <p style={styles.missionStatLabel}>Commitment to safety on every single job</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values + Where we operate + CTA */}
        <div ref={section3Ref} style={styles.sectionSm}>

          <div style={styles.splitGrid}>
            <div className="reveal about-img-hover-tall">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&q=80&fit=crop"
                alt="Construction team on site"
                style={styles.imgTall}
              />
            </div>
            <div className="reveal reveal-delay-2">
              <p style={styles.eyebrow}>Our Values</p>
              <h2 style={styles.sectionTitle}>
                What We <em style={styles.sectionTitleEm}>Stand For</em>
              </h2>
              <p style={styles.body}>
                Our values are not just words on a page — they are the principles that guide every decision we make, every job we take on, and every relationship we build.
              </p>
              <div style={styles.valuesList}>
                {VALUES.map(function(v, i) {
                  return (
                    <div key={i} className="about-value-item" style={styles.valueItem}>
                      <span style={styles.valueDot} />
                      <span style={styles.valueText}>{v}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="reveal" style={styles.mapSection}>
            <p style={styles.eyebrow}>Where We Operate</p>
            <h2 style={styles.mapTitle}>Currently Serving 5 Provinces</h2>
            <p style={styles.mapSub}>
              We are momentarily operating across these locations and are actively expanding to serve more communities across South Africa.
            </p>
            <div style={styles.locationGrid}>
              {LOCATIONS.map(function(l, i) {
                return (
                  <div key={i} className="about-location-card" style={styles.locationCard}>
                    <div style={styles.locationPin}>
                      <svg viewBox="0 0 16 16" fill="none" style={{width:'14px',height:'14px'}}>
                        <path d="M8 2C5.24 2 3 4.24 3 7c0 4 5 8 5 8s5-4 5-8c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#1C5FAD" />
                      </svg>
                    </div>
                    <p style={styles.locationCity}>{l.city}</p>
                    <p style={styles.locationProvince}>{l.province}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="reveal" style={styles.ctaBanner}>
            <div>
              <h2 style={styles.ctaBannerTitle}>
                Ready to Work with <em style={styles.ctaBannerEm}>Paleko?</em>
              </h2>
              <p style={styles.ctaBannerSub}>
                Get a free no-obligation quote today. Our team responds within 24 hours.
              </p>
            </div>
            <a href="/#contact" className="about-cta-btn" style={styles.ctaBannerBtn}>
              Get a Free Quote
              <svg viewBox="0 0 14 14" fill="none" style={{width:'14px',height:'14px'}}>
                <path d="M2 7h10M8 4l3 3-3 3" stroke="#1C5FAD" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </>
  )
}