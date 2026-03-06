import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice'
import FilterBar from '../components/FilterBar'

const allProducts = [
  { id: 101, name: 'Router Starter Kit', category: 'Routing', price: 29 },
  { id: 102, name: 'Dynamic Params Pack', category: 'Routing', price: 19 },
  { id: 103, name: 'Protected Route Shield', category: 'Security', price: 39 },
  { id: 104, name: 'Context API Toolkit', category: 'State', price: 24 },
  { id: 105, name: 'Redux State Engine', category: 'State', price: 34 },
  { id: 106, name: 'useMemo Optimizer', category: 'Performance', price: 15 },
]

export default function Products() {
  const [search, setSearch] = useState('')

  // Redux Toolkit — useSelector reads favorites from Redux store
  const favorites = useSelector((state) => state.favorites.items)
  // Redux Toolkit — useDispatch lets us trigger slice actions
  const dispatch = useDispatch()

  // useMemo: recompute filtered list only when search string changes
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return allProducts
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
    )
  }, [search])

  // useMemo: derive Set of saved IDs; recompute only when favorites change
  const favIds = useMemo(() => new Set(favorites.map((f) => f.id)), [favorites])

  const toggleFav = (product) => {
    if (favIds.has(product.id)) {
      dispatch(removeFavorite(product.id))
    } else {
      dispatch(addFavorite(product))
    }
  }

  return (
    <section className="page-block">
      <h2>Products</h2>
      <p className="muted">
        Browse items and save them to favourites. Filtered list is memoized via{' '}
        <code>useMemo</code>; saves are dispatched to the{' '}
        <code>Redux</code> store.
      </p>
      <FilterBar
        value={search}
        onChange={setSearch}
        placeholder="Search by name or category…"
      />
      <div className="product-grid">
        {filtered.map((product) => (
          <article className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p className="category-badge">{product.category}</p>
            <p className="price-tag">${product.price}</p>
            <div className="card-actions">
              <Link to={`/products/${product.id}`}>View Details</Link>
              <button
                type="button"
                className={`fav-btn ${favIds.has(product.id) ? 'fav-active' : ''}`}
                onClick={() => toggleFav(product)}
              >
                {favIds.has(product.id) ? '★ Saved' : '☆ Save'}
              </button>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="muted empty-msg">No products match your search.</p>
        )}
      </div>
    </section>
  )
}

