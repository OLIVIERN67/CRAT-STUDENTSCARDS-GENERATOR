import { forwardRef } from 'react'
import SchoolCardLayer from './SchoolCardLayer'
import SchoolHeaderArt from './SchoolHeaderArt'
import { getSchoolKey } from '../lib/schoolCardTheme'

const CardFront = forwardRef(function CardFront({ t, school, student, contact, title,
  leftLogo, rightLogo, photo, watermark, wmSize, wmOp }, ref) {
  const schoolKey = getSchoolKey(t)
  const cardClass = schoolKey === 'cbg' ? '' : t.wave ? 'theme-shwemu' : `theme-refined theme-${schoolKey} theme-reference theme-school-${schoolKey}`
  return <div id="card" ref={ref} className={cardClass}>
    <SchoolCardLayer school={school} schoolKey={schoolKey} logo={leftLogo || rightLogo} side="front"/>
    {!t.wave && <SchoolHeaderArt schoolKey={schoolKey} side="front"/>}
    <div className="decor d1"/><div className="decor d2"/><div className="decor d3"/><div className="decor d4"/>
    {t.wave && <><div className="top-ribbon"><svg viewBox="0 0 1080 44" preserveAspectRatio="none"><path fill="#1E2A5E" d="M0 0 H1080 V24 C900 42 760 10 560 26 C380 40 180 12 0 32 Z"/><path fill="#F59E0B" d="M0 0 H1080 V14 C900 30 760 2 560 16 C380 28 180 4 0 20 Z"/></svg></div><div className="bottom-wave"><svg viewBox="0 0 1080 56" preserveAspectRatio="none"><path fill="#1E2A5E" d="M0 56 H1080 V26 C900 10 760 40 560 24 C380 10 180 42 0 22 Z"/><path fill="#F59E0B" d="M0 56 H1080 V40 C900 26 760 52 560 38 C380 26 180 54 0 38 Z"/></svg></div></>}
    <div className="watermark-wrap">{watermark && <img alt="" src={watermark} style={{width:`${wmSize}%`,opacity:wmOp/100,maxWidth:'58%',maxHeight:'58%',objectFit:'contain',display:'block',filter:'drop-shadow(0 0 8px rgba(100,132,231,0.12))',transform:'translateY(91px)'}}/>}</div>
    <header className="card-header"><Logo src={leftLogo}/><div className="header-center"><div className="h-min">{school.ministry}</div><div className="h-sub">{school.province}</div><div className="h-sub">{school.district}</div><div className="h-inst">{school.institute}</div></div><Logo src={rightLogo}/></header>
    <div className="title-banner"><img className="banner-stripes" alt="" src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1080' height='92'%3E%3Crect width='1080' height='92' fill='%23${t.colors.primary.slice(1)}'/%3E%3C/svg%3E`}/><div id="elTitleShadow" aria-hidden="true" style={{display:t.wave?'none':'flex'}}>{title}</div><div id="elTitle">{title}</div></div>
    <div className="card-body"><div className="info-col"><Info label="Student Name" value={student.name}/><Info label="Class" value={student.klass}/><Info label="Sex" value={student.sex}/><Info label="Date of Birth" value={student.dob}/><Info label="Academic Year" value={student.year}/></div><div className="photo-col"><div className="photo-frame" style={{borderColor:'#fff'}}>{photo ? <img src={photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/> : <div className="photo-ph"><span>PHOTO</span></div>}</div></div></div>
    <footer className="card-footer"><Footer label="Date of Issue" value={contact.issue}/><Footer label="Emergency Call" value={contact.phone}/><Footer label="Date of Expiry" value={contact.expiry}/></footer>
  </div>
})

function Logo({ src }) { return <div className="logo-box">{src ? <img src={src} alt="" style={{maxWidth:'100%',maxHeight:'100%'}}/> : <div className="logo-ph"><span>LOGO</span></div>}</div> }
function Info({ label, value }) { return <div className="info-row"><span className="lbl">{label}</span><span className="val">{value || '-'}</span></div> }
function Footer({ label, value }) { return <div className="f-item"><div className="f-top"><span className="f-label">{label}</span></div><div className="f-val">{value || '-'}</div></div> }

export default CardFront