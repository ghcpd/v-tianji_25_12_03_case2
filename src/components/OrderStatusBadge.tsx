import React from 'react'

interface OrderStatusBadgeProps {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return { label: 'Pending', className: 'status-pending' }
      case 'processing':
        return { label: 'Processing', className: 'status-processing' }
      case 'shipped':
        return { label: 'Shipped', className: 'status-shipped' }
      case 'delivered':
        return { label: 'Delivered', className: 'status-delivered' }
      case 'cancelled':
        return { label: 'Cancelled', className: 'status-cancelled' }
      default:
        return { label: 'Unknown', className: 'status-unknown' }
    }
  }

  const config = getStatusConfig()

  return (
    <span className={`order-status-badge ${config.className}`}>
      {config.label}
    </span>
  )
}

export default OrderStatusBadge

