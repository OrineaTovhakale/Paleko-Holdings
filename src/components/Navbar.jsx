import { useState, useEffect, useRef } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function scrollTo(href) {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  function handleLink(e, href) {
    e.preventDefault()
    scrollTo(href)
  }

  function handleMobileLink(href) {
    setOpen(false)
    setMobileServicesOpen(false)
    setTimeout(() => scrollTo(href), 600)
  }

  const panelClass1 = open ? 'menu-panel-1 open' : 'menu-panel-1 closing'
  const panelClass2 = open ? 'menu-panel-2 open' : 'menu-panel-2 closing'
  const panelClass3 = open ? 'menu-panel-3 open' : 'menu-panel-3 closing'
  const menuClass = open ? 'menu-open' : 'menu-closing'
  const chevronStyle = {
    width: '8px',
    height: '8px',
    opacity: 0.5,
    transition: 'transform 0.2s ease',
    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }
  const mobileChevronStyle = {
    width: '14px',
    height: '14px',
    opacity: 0.4,
    transition: 'transform 0.3s ease',
    transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    flexShrink: 0,
  }

  return (
    <>
      <style>{`
        .nav-link {
          position: relative;
          font-size: 12px;
          color: #666;
          text-decoration: none;
          font-weight: 400;
          padding-bottom: 2px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #2A9D5C;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #1A1A1A; }
        .nav-link:hover::after { width: 100%; }

        .nav-cta {
          background: #1A1A1A;
          color: #fff;
          font-size: 11px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }
        .nav-cta:hover {
          background: #1C5FAD;
          transform: translateY(-1px);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 12px;
          color: #444;
          text-decoration: none;
          transition: background 0.15s ease, color 0.15s ease;
          font-family: 'Inter', sans-serif;
        }
        .dropdown-item:hover { background: #F8F7F4; color: #1A1A1A; }

        .dropdown-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #E0DBD5;
          flex-shrink: 0;
          transition: background 0.15s ease;
        }
        .dropdown-item:hover .dropdown-dot { background: #2A9D5C; }

        .mobile-ham {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 300;
          transition: opacity 0.2s ease;
        }
        .mobile-ham.hidden {
          opacity: 0;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-phone { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-ham { display: flex !important; }
        }

        .hamburger-line {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #1A1A1A;
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }

        .menu-panel-1 {
          position: fixed; inset: 0; z-index: 98;
          background: #2A9D5C;
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1) 0s;
        }
        .menu-panel-2 {
          position: fixed; inset: 0; z-index: 99;
          background: #1C5FAD;
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1) 0.07s;
        }
        .menu-panel-3 {
          position: fixed; inset: 0; z-index: 100;
          background: #0D1A0F;
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1) 0.14s;
        }
        .menu-panel-1.open { transform: translateX(0); }
        .menu-panel-2.open { transform: translateX(0); }
        .menu-panel-3.open { transform: translateX(0); }
        .menu-panel-1.closing {
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1) 0.14s;
        }
        .menu-panel-2.closing {
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1) 0.07s;
        }
        .menu-panel-3.closing {
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1) 0s;
        }

        .menu-link-item {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .menu-open .menu-link-item { opacity: 1; transform: translateX(0); }
        .menu-link-item:nth-child(1) { transition-delay: 0.35s; }
        .menu-link-item:nth-child(2) { transition-delay: 0.42s; }
        .menu-link-item:nth-child(3) { transition-delay: 0.49s; }
        .menu-link-item:nth-child(4) { transition-delay: 0.56s; }
        .menu-link-item:nth-child(5) { transition-delay: 0.63s; }
        .menu-closing .menu-link-item {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
        }

        .menu-nav-link {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: color 0.2s ease;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          width: 100%;
          justify-content: space-between;
        }
        .menu-nav-link:hover { color: #6FD4A0; }

        .menu-num {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          font-weight: 400;
          margin-top: 4px;
          display: none;
        }
        @media (max-width: 768px) {
          .menu-num { display: block; }
        }

        /* Mobile sub-links */
        .mobile-sub-links {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .mobile-sub-links.open {
          max-height: 300px;
        }
        .mobile-sub-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0 10px 24px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s ease;
          border-left: 1px solid rgba(255,255,255,0.1);
          margin-left: 8px;
        }
        .mobile-sub-item:hover { color: #6FD4A0; }
        .mobile-sub-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          flex-shrink: 0;
          transition: background 0.2s ease;
        }
        .mobile-sub-item:hover .mobile-sub-dot { background: #6FD4A0; }

        .menu-close-btn {
          position: fixed;
          top: 16px;
          right: 28px;
          background: #fff;
          border: 1px solid #E0DBD5;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 999;
          transition: background 0.2s ease, opacity 0.2s ease;
          opacity: 0;
          pointer-events: none;
        }
        .menu-close-btn.visible {
          opacity: 1;
          pointer-events: all;
        }
        .menu-close-btn:hover { background: #F8F7F4; }
      `}</style>

      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        background: '#fff',
        borderBottom: scrolled ? '1px solid #E0DBD5' : '1px solid transparent',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.05)' : 'none',
      }}>
        <nav style={{maxWidth:'1280px',margin:'0 auto',padding:'0 40px',display:'flex',alignItems:'center',justifyContent:'space-between',height:'58px'}}>

          <a href="/" style={{display:'flex',alignItems:'center',textDecoration:'none',flexShrink:0}}>
            <img src="/logo.png" alt="Paleko Holdings" style={{height:'40px',width:'auto',objectFit:'contain'}} />
          </a>

          <ul className="desktop-nav" style={{display:'flex',gap:'28px',listStyle:'none',margin:0,padding:0,alignItems:'center'}}>
            <li ref={dropdownRef} style={{position:'relative',listStyle:'none'}}>
              <button
                className="nav-link"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Services
                <svg viewBox="0 0 10 6" fill="none" style={chevronStyle}>
                  <path d="M1 1l4 4 4-4" stroke="#666" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    background: '#fff',
                    border: '1px solid #E0DBD5',
                    borderRadius: '12px',
                    padding: '8px',
                    minWidth: '250px',
                    zIndex: 999,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  }}
                >
                  <a href="/services/electrical" className="dropdown-item">
                    <span className="dropdown-dot" />
                    Electrical Services &amp; COC
                  </a>
                  <a href="/services/solar" className="dropdown-item">
                    <span className="dropdown-dot" />
                    Solar Installation
                  </a>
                  <a href="/services/power-tools" className="dropdown-item">
                    <span className="dropdown-dot" />
                    Power Tools &amp; Machine Repairs
                  </a>
                  <a href="/services/vegetation" className="dropdown-item">
                    <span className="dropdown-dot" />
                    Vegetation Services
                  </a>
                </div>
              )}
            </li>

            <li style={{listStyle:'none'}}>
              <a href="/about" className="nav-link">
                  About Us
              </a>
            </li>
            <li style={{listStyle:'none'}}>
              <a href="#contact" className="nav-link" onClick={(e) => handleLink(e, '#contact')}>
                Contact
              </a>
            </li>
            <li style={{listStyle:'none'}}>
              <a href="/faqs" className="nav-link">
                FAQs
              </a>
            </li>
          </ul>

          <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
            <span className="desktop-phone" style={{fontSize:'11px',color:'#1C5FAD',fontWeight:500}}>
              +27 63 753 5488
            </span>
            <a href="#contact" className="nav-cta desktop-cta" onClick={(e) => handleLink(e, '#contact')}>
              Get a Quote
            </a>
            <button
              className={open ? 'mobile-ham hidden' : 'mobile-ham'}
              onClick={() => setOpen(true)}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>

        </nav>
      </header>

      {/* X close button */}
      <button
        className={open ? 'menu-close-btn visible' : 'menu-close-btn'}
        onClick={() => setOpen(false)}
      >
        <svg viewBox="0 0 16 16" fill="none" style={{width:'16px',height:'16px'}}>
          <path d="M3 3l10 10M13 3L3 13" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Mobile menu panels */}
      <div className={panelClass1} />
      <div className={panelClass2} />
      <div className={panelClass3}>
        <div
          className={menuClass}
          style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 48px',overflowY:'auto'}}
        >
          <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:'4px'}}>

            {/* Services with mobile sub-links */}
            <li className="menu-link-item">
              <button
                className="menu-nav-link"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                <span style={{display:'flex',alignItems:'center',gap:'14px'}}>
                  <span className="menu-num">01</span>
                  Services
                </span>
                <svg viewBox="0 0 10 6" fill="none" style={mobileChevronStyle}>
                  <path d="M1 1l4 4 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <div className={mobileServicesOpen ? 'mobile-sub-links open' : 'mobile-sub-links'}>
                <a href="/services/electrical" className="mobile-sub-item">
                  <span className="mobile-sub-dot" />
                  Electrical Services &amp; COC
                </a>
                <a href="/services/solar" className="mobile-sub-item">
                  <span className="mobile-sub-dot" />
                  Solar Installation
                </a>
                <a href="/services/power-tools" className="mobile-sub-item">
                  <span className="mobile-sub-dot" />
                  Power Tools &amp; Machine Repairs
                </a>
                <a href="/services/vegetation" className="mobile-sub-item">
                  <span className="mobile-sub-dot" />
                  Vegetation Services
                </a>
              </div>
            </li>

            <li className="menu-link-item">
              <a href="/about" className="menu-nav-link">
                <span style={{display:'flex',alignItems:'center',gap:'14px'}}>
                  <span className="menu-num">02</span>
                  About Us
                </span>
              </a>
            </li>
            <li className="menu-link-item">
              <a href="#contact" className="menu-nav-link" onClick={() => handleMobileLink('#contact')}>
                <span style={{display:'flex',alignItems:'center',gap:'14px'}}>
                  <span className="menu-num">03</span>
                  Contact
                </span>
              </a>
            </li>
            <li className="menu-link-item">
              <a href="/faqs" className="menu-nav-link">
                <span style={{display:'flex',alignItems:'center',gap:'14px'}}>
                  <span className="menu-num">04</span>
                  FAQs
                </span>
              </a>
            </li>
            <li className="menu-link-item">
              <a href="#contact" className="menu-nav-link" onClick={() => handleMobileLink('#contact')}>
                <span style={{display:'flex',alignItems:'center',gap:'14px'}}>
                  <span className="menu-num">05</span>
                  Get a Quote
                </span>
              </a>
            </li>
          </ul>

          <div style={{marginTop:'48px',paddingTop:'28px',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
            <p style={{fontSize:'11px',color:'rgba(255,255,255,0.3)',marginBottom:'6px'}}>Call us directly</p>
            <p style={{fontSize:'16px',color:'#fff',fontWeight:500}}>+27 63 753 5488</p>
          </div>
        </div>
      </div>
    </>
  )
}