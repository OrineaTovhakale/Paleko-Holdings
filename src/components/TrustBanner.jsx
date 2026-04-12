import useReveal from '../hooks/useReveal'

const ITEMS = [
  'COC Certified Electricians',
  'Reg PCO Licensed',
  'Residential & Commercial',
  'SANS 10142 Compliant',
  'Solar Energy Specialists',
  'Safety-First Culture',
  'Proudly South African',
  'Gender Equality Champion',
]

function CheckIcon() {
  return (
    <span style={{
      width:'20px',
      height:'20px',
      borderRadius:'50%',
      background:'#EDF7F2',
      border:'1px solid #C0E4D0',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexShrink:0,
    }}>
      <svg viewBox="0 0 8 8" fill="none" style={{width:'8px',height:'8px'}}>
        <polyline points="1,4 3,6 7,2" stroke="#2A9D5C" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export default function TrustBanner() {
  const ref = useReveal()
  const all = [...ITEMS, ...ITEMS]

  return (
    <div ref={ref} style={{background:'#fff',borderBottom:'1px solid #E0DBD5',overflow:'hidden',position:'relative'}}>

      <div className="trust-fade-left" style={{position:'absolute',left:0,top:0,bottom:0,width:'80px',zIndex:2,pointerEvents:'none'}} />
      <div className="trust-fade-right" style={{position:'absolute',right:0,top:0,bottom:0,width:'80px',zIndex:2,pointerEvents:'none'}} />

      <div className="reveal trust-track" style={{display:'flex',width:'max-content'}}>
        {all.map((label, i) => (
          <div
            key={i}
            style={{
              display:'flex',
              alignItems:'center',
              gap:'12px',
              padding:'20px 44px',
              borderRight:'1px solid #F0EEE9',
              whiteSpace:'nowrap',
              flexShrink:0,
            }}
          >
            <CheckIcon />
            <span style={{fontSize:'13px',color:'#444',fontWeight:500}}>{label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}