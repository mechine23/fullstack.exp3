import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFavorite, clearFavorites } from '../redux/slices/favoritesSlice'
import { useAppContext } from '../context/AppContext'
import FilterBar from '../components/FilterBar'

// Full catalogue used to calculate coverage metrics
const CATALOGUE = [
  { id: 101, name: 'Router Starter Kit',    category: 'Routing',      price: 29 },
  { id: 102, name: 'Dynamic Params Pack',   category: 'Routing',      price: 19 },
  { id: 103, name: 'Protected Route Shield',category: 'Security',     price: 39 },
  { id: 104, name: 'Context API Toolkit',   category: 'State',        price: 24 },
  { id: 105, name: 'Redux State Engine',    category: 'State',        price: 34 },
  { id: 106, name: 'useMemo Optimizer',     category: 'Performance',  price: 15 },
]
const CATALOGUE_MAP = Object.fromEntries(CATALOGUE.map((p) => [p.id, p]))

export default function Reports() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name') // 'name' | 'price' | 'category'

  // Redux Toolkit — read favorites from the store
  const favorites = useSelector((state) => state.favorites.items)
  const dispatch = useDispatch()

  // useContext — user profile and theme live in AppContext
  const { user, theme } = useAppContext()

  // ── useMemo: filtered + sorted list ─────────────────────────────
  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase()
    const base = q
      ? favorites.filter(
          (f) =>
            f.name.toLowerCase().includes(q) ||
            f.category.toLowerCase().includes(q),
        )
      : favorites

    return [...base].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'category') return a.category.localeCompare(b.category)
      return a.name.localeCompare(b.name)
    })
  }, [favorites, search, sortBy])

  // ── useMemo: derived report metrics ─────────────────────────────
  const report = useMemo(() => {
    const savedIds = new Set(favorites.map((f) => f.id))
    const savedTotal = favorites.reduce((s, f) => s + f.price, 0)
    const catalogueTotal = CATALOGUE.reduce((s, p) => s + p.price, 0)
    const coverage = CATALOGUE.length > 0
      ? Math.round((savedIds.size / CATALOGUE.length) * 100)
      : 0
    const savings = catalogueTotal - savedTotal

    // category subtotals over the filtered list
    const byCategory = filteredItems.reduce((acc, f) => {
      if (!acc[f.category]) acc[f.category] = { count: 0, value: 0 }
      acc[f.category].count += 1
      acc[f.category].value += f.price
      return acc
    }, {})

    return { savedTotal, catalogueTotal, coverage, savings, byCategory, savedIds }
  }, [favorites, filteredItems])

  return (
    <section className="page-block">
      {/* ── Header ── */}
      <div className="analytics-hero">
        <div>
          <h2>Reports &amp; Insights</h2>
          <p className="muted">
            Detailed breakdown for <strong>{user.name}</strong> ({user.role}).
            State from <code>Redux</code> store; metrics via <code>useMemo</code>;
            theme <code>{theme}</code> from <code>useContext</code>.
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

      {/* ── KPI cards ── */}
      <div className="stat-grid">
        <article className="feature-card stat-card accent-context">
          <p className="stat-label">Saved Items</p>
          <p className="stat-value">{favorites.length}</p>
        </article>
        <article className="feature-card stat-card accent-reducer">
          <p className="stat-label">Total Value</p>
          <p className="stat-value">${report.savedTotal}</p>
        </article>
        <article className="feature-card stat-card accent-memo">
          <p className="stat-label">Catalogue Coverage</p>
          <p className="stat-value">{report.coverage}%</p>
        </article>
        <article className="feature-card stat-card">
          <p className="stat-label">Unsaved Value</p>
          <p className="stat-value">${report.savings}</p>
        </article>
      </div>

      {/* ── Coverage bar ── */}
      <h3 className="section-subtitle">Catalogue Coverage</h3>
      <div className="coverage-track">
        <div
          className="coverage-bar"
          style={{ width: `${report.coverage}%` }}
          title={`${report.coverage}%`}
        >
          {report.coverage > 8 && (
            <span className="coverage-label">{report.coverage}%</span>
          )}
        </div>
      </div>
      <p className="muted coverage-hint">
        {favorites.length} of {CATALOGUE.length} products saved
      </p>

      {favorites.length > 0 ? (
        <>
          {/* ── Category subtotals table ── */}
          <h3 className="section-subtitle">Category Breakdown</h3>
          <div className="report-table">
            <div className="rt-head rt-row">
              <span>Category</span>
              <span>Items</span>
              <span>Value</span>
              <span>Avg</span>
            </div>
            {Object.entries(report.byCategory).map(([cat, { count, value }]) => (
              <div className="rt-row" key={cat}>
                <span className="rt-cat">{cat}</span>
                <span>{count}</span>
                <span>${value}</span>
                <span>${(value / count).toFixed(2)}</span>
              </div>
            ))}
            {Object.keys(report.byCategory).length === 0 && (
              <div className="rt-row rt-empty">
                <span>No results match your search.</span>
              </div>
            )}
          </div>

          {/* ── Items list with filter + sort ── */}
          <h3 className="section-subtitle">Saved Items List</h3>
          <div className="reports-controls">
            <FilterBar
              value={search}
              onChange={setSearch}
              placeholder="Filter saved items…"
            />
            <div className="sort-row">
              <span className="sort-label">Sort by:</span>
              {['name', 'price', 'category'].map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`sort-btn nav-pill ${sortBy === s ? 'active-pill' : ''}`}
                  onClick={() => setSortBy(s)}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredItems.map((f) => (
              <article className="product-card" key={f.id}>
                <h3>{f.name}</h3>
                <p className="category-badge">{f.category}</p>
                <p className="price-tag">${f.price}</p>
                <div className="card-actions">
                  <button
                    type="button"
                    className="fav-btn fav-remove"
                    onClick={() => dispatch(removeFavorite(f.id))}
                  >
                    ✕ Remove
                  </button>
                </div>
              </article>
            ))}
            {filteredItems.length === 0 && (
              <p className="muted empty-msg">No saved items match your filter.</p>
            )}
          </div>
        </>
      ) : (
        <div className="feature-card empty-state">
          <p className="muted">
            Nothing saved yet. Head to <strong>Products</strong> and save some items.
          </p>
        </div>
      )}

      {/* ── Catalogue overview ── */}
      <h3 className="section-subtitle">Full Catalogue Overview</h3>
      <div className="report-table">
        <div className="rt-head rt-row">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Status</span>
        </div>
        {CATALOGUE.map((p) => (
          <div className="rt-row" key={p.id}>
            <span>{p.name}</span>
            <span className="rt-cat">{p.category}</span>
            <span>${p.price}</span>
            <span>
              {report.savedIds.has(p.id) ? (
                <span className="status-saved">✓ Saved</span>
              ) : (
                <span className="status-unsaved">— Not saved</span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* ── Tech stack legend ── */}
      <div className="reducer-legend">
        <h3 className="section-subtitle">Experiment 5 — Tech Used in This Page</h3>
        <div className="feature-grid">
          {[
            {
              badge: 'useSelector',
              cls: 'context',
              where: 'favorites, coverage, subtotals',
              desc: 'Reads Redux store state reactively',
            },
            {
              badge: 'useDispatch',
              cls: 'reducer',
              where: 'Remove / Clear buttons',
              desc: 'Triggers removeFavorite & clearFavorites actions',
            },
            {
              badge: 'useMemo',
              cls: 'memo',
              where: 'filteredItems, report object',
              desc: 'Recomputes only when favorites, search, or sort change',
            },
            {
              badge: 'useContext',
              cls: 'context',
              where: 'user.name, theme display',
              desc: 'Reads AppContext for profile & theme data',
            },
          ].map(({ badge, cls, where, desc }) => (
            <article className="feature-card" key={badge}>
              <p className="action-tag">
                <span className={`hook-badge ${cls}`}>{badge}</span>
              </p>
              <p className="muted" style={{ margin: '6px 0 0', fontSize: '0.87rem' }}>
                <em>{where}</em><br />{desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
