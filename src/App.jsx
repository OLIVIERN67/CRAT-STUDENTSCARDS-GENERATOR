import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './card.css'
import Home from './pages/Home'
import Editor from './pages/Editor'
import { AUTH_SESSION_STORAGE_KEY, AUTH_USERS, AUTH_USERS_STORAGE_KEY, normalizePhone } from './data/auth'

function getSavedSession() {
  try {
    const saved = JSON.parse(localStorage.getItem(AUTH_SESSION_STORAGE_KEY))
    return AUTH_USERS.find(user => user.phone === saved?.phone) || null
  } catch {
    return null
  }
}

function Login({ onLogin }) {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const user = AUTH_USERS.find(account =>
      normalizePhone(account.phone) === normalizePhone(phone) && account.password === password,
    )

    if (!user) {
      setError('Phone number or password is incorrect.')
      return
    }

    onLogin(user)
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 20, background: 'linear-gradient(135deg, #002B52 0%, #003B73 55%, #1746D1 100%)' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 24px 60px rgba(0,10,30,.32)' }}>
        <div style={{ color: '#003B73', fontSize: 13, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase' }}>CRAT Student Cards</div>
        <h1 style={{ marginTop: 8, fontSize: 28, fontWeight: 800, color: '#0f172a' }}>Sign in</h1>
        <p style={{ marginTop: 6, color: '#64748b', fontSize: 14 }}>Enter your registered phone number and password.</p>
        <label style={{ display: 'block', marginTop: 24, fontSize: 13, fontWeight: 700, color: '#334155' }}>
          Phone number
          <input autoComplete="tel" inputMode="tel" required value={phone} onChange={event => setPhone(event.target.value)} placeholder="+250..." style={{ boxSizing: 'border-box', width: '100%', marginTop: 7, padding: '12px 13px', border: '1px solid #cbd5e1', borderRadius: 8, font: 'inherit' }} />
        </label>
        <label style={{ display: 'block', marginTop: 16, fontSize: 13, fontWeight: 700, color: '#334155' }}>
          Password
          <input autoComplete="current-password" required type="password" value={password} onChange={event => setPassword(event.target.value)} style={{ boxSizing: 'border-box', width: '100%', marginTop: 7, padding: '12px 13px', border: '1px solid #cbd5e1', borderRadius: 8, font: 'inherit' }} />
        </label>
        {error && <p role="alert" style={{ marginTop: 12, color: '#b91c1c', fontSize: 13 }}>{error}</p>}
        <button type="submit" style={{ width: '100%', marginTop: 22, padding: '12px 16px', border: 0, borderRadius: 8, background: '#003B73', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Sign in</button>
      </form>
    </main>
  )
}

export default function App() {
  const [users] = useState(() => {
    try {
      localStorage.setItem(AUTH_USERS_STORAGE_KEY, JSON.stringify(AUTH_USERS))
    } catch {}
    return AUTH_USERS
  })
  const [authenticatedUser, setAuthenticatedUser] = useState(() => getSavedSession())

  function handleLogin(user) {
    setAuthenticatedUser(user)
    try {
      localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify({ phone: user.phone }))
    } catch {}
  }

  function handleLogout() {
    setAuthenticatedUser(null)
    try {
      localStorage.removeItem(AUTH_SESSION_STORAGE_KEY)
    } catch {}
  }

  if (!authenticatedUser || !users.some(user => user.phone === authenticatedUser.phone)) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home onLogout={handleLogout} />} />
        <Route path="/editor/:schoolId" element={<Editor />} />
        <Route path="*" element={<Home onLogout={handleLogout} />} />
      </Routes>
    </BrowserRouter>
  )
}