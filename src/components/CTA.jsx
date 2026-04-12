import useReveal from '../hooks/useReveal'

const CONTACT = [
  {
    label: 'Call Us',
    value: '+27 63 753 5488',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" style={{width:'16px',height:'16px'}}>
        <path d="M3 2.5h2.5l1 2.5L5 6.5a9 9 0 0 0 4.5 4.5l1.5-1.5 2.5 1V13A10.5 10.5 0 0 1 3 2.5z" stroke="#2A9D5C" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    label: 'Email Us',
    value: 'info@palekoholdings.co.za',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" style={{width:'16px',height:'16px'}}>
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#2A9D5C" strokeWidth="1.2" />
        <path d="M2 5l6 5 6-5" stroke="#2A9D5C" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Gauteng, South Africa',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" style={{width:'16px',height:'16px'}}>
        <path d="M8 2C5.24 2 3 4.24 3 7c0 4 5 8 5 8s5-4 5-8c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" stroke="#2A9D5C" strokeWidth="1.2" fill="none" />
      </svg>
    ),
  },
  {
    label: 'Working Hours',
    value: 'Mon – Sat, 07:00 – 18:00',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" style={{width:'16px',height:'16px'}}>
        <circle cx="8" cy="8" r="5.5" stroke="#2A9D5C" strokeWidth="1.2" />
        <path d="M8 5v3.5l2 2" stroke="#2A9D5C" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
]

const SERVICE_OPTIONS = [
  'Solar Installation',
  'Electrical Services & COC',
  'Power Tool Repairs',
  'Vegetation Services',
  'Other / Not Sure',
]

export default function CTA() {
  const ref = useReveal()

  return (
    <section
      id="contact"
      ref={ref}
      className="cta-outer"
      style={{position:'relative',overflow:'hidden',padding:'80px 56px',background:'#0D1F0F'}}
    >
      <img
        src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1400&q=80&fit=crop"
        alt=""
        aria-hidden="true"
        style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.07,filter:'grayscale(100%)',pointerEvents:'none'}}
      />
      <div style={{position:'absolute',left:0,top:0,bottom:0,width:'3px',background:'linear-gradient(to bottom, transparent, #2A9D5C, transparent)'}} />
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(to right, transparent, rgba(42,157,92,0.4), transparent)'}} />

      <div className="cta-section" style={{position:'relative',zIndex:1}}>

        <div className="reveal">
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px'}}>
            <span style={{width:'24px',height:'1px',background:'#2A9D5C',display:'block'}} />
            <span style={{fontSize:'10px',fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',color:'#2A9D5C'}}>
              Get In Touch
            </span>
          </div>
          <h2 style={{fontFamily:"'Playfair Display', serif",fontSize:'34px',fontWeight:700,color:'#fff',lineHeight:1.15,marginBottom:'16px'}}>
            Let's Talk About<br />
            Your <em style={{fontStyle:'italic',color:'#6FD4A0'}}>Next Project.</em>
          </h2>
          <p style={{fontSize:'12px',color:'rgba(255,255,255,0.4)',lineHeight:1.85,fontWeight:300,marginBottom:'36px',maxWidth:'340px'}}>
            Whether it's a residential rewire, a solar installation, power tool
            repair or clearing your grounds — our team responds fast, works clean
            and delivers right the first time.
          </p>
          <div style={{display:'flex',flexDirection:'column'}}>
            {CONTACT.map(({label, value, icon}) => (
              <div key={label} className="cta-contact-item">
                <div className="cta-icon-wrap">{icon}</div>
                <div>
                  <p style={{fontSize:'9px',fontWeight:600,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:'3px'}}>
                    {label}
                  </p>
                  <p style={{fontSize:'13px',color:'#fff',fontWeight:400,margin:0}}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal reveal-delay-2" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'16px',padding:'32px'}}>
          <h3 style={{fontFamily:"'Playfair Display', serif",fontSize:'20px',color:'#fff',fontWeight:700,marginBottom:'6px'}}>
            Request a Free Quote
          </h3>
          <p style={{fontSize:'11px',color:'rgba(255,255,255,0.35)',marginBottom:'24px',lineHeight:1.6}}>
            No obligation. We'll get back to you within 24 hours.
          </p>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'12px'}}>
            {['First Name', 'Last Name'].map(label => (
              <div key={label}>
                <p style={{fontSize:'10px',fontWeight:500,letterSpacing:'0.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.35)',marginBottom:'6px'}}>
                  {label}
                </p>
                <input type="text" placeholder={label === 'First Name' ? 'Thabo' : 'Nkosi'} className="cta-input" />
              </div>
            ))}
          </div>

          <div style={{marginBottom:'12px'}}>
            <p style={{fontSize:'10px',fontWeight:500,letterSpacing:'0.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.35)',marginBottom:'6px'}}>Phone Number</p>
            <input type="tel" placeholder="+27 63 753 5488" className="cta-input" />
          </div>

          <div style={{marginBottom:'12px'}}>
            <p style={{fontSize:'10px',fontWeight:500,letterSpacing:'0.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.35)',marginBottom:'6px'}}>Service Required</p>
            <select className="cta-select">
              <option value="">Select a service...</option>
              {SERVICE_OPTIONS.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div style={{marginBottom:'20px'}}>
            <p style={{fontSize:'10px',fontWeight:500,letterSpacing:'0.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.35)',marginBottom:'6px'}}>Message (optional)</p>
            <input type="text" placeholder="Brief description of what you need..." className="cta-input" />
          </div>

          <button className="cta-submit">
            <span style={{fontSize:'13px',fontWeight:600,color:'#fff',letterSpacing:'0.2px'}}>Send My Request</span>
            <span style={{width:'32px',height:'32px',borderRadius:'8px',background:'rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg viewBox="0 0 14 14" fill="none" style={{width:'14px',height:'14px'}}>
                <path d="M2 7h10M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          <p style={{fontSize:'10px',color:'rgba(255,255,255,0.2)',textAlign:'center',marginTop:'14px',lineHeight:1.5}}>
            Your details are private and will never be shared with third parties.
          </p>
        </div>

      </div>
    </section>
  )
}