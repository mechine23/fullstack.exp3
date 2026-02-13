import { Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => setIsAuthenticated(true)
  const handleLogout = () => setIsAuthenticated(false)

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
