import { Link } from 'react-router-dom'

const schools = [
  { id: 'cbg', name: 'College Baptiste Gacuba II TVET School', short: 'CBG', color: '#003B73', accent: '#FFD600', desc: 'Full card editor — front & back, HD PNG & PDF, print. Data isolated for this school.' },
  { id: 'gs-gacuba-ii', name: 'GS GACUBA II', short: 'G2', color: '#0ea5e9', desc: 'Standalone card editor for GS GACUBA II — isolated data.' },
  { id: 'busasamana', name: 'GS BUSASAMANA', short: 'BA', color: '#10b981', desc: 'Standalone card editor for BUSASAMANA.' },
  { id: 'bumba-tvet', name: 'BUMBA TVET', short: 'BU', color: '#f59e0b', desc: 'Standalone card editor for BUMBA TVET.' },
  { id: 'shwemu-tss-b', name: 'SHWEMU TSS B', short: 'SH', color: '#1E2A5E', accent2: '#F59E0B', desc: 'Modern wave design (navy/orange) — standalone, isolated data.', wave: true },
  { id: 'gs-busigari', name: 'GS BUSIGARI', short: 'GB', color: '#e11d48', desc: 'Standalone card editor for GS BUSIGARI.' },
  { id: 'trinite', name: 'Groupe Scolaire de la Trinite', short: 'TR', color: '#1d4ed8', desc: 'Single-card editor — update student details, upload photo and logo, then download JPG or print.' },
]

export default function Home({ onLogout }) {
  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      background: 'linear-gradient(135deg, #002B52 0%, #003B73 45%, #1746D1 100%)',
      backgroundImage: 'radial-gradient(circle at 85% 15%, rgba(255,214,0,.14), transparent 42%), radial-gradient(circle at 10% 90%, rgba(197,251,48,.10), transparent 40%), linear-gradient(135deg, #002B52 0%, #003B73 45%, #1746D1 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 20px'
    }}>
      <button type="button" onClick={onLogout} style={{ position: 'absolute', top: 18, right: 20, padding: '9px 14px', border: '1px solid rgba(255,255,255,.45)', borderRadius: 8, background: 'rgba(255,255,255,.12)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Sign out</button>
      <div style={{ width: '100%', maxWidth: 1180 }}>
        <div style={{ textAlign: 'center', color: '#fff', marginBottom: 34 }}>
          <div style={{ width: 74, height: 74, margin: '0 auto 16px', borderRadius: 20, background: '#FFD600', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(0,0,0,.35)' }}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 40, height: 40, color: '#002B52' }}><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338-2.012z" /></svg>
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.01em' }}>Student ID Card Generator</h1>
          <p style={{ marginTop: 10, fontSize: 15, color: 'rgba(255,255,255,.75)' }}>Choose which school card you want to work on — each school has its own folder and isolated data</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 22 }}>
          {schools.map(s => (
            <Link key={s.id} to={`/editor/${s.id}`} style={{ textDecoration: 'none', background: '#fff', borderRadius: 20, padding: '26px 24px 22px', border: '1px solid rgba(255,255,255,.6)', boxShadow: '0 18px 44px rgba(0,10,30,.35)', position: 'relative', overflow: 'hidden', display: 'block', transition: 'transform .18s' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: s.wave ? 'linear-gradient(90deg, #1E2A5E, #F59E0B)' : `linear-gradient(90deg, ${s.color}, #60a5fa)` }} />
              <div style={{ width: 62, height: 62, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 19, marginBottom: 16, background: s.color, color: s.wave ? s.accent2 : '#fff', border: s.wave ? `2px solid ${s.accent2}` : 'none' }}>{s.short}</div>
              <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>{s.name}</h2>
              <div style={{ marginTop: 3, fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: s.color }}>{s.wave ? 'Wave Design — Standalone' : 'Standalone'}</div>
              <p style={{ marginTop: 12, fontSize: 13.5, lineHeight: 1.55, color: '#64748b' }}>{s.desc}</p>
              <span style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13.5, fontWeight: 800, color: s.color }}>Open {s.short}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ width: 17, height: 17 }}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" /></svg>
              </span>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 26, textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,.55)' }}>Everything runs locally in your browser — no data is uploaded to any server. Each school folder is isolated.</div>
      </div>
    </div>
  )
}
