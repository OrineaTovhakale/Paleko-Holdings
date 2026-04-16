import { useState, useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const BENEFITS = [
  { title: 'Reduce Electricity Bills', body: 'Generate your own energy and dramatically cut your monthly electricity costs — saving thousands per year.' },
  { title: 'Reduce Carbon Footprint', body: 'Solar energy is clean and renewable. Every system we install helps South Africa move toward a greener future.' },
  { title: 'Energy Independence', body: 'With battery backup, keep your home or business running even during load shedding and power outages.' },
  { title: 'Increase Property Value', body: 'A solar installation is a long-term investment that adds measurable value to your residential or commercial property.' },
  { title: 'Low Maintenance', body: 'Solar panels require very little maintenance. Once installed, they quietly produce energy for 25+ years.' },
  { title: 'Full Warranty Coverage', body: 'All our installations come with a minimum 7-year warranty. Our team is always available for support.' },
]

const PROCESS = [
  { num: '01', title: 'Site Assessment', body: 'We visit your property to assess your energy needs, roof type and ideal system size.' },
  { num: '02', title: 'Custom Design', body: 'Our team designs a solar system tailored to your specific consumption and budget.' },
  { num: '03', title: 'Professional Install', body: 'Certified installers fit your panels, inverter and battery with zero disruption to your property.' },
  { num: '04', title: 'Commission & Support', body: 'We commission the full system, walk you through operation and provide ongoing support.' },
]

const BADGES = ['Grid-Tied Systems', 'Off-Grid Systems', 'Hybrid Systems', 'Battery Backup', 'Residential & Commercial']

export default function SolarInstallation() {
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef(null)
  const sectionRef = useReveal()
  const section2Ref = useReveal()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const parallax = el.querySelector('.solar-parallax')
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

  const heroClass = loaded ? 'solar-loaded' : ''

  return (
    <>
      <style>{`
        .solar-parallax { transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .solar-hero-line-1 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s; }
        .solar-hero-line-2 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.25s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s; }
        .solar-hero-line-3 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s; }
        .solar-hero-line-4 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.55s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s; }
        .solar-loaded .solar-hero-line-1,
        .solar-loaded .solar-hero-line-2,
        .solar-loaded .solar-hero-line-3,
        .solar-loaded .solar-hero-line-4 { opacity: 1; transform: translateY(0); }
        .solar-underline { position: relative; display: inline-block; }
        .solar-underline::after { content: ''; position: absolute; bottom: -4px; left: 0; height: 2px; width: 0; background: #FAC775; border-radius: 2px; transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s; }
        .solar-loaded .solar-underline::after { width: 100%; }
        .solar-benefit-card { transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .solar-benefit-card:hover { border-color: #FAC775 !important; transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.07); }
        .solar-img-hover { overflow: hidden; border-radius: 16px; }
        .solar-img-hover img { transition: transform 0.6s ease; display: block; width: 100%; }
        .solar-img-hover:hover img { transform: scale(1.03); }
        .solar-strip-wrap { overflow: hidden; border-radius: 12px; }
        .solar-strip-wrap img { transition: transform 0.6s ease; display: block; width: 100%; }
        .solar-strip-wrap:hover img { transform: scale(1.04); }
        .solar-cta-btn:hover { transform: translateY(-2px); }
      `}</style>

      <div style={{background:'#F8F7F4',minHeight:'100vh'}}>

        <div ref={heroRef} className={heroClass} style={{position:'relative',height:'520px',overflow:'hidden',background:'#1A1A1A'}}>
          <div className="solar-parallax" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
            <img src="https://kimchiandkraut.net/wp-content/uploads/2021/01/solar-panels.jpg?w=1024" alt="Solar panels" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.5}} />
          </div>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(105deg, rgba(10,20,40,0.88) 0%, rgba(10,20,40,0.5) 55%, rgba(10,20,40,0.1) 100%)'}} />
          <div style={{position:'relative',zIndex:10,height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:'clamp(32px,6vw,80px) clamp(24px,5vw,56px)',maxWidth:'680px'}}>
            <p className="solar-hero-line-1" style={{fontSize:'10px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#EF9F27',marginBottom:'14px',display:'flex',alignItems:'center',gap:'10px'}}>
              <span style={{width:'24px',height:'1px',background:'#EF9F27',display:'block'}} />
              Solar Installation
            </p>
            <h1 className="solar-hero-line-2" style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(28px,5vw,48px)',fontWeight:700,color:'#fff',lineHeight:1.12,marginBottom:'16px'}}>
              Switch to Solar.<br />
              <em className="solar-underline" style={{fontStyle:'italic',color:'#FAC775'}}>Save More. Live Better.</em>
            </h1>
            <p className="solar-hero-line-3" style={{fontSize:'clamp(12px,2vw,13px)',color:'rgba(255,255,255,0.6)',lineHeight:1.8,fontWeight:300,maxWidth:'480px',marginBottom:'24px'}}>
              Reduce your carbon footprint and save on electricity costs with a professionally installed solar system. From assessment to commissioning — we handle everything.
            </p>
            <div className="solar-hero-line-4 badges-wrap">
              {BADGES.map(function(b, i) {
                return (
                  <span key={i} style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'20px',padding:'6px 14px',fontSize:'11px',color:'rgba(255,255,255,0.7)',fontWeight:400}}>
                    <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#EF9F27',flexShrink:0}} />{b}
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        <div ref={sectionRef} className="page-section">
          <div className="page-split">
            <div className="reveal">
              <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:'#B07A18',marginBottom:'10px'}}>Why Go Solar</p>
              <h2 style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(22px,3vw,34px)',fontWeight:700,color:'#1A1A1A',lineHeight:1.2,marginBottom:'16px'}}>
                Harness the Power of <em style={{fontStyle:'italic',color:'#B07A18'}}>Renewable Energy</em>
              </h2>
              <p style={{fontSize:'13px',color:'#666',lineHeight:1.9,fontWeight:300,marginBottom:'16px'}}>
                Paleko Holdings is a trusted provider of solar power installation services, helping clients harness the power of renewable energy to reduce their carbon footprint and save on electricity costs.
              </p>
              <p style={{fontSize:'13px',color:'#666',lineHeight:1.9,fontWeight:300,marginBottom:'16px'}}>
                Whether you need a grid-tied system, a hybrid solution with battery backup, or a fully off-grid setup — our team of experts will help you design and install the right system for your home or business.
              </p>
            </div>
            <div className="reveal reveal-delay-2 solar-img-hover">
              <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80&fit=crop" alt="Solar panel installation" className="img-main-responsive" />
            </div>
          </div>

          <div className="reveal">
            <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:'#B07A18',marginBottom:'10px'}}>Benefits</p>
            <h2 style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(22px,3vw,34px)',fontWeight:700,color:'#1A1A1A',lineHeight:1.2,marginBottom:'16px'}}>
              Why Solar is the <em style={{fontStyle:'italic',color:'#B07A18'}}>Smart Choice</em>
            </h2>
            <p style={{fontSize:'13px',color:'#666',lineHeight:1.9,fontWeight:300,marginBottom:'32px'}}>
              Going solar is one of the best long-term investments you can make for your home or business.
            </p>
          </div>
          <div className="cards-3-grid">
            {BENEFITS.map(function(b, i) {
              return (
                <div key={i} className="solar-benefit-card reveal" style={{background:'#fff',border:'1px solid #E0DBD5',borderRadius:'14px',padding:'28px',display:'flex',flexDirection:'column',gap:'12px'}}>
                  <div style={{width:'40px',height:'40px',borderRadius:'10px',background:'#FFF8E6',border:'1px solid #FAC775',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <svg viewBox="0 0 20 20" fill="none" style={{width:'18px',height:'18px'}}>
                      <circle cx="10" cy="10" r="4" stroke="#B07A18" strokeWidth="1.4"/>
                      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="#B07A18" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 style={{fontFamily:'Playfair Display, serif',fontSize:'15px',fontWeight:700,color:'#1A1A1A',lineHeight:1.3}}>{b.title}</h3>
                  <p style={{fontSize:'12px',color:'#888',lineHeight:1.65,fontWeight:300}}>{b.body}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div ref={section2Ref} className="page-section-sm">
          <div className="strip-grid reveal">
            <div className="solar-strip-wrap">
              <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80&fit=crop" alt="Solar panels on roof" className="strip-img-fixed" />
            </div>
            <div className="solar-strip-wrap">
              <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80&fit=crop" alt="Solar field" className="strip-img-fixed" />
            </div>
            <div className="solar-strip-wrap">
              <img src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?w=600&q=80&fit=crop" alt="Solar installation team" className="strip-img-fixed" />
            </div>
          </div>

          <div className="reveal" style={{background:'#1A1A1A',borderRadius:'20px',padding:'clamp(32px,5vw,56px)',marginBottom:'56px',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',left:0,top:0,bottom:0,width:'3px',background:'linear-gradient(to bottom, transparent, #EF9F27, transparent)'}} />
            <h2 style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(22px,3vw,28px)',fontWeight:700,color:'#fff',lineHeight:1.2,marginBottom:'8px'}}>
              Our Installation <em style={{fontStyle:'italic',color:'#FAC775'}}>Process</em>
            </h2>
            <p style={{fontSize:'13px',color:'rgba(255,255,255,0.4)',fontWeight:300,marginBottom:'40px'}}>
              From first call to final commission — here is how we work.
            </p>
            <div className="process-4-grid">
              {PROCESS.map(function(p, i) {
                return (
                  <div key={i} style={{padding:'20px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px'}}>
                    <p style={{fontFamily:'Playfair Display, serif',fontSize:'28px',fontWeight:700,color:'#EF9F27',marginBottom:'8px'}}>{p.num}</p>
                    <p style={{fontSize:'12px',fontWeight:600,color:'#fff',marginBottom:'6px'}}>{p.title}</p>
                    <p style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',lineHeight:1.6,fontWeight:300}}>{p.body}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="reveal cta-banner-flex" style={{background:'#B07A18'}}>
            <div>
              <h2 style={{fontFamily:'Playfair Display, serif',fontSize:'clamp(22px,3vw,28px)',fontWeight:700,color:'#fff',lineHeight:1.2,marginBottom:'8px'}}>
                Ready to Go <em style={{fontStyle:'italic',color:'#FFF8E6'}}>Solar?</em>
              </h2>
              <p style={{fontSize:'13px',color:'rgba(255,255,255,0.7)',fontWeight:300,maxWidth:'400px'}}>
                Get a free no-obligation solar assessment today. Our team responds within 24 hours.
              </p>
            </div>
            <a href="/contact" className="solar-cta-btn" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#fff',color:'#B07A18',fontSize:'13px',fontWeight:600,padding:'14px 28px',borderRadius:'10px',textDecoration:'none',flexShrink:0}}>
              Get a Free Quote
              <svg viewBox="0 0 14 14" fill="none" style={{width:'14px',height:'14px'}}>
                <path d="M2 7h10M8 4l3 3-3 3" stroke="#B07A18" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </>
  )
}