import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import api from '../api/client'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const timezoneOffsetMinutes = new Date().getTimezoneOffset()

      const { data } = await api.post('/auth/login', {
        email,
        password,
        timezoneOffsetMinutes,
      })

      login(data.user, null)
      navigate('/invoices')
    } catch (err) {
      const message = err?.response?.data?.message || 'Login failed'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <label className="form-label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </label>
          <label className="form-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />
          </label>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="button primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
export default LoginPage
