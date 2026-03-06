import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Breadcrumbs from './Breadcrumbs'
import ThemeToggle from './ThemeToggle'
import { useAppContext } from '../context/AppContext'

export default function Layout({ isAuthenticated, onLogout }) {
  const { theme } = useAppContext()
  // Redux Toolkit — read derived count directly from the store
  const favCount = useSelector((state) => state.favorites.items.length)
  const activeClass = ({ isActive }) => (isActive ? 'nav-pill active-pill' : 'nav-pill')

  return (
    <div className="shell-grid" data-theme={theme}>
      <aside className="sidebar">
        <div className="brand-card">
          <span className="brand-tag">Student Build</span>
          <h1>23BAI70639.fullstack</h1>
          <p>Routing Studio • Experiment&nbsp;5</p>
        </div>

        <div className="status-card">
          <p className="small-label">Session</p>
          <h3>{isAuthenticated ? 'Authenticated' : 'Guest Access'}</h3>
          <p className="muted">Protected route: Dashboard</p>
        </div>

        <div className="status-card">
          <p className="small-label">Favourites</p>
          <h3 className="fav-count-display">{favCount}</h3>
          <p className="muted">saved product{favCount !== 1 ? 's' : ''}</p>
        </div>

        <div className="status-card hooks-card">
          <p className="small-label">Exp 5 Stack</p>
          <ul className="hook-list">
            <li><span className="hook-badge context">useContext</span></li>
            <li><span className="hook-badge reducer">Redux Toolkit</span></li>
            <li><span className="hook-badge memo">useMemo</span></li>
          </ul>
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
            <NavLink to="/analytics" className={activeClass}>
              Analytics
              {favCount > 0 && <span className="nav-badge">{favCount}</span>}
            </NavLink>
            <NavLink to="/reports" className={activeClass}>
              Reports
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
            <ThemeToggle />
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
