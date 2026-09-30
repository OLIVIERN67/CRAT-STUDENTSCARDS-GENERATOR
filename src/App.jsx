import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'
import React from 'react'
import './card.css'

const TEMPLATES = {
  cbg: { name:'College Baptiste Gacuba II', institute:'College Baptiste Gacuba II TVET School', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#6484E7',accent:'#FFD600',label:'#1E40AF',school:'#1746D1'}, wave:false },
  'gs-gacuba-ii': { name:'GS GACUBA II', institute:'GS GACUBA II', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#6484E7',accent:'#FFD600',label:'#1E40AF',school:'#1746D1'}, wave:false },
  'busasamana': { name:'BUSASAMANA', institute:'BUSASAMANA', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#6484E7',accent:'#FFD600',label:'#1E40AF',school:'#1746D1'}, wave:false },
  'bumba-tvet': { name:'BUMBA TVET', institute:'BUMBA TVET', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#6484E7',accent:'#FFD600',label:'#1E40AF',school:'#1746D1'}, wave:false },
  'shwemu-tss-b': { name:'SHWEMU TSS B', institute:'SHWEMU TSS B', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#1E2A5E',accent:'#F59E0B',label:'#1E2A5E',school:'#1E2A5E'}, wave:true },
  'gs-busigari': { name:'GS BUSIGARI', institute:'GS BUSIGARI', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#6484E7',accent:'#FFD600',label:'#1E40AF',school:'#1746D1'}, wave:false },
  trinite: { name:'Groupe Scolaire de la Trinite', institute:'GROUPE SCOLAIRE DE LA TRINITE', ministry:'MINISTRY OF EDUCATION', province:'WESTERN PROVINCE', district:'RUBAVU DISTRICT', colors:{primary:'#1d4ed8',accent:'#c5fb30',label:'#1E40AF',school:'#1d4ed8'}, wave:false },
}

function normalizePhoto(dataUrl){
  return new Promise(resolve=>{
    const img=new Image()
    img.onload=()=>{
      try{
        const S=3, FW=232*S, FH=298*S, target=FW/FH
        const iw=img.naturalWidth, ih=img.naturalHeight, r=iw/ih
        let sx,sy,sw,sh
        if(r>target){ sh=ih; sw=ih*target; sx=(iw-sw)/2; sy=0 } else { sw=iw; sh=iw/target; sx=0; sy=(ih-sh)/2 }
        const c=document.createElement('canvas'); c.width=FW; c.height=FH
        c.getContext('2d').drawImage(img,sx,sy,sw,sh,0,0,FW,FH)
        resolve(c.toDataURL('image/png'))
      }catch(e){ resolve(dataUrl) }
    }
    img.onerror=()=>resolve(dataUrl)
    img.src=dataUrl
  })
}

function Editor({ forcedSchool }){
  const params = useParams()
  const schoolId = forcedSchool || params.schoolId || 'cbg'
  const t = TEMPLATES[schoolId] || TEMPLATES.cbg
  const [panel,setPanel]=useState(null)
  const [view,setView]=useState('front')
  const [school,setSchool]=useState(()=>{ try{ const s=JSON.parse(localStorage.getItem('cms_school_'+schoolId)||'null'); if(s) return {...TEMPLATES[schoolId], ...s}}catch{}; return {...t}})
  const [student,setStudent]=useState(()=>{ try{return JSON.parse(localStorage.getItem('cms_student_'+schoolId))||{name:'',klass:'',sex:'',dob:'',year:''}}catch{return {name:'',klass:'',sex:'',dob:'',year:''}}})
  const [contact,setContact]=useState(()=>{ try{return JSON.parse(localStorage.getItem('cms_contact_'+schoolId))||{location:'Western Province, Rubavu District, Gisenyi Sector',email:'collegebaptistegacuba2@gmail.com',pobox:'463 Gisenyi',phone:'+250 781 508 248',issue:'',expiry:''}}catch{return {location:'Western Province, Rubavu District, Gisenyi Sector',email:'collegebaptistegacuba2@gmail.com',pobox:'463 Gisenyi',phone:'+250 781 508 248',issue:'',expiry:''}}})
  const [title,setTitle]=useState(()=>localStorage.getItem('cms_title_'+schoolId)||'STUDENT CARD')
  const [leftLogo,setLeftLogo]=useState(()=>localStorage.getItem('cms_leftLogo_'+schoolId)|| (schoolId==='cbg' ? '/leftlogo.png' : null))
  const [rightLogo,setRightLogo]=useState(()=>localStorage.getItem('cms_rightLogo_'+schoolId)|| (schoolId==='cbg' ? '/rightlogo.jpg' : null))
  const [photo,setPhoto]=useState(()=>localStorage.getItem('cms_photo_'+schoolId)||null)
  const [watermark,setWatermark]=useState(()=>localStorage.getItem('cms_watermark_'+schoolId)||null)
  const [signature,setSignature]=useState(()=>localStorage.getItem('cms_signature_'+schoolId)||null)
  const [wmSize,setWmSize]=useState(()=>parseInt(localStorage.getItem('cms_wmSize_'+schoolId)||'32'))
  const [wmOp,setWmOp]=useState(()=>parseInt(localStorage.getItem('cms_wmOp_'+schoolId)||'30'))
  const [terms,setTerms]=useState(()=>localStorage.getItem('cms_terms_'+schoolId)||'This card is the property of [INSTITUTION NAME].\nThis card must be carried by the student at all times on campus.\nThis card is non-transferable.\nLoss of this card must be reported immediately to the school administration.\nWhoever uses this card contrary to the law will be punished.')
  const previewAreaRef=useRef(null)
  const frontWrapRef=useRef(null)
  const backWrapRef=useRef(null)
  const cardRef=useRef(null)

  useEffect(()=>{ localStorage.setItem('cms_school_'+schoolId, JSON.stringify(school)) },[school,schoolId])
  useEffect(()=> localStorage.setItem('cms_student_'+schoolId, JSON.stringify(student)),[student,schoolId])
  useEffect(()=> localStorage.setItem('cms_contact_'+schoolId, JSON.stringify(contact)),[contact,schoolId])
  useEffect(()=> localStorage.setItem('cms_title_'+schoolId, title),[title,schoolId])
  useEffect(()=>{ try{if(leftLogo) localStorage.setItem('cms_leftLogo_'+schoolId, leftLogo); else localStorage.removeItem('cms_leftLogo_'+schoolId)}catch(e){} },[leftLogo,schoolId])
  useEffect(()=>{ try{if(rightLogo) localStorage.setItem('cms_rightLogo_'+schoolId, rightLogo); else localStorage.removeItem('cms_rightLogo_'+schoolId)}catch(e){} },[rightLogo,schoolId])
  useEffect(()=>{ try{if(photo) localStorage.setItem('cms_photo_'+schoolId, photo); else localStorage.removeItem('cms_photo_'+schoolId)}catch(e){} },[photo,schoolId])
  useEffect(()=>{ try{if(watermark) localStorage.setItem('cms_watermark_'+schoolId, watermark); else localStorage.removeItem('cms_watermark_'+schoolId)}catch(e){} },[watermark,schoolId])
  useEffect(()=>{ try{if(signature) localStorage.setItem('cms_signature_'+schoolId, signature); else localStorage.removeItem('cms_signature_'+schoolId)}catch(e){} },[signature,schoolId])
  useEffect(()=> localStorage.setItem('cms_wmSize_'+schoolId, wmSize),[wmSize,schoolId])
  useEffect(()=> localStorage.setItem('cms_wmOp_'+schoolId, wmOp),[wmOp,schoolId])
  useEffect(()=> localStorage.setItem('cms_terms_'+schoolId, terms),[terms,schoolId])
  useEffect(()=>{
    const r=document.documentElement.style
    r.setProperty('--c-primary',t.colors.primary)
    r.setProperty('--c-accent',t.colors.accent)
    r.setProperty('--c-label',t.colors.label)
    r.setProperty('--c-school',t.colors.school)
  },[t])

  const layout = ()=>{
    const area=previewAreaRef.current
    if(!area) return
    const CARD_W=1080, CARD_H=681
    const isFixed = window.matchMedia('(min-width: 768px)').matches
    const fw=frontWrapRef.current, bw=backWrapRef.current
    if(!fw || !bw) return
    const availW = area.clientWidth - 48
    const availH = area.clientHeight - 48
    const gap=28
    let h=0
    if(view==='both'){
      const sideBySide = availW >= CARD_W*2+gap
      let s
      if(sideBySide){ s=Math.min((availW-gap)/2/CARD_W, availH/CARD_H, 1) }
      else { s=Math.min(availW/CARD_W, availH/CARD_H, 1) }
      fw.style.transform=`scale(${s})`; fw.style.transformOrigin='center center'
      bw.style.transform=`scale(${s})`; bw.style.transformOrigin='center center'
      h= CARD_H*s*(sideBySide?1:2) + (sideBySide?0:gap)
    } else {
      const s2=Math.min(availW/CARD_W, availH/CARD_H, 1)
      const target = view==='front' ? fw : bw
      target.style.transform=`scale(${s2})`
      target.style.transformOrigin='center center'
      h=CARD_H*s2
      const other = view==='front' ? bw : fw
      other.style.transform='scale(1)'
    }
    fw.style.display = view==='back' ? 'none' : 'block'
    bw.style.display = view==='front' ? 'none' : 'block'
    if(!isFixed){
      const ph=Math.round(h+56)
      if(area.style.height!==ph+'px') area.style.height=ph+'px'
    } else {
      area.style.height=''
    }
  }
  useLayoutEffect(()=>{ layout(); const ro=new ResizeObserver(layout); if(previewAreaRef.current) ro.observe(previewAreaRef.current); window.addEventListener('resize',layout); return()=>{ ro.disconnect(); window.removeEventListener('resize',layout)} },[view, t, school, student, title, leftLogo, rightLogo, photo, wmSize, wmOp])
  useEffect(()=>{ layout() }, [school, student, title, leftLogo, rightLogo, photo, wmSize, wmOp])

  const onFile=(e,setter, isPhoto=false)=>{
    const f=e.target.files?.[0]; if(!f) return
    const fr=new FileReader()
    fr.onload=async ev=>{
      const data=ev.target.result
      if(isPhoto){ const cropped=await normalizePhoto(data); setter(cropped) } else setter(data)
    }
    fr.readAsDataURL(f)
  }
  const fmtDate=v=>{ if(!v) return ''; const d=new Date(v+'T00:00:00'); return isNaN(d)?'':d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase() }

  const downloadPNG=async(mode='front')=>{
    const el = mode==='back' ? document.getElementById('cardBack') : cardRef.current
    if(!el) return
    const html2canvas=(await import('html2canvas-pro')).default
    await document.fonts.ready
    const banner=el.querySelector('.title-banner'); const titleEl=el.querySelector('#elTitle')
    let titleImg=null
    if(banner && titleEl){
      const cs=getComputedStyle(titleEl); const W=banner.offsetWidth, H=banner.offsetHeight, fs=parseFloat(cs.fontSize)||54
      const SCALE=4, c=document.createElement('canvas'); c.width=W*SCALE; c.height=H*SCALE
      const ctx=c.getContext('2d'); ctx.scale(SCALE,SCALE)
      ctx.font=cs.fontWeight+' '+fs+'px '+cs.fontFamily; try{ctx.letterSpacing=cs.letterSpacing}catch{}
      ctx.textAlign='center'; ctx.textBaseline='middle'
      const txt=titleEl.textContent||''; const showShadow=document.getElementById('elTitleShadow')?.offsetParent!==null
      if(showShadow){ ctx.fillStyle='rgba(0,0,0,0.45)'; ctx.fillText(txt, W/2+3, H/2+4) }
      ctx.fillStyle=cs.color; ctx.fillText(txt, W/2, H/2)
      titleImg=c.toDataURL('image/png')
    }
    const wrap = el.closest('.scale-wrap')
    const prevT = wrap.style.transform, prevD=wrap.style.display
    wrap.style.transform='none'; wrap.style.display='block'
    await new Promise(r=>setTimeout(r,80))
    const canvas=await html2canvas(el,{scale:4, backgroundColor:'#ffffff', useCORS:true, logging:false, onclone:doc=>{
      if(titleImg){ const b=doc.querySelector('.title-banner'); const te=doc.getElementById('elTitle'); const se=doc.getElementById('elTitleShadow'); if(te) te.style.display='none'; if(se) se.style.display='none'; if(b){ const img=doc.createElement('img'); img.src=titleImg; img.style.cssText='position:absolute;left:0;top:0;width:100%;height:100%;z-index:1;pointer-events:none;'; b.appendChild(img) } }
    }})
    wrap.style.transform=prevT; wrap.style.display=prevD
    const a=document.createElement('a'); a.download=`${(school.institute||'card').replace(/\s+/g,'_')}_${mode}.png`; a.href=canvas.toDataURL('image/png'); a.click()
  }
  const downloadPDF=async(mode='front')=>{
    const el = mode==='back' ? document.getElementById('cardBack') : cardRef.current
    if(!el) return
    const html2canvas=(await import('html2canvas-pro')).default
    const {jsPDF}=await import('jspdf')
    await document.fonts.ready
    const wrap=el.closest('.scale-wrap'); const pt=wrap.style.transform, pd=wrap.style.display
    wrap.style.transform='none'; wrap.style.display='block'; await new Promise(r=>setTimeout(r,80))
    const canvas=await html2canvas(el,{scale:4, backgroundColor:'#ffffff', useCORS:true})
    wrap.style.transform=pt; wrap.style.display=pd
    const pdf=new jsPDF({orientation:'landscape',unit:'mm',format:[85.6,53.98]})
    pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,0,85.6,53.98)
    pdf.save(`${(school.institute||'card').replace(/\s+/g,'_')}_${mode}.pdf`)
  }

  const openPanel=k=> setPanel(p=>p===k?null:k)
  const isOpen=k=> panel===k

  return (
    <div className="bg-paper text-slate-700 font-sans min-h-screen">
      <header className="print:hidden relative overflow-hidden bg-gradient-to-r from-darknavy via-navy to-royal text-white shadow-lg">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage:'repeating-linear-gradient(115deg, rgba(255,255,255,.09) 0 8px, transparent 8px 26px)'}}></div>
        <div className="relative z-10 max-w-[1500px] mx-auto px-5 md:px-8 py-6 flex items-center gap-4">
          <Link to="/" className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center shadow-md flex-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-darknavy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/></svg>
          </Link>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">Student ID Card Generator</h1>
            <p className="text-blue-100/80 text-sm mt-0.5">Editing: <b>{school.institute}</b> — everything stays in your browser.</p>
          </div>
          <Link to="/" className="ml-auto hidden md:block text-sm bg-white/15 hover:bg-white/25 px-4 py-2 rounded-lg">← Back to schools</Link>
        </div>
        <div className="relative z-10 h-1 bg-gold"></div>
      </header>

      <nav className="mrail print:hidden">
        <button className={`mrail-btn ${isOpen('inst')?'active':''}`} onClick={()=>openPanel('inst')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg><span>Institution</span></button>
        <button className={`mrail-btn ${isOpen('student')?'active':''}`} onClick={()=>openPanel('student')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg><span>Student</span></button>
        <button className={`mrail-btn ${isOpen('titlewm')?'active':''}`} onClick={()=>openPanel('titlewm')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/></svg><span>Title &amp; WM</span></button>
        <button className={`mrail-btn ${isOpen('contact')?'active':''}`} onClick={()=>openPanel('contact')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg><span>Contact</span></button>
        <button className={`mrail-btn ${isOpen('terms')?'active':''}`} onClick={()=>openPanel('terms')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"/></svg><span>Terms</span></button>
        <button className={`mrail-btn ${isOpen('uploads')?'active':''}`} onClick={()=>openPanel('uploads')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg><span>Uploads</span></button>
      </nav>

      <main className="max-w-[1500px] mx-auto px-5 md:px-8 md:pl-24 md:mr-[46%] py-6">
        <div className="print:hidden flex flex-wrap items-center gap-2.5 mb-5 rounded-xl bg-white border border-slate-200 shadow-sm px-4 py-3">
          <span className="text-sm font-bold text-slate-500 mr-auto hidden md:block">Actions</span>
          <button className="toolbar-btn btn-outline" onClick={()=>document.getElementById('previewArea')?.scrollIntoView({behavior:'smooth'})}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> Preview Card</button>
          <button className="toolbar-btn btn-print" onClick={()=>window.print()}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg> Print Card</button>
          <button className="toolbar-btn btn-png" onClick={()=>downloadPNG('front')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg> Download PNG</button>
          <button className="toolbar-btn btn-pdf" onClick={()=>downloadPDF('front')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> Download PDF</button>
          <button className="toolbar-btn btn-ghost ml-auto" onClick={()=>{ if(confirm('Reset this school?')){ localStorage.removeItem('cms_student_'+key); localStorage.removeItem('cms_photo_'+key); setStudent({name:'',klass:'',sex:'',dob:'',year:''}); setPhoto('') }}}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> Reset Student</button>
        </div>

        <div className="print:hidden flex items-center gap-2 mb-4">
          <div className="segmented bg-white border border-slate-200 rounded-xl p-1 flex gap-1 shadow-sm">
            <button className={`seg-btn ${view==='front'?'active':''}`} onClick={()=>setView('front')}>FRONT</button>
            <button className={`seg-btn ${view==='back'?'active':''}`} onClick={()=>setView('back')}>BACK</button>
            <button className={`seg-btn ${view==='both'?'active':''}`} onClick={()=>setView('both')}>FRONT &amp; BACK</button>
          </div>
          <span className="text-xs text-slate-400 hidden md:inline">Choose which side to preview</span>
        </div>

        <section id="previewSection">
          <div className="preview-title print:hidden">Live Preview <span className="text-[10px] font-semibold normal-case tracking-normal text-slate-400">updates automatically as you type</span></div>
          <div id="previewArea" ref={previewAreaRef} className="w-full">
            <div id="cardsRow">
              <div id="frontWrap" ref={frontWrapRef} className="scale-wrap">
                <div id="card" ref={cardRef} className={t.wave ? 'theme-shwemu' : ''}>
                  <div className="decor d1"></div><div className="decor d2"></div><div className="decor d3"></div><div className="decor d4"></div>
                  {t.wave && <React.Fragment><div className="top-ribbon"><svg viewBox="0 0 1080 44" preserveAspectRatio="none"><path fill="#1E2A5E" d="M0 0 H1080 V24 C900 42 760 10 560 26 C380 40 180 12 0 32 Z"/><path fill="#F59E0B" d="M0 0 H1080 V14 C900 30 760 2 560 16 C380 28 180 4 0 20 Z"/></svg></div><div className="bottom-wave"><svg viewBox="0 0 1080 56" preserveAspectRatio="none"><path fill="#1E2A5E" d="M0 56 H1080 V26 C900 10 760 40 560 24 C380 10 180 42 0 22 Z"/><path fill="#F59E0B" d="M0 56 H1080 V40 C900 26 760 52 560 38 C380 26 180 54 0 38 Z"/></svg></div></React.Fragment>}
                  <div className="watermark-wrap">{watermark ? <img alt="" src={watermark} style={{ width: wmSize+'%', opacity: wmOp/100, maxWidth:'58%', maxHeight:'58%', objectFit:'contain', display:'block', filter:'drop-shadow(0 0 8px rgba(100,132,231,0.12))', transform: 'translateY(91px)' }} /> : null}</div>
                  <div className="card-header">
                    <div className="logo-box">{leftLogo ? <img src={leftLogo} alt="" style={{maxWidth:'100%',maxHeight:'100%'}}/> : <div className="logo-ph"><span>LOGO</span></div>}</div>
                    <div className="header-center"><div className="h-min">{school.ministry}</div><div className="h-sub">{school.province}</div><div className="h-sub">{school.district}</div><div className="h-inst">{school.institute}</div></div>
                    <div className="logo-box">{rightLogo ? <img src={rightLogo} alt="" style={{maxWidth:'100%',maxHeight:'100%'}}/> : <div className="logo-ph"><span>LOGO</span></div>}</div>
                  </div>
                  <div className="title-banner">
                    <img className="banner-stripes" alt="" src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1080' height='92'%3E%3Cdefs%3E%3Cpattern id='p' width='46' height='92' patternUnits='userSpaceOnUse'%3E%3Crect width='46' height='92' fill='%23${t.colors.primary.replace('#','')}'/%3E%3Cpath d='M-12 92 L34 0' stroke='rgba(255,255,255,0.12)' stroke-width='12'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='1080' height='92' fill='url(%23p)'/%3E%3C/svg%3E`} />
                    <div id="elTitleShadow" aria-hidden="true" style={{display: t.wave?'none':'flex'}}>{title}</div>
                    <div id="elTitle">{title}</div>
                  </div>
                  <div className="card-body">
                    <div className="info-col">
                      <div className="info-row"><span className="lbl">Student Name</span><span className="val">{student.name||'-'}</span></div>
                      <div className="info-row"><span className="lbl">Class</span><span className="val">{student.klass||'-'}</span></div>
                      <div className="info-row"><span className="lbl">Sex</span><span className="val">{student.sex||'-'}</span></div>
                      <div className="info-row"><span className="lbl">Date of Birth</span><span className="val">{student.dob||'-'}</span></div>
                      <div className="info-row"><span className="lbl">Academic Year</span><span className="val">{student.year||'-'}</span></div>
                    </div>
                    <div className="photo-col"><div className="photo-frame" style={{borderColor: '#fff'}}>{photo ? <img src={photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/> : <div className="photo-ph"><span>PHOTO</span></div>}</div></div>
                  </div>
                  <div className="card-footer">
                    <div className="f-item"><div className="f-top"><span className="f-label">Date of Issue</span></div><div className="f-val">{contact.issue||'-'}</div></div>
                    <div className="f-item"><div className="f-top"><span className="f-label">Emergency Call</span></div><div className="f-val">{contact.phone||'-'}</div></div>
                    <div className="f-item"><div className="f-top"><span className="f-label">Date of Expiry</span></div><div className="f-val">{contact.expiry||'-'}</div></div>
                  </div>
                </div>
              </div>
              <div id="backWrap" ref={backWrapRef} className="scale-wrap" style={{display:'none'}}>
                <div id="cardBack" className={t.wave?'theme-shwemu':''}>
                  <div className="decor d5"></div><div className="decor d6"></div>
                  <div className="watermark-wrap">{watermark ? <img alt="" src={watermark} style={{width:wmSize+'%', opacity:wmOp/100, maxWidth:'58%', maxHeight:'58%', objectFit:'contain', display:'block'}} /> : null}</div>
                  <div className="bk-topline"></div>
                  <div className="bk-body">
                    <div className="bk-col"><div className="bk-head">TERMS &amp; CONDITIONS</div><div className="term-list">{terms.split('\n').filter(Boolean).map((l,i)=><div key={i} className="term-item"><span className="term-num">{i+1}</span><span>{l.replace('[INSTITUTION NAME]', school.institute)}</span></div>)}</div></div>
                    <div className="bk-col"><div className="bk-head">AUTHORIZED OFFICE</div><div className="auth-block"><p className="auth-kiny">Utoraguye iyi karita wayishyikiriza ubuyobozi bwa {school.institute}</p><p className="auth-eng">If found please return this card to the leader of {school.institute}</p></div></div>
                    <div className="bk-col"><div className="bk-head">CONTACT</div><div className="ct-list"><div className="ct-item"><span className="ct-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 10.5a3 3 0 11-6 0"/><path d="M19.5 10.5c0 7.1-7.5 11.25-7.5 11.25S4.5 17.6 4.5 10.5a7.5 7.5 0 1115 0z"/></svg></span><div><div className="ct-label">Location</div><div className="ct-val">{contact.location}</div></div></div><div className="ct-item"><span className="ct-ic"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25"/></svg></span><div><div className="ct-label">Email</div><div className="ct-val">{contact.email}</div></div></div></div></div>
                  </div>
                  <div className="back-wave"><svg viewBox="0 0 1080 38" preserveAspectRatio="none"><path fill="#FFD600" d="M0 26 C150 14 300 34 450 24 C600 14 780 32 1080 14 L1080 38 L0 38 Z"/><path fill="#002B52" d="M0 31 C170 18 340 38 520 28 C700 18 880 36 1080 22 L1080 38 L0 38 Z"/></svg></div>
                </div>
              </div>
            </div>
          </div>
          <p className="print:hidden text-center text-xs text-slate-400 mt-3">Card size: 85.6 × 54 mm (CR80) — ratio 1.586 : 1.</p>
        </section>
      </main>

      <nav className="rail print:hidden">
        <button className={`rail-btn ${isOpen('inst')?'active':''}`} data-panel="inst" onClick={()=>openPanel('inst')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg></button>
        <button className={`rail-btn ${isOpen('student')?'active':''}`} data-panel="student" onClick={()=>openPanel('student')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg></button>
        <button className={`rail-btn ${isOpen('titlewm')?'active':''}`} data-panel="titlewm" onClick={()=>openPanel('titlewm')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/></svg></button>
        <button className={`rail-btn ${isOpen('contact')?'active':''}`} data-panel="contact" onClick={()=>openPanel('contact')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg></button>
        <button className={`rail-btn ${isOpen('terms')?'active':''}`} data-panel="terms" onClick={()=>openPanel('terms')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"/></svg></button>
        <button className={`rail-btn ${isOpen('uploads')?'active':''}`} data-panel="uploads" onClick={()=>openPanel('uploads')}><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg></button>
      </nav>

      <aside className={`panel-pane ${isOpen('inst')?'open':''}`}><div className="panel-head"><span className="badge">1</span><div className="fieldset-title">Institution</div><button className="panel-close" onClick={()=>setPanel(null)}>✕</button></div><div className="p-5 space-y-3"><input className="field" value={school.institute} onChange={e=>setSchool(s=>({...s, institute:e.target.value}))} placeholder="Institution" /><input className="field" value={school.ministry} onChange={e=>setSchool(s=>({...s, ministry:e.target.value}))} placeholder="Ministry"/><div className="grid grid-cols-2 gap-2"><input className="field" value={school.province} onChange={e=>setSchool(s=>({...s, province:e.target.value}))} /><input className="field" value={school.district} onChange={e=>setSchool(s=>({...s, district:e.target.value}))} /></div></div></aside>
      <aside className={`panel-pane ${isOpen('student')?'open':''}`}><div className="panel-head"><span className="badge">2</span><div className="fieldset-title">Student — photo uploads here</div><button className="panel-close" onClick={()=>setPanel(null)}>✕</button></div><div className="p-5 space-y-2"><input className="field" placeholder="Name" value={student.name} onChange={e=>setStudent(s=>({...s, name:e.target.value}))}/><input className="field" placeholder="Class" value={student.klass} onChange={e=>setStudent(s=>({...s, klass:e.target.value}))}/><input className="field" placeholder="Sex" value={student.sex} onChange={e=>setStudent(s=>({...s, sex:e.target.value}))}/><input className="field" placeholder="DOB" value={student.dob} onChange={e=>setStudent(s=>({...s, dob:e.target.value}))}/><input className="field" placeholder="Year" value={student.year} onChange={e=>setStudent(s=>({...s, year:e.target.value}))}/><div className="mt-3 p-3 border-2 border-dashed rounded-xl bg-slate-50"><label className="text-xs font-bold">Student Photo — will appear on card</label><input type="file" accept="image/*" onChange={e=>onFile(e,setPhoto,true)} className="mt-2 block w-full text-sm" /><p className="text-xs text-slate-500 mt-1">Cropped to 232×298, centered. Max 5MB, JPG/PNG.</p>{photo && <img src={photo} alt="preview" className="mt-2 w-24 h-32 object-cover rounded-lg border" />}</div></div></aside>
      <aside className={`panel-pane ${isOpen('uploads')?'open':''}`}><div className="panel-head"><span className="badge">6</span><div className="fieldset-title">Uploads</div><button className="panel-close" onClick={()=>setPanel(null)}>✕</button></div><div className="p-5 space-y-3">
        <div><label className="text-xs font-bold flex items-center gap-2">Left Logo {leftLogo && <button onClick={()=>setLeftLogo('')} className="text-xs text-red-600">Remove</button>}</label><input type="file" accept="image/*" onChange={e=>onFile(e,setLeftLogo)} className="mt-1 block w-full text-sm" />{leftLogo && <img src={leftLogo} alt="left" className="mt-2 w-16 h-16 object-contain border rounded" />}</div>
        <div><label className="text-xs font-bold flex items-center gap-2">Right Logo {rightLogo && <button onClick={()=>setRightLogo('')} className="text-xs text-red-600">Remove</button>}</label><input type="file" accept="image/*" onChange={e=>onFile(e,setRightLogo)} className="mt-1 block w-full text-sm" />{rightLogo && <img src={rightLogo} alt="right" className="mt-2 w-16 h-16 object-contain border rounded" />}</div>
        <div><label className="text-xs font-bold flex items-center gap-2">Watermark — manual upload {watermark && <button onClick={()=>setWatermark('')} className="text-xs text-red-600">Remove</button>}</label><input type="file" accept="image/*" onChange={e=>onFile(e,setWatermark)} className="mt-1 block w-full text-sm" /><p className="text-xs text-slate-500 mt-1">Large, centered, 30% opacity. Will be flattened in download.</p>{watermark && <img src={watermark} alt="wm" className="mt-2 w-24 h-24 object-contain border rounded opacity-50" />}</div>
        <div><label className="text-xs font-bold flex items-center gap-2">Signature {signature && <button onClick={()=>setSignature('')} className="text-xs text-red-600">Remove</button>}</label><input type="file" accept="image/*" onChange={e=>onFile(e,setSignature)} className="mt-1 block w-full text-sm" />{signature && <img src={signature} alt="sig" className="mt-2 w-32 h-16 object-contain border rounded" />}</div>
      </div></aside>
      <aside className={`panel-pane ${isOpen('contact')?'open':''}`}><div className="panel-head"><span className="badge">4</span>Contact<button className="panel-close" onClick={()=>setPanel(null)}>✕</button></div><div className="p-5 space-y-2"><input className="field" value={contact.location} onChange={e=>setContact(c=>({...c, location:e.target.value}))} /><input className="field" value={contact.email} onChange={e=>setContact(c=>({...c, email:e.target.value}))} /><input className="field" value={contact.phone} onChange={e=>setContact(c=>({...c, phone:e.target.value}))} /><input type="date" className="field" value={contact.issue} onChange={e=>setContact(c=>({...c, issue:e.target.value}))} /><input type="date" className="field" value={contact.expiry} onChange={e=>setContact(c=>({...c, expiry:e.target.value}))} /></div></aside>
      <aside className={`panel-pane ${isOpen('titlewm')?'open':''}`}><div className="panel-head"><span className="badge">3</span>Title<button className="panel-close" onClick={()=>setPanel(null)}>✕</button></div><div className="p-5"><input className="field" value={title} onChange={e=>setTitle(e.target.value)} /></div></aside>
      <aside className={`panel-pane ${isOpen('terms')?'open':''}`}><div className="panel-head"><span className="badge">5</span>Terms<button className="panel-close" onClick={()=>setPanel(null)}>✕</button></div><div className="p-5"><textarea className="field" rows="6" value={terms} onChange={e=>setTerms(e.target.value)} /></div></aside>
    </div>
  )
}

function Home(){
  const schools=[
    {id:'cbg', name:'College Baptiste Gacuba II TVET School', short:'CBG', color:'#003B73'},
    {id:'gs-gacuba-ii', name:'GS GACUBA II', short:'G2', color:'#0ea5e9'},
    {id:'busasamana', name:'BUSASAMANA', short:'BA', color:'#10b981'},
    {id:'bumba-tvet', name:'BUMBA TVET', short:'BU', color:'#f59e0b'},
    {id:'shwemu-tss-b', name:'SHWEMU TSS B', short:'SH', color:'#1E2A5E'},
    {id:'gs-busigari', name:'GS BUSIGARI', short:'GB', color:'#e11d48'},
    {id:'trinite', name:'Groupe Scolaire de la Trinite', short:'TR', color:'#1d4ed8'},
  ]
  return (
    <div style={{minHeight:'100vh', background:'linear-gradient(135deg, #002B52 0%, #003B73 45%, #1746D1 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:'28px 20px'}}>
      <div style={{width:'100%', maxWidth:1180}}>
        <div style={{textAlign:'center', color:'#fff', marginBottom:34}}>
          <h1 style={{fontSize:'clamp(26px, 4vw, 40px)', fontWeight:800}}>Student ID Card Generator</h1>
          <p style={{marginTop:10, color:'rgba(255,255,255,.75)'}}>Choose which school card you want to work on</p>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px,1fr))', gap:22}}>
          {schools.map(s=>(
            <Link key={s.id} to={`/editor/${s.id}`} style={{textDecoration:'none', background:'#fff', borderRadius:20, padding:'26px 24px', display:'block'}}>
              <div style={{width:62,height:62,borderRadius:16,background:s.color,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,marginBottom:16}}>{s.short}</div>
              <h2 style={{fontSize:17,fontWeight:800,color:'#0f172a'}}>{s.name}</h2>
              <span style={{marginTop:18, display:'inline-flex', gap:8, fontWeight:800, color:s.color}}>Open →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:schoolId" element={<Editor />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
