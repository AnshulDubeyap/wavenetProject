import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <Link to="/" className="brand">
          Invoice System
        </Link>
        {user && (
          <nav className="nav-links">
            <NavLink to="/invoices" className="nav-link">
              Invoices
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
          </nav>
        )}
        <div className="auth-section">
          {user ? (
            <>
              <span className="user-badge">
                {user.name} ({user.role})
              </span>
              <button onClick={handleLogout} className="button small">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="button small">
              Login
            </Link>
          )}
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
