import useReveal from '../hooks/useReveal'

const VALUES = [
  'Integrity & Honesty',
  'Team Work',
  'Customer Satisfaction',
  'Uncompromised Safety',
  'High Quality Standards',
  'First-time right mindset',
]

export default function About() {
  const ref = useReveal()

  return (
    <section id="about-us" ref={ref} className="about-section">

      <div style={{position:'relative',overflow:'hidden',background:'#1A2E4A',minHeight:'320px'}}>
        <img
          src="https://images.pexels.com/photos/4792480/pexels-photo-4792480.jpeg?auto=compress&cs=tinysrgb&w=900"
          alt="Paleko Holdings team at work"
          style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.7}}
          loading="lazy"
        />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg, rgba(28,95,173,0.6) 0%, rgba(10,30,50,0.4) 100%)'}} />
        <div style={{position:'absolute',bottom:'28px',left:'28px',right:'28px'}}>
          <p style={{fontFamily:"'Playfair Display', serif",fontSize:'15px',fontStyle:'italic',color:'rgba(255,255,255,0.9)',lineHeight:1.5,marginBottom:'10px'}}>
            "Doing the job right the first time — every time."
          </p>
          <p style={{fontSize:'10px',color:'rgba(255,255,255,0.45)',letterSpacing:'0.5px',textTransform:'uppercase'}}>
            Paleko Holdings — Core Principle
          </p>
        </div>
      </div>

      <div style={{background:'#F8F7F4',padding:'56px 48px'}}>
        <div className="reveal">
          <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',color:'#2A9D5C',marginBottom:'10px'}}>
            About Paleko Holdings
          </p>
          <h2 style={{fontFamily:"'Playfair Display', serif",fontSize:'26px',fontWeight:700,color:'#1A1A1A',lineHeight:1.25,marginBottom:'14px'}}>
            A Company Built on<br />Purpose &amp; Community
          </h2>
        </div>

        <div className="reveal reveal-delay-1">
          <p style={{fontSize:'12px',color:'#666',lineHeight:1.85,marginBottom:'24px',fontWeight:300}}>
            We are a leading electrical and multi-service provider committed to
            the development and empowerment of present and future generations,
            while contributing to the economic growth of South Africa. With highly
            skilled professionals, we serve residential, commercial and industrial
            clients with integrity.
          </p>
        </div>

        <div className="reveal reveal-delay-2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'24px'}}>
          {VALUES.map(v => (
            <div key={v} className="val-item">
              <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'#2A9D5C',flexShrink:0,marginTop:'5px',display:'block'}} />
              {v}
            </div>
          ))}
        </div>

        <div className="reveal reveal-delay-3" style={{background:'#EDF4FF',borderLeft:'3px solid #1C5FAD',borderRadius:'0 8px 8px 0',padding:'16px 18px'}}>
          <p style={{fontSize:'9px',fontWeight:600,letterSpacing:'1px',textTransform:'uppercase',color:'#1C5FAD',marginBottom:'6px'}}>
            Our Mission
          </p>
          <p style={{fontSize:'12px',color:'#2A4070',lineHeight:1.7,margin:0,fontWeight:300}}>
            To offer reliable and safe quality services that reach all stakeholders
            of the community, whilst embracing human development and gender equality.
          </p>
        </div>
      </div>

    </section>
  )
}