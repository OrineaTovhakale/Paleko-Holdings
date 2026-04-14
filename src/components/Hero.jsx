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
      const { width, height } = el.getBoundingClientRect()
      const x = (e.clientX / width - 0.5) * 14
      const y = (e.clientY / height - 0.5) * 8
      parallax.style.transform = `translate(${x}px, ${y}px)`
    }
    const onLeave = () => { parallax.style.transform = 'translate(0px, 0px)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className={loaded ? 'hero-loaded' : ''}
      style={{position:'relative',height:'100svh',maxHeight:'680px',minHeight:'500px',overflow:'hidden',background:'#1A1A1A'}}
    >
      <div className="hero-parallax" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
        {IMAGES.map((img, index) => (
          <div
            key={index}
            style={{
              position:'absolute',inset:0,
              opacity: index === current ? 1 : 0,
              transition:'opacity 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: index === current ? 1 : 0,
            }}
          >
            <img
              src={img}
              alt="Paleko Holdings"
              style={{
                width:'100%',height:'100%',objectFit:'cover',opacity:0.72,
                transform: index === current ? 'scale(1.04)' : 'scale(1)',
                transition:'transform 6s ease-out',
              }}
            />
          </div>
        ))}
      </div>

      <div style={{position:'absolute',inset:0,zIndex:2,background:'linear-gradient(105deg, rgba(10,20,40,0.78) 0%, rgba(10,20,40,0.4) 55%, rgba(10,20,40,0.05) 100%)'}} />

      <div
        className="hero-content-pad"
        style={{position:'relative',zIndex:10,height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 56px',maxWidth:'640px'}}
      >
        <div className="hero-line-1" style={{marginBottom:'16px'}}>
          <h1 className="hero-title-responsive" style={{fontFamily:"'Playfair Display', serif",fontSize:'48px',fontWeight:700,color:'#fff',lineHeight:1.12,margin:0}}>
            Powering Homes.<br />
            Energising{' '}
            <em className="hero-underline" style={{fontStyle:'italic',color:'#6FD4A0'}}>
              Communities.
            </em>
          </h1>
        </div>

        <div className="hero-line-2">
          <p className="hero-sub-responsive" style={{fontSize:'13px',color:'rgba(255,255,255,0.65)',lineHeight:1.8,margin:0,fontWeight:300,maxWidth:'440px'}}>
            From electrical installations and COC certifications to solar energy,
            power tool repairs and professional vegetation services — we deliver
            quality that lasts.
          </p>
        </div>

        <div className="hero-line-3" style={{marginTop:'28px',display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
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

      <div className="hero-line-4" style={{position:'absolute',bottom:'24px',left:'56px',display:'flex',alignItems:'center',gap:'8px',zIndex:10}}>
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
  )
}