import { useLocation, useNavigate } from 'react-router-dom'

export default function Login({ onLogin }) {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/dashboard'

  const handleLogin = () => {
    onLogin()
    navigate(redirectTo, { replace: true })
  }

  return (
    <section className="page-block">
      <h2>Login</h2>
      <p className="muted">Simulated auth: click login to continue to protected route.</p>
      <button type="button" onClick={handleLogin}>
        Sign In and Continue
      </button>
    </section>
  )
}
