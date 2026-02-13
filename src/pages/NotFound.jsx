import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page-block">
      <h2>404 - Page Not Found</h2>
      <p className="muted">No route matched this URL in 23BAI70639.fullstack.</p>
      <Link to="/">Go Back Home</Link>
    </section>
  )
}
