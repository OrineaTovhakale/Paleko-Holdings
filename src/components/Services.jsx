import useReveal from '../hooks/useReveal'

const SERVICES = [
  {
    tag: 'Electrical',
    tagColor: '#1C5FAD',
    title: 'Electrical Services & COC',
    desc: 'Professional electrical repairs, installations and Certificates of Compliance for residential and commercial properties.',
    img: 'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=800&q=80&fit=crop',
    alt: 'Electrician at work',
    href: '/services/electrical',
  },
  {
    tag: 'Renewable Energy',
    tagColor: '#B07A18',
    title: 'Solar Installation',
    desc: 'Switch to solar and reduce your electricity bills. Our experts handle every step — from assessment to a fully commissioned system.',
    img: 'https://kimchiandkraut.net/wp-content/uploads/2021/01/solar-panels.jpg?w=1024',
    alt: 'Solar panels on rooftop',
    href: '/services/solar',
  },
  {
    tag: 'Repairs & Servicing',
    tagColor: '#2A9D5C',
    title: 'Power Tools & Machine Repairs',
    desc: 'Lawn mowers, generators, chainsaws, brushcutters and more — fully repaired and serviced to get you back to work fast.',
    img: 'https://static.wixstatic.com/media/836e04_a41b83bbbf6144c4a95b16ec7c40f33f~mv2.jpeg/v1/fill/w_1000,h_750,al_c,q_85,usm_0.66_1.00_0.01/836e04_a41b83bbbf6144c4a95b16ec7c40f33f~mv2.jpeg',
    alt: 'Power tools and equipment',
    href: '/services/power-tools',
  },
  {
    tag: 'Grounds Management',
    tagColor: '#0F6E56',
    title: 'Vegetation Services',
    desc: 'Grass cutting, tree felling, weed control and Reg PCO herbicide application — keeping outdoor spaces clean and orderly.',
    img: 'https://images.squarespace-cdn.com/content/v1/67a0fc26e44aa03348912c8b/278dda95-7b97-495f-8c92-16c840090432/ND7_8815.jpg',
    alt: 'Tree felling and logging',
    href: '/services/vegetation',
  },
]

export default function Services() {
  const ref = useReveal()

  return (
    <section id="services" ref={ref} className="services-section" style={{padding:'72px 56px',background:'#F8F7F4'}}>

      <div className="reveal">
        <h2 style={{fontFamily:"'Playfair Display', serif",fontSize:'34px',fontWeight:700,color:'#1A1A1A',lineHeight:1.2,marginBottom:'8px'}}>
          Services Built Around{' '}
          <em style={{fontStyle:'italic',color:'#1C5FAD'}}>Your Needs</em>
        </h2>
        <p style={{fontSize:'13px',color:'#888',lineHeight:1.7,maxWidth:'480px',marginBottom:'40px',fontWeight:300}}>
          Whether it's wiring your home, installing solar panels, servicing your
          tools or maintaining your grounds — Paleko has you covered.
        </p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:'18px'}}>
        {SERVICES.map(function(s, i) {
          return (
            <div key={s.title} className={'scard reveal reveal-delay-' + (i + 1)}>
              <div className="scard-img-wrap">
                <img src={s.img} alt={s.alt} className="scard-img" loading="lazy" />
              </div>
              <div style={{padding:'20px 22px 22px'}}>
                <p style={{fontSize:'9px',fontWeight:600,letterSpacing:'1px',textTransform:'uppercase',color:s.tagColor,marginBottom:'7px'}}>
                  {s.tag}
                </p>
                <h3 style={{fontSize:'15px',fontWeight:600,color:'#1A1A1A',marginBottom:'8px',lineHeight:1.3}}>
                  {s.title}
                </h3>
                <p style={{fontSize:'12px',color:'#888',lineHeight:1.65,marginBottom:0,fontWeight:300}}>
                  {s.desc}
                </p>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'16px',paddingTop:'14px',borderTop:'1px solid #E0DBD5'}}>
                  <a href={s.href} style={{fontSize:'12px',fontWeight:500,color:'#1C5FAD',textDecoration:'none'}}>
                    Learn more
                  </a>
                  <a href={s.href} className="scard-arrow" style={{textDecoration:'none'}}>
                    <svg viewBox="0 0 10 10" fill="none" style={{width:'10px',height:'10px'}}>
                      <path d="M2 5h6M6 3l2 2-2 2" stroke="#1C5FAD" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}