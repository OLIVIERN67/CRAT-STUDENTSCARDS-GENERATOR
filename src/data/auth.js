export const AUTH_USERS = [
  { phone: '+250785599926', password: 'CRAT@2026' },
  { phone: '+250786 718 716', password: 'CRAT@2026' },
]

export const AUTH_USERS_STORAGE_KEY = 'crat-auth-users'
export const AUTH_SESSION_STORAGE_KEY = 'crat-auth-session'

export function normalizePhone(phone) {
  return phone.replace(/\D/g, '')
}