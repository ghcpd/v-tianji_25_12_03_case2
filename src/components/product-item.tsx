import { useState } from 'react'
import styles from './product-item-styles.css'

type ProductItemProps = {
  id: string
  name: string
  price: number
  description?: string
  inStock: boolean
}

export function ProductItem({ id, name, price, description, inStock }: ProductItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={styles.productWrapper}>
      <div className={styles.productHeader}>
        <h4 className={styles.productTitle}>{name}</h4>
        <span className={styles.priceTag}>${price.toFixed(2)}</span>
      </div>
      {description && (
        <p className={styles.productDesc}>{description}</p>
      )}
      <div className={styles.productFooter}>
        <span className={inStock ? styles.inStock : styles.outOfStock}>
          {inStock ? 'Available' : 'Out of Stock'}
        </span>
        <button 
          className={styles.detailsButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide' : 'Show'} Details
        </button>
      </div>
      {isExpanded && (
        <div className={styles.expandedContent}>
          <p>Product ID: {id}</p>
        </div>
      )}
    </div>
  )
}

