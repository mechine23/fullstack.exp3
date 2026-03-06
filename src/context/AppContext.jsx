import { createContext, useContext, useState, useMemo } from 'react'

const AppContext = createContext(null)

// useContext: global app-wide state — theme preference and mock user profile
export function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [user] = useState({ name: 'Guest', role: 'Student', id: 'S001' })

  // Stable toggle function — does not need to be in useMemo deps
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // useMemo: only recompute the context value object when theme or user changes
  const value = useMemo(
    () => ({ theme, toggleTheme, user }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, user],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
