import { useState, useEffect } from 'react'

export function useLocalState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw === null) return initialValue
      try { return JSON.parse(raw) } catch { return raw }
    } catch { return initialValue }
  })

  useEffect(() => {
    try {
      if (value === '' || value === null || value === undefined) localStorage.removeItem(key)
      else localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
    } catch {}
  }, [key, value])

  return [value, setValue]
}