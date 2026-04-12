import { useState, useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'
import emailjs from '@emailjs/browser'

const s = {
  page: { background: '#F8F7F4', minHeight: '100vh' },
  heroBg: { background: '#1A1A1A', padding: '80px 56px 72px', position: 'relative', overflow: 'hidden' },
  heroRadial: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(28,95,173,0.15) 0%, transparent 60%)', pointerEvents: 'none' },
  heroInner: { position: 'relative', zIndex: 1, maxWidth: '680px' },
  heroEyebrow: { fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' },
  eyebrowLine: { width: '24px', height: '1px', background: '#2A9D5C', display: 'block' },
  heroTitle: { fontFamily: 'Playfair Display, serif', fontSize: '48px', fontWeight: 700, color: '#fff', lineHeight: 1.12, marginBottom: '16px' },
  heroEm: { fontStyle: 'italic', color: '#6FD4A0' },
  heroSub: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontWeight: 300, maxWidth: '480px' },
  section: { maxWidth: '1100px', margin: '0 auto', padding: '72px 56px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '64px', alignItems: 'start' },
  contactBlocks: { display: 'flex', flexDirection: 'column', gap: '0' },
  contactItem: { display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 0', borderBottom: '1px solid #E0DBD5' },
  contactIconWrap: { width: '44px', height: '44px', borderRadius: '12px', border: '1px solid #E0DBD5', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  contactLabel: { fontSize: '9px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#aaa', marginBottom: '3px' },
  contactValue: { fontSize: '14px', fontWeight: 500, color: '#1A1A1A' },
  hoursBlock: { marginTop: '32px', background: '#fff', border: '1px solid #E0DBD5', borderRadius: '14px', padding: '24px' },
  hoursTitle: { fontSize: '12px', fontWeight: 600, color: '#1A1A1A', marginBottom: '14px' },
  hoursRow: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', padding: '8px 0', borderBottom: '1px solid #F0EEE9' },
  formCard: { background: '#fff', border: '1px solid #E0DBD5', borderRadius: '16px', padding: '36px' },
  formTitle: { fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: '#1A1A1A', marginBottom: '6px' },
  formSub: { fontSize: '12px', color: '#aaa', marginBottom: '28px', fontWeight: 300 },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' },
  fieldLabel: { fontSize: '10px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#888' },
  fieldInput: { background: '#F8F7F4', border: '1px solid #E0DBD5', borderRadius: '8px', padding: '11px 14px', fontSize: '13px', color: '#1A1A1A', fontFamily: 'Inter, sans-serif', outline: 'none', width: '100%', transition: 'border-color 0.2s ease' },
  fieldRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  submitBtn: { width: '100%', background: '#1C5FAD', border: 'none', borderRadius: '10px', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: '8px', transition: 'background 0.2s ease, transform 0.2s ease' },
  submitLabel: { fontSize: '13px', fontWeight: 600, color: '#fff' },
  submitIcon: { width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  privacy: { fontSize: '10px', color: '#aaa', textAlign: 'center', marginTop: '12px' },
}

const CONTACT_ITEMS = [
  {
    label: 'Call Us',
    value: '+27 (0) 00 000 0000',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" style={{width:'16px',height:'16px'}}>
        <path d="M3 2.5h2.5l1 2.5L5 6.5a9 9 0 0 0 4.5 4.5l1.5-1.5 2.5 1V13A10.5 10.5 0 0 1 3 2.5z" stroke="#1C5FAD" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
  },
  {
    label: 'Email Us',
    value: 'info@palekoholdings.co.za',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" style={{width:'16px',height:'16px'}}>
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#1C5FAD" strokeWidth="1.2"/>
        <path d="M2 5l6 5 6-5" stroke="#1C5FAD" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Gauteng, South Africa',
    icon: (
      <svg viewBox="0 0 16 16" fill="none" style={{width:'16px',height:'16px'}}>
        <path d="M8 2C5.24 2 3 4.24 3 7c0 4 5 8 5 8s5-4 5-8c0-2.76-2.24-5-5-5zm0 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" stroke="#1C5FAD" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
  },
]

const SERVICE_OPTIONS = ['Solar Installation', 'Electrical Services & COC', 'Power Tool Repairs', 'Vegetation Services', 'Other / Not Sure']

const HOURS = [
  { day: 'Monday – Friday', hours: '07:00 – 18:00' },
  { day: 'Saturday', hours: '08:00 – 14:00' },
  { day: 'Sunday', hours: 'Closed' },
]

export default function Contact() {
  const [loaded, setLoaded] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const heroRef = useRef(null)
  const formRef = useRef(null)
  const sectionRef = useReveal()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const heroClass = loaded ? 'contact-loaded' : ''

  function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setError(false)
    emailjs.sendForm(
      'service_em8ik7l',
      'template_oaotjof',
      formRef.current,
      '3ntGiPYqXnIXHjwaT'
    ).then(() => {
      setSending(false)
      setSent(true)
    }).catch(() => {
      setSending(false)
      setError(true)
    })
  }

  return (
    <>
      <style>{`
        .contact-hero-line-1 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s; }
        .contact-hero-line-2 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s; }
        .contact-hero-line-3 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.45s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s; }
        .contact-loaded .contact-hero-line-1,
        .contact-loaded .contact-hero-line-2,
        .contact-loaded .contact-hero-line-3 { opacity: 1; transform: translateY(0); }
        .contact-underline { position: relative; display: inline-block; }
        .contact-underline::after { content: ''; position: absolute; bottom: -4px; left: 0; height: 2px; width: 0; background: #2A9D5C; border-radius: 2px; transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s; }
        .contact-loaded .contact-underline::after { width: 100%; }
        .contact-input:focus { border-color: #1C5FAD !important; outline: none; }
        .contact-submit:hover { background: #185FA5 !important; transform: translateY(-1px); }
        .contact-item { transition: transform 0.2s ease; }
        .contact-item:hover { transform: translateX(4px); }
      `}</style>

      <div style={s.page}>

        <div ref={heroRef} className={heroClass} style={s.heroBg}>
          <div style={s.heroRadial} />
          <div style={s.heroInner}>
            <p className="contact-hero-line-1" style={s.heroEyebrow}>
              <span style={s.eyebrowLine} />
              Contact Us
            </p>
            <h1 className="contact-hero-line-2" style={s.heroTitle}>
              Let's Talk About<br />
              <em className="contact-underline" style={s.heroEm}>Your Next Project.</em>
            </h1>
            <p className="contact-hero-line-3" style={s.heroSub}>
              Whether you need an electrician, a solar quote, a tool repaired or your grounds maintained — our team is ready to help. We respond within 24 hours.
            </p>
          </div>
        </div>

        <div ref={sectionRef} style={s.section}>
          <div className="reveal" style={s.grid}>

            <div>
              <div style={s.contactBlocks}>
                {CONTACT_ITEMS.map(function(item, i) {
                  return (
                    <div key={i} className="contact-item" style={s.contactItem}>
                      <div style={s.contactIconWrap}>{item.icon}</div>
                      <div>
                        <p style={s.contactLabel}>{item.label}</p>
                        <p style={s.contactValue}>{item.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div style={s.hoursBlock}>
                <p style={s.hoursTitle}>Working Hours</p>
                {HOURS.map(function(h, i) {
                  return (
                    <div key={i} style={Object.assign({}, s.hoursRow, i === HOURS.length - 1 ? {borderBottom:'none'} : {})}>
                      <span>{h.day}</span>
                      <span style={{fontWeight: 500, color: h.hours === 'Closed' ? '#aaa' : '#1A1A1A'}}>{h.hours}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div style={s.formCard}>
              <h2 style={s.formTitle}>Send Us a Message</h2>
              <p style={s.formSub}>Fill in the form below and we will get back to you within 24 hours.</p>

              {sent ? (
                <div style={{background:'#EDF7F2',border:'1px solid #C0E4D0',borderRadius:'12px',padding:'24px',textAlign:'center'}}>
                  <p style={{fontSize:'14px',fontWeight:600,color:'#0F6E56',marginBottom:'6px'}}>Message Sent!</p>
                  <p style={{fontSize:'12px',color:'#555',fontWeight:300}}>Thank you for reaching out. We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div style={s.fieldRow}>
                    <div style={s.fieldGroup}>
                      <label style={s.fieldLabel}>First Name</label>
                      <input name="first_name" type="text" placeholder="Thabo" required className="contact-input" style={s.fieldInput} />
                    </div>
                    <div style={s.fieldGroup}>
                      <label style={s.fieldLabel}>Last Name</label>
                      <input name="last_name" type="text" placeholder="Nkosi" required className="contact-input" style={s.fieldInput} />
                    </div>
                  </div>

                  <div style={s.fieldGroup}>
                    <label style={s.fieldLabel}>Email Address</label>
                    <input name="from_email" type="email" placeholder="you@example.com" required className="contact-input" style={s.fieldInput} />
                  </div>

                  <div style={s.fieldGroup}>
                    <label style={s.fieldLabel}>Phone Number</label>
                    <input name="phone" type="tel" placeholder="+27 00 000 0000" className="contact-input" style={s.fieldInput} />
                  </div>

                  <div style={s.fieldGroup}>
                    <label style={s.fieldLabel}>Service Required</label>
                    <select name="service" required className="contact-input" style={Object.assign({}, s.fieldInput, {appearance:'none',color:'#666'})}>
                      <option value="">Select a service...</option>
                      {SERVICE_OPTIONS.map(function(o, i) {
                        return <option key={i} value={o}>{o}</option>
                      })}
                    </select>
                  </div>

                  <div style={s.fieldGroup}>
                    <label style={s.fieldLabel}>Message</label>
                    <textarea
                      name="message"
                      placeholder="Tell us a bit about what you need..."
                      rows={4}
                      className="contact-input"
                      style={Object.assign({}, s.fieldInput, {resize:'none',lineHeight:1.6})}
                    />
                  </div>

                  {error && (
                    <p style={{fontSize:'12px',color:'#E24B4A',marginBottom:'12px'}}>
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}

                  <button type="submit" className="contact-submit" style={s.submitBtn} disabled={sending}>
                    <span style={s.submitLabel}>{sending ? 'Sending...' : 'Send Message'}</span>
                    <span style={s.submitIcon}>
                      <svg viewBox="0 0 14 14" fill="none" style={{width:'14px',height:'14px'}}>
                        <path d="M2 7h10M8 4l3 3-3 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                  <p style={s.privacy}>Your details are private and will never be shared with third parties.</p>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </>
  )
}