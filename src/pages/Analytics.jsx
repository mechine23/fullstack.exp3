import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFavorite, clearFavorites } from '../redux/slices/favoritesSlice'
import { useAppContext } from '../context/AppContext'

export default function Analytics() {
  // Redux Toolkit — read favorites from store
  const favorites = useSelector((state) => state.favorites.items)
  const dispatch = useDispatch()

  // useContext — user profile lives in Context
  const { user } = useAppContext()
  const navigate = useNavigate()

  // useMemo: derive full summary from favorites only when favorites list changes
  const stats = useMemo(() => {
    const total = favorites.length
    const totalValue = favorites.reduce((sum, f) => sum + (f.price ?? 0), 0)
    const avgPrice = total > 0 ? (totalValue / total).toFixed(2) : '0.00'

    const categories = favorites.reduce((acc, f) => {
      acc[f.category] = (acc[f.category] ?? 0) + 1
      return acc
    }, {})

    const topCategory =
      Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'

    return { total, totalValue, avgPrice, categories, topCategory }
  }, [favorites])

  return (
    <section className="page-block">
      <div className="analytics-hero">
        <div>
          <h2>Analytics — Saved Products</h2>
          <p className="muted">
            All summary data is derived via <code>useMemo</code> from{' '}
            <strong>{user.name}</strong>'s favourites list stored in the{' '}
            <code>Redux</code> store.
          </p>
        </div>
        {favorites.length > 0 && (
          <button
            type="button"
            className="btn-danger"
            onClick={() => dispatch(clearFavorites())}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Summary stat cards */}
      <div className="stat-grid">
        <article className="feature-card stat-card accent-context">
          <p className="stat-label">Total Saved</p>
          <p className="stat-value">{stats.total}</p>
        </article>
        <article className="feature-card stat-card accent-reducer">
          <p className="stat-label">Total Value</p>
          <p className="stat-value">${stats.totalValue}</p>
        </article>
        <article className="feature-card stat-card accent-memo">
          <p className="stat-label">Avg. Price</p>
          <p className="stat-value">${stats.avgPrice}</p>
        </article>
        <article className="feature-card stat-card">
          <p className="stat-label">Top Category</p>
          <p className="stat-value">{stats.topCategory}</p>
        </article>
      </div>

      {favorites.length > 0 ? (
        <>
          {/* Category breakdown bar chart */}
          <h3 className="section-subtitle">Category Breakdown</h3>
          <div className="category-breakdown">
            {Object.entries(stats.categories).map(([cat, count]) => (
              <div className="cat-row" key={cat}>
                <span className="cat-name">{cat}</span>
                <div className="cat-track">
                  <div
                    className="cat-bar"
                    style={{ width: `${(count / stats.total) * 100}%` }}
                  />
                </div>
                <span className="cat-count">{count}</span>
              </div>
            ))}
          </div>

          {/* Saved items list */}
          <h3 className="section-subtitle">Saved Items</h3>
          <div className="product-grid">
            {favorites.map((f) => (
              <article className="product-card" key={f.id}>
                <h3>{f.name}</h3>
                <p className="category-badge">{f.category}</p>
                <p className="price-tag">${f.price}</p>
                <div className="card-actions">
                  <button
                    type="button"
                    className="fav-btn fav-remove"
                    onClick={() =>
                      dispatch(removeFavorite(f.id))
                    }
                  >
                    ✕ Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="feature-card empty-state">
          <p className="muted">
            Nothing saved yet. Head to <strong>Products</strong> and click{' '}
            <strong>☆ Save</strong> on any item.
          </p>
          <button type="button" onClick={() => navigate('/products')}>
            Browse Products
          </button>
        </div>
      )}

      {/* Reducer actions legend */}
      <div className="reducer-legend">
        <h3 className="section-subtitle">Redux Toolkit Actions in This Page</h3>
        <div className="feature-grid">
          {[
            { action: 'addFavorite', where: 'Products page', desc: 'Dispatches product into Redux store' },
            { action: 'removeFavorite', where: 'Analytics page', desc: 'Removes single product from store' },
            { action: 'clearFavorites', where: 'Analytics page', desc: 'Empties the entire favorites list' },
          ].map(({ action, where, desc }) => (
            <article className="feature-card" key={action}>
              <p className="action-tag">{action}</p>
              <p className="muted" style={{ margin: '4px 0 0' }}>
                <em>{where}</em> — {desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
