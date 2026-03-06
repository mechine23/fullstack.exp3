import { useAppContext } from '../context/AppContext'

export default function About() {
  const { user } = useAppContext()

  const exp3 = [
    'Nested routes with React Router v6',
    'Active NavLink styling',
    'Dynamic URL params (/products/:id)',
    'Programmatic navigation (useNavigate)',
    'Auth-guard protected route',
    '404 Not Found fallback',
  ]

  const exp4 = [
    'Global state via Context API (useContext)',
    'State management with useReducer (migrated to Redux)',
    'Derived data memoization with useMemo',
    'Analytics page with live stats + category chart',
    'Dark / Light theme toggle via Context',
    'Live product search + favourites system',
  ]

  const exp5 = [
    'Redux Toolkit — configureStore + createSlice',
    'Three slice actions: addFavorite, removeFavorite, clearFavorites',
    'useSelector (read store) + useDispatch (trigger actions) in 4+ components',
    'New Reports page with KPIs, coverage bar, sortable table',
    'useMemo recomputes filteredItems & report stats independently',
    'Context still handles theme + user profile (separation of concerns)',
  ]

  return (
    <section className="page-block">
      <h2>About this Project</h2>
      <p className="muted">
        Built as <strong>23BAI70639.fullstack</strong> — now enhanced through{' '}
        <strong>Experiment 5</strong>. Currently logged in as{' '}
        <strong>{user.name}</strong> ({user.role}).
      </p>

      <div className="feature-grid">
        <article className="feature-card">
          <h3>Experiment 3 — React Router</h3>
          <ul className="concept-list">
            {exp3.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </article>
        <article className="feature-card accent-context">
          <h3>Experiment 4 — Hooks &amp; State</h3>
          <ul className="concept-list">
            {exp4.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </article>
        <article className="feature-card accent-memo">
          <h3>Experiment 5 — Redux Toolkit</h3>
          <ul className="concept-list">
            {exp5.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </article>
      </div>
    </section>
  )
}
