import { useState, useEffect, useRef } from 'react'

const IMAGES = [
  'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=80&fit=crop',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=80&fit=crop',
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % IMAGES.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const parallax = el.querySelector('.hero-parallax')
    const onMove = (e) => {
      const { clientX, clientY } = e
      const { width, height } = el.getBoundingClientRect()
      const x = (clientX / width - 0.5) * 14
      const y = (clientY / height - 0.5) * 8
      parallax.style.transform = `translate(${x}px, ${y}px)`
    }
    const onLeave = () => {
      parallax.style.transform = 'translate(0px, 0px)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <style>{`
        .hero-parallax {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-underline {
          position: relative;
          display: inline-block;
        }
        .hero-underline::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          height: 2px;
          width: 0;
          background: #2A9D5C;
          border-radius: 2px;
          transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s;
        }
        .hero-loaded .hero-underline::after { width: 100%; }

        .hero-line-1 {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s;
        }
        .hero-line-2 {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s;
        }
        .hero-line-3 {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.6s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s;
        }
        .hero-line-4 {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.75s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.75s;
        }
        .hero-loaded .hero-line-1,
        .hero-loaded .hero-line-2,
        .hero-loaded .hero-line-3,
        .hero-loaded .hero-line-4 {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #2A9D5C;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 13px 24px;
          border-radius: 8px;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease;
        }
        .hero-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.12);
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-btn-primary:hover::before { transform: translateX(0); }
        .hero-btn-primary:hover { transform: translateY(-2px); }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #fff;
          font-size: 12px;
          font-weight: 400;
          padding: 12px 22px;
          border-radius: 8px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.25);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .hero-btn-secondary:hover {
          border-color: rgba(255,255,255,0.6);
          transform: translateY(-2px);
        }

        .hero-dot {
          height: 6px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.3);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-dot.active {
          background: #2A9D5C;
          width: 28px !important;
        }
      `}</style>

      <section
        ref={heroRef}
        className={loaded ? 'hero-loaded' : ''}
        style={{position:'relative',height:'100vh',maxHeight:'680px',overflow:'hidden',background:'#1A1A1A'}}
      >
        {/* Images — object-contain so full image is visible */}
        <div className="hero-parallax" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
          {IMAGES.map((img, index) => (
            <div
              key={index}
              style={{
                position:'absolute',
                inset:0,
                opacity: index === current ? 1 : 0,
                transition:'opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: index === current ? 1 : 0,
              }}
            >
              <img
                src={img}
                alt="Paleko Holdings"
                style={{
                  width:'100%',
                  height:'100%',
                  objectFit:'cover',
                  objectPosition:'center top',
                  opacity:0.72,
                  transform: index === current ? 'scale(1.04)' : 'scale(1)',
                  transition:'transform 6s ease-out',
                }}
              />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div style={{
          position:'absolute',
          inset:0,
          zIndex:2,
          background:'linear-gradient(105deg, rgba(10,20,40,0.78) 0%, rgba(10,20,40,0.4) 55%, rgba(10,20,40,0.05) 100%)',
        }} />

        {/* Content */}
        <div style={{position:'relative',zIndex:10,height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 56px',maxWidth:'640px'}}>

          <div className="hero-line-1" style={{marginBottom:'16px'}}>
            <h1 style={{fontFamily:"'Playfair Display', serif",fontSize:'48px',fontWeight:700,color:'#fff',lineHeight:1.12,margin:0}}>
              Powering Homes.<br />
              Energising{' '}
              <em className="hero-underline" style={{fontStyle:'italic',color:'#6FD4A0'}}>
                Communities.
              </em>
            </h1>
          </div>

          <div className="hero-line-2">
            <p style={{fontSize:'13px',color:'rgba(255,255,255,0.65)',lineHeight:1.8,margin:0,fontWeight:300,maxWidth:'440px'}}>
              From electrical installations and COC certifications to solar energy,
              power tool repairs and professional vegetation services — we deliver
              quality that lasts.
            </p>
          </div>

          <div className="hero-line-3" style={{marginTop:'32px',display:'flex',alignItems:'center',gap:'12px'}}>
            <a href="#services" className="hero-btn-primary">
              Explore Our Services
              <svg viewBox="0 0 14 14" fill="none" style={{width:'14px',height:'14px'}}>
                <path d="M2 7h10M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#about-us" className="hero-btn-secondary">
              Our Story
              <svg viewBox="0 0 12 12" fill="none" style={{width:'12px',height:'12px',opacity:0.6}}>
                <path d="M2 6h8M7 3l3 3-3 3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>

        {/* Dots */}
        <div className="hero-line-4" style={{position:'absolute',bottom:'32px',left:'56px',display:'flex',alignItems:'center',gap:'8px',zIndex:10}}>
          {IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`hero-dot ${index === current ? 'active' : ''}`}
              style={{width: index === current ? '28px' : '6px'}}
            />
          ))}
        </div>

      </section>
    </>
  )
}