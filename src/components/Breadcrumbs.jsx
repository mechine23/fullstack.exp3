import { Link, useLocation } from 'react-router-dom'

export default function Breadcrumbs() {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`
        const label = segment.charAt(0).toUpperCase() + segment.slice(1)

        return (
          <span key={path}>
            {' '}<span className="crumb-sep">/</span>{' '}<Link to={path}>{label}</Link>
          </span>
        )
      })}
    </nav>
  )
}
