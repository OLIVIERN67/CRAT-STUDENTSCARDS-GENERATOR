import SchoolCardLayer from './SchoolCardLayer'
import SchoolHeaderArt from './SchoolHeaderArt'
import { getSchoolKey } from '../lib/schoolCardTheme'

export default function CardBack({ t, school, leftLogo, rightLogo, watermark, wmSize, wmOp, terms, contact }) {
	const schoolKey = getSchoolKey(t)
	const cardClass = schoolKey === 'cbg' ? '' : t.wave ? 'theme-shwemu' : `theme-refined theme-${schoolKey} theme-reference theme-school-${schoolKey}`
	const useReferenceHeader = schoolKey !== 'cbg' && !t.wave
	return <div id="cardBack" className={cardClass}>
		<SchoolCardLayer school={school} schoolKey={schoolKey} logo={leftLogo || rightLogo} side="back"/>
		<div className="decor d5"/><div className="decor d6"/>
		<div className="watermark-wrap">{watermark && <img alt="" src={watermark} style={{width:`${wmSize}%`,opacity:wmOp/100,maxWidth:'58%',maxHeight:'58%',objectFit:'contain',display:'block'}}/>}</div>
		{useReferenceHeader ? <div className="bk-topline">
			<SchoolHeaderArt schoolKey={schoolKey} side="back"/>
			<div className="reference-back-heading">
				<Logo src={leftLogo || rightLogo}/>
				<div><span>Republic of Rwanda</span><strong>{school.institute}</strong><small>Student identity card</small></div>
			</div>
		</div> : <div className="bk-topline"/>}
		<div className="bk-body">
			<div className="bk-col"><div className="bk-head">TERMS &amp; CONDITIONS</div><div className="term-list">{terms.split('\n').filter(Boolean).map((line,index)=><div key={index} className="term-item"><span className="term-num">{index+1}</span><span>{line.replace('[INSTITUTION NAME]',school.institute)}</span></div>)}</div></div>
			<div className="bk-col"><div className="bk-head">AUTHORIZED OFFICE</div><div className="auth-block"><p className="auth-kiny">Utoraguye iyi karita wayishyikiriza ubuyobozi bwa {school.institute}</p><p className="auth-eng">If found please return this card to the leader of {school.institute}</p></div></div>
			<div className="bk-col"><div className="bk-head">CONTACT</div><div className="ct-list"><Contact label="Location" value={contact.location}/><Contact label="Email" value={contact.email}/></div></div>
		</div>
		<div className="back-wave"><svg viewBox="0 0 1080 38" preserveAspectRatio="none"><path fill="#FFD600" d="M0 26 C150 14 300 34 450 24 C600 14 780 32 1080 14 L1080 38 L0 38 Z"/><path fill="#002B52" d="M0 31 C170 18 340 38 520 28 C700 18 880 36 1080 22 L1080 38 L0 38 Z"/></svg></div>
	</div>
}

function Contact({ label, value }) { return <div className="ct-item"><span className="ct-ic"/><div><div className="ct-label">{label}</div><div className="ct-val">{value}</div></div></div> }

function Logo({ src }) { return src ? <img className="reference-back-logo" src={src} alt="School logo"/> : <div className="reference-back-logo reference-back-logo-placeholder">School</div> }
