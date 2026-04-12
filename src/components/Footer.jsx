import useReveal from '../hooks/useReveal'

const SERVICE_LINKS = [
  'Solar Installation',
  'Electrical Services',
  'Power Tool Repairs',
  'Vegetation Services',
  'COC Certificates',
]

const COMPANY_LINKS = [
  'About Us',
  'Our Vision',
  'Our Values',
  'Careers',
  'Contact',
]

export default function Footer() {
  const ref = useReveal()

  return (
    <footer ref={ref} className="footer-outer" style={{background:'#1A1A1A',padding:'48px 56px 24px'}}>
      <div className="footer-grid reveal">

        <div>
          <img
            src="/src/logo.png"
            alt="Paleko Holdings"
            style={{height:'36px',width:'auto',objectFit:'contain',marginBottom:'14px',filter:'brightness(0) invert(1)',opacity:0.9}}
          />
          <p style={{fontSize:'11px',color:'#666',lineHeight:1.75,marginBottom:'16px',fontWeight:300}}>
            A safety-conscious, quality-driven service company empowering South
            African communities through skilled work and dedication.
          </p>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            {['COC Certified', 'Reg PCO', 'SANS 10142'].map(b => (
              <span key={b} style={{background:'#242424',border:'1px solid #2A2A2A',borderRadius:'6px',padding:'6px 10px',fontSize:'9px',color:'#666'}}>
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="reveal reveal-delay-1">
          <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'1px',textTransform:'uppercase',color:'#444',marginBottom:'14px'}}>Services</p>
          <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:'10px'}}>
            {SERVICE_LINKS.map(l => (
              <li key={l}><a href="#services" className="footer-link">{l}</a></li>
            ))}
          </ul>
        </div>

        <div className="reveal reveal-delay-2">
          <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'1px',textTransform:'uppercase',color:'#444',marginBottom:'14px'}}>Company</p>
          <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:'10px'}}>
            {COMPANY_LINKS.map(l => (
              <li key={l}><a href="#" className="footer-link">{l}</a></li>
            ))}
          </ul>
        </div>

        <div className="reveal reveal-delay-3">
          <p style={{fontSize:'10px',fontWeight:600,letterSpacing:'1px',textTransform:'uppercase',color:'#444',marginBottom:'14px'}}>Get In Touch</p>
          {[
            { text: 'Gauteng, South Africa', icon: <path d="M7 1C4.24 1 2 3.24 2 6c0 3.5 5 8 5 8s5-4.5 5-8c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 7 4a1.5 1.5 0 0 1 0 3z" fill="white" /> },
            { text: 'info@palekoholdings.co.za', icon: <><rect x="2" y="3" width="10" height="8" rx="1" stroke="white" strokeWidth="1" fill="none" /><path d="M2 4l5 4 5-4" stroke="white" strokeWidth="1" fill="none" /></> },
            { text: '+27 63 753 5488', icon: <path d="M3 2h2.5l1 2.5L5 6a7 7 0 0 0 3.5 3.5L10 8l2.5 1V11A9 9 0 0 1 3 2z" stroke="white" strokeWidth="1" fill="none" /> },
          ].map(({ text, icon }) => (
            <div key={text} style={{display:'flex',alignItems:'flex-start',gap:'8px',marginBottom:'10px'}}>
              <svg style={{width:'13px',height:'13px',flexShrink:0,opacity:0.4,marginTop:'1px'}} viewBox="0 0 14 14" fill="none">{icon}</svg>
              <span style={{fontSize:'11px',color:'#666',lineHeight:1.5}}>{text}</span>
            </div>
          ))}
        </div>

      </div>

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:'20px',flexWrap:'wrap',gap:'12px'}}>
        <p style={{fontSize:'10px',color:'#444',margin:0}}>&copy; 2025 Lift Media Solutions — All rights reserved</p>
        <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'10px',color:'#444'}}>
          <div style={{display:'flex',gap:'2px'}}>
            {['#007A4D','#FFB612','#DE3831','#002395','#fff'].map(c => (
              <span key={c} style={{display:'block',width:'8px',height:'5px',borderRadius:'1px',background:c}} />
            ))}
          </div>
          Proudly South African
        </div>
      </div>
    </footer>
  )
}