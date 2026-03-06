import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAppContext } from '../context/AppContext'

export default function Home() {
  const navigate = useNavigate()
  const { user, theme } = useAppContext()
  // Redux Toolkit — derive count from store
  const favCount = useSelector((state) => state.favorites.items.length)

  return (
    <section className="page-block">
      <h2>SPA Routing Lab — Exp&nbsp;5 Enhanced</h2>
      <p className="muted">
        Welcome, <strong>{user.name}</strong> ({user.role})! Active theme:{' '}
        <strong>{theme}</strong>. Saved products: <strong>{favCount}</strong>.
      </p>

      <div className="feature-grid">
        <article className="feature-card accent-context">
          <h3>useContext</h3>
          <p>
            Global theme, user profile, and favourites shared across all components via the{' '}
            <code>AppContext</code> provider.
          </p>
        </article>
        <article className="feature-card accent-reducer">
          <h3>Redux Toolkit</h3>
          <p>
            Scalable store via <code>configureStore</code>. Slice actions:
            <code>addFavorite</code>, <code>removeFavorite</code>,{' '}
            <code>clearFavorites</code>.
          </p>
        </article>
        <article className="feature-card accent-memo">
          <h3>useMemo</h3>
          <p>
            Filtered product list and Analytics summary stats are memoized to skip
            redundant recomputation on unrelated re-renders.
          </p>
        </article>
        <article className="feature-card">
          <h3>Dynamic Route</h3>
          <p>Test URL parameter handling with <strong>/products/:id</strong>.</p>
        </article>
        <article className="feature-card">
          <h3>Protected Route</h3>
          <p>Try opening dashboard before login to see the auth guard redirect.</p>
        </article>
        <article className="feature-card">
          <h3>Programmatic Nav</h3>
          <p>Button-triggered navigation via <strong>useNavigate</strong>.</p>
        </article>
      </div>

      <div className="btn-row">
        <button type="button" onClick={() => navigate('/products/101')}>
          Open Product 101
        </button>
        <button type="button" className="btn-secondary" onClick={() => navigate('/analytics')}>
          View Analytics
        </button>
        <button type="button" className="btn-reports" onClick={() => navigate('/reports')}>
          View Reports
        </button>
      </div>
    </section>
  )
}
