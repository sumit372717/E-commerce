export interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

export function getStoredUser(): User | null {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('auth_user')
    if (user) {
      try {
        return JSON.parse(user)
      } catch {
        return null
      }
    }
  }
  return null
}

export function setStoredUser(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_user', JSON.stringify(user))
  }
}

export function clearStoredUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_user')
  }
}