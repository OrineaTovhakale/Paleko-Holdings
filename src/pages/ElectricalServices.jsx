import { useState, useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

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
        .elec-strip-wrap { overflow: hidden; border-radius: 12px; }
        .elec-strip-wrap img { transition: transform 0.6s ease; display: block; width: 100%; }
        .elec-strip-wrap:hover img { transform: scale(1.04); }
        .elec-cta-btn:hover { transform: translateY(-2px); }
      `}</style>

      <div style={{background:'#F8F7F4',minHeight:'100vh'}}>

        <div ref={heroRef} className={heroClass} style={{position:'relative',height:'480px',overflow:'hidden',background:'#F0EEE9'}}>
          <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1400&q=80&fit=crop" alt="Electrical meter box" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.18}} />
          <div style={{position:'relative',zIndex:10,height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:'clamp(32px,6vw,80px) clamp(24px,5vw,56px)',maxWidth:'720px'}}>
            <p className="elec-hero-line-1" style={{fontSize:'10px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#2A9D5C',marginBottom:'14px',display:'flex',alignItems:'center',gap:'10px'}}>
              <span style={{width:'24px',height:'1px',background:'#2A9D5C',display:'block'}} />
              Electrical Services
            </p>
            <h1 className="elec-hero-line-2" style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(28px,5vw,52px)',fontWeight:700,color:'#1A1A1A',lineHeight:1.1,marginBottom:'18px'}}>
              Reliable Electrical Services<br />
              <em className="elec-underline" style={{fontStyle:'italic',color:'#1C5FAD'}}>You Can Count On.</em>
            </h1>
            <p className="elec-hero-line-3" style={{fontSize:'clamp(12px,2vw,14px)',color:'#666',lineHeight:1.8,fontWeight:300,maxWidth:'520px',marginBottom:'24px'}}>
              At Paleko Holdings, we pride ourselves on providing top-notch electrical services. Our certified electricians ensure your electrical needs are met with professionalism and efficiency.
            </p>
            <div className="elec-hero-line-4 badges-wrap">
              {BADGES.map(function(b, i) {
                return (
                  <span key={i} className="elec-badge" style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#fff',border:'1px solid #E0DBD5',borderRadius:'20px',padding:'6px 14px',fontSize:'11px',color:'#444',fontWeight:400}}>
                    <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#2A9D5C',flexShrink:0}} />{b}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        <div ref={sectionRef} className="page-section">
          <div className="page-split">
            <div className="reveal">
              <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:'#2A9D5C',marginBottom:'10px'}}>Our Approach</p>
              <h2 style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(22px,3vw,34px)',fontWeight:700,color:'#1A1A1A',lineHeight:1.2,marginBottom:'16px'}}>
                Professional Electrical Work,<br />
                <em style={{fontStyle:'italic',color:'#1C5FAD'}}>Done Right.</em>
              </h2>
              <p style={{fontSize:'13px',color:'#666',lineHeight:1.9,fontWeight:300,marginBottom:'16px'}}>
                At Paleko Holdings, we pride ourselves on providing top-notch electrical services. Our team of experienced electricians is dedicated to ensuring that your electrical needs are met with the utmost professionalism and efficiency.
              </p>
              <p style={{fontSize:'13px',color:'#666',lineHeight:1.9,fontWeight:300,marginBottom:'16px'}}>
                Whether you need routine maintenance, repairs, or installations, we have the expertise to get the job done right. Contact us today to schedule an appointment.
              </p>
            </div>
            <div className="reveal reveal-delay-2 elec-img-hover">
              <img src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=700&q=80&fit=crop" alt="Electrician working" className="img-main-responsive" />
            </div>
          </div>

          <div className="reveal">
            <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:'#2A9D5C',marginBottom:'10px'}}>What We Do</p>
            <h2 style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(22px,3vw,34px)',fontWeight:700,color:'#1A1A1A',lineHeight:1.2,marginBottom:'16px'}}>
              Our Electrical <em style={{fontStyle:'italic',color:'#1C5FAD'}}>Services</em>
            </h2>
            <p style={{fontSize:'13px',color:'#666',lineHeight:1.9,fontWeight:300,marginBottom:'32px'}}>
              From minor repairs to major commercial installations — we cover every aspect of electrical work.
            </p>
          </div>
          <div className="cards-3-grid">
            {SERVICES.map(function(svc, i) {
              return (
                <div key={i} className="elec-service-card reveal" style={{background:'#fff',border:'1px solid #E0DBD5',borderRadius:'14px',padding:'28px',display:'flex',flexDirection:'column',gap:'12px'}}>
                  <div style={{width:'40px',height:'40px',borderRadius:'10px',background:'#EDF4FF',border:'1px solid #C8D8EE',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <svg viewBox="0 0 20 20" fill="none" style={{width:'18px',height:'18px'}}>
                      <path d="M10 3v5l3 2-3 2v5M7 8h6" stroke="#1C5FAD" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 style={{fontFamily:'Playfair Display, serif',fontSize:'15px',fontWeight:700,color:'#1A1A1A',lineHeight:1.3}}>{svc.title}</h3>
                  <p style={{fontSize:'12px',color:'#888',lineHeight:1.65,fontWeight:300}}>{svc.body}</p>
                </div>
              )
            })}
          </div>

          <div className="reveal">
            <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:'#2A9D5C',marginBottom:'10px'}}>Why Choose Us</p>
            <h2 style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(22px,3vw,34px)',fontWeight:700,color:'#1A1A1A',lineHeight:1.2,marginBottom:'32px'}}>
              What Sets Us <em style={{fontStyle:'italic',color:'#1C5FAD'}}>Apart</em>
            </h2>
          </div>
          <div className="cards-2-grid">
            {WHY.map(function(w, i) {
              return (
                <div key={i} className="elec-why-item reveal" style={{display:'flex',alignItems:'flex-start',gap:'14px',padding:'20px',background:'#fff',border:'1px solid #E0DBD5',borderRadius:'12px'}}>
                  <span style={{fontFamily:'Playfair Display, serif',fontSize:'24px',fontWeight:700,color:'#E0DBD5',flexShrink:0,lineHeight:1}}>{w.num}</span>
                  <div>
                    <p style={{fontSize:'13px',fontWeight:600,color:'#1A1A1A',marginBottom:'4px'}}>{w.title}</p>
                    <p style={{fontSize:'12px',color:'#888',lineHeight:1.6,fontWeight:300}}>{w.body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div ref={section2Ref} className="page-section-sm">
          <div className="strip-grid reveal">
            <div className="elec-strip-wrap">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop" alt="Electrical panel" className="strip-img-fixed" />
            </div>
            <div className="elec-strip-wrap">
              <img src="https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=600&q=80&fit=crop" alt="Circuit breaker" className="strip-img-fixed" />
            </div>
            <div className="elec-strip-wrap">
              <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80&fit=crop" alt="Electrician at work" className="strip-img-fixed" />
            </div>
          </div>
        </div>

        <div ref={section3Ref} className="page-section-sm">
          <div className="reveal dark-block-grid" style={{background:'#1A1A1A',borderRadius:'20px',padding:'clamp(32px,5vw,56px)',marginBottom:'56px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',left:0,top:0,bottom:0,width:'3px',background:'linear-gradient(to bottom, transparent, #1C5FAD, transparent)'}} />
            <div>
              <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#85B7EB',marginBottom:'14px',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{width:'24px',height:'1px',background:'#85B7EB',display:'block'}} />
                Certificate of Compliance
              </p>
              <h2 style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(20px,3vw,28px)',fontWeight:700,color:'#fff',lineHeight:1.2,marginBottom:'14px'}}>
                What is a <em style={{fontStyle:'italic',color:'#85B7EB'}}>COC</em> and Why Do You Need One?
              </h2>
              <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',lineHeight:1.85,fontWeight:300,marginBottom:'24px'}}>
                A Certificate of Compliance is a legally required document confirming that your electrical installation meets SANS 10142. It is required when selling a property, completing new electrical work, or for insurance purposes.
              </p>
              <a href="/contact" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#1C5FAD',color:'#fff',fontSize:'12px',fontWeight:600,padding:'13px 24px',borderRadius:'8px',textDecoration:'none'}}>
                Request a COC Inspection
                <svg viewBox="0 0 14 14" fill="none" style={{width:'13px',height:'13px'}}>
                  <path d="M2 7h10M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {COC_STEPS.map(function(step, i) {
                return (
                  <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'14px',padding:'18px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'10px'}}>
                    <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'rgba(28,95,173,0.3)',border:'1px solid rgba(28,95,173,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:600,color:'#85B7EB',flexShrink:0}}>{i + 1}</div>
                    <div>
                      <p style={{fontSize:'12px',fontWeight:500,color:'#fff',marginBottom:'2px'}}>{step.title}</p>
                      <p style={{fontSize:'12px',color:'rgba(255,255,255,0.6)',lineHeight:1.6,fontWeight:300}}>{step.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="reveal cta-banner-flex" style={{background:'#1C5FAD'}}>
            <div>
              <h2 style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(22px,3vw,28px)',fontWeight:700,color:'#fff',lineHeight:1.2,marginBottom:'8px'}}>
                Need an <em style={{fontStyle:'italic',color:'#A8DFBF'}}>Electrician?</em>
              </h2>
              <p style={{fontSize:'13px',color:'rgba(255,255,255,0.6)',fontWeight:300,maxWidth:'400px'}}>
                Get a free no-obligation quote today. Our team responds within 24 hours.
              </p>
            </div>
            <a href="/contact" className="elec-cta-btn" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#fff',color:'#1C5FAD',fontSize:'13px',fontWeight:600,padding:'14px 28px',borderRadius:'10px',textDecoration:'none',flexShrink:0}}>
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