import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <section className="page-block">
      <h2>SPA Routing Lab</h2>
      <p className="muted">
        This version demonstrates client-side navigation with a new fullstack-themed dashboard layout.
      </p>

      <div className="feature-grid">
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
          <p>Use button-triggered navigation powered by <strong>useNavigate</strong>.</p>
        </article>
      </div>

      <button type="button" onClick={() => navigate('/products/101')}>
        Open Product 101
      </button>
    </section>
  )
}
