import { useAppContext } from '../context/AppContext'

// useContext consumer — theme lives in Context, not Redux
export default function ThemeToggle() {
  const { theme, toggleTheme } = useAppContext()

  return (
    <button
      type="button"
      className="theme-toggle-btn nav-pill"
      onClick={toggleTheme}
      title="Toggle light / dark theme"
    >
      {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
    </button>
  )
}
