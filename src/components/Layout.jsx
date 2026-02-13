import { NavLink, Outlet } from 'react-router-dom'
import Breadcrumbs from './Breadcrumbs'

export default function Layout({ isAuthenticated, onLogout }) {
  const activeClass = ({ isActive }) => (isActive ? 'nav-pill active-pill' : 'nav-pill')

  return (
    <div className="shell-grid">
      <aside className="sidebar">
        <div className="brand-card">
          <span className="brand-tag">Student Build</span>
          <h1>23BAI70639.fullstack</h1>
          <p>Routing Studio • Experiment 3</p>
        </div>

        <div className="status-card">
          <p className="small-label">Session</p>
          <h3>{isAuthenticated ? 'Authenticated' : 'Guest Access'}</h3>
          <p className="muted">Protected route: Dashboard</p>
        </div>
      </aside>

      <section className="content-area">
        <header className="content-header">
          <nav className="pill-nav">
            <NavLink to="/" className={activeClass} end>
              Home
            </NavLink>
            <NavLink to="/about" className={activeClass}>
              About
            </NavLink>
            <NavLink to="/products" className={activeClass}>
              Products
            </NavLink>
            <NavLink to="/contact" className={activeClass}>
              Contact
            </NavLink>
            <NavLink to="/dashboard" className={activeClass}>
              Dashboard
            </NavLink>
            {isAuthenticated ? (
              <button onClick={onLogout} className="nav-pill logout-btn" type="button">
                Logout
              </button>
            ) : (
              <NavLink to="/login" className={activeClass}>
                Login
              </NavLink>
            )}
          </nav>
          <Breadcrumbs />
        </header>

        <main className="page-panel">
          <Outlet />
        </main>
      </section>
    </div>
  )
}
