import { useParams } from 'react-router-dom'

export default function ProductDetails() {
  const { id } = useParams()

  return (
    <section className="page-block">
      <h2>Product Details</h2>
      <div className="feature-card">
        <p>
          Dynamic Product ID: <strong>{id}</strong>
        </p>
      </div>
    </section>
  )
}
