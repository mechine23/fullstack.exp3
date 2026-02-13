import { Link } from 'react-router-dom'

const products = [
  { id: 101, name: 'Router Starter Kit' },
  { id: 102, name: 'Dynamic Params Pack' },
  { id: 103, name: 'Protected Route Shield' },
]

export default function Products() {
  return (
    <section className="page-block">
      <h2>Products</h2>
      <p className="muted">Select any item to navigate to a dynamic product route.</p>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>Product ID: {product.id}</p>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </article>
        ))}
      </div>
    </section>
  )
}
