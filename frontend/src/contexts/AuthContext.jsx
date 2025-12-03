import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const login = async (email, password) => {
    try {
      setLoading(true)
      const timezoneOffsetMinutes = new Date().getTimezoneOffset()
      const { data } = await api.post('/auth/login', {
        email,
        password,
        timezoneOffsetMinutes,
      })
      setUser(data.user)
      return data.user
    } catch (err) {
      console.error('Login error:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setUser(null)
      navigate('/login')
    }
  }

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const { data } = await api.get('/auth/me')
        setUser(data.user)
      } catch (err) {
        console.error('Failed to load current user:', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadCurrentUser()
  }, [])

  const value = { user, loading, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// useAuth hook has been moved to useAuth.js
