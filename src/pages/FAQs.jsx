import { useState, useEffect, useRef } from 'react'
import useReveal from '../hooks/useReveal'

const FAQS = [
  {
    category: 'Battery & Inverter Systems',
    questions: [
      { q: 'Does the battery inverter system make loud noise?', a: 'Lithium battery inverter systems do not make any loud or annoying noise compared to a generator. In fact they are completely silent.' },
      { q: 'Where is the best place to install the battery?', a: 'The best place would be in a garage or any outside room for safety reasons. The space should be ventilated, away from direct sunlight and extreme heat.' },
      { q: 'Can a wall mounted battery work with a hybrid inverter?', a: 'Yes, a wall mounted battery can suitably work with all off-grid and hybrid inverters. Our team will assess your setup and recommend the best configuration.' },
      { q: 'Does every package come with both the battery and inverter?', a: 'Yes, every package comes as a complete bundle. You will never need to source components separately — we handle everything from supply to installation.' },
      { q: 'What is the warranty on the battery inverter system?', a: 'The warranty differs by package, however no less than 7 years. Our team will walk you through the specific terms before any work begins.' },
      { q: 'What happens if a technical problem occurs with my battery?', a: 'Our team of engineers will fix the problem free of charge for the first year. After that we offer affordable maintenance plans to keep your system running.' },
    ],
  },
  {
    category: 'Our Services',
    questions: [
      { q: 'What areas does Paleko Holdings operate in?', a: 'We currently operate in Johannesburg (Gauteng), Pretoria (Gauteng), Durban (KZN) and Newcastle (KZN). Contact us to check availability in your area.' },
      { q: 'Do you offer solar installation for both homes and businesses?', a: 'Yes. We install solar systems for residential, commercial and industrial properties. Our team will assess your energy needs and design the right system.' },
      { q: 'What types of power tools do you repair?', a: 'We service and repair lawn mowers, generators, chainsaws, brushcutters and most other power machines. Give us a call if you are unsure whether we can help.' },
      { q: 'What does your vegetation service include?', a: 'Our vegetation services include grass cutting, tree felling, weed control and Reg PCO licensed herbicide application for residential and commercial clients.' },
    ],
  },
  {
    category: 'Electrical & COC',
    questions: [
      { q: 'What is a Certificate of Compliance (COC)?', a: 'A COC is a legal document issued by a registered electrician confirming that the electrical installation complies with SANS 10142. It is required when selling a property or completing new electrical work.' },
      { q: 'Are your electricians certified?', a: 'Yes. All our electricians are fully certified and registered with the relevant South African regulatory bodies. Every job is conducted in accordance with SANS 10142.' },
      { q: 'How long does an electrical installation take?', a: 'Minor repairs can be completed in a few hours while full installations may take one to several days. We will give you a clear timeline during your initial consultation.' },
    ],
  },
  {
    category: 'Quotes & Pricing',
    questions: [
      { q: 'How do I get a quote?', a: 'You can request a free no-obligation quote by filling in the contact form on our website, calling us directly, or sending us an email. We aim to respond within 24 hours.' },
      { q: 'Is the initial consultation free?', a: 'Yes. Our initial consultation and site assessment is completely free of charge. You will know exactly what you are paying for before any work begins.' },
      { q: 'Do you offer payment plans?', a: 'Yes, we offer flexible payment arrangements for larger projects. Speak to one of our consultants to discuss the options available to you.' },
    ],
  },
]

const faqStyles = {
  page: { background: '#F8F7F4', minHeight: '100vh' },
  heroBg: { background: '#1A1A1A', padding: '80px 56px 72px', position: 'relative', overflow: 'hidden' },
  heroRadial: { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(28,95,173,0.15) 0%, transparent 60%)', pointerEvents: 'none' },
  heroInner: { position: 'relative', zIndex: 1, maxWidth: '680px' },
  heroEyebrow: { fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#2A9D5C', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' },
  eyebrowLine: { width: '24px', height: '1px', background: '#2A9D5C', display: 'block' },
  heroTitle: { fontFamily: 'Playfair Display, serif', fontSize: '48px', fontWeight: 700, color: '#fff', lineHeight: 1.12, marginBottom: '16px' },
  heroEm: { fontStyle: 'italic', color: '#6FD4A0' },
  heroSub: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, fontWeight: 300, maxWidth: '480px' },
  content: { maxWidth: '1100px', margin: '0 auto', padding: '64px 56px' },
  grid: { display: 'grid', gridTemplateColumns: '240px 1fr', gap: '56px', alignItems: 'start' },
  sidebar: { position: 'sticky', top: '80px' },
  sidebarLabel: { fontSize: '10px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: '#aaa', marginBottom: '16px' },
  catList: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' },
  ctaCard: { marginTop: '32px', background: '#EDF4FF', border: '1px solid #C8D8EE', borderRadius: '12px', padding: '20px' },
  ctaCardTitle: { fontSize: '12px', fontWeight: 600, color: '#1C5FAD', marginBottom: '6px' },
  ctaCardBody: { fontSize: '11px', color: '#555', lineHeight: 1.65, marginBottom: '14px', fontWeight: 300 },
  ctaCardBtn: { display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#1C5FAD', color: '#fff', fontSize: '11px', fontWeight: 500, padding: '9px 16px', borderRadius: '6px', textDecoration: 'none' },
  faqsTitle: { fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 700, color: '#1A1A1A', marginBottom: '4px' },
  faqsCount: { fontSize: '12px', color: '#aaa', marginBottom: '32px', fontWeight: 300 },
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  const btnStyle = { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }
  const questionStyle = { fontSize: '14px', fontWeight: 500, color: open ? '#1C5FAD' : '#1A1A1A', lineHeight: 1.5, transition: 'color 0.2s ease' }
  const iconWrapStyle = { width: '28px', height: '28px', borderRadius: '50%', border: open ? '1px solid #1C5FAD' : '1px solid #E0DBD5', background: open ? '#1C5FAD' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s ease' }
  const iconStyle = { width: '10px', height: '10px', transition: 'transform 0.3s ease', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }
  const bodyStyle = { maxHeight: open ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }
  const answerStyle = { fontSize: '13px', color: '#666', lineHeight: 1.85, fontWeight: 300, paddingBottom: '20px', maxWidth: '680px' }

  return (
    <div style={{borderBottom: '1px solid #E0DBD5'}}>
      <button style={btnStyle} onClick={() => setOpen(!open)}>
        <span style={questionStyle}>{question}</span>
        <span style={iconWrapStyle}>
          <svg viewBox="0 0 10 10" fill="none" style={iconStyle}>
            <path d="M5 1v8M1 5h8" stroke={open ? '#fff' : '#666'} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div style={bodyStyle}>
        <p style={answerStyle}>{answer}</p>
      </div>
    </div>
  )
}

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const heroRef = useRef(null)
  const contentRef = useReveal()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const heroClass = loaded ? 'faq-loaded' : ''

  return (
    <>
      <style>{`
        .faq-hero-line-1 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s; }
        .faq-hero-line-2 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s; }
        .faq-hero-line-3 { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease 0.45s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s; }
        .faq-loaded .faq-hero-line-1,
        .faq-loaded .faq-hero-line-2,
        .faq-loaded .faq-hero-line-3 { opacity: 1; transform: translateY(0); }
        .faq-underline { position: relative; display: inline-block; }
        .faq-underline::after { content: ''; position: absolute; bottom: -4px; left: 0; height: 2px; width: 0; background: #2A9D5C; border-radius: 2px; transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s; }
        .faq-loaded .faq-underline::after { width: 100%; }
        .faq-cat-btn { transition: all 0.2s ease; }
        .faq-cat-btn:hover { background: #fff !important; border-color: #E0DBD5 !important; color: #1A1A1A !important; }
      `}</style>

      <div style={faqStyles.page}>

        <div ref={heroRef} className={heroClass} style={faqStyles.heroBg}>
          <div style={faqStyles.heroRadial} />
          <div style={faqStyles.heroInner}>
            <p className="faq-hero-line-1" style={faqStyles.heroEyebrow}>
              <span style={faqStyles.eyebrowLine} />
              Support
            </p>
            <h1 className="faq-hero-line-2" style={faqStyles.heroTitle}>
              Frequently Asked{' '}
              <em className="faq-underline" style={faqStyles.heroEm}>Questions.</em>
            </h1>
            <p className="faq-hero-line-3" style={faqStyles.heroSub}>
              Can't find what you're looking for? Reach out to our team directly and we'll get back to you within 24 hours.
            </p>
          </div>
        </div>

        <div ref={contentRef} style={faqStyles.content}>
          <div className="reveal" style={faqStyles.grid}>

            <div style={faqStyles.sidebar}>
              <p style={faqStyles.sidebarLabel}>Categories</p>
              <ul style={faqStyles.catList}>
                {FAQS.map(function(cat, i) {
                  const isActive = activeCategory === i
                  const btnStyle = { width: '100%', textAlign: 'left', background: isActive ? '#fff' : 'transparent', border: isActive ? '1px solid #E0DBD5' : '1px solid transparent', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', fontWeight: isActive ? 500 : 400, color: isActive ? '#1C5FAD' : '#666', cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' }
                  const dotStyle = { width: '5px', height: '5px', borderRadius: '50%', background: isActive ? '#2A9D5C' : '#E0DBD5', flexShrink: 0 }
                  return (
                    <li key={i}>
                      <button className="faq-cat-btn" style={btnStyle} onClick={() => setActiveCategory(i)}>
                        <span style={dotStyle} />
                        {cat.category}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <div style={faqStyles.ctaCard}>
                <p style={faqStyles.ctaCardTitle}>Still have questions?</p>
                <p style={faqStyles.ctaCardBody}>Our team is ready to help. Get in touch and we will respond within 24 hours.</p>
                <a href="/contact" style={faqStyles.ctaCardBtn}>
                  Contact Us
                  <svg viewBox="0 0 10 10" fill="none" style={{width:'10px',height:'10px'}}>
                    <path d="M2 5h6M6 3l2 2-2 2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h2 style={faqStyles.faqsTitle}>{FAQS[activeCategory].category}</h2>
              <p style={faqStyles.faqsCount}>{FAQS[activeCategory].questions.length} questions</p>
              <div>
                {FAQS[activeCategory].questions.map(function(item, i) {
                  return <FaqItem key={i} question={item.q} answer={item.a} />
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}