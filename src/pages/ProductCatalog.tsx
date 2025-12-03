import { useEffect } from 'react'
import useProductStore from '../store/productStore'
import { ProductItem } from '../components/product-item'
import './ProductCatalog.scss'

const ProductCatalog = () => {
  const { products, isLoading, errorMessage, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (isLoading) {
    return <div className="catalog-loading">Loading products...</div>
  }

  if (errorMessage) {
    return <div className="catalog-error">{errorMessage}</div>
  }

  return (
    <div className="product-catalog">
      <header className="catalog-header">
        <h1 className="catalog-title">Product Catalog</h1>
        <button className="btn-add-product">Add Product</button>
      </header>
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              inStock={product.inStock}
            />
          ))
        ) : (
          <div className="no-products">No products available</div>
        )}
      </div>
    </div>
  )
}

export default ProductCatalog

