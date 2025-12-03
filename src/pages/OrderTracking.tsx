import { OrderProvider, useOrderContext } from '../context/OrderContext'
import DataTable from '../components/DataTable'
import OrderStatusBadge from '../components/OrderStatusBadge'
import { formatCurrency } from '../utils/currencyFormatter'
import { formatDateTime } from '../utils/formatDate'
import './OrderTracking.module.css'

const OrderTrackingContent = () => {
  const { orders, loading, error } = useOrderContext()

  if (loading) {
    return <div className="order-loading">Loading orders...</div>
  }

  if (error) {
    return <div className="order-error">{error}</div>
  }

  const columns = [
    {
      header: 'Order ID',
      accessor: (row: any) => row.orderId,
    },
    {
      header: 'Customer',
      accessor: (row: any) => row.customerName,
    },
    {
      header: 'Total',
      accessor: (row: any) => formatCurrency(row.totalAmount),
    },
    {
      header: 'Status',
      accessor: (row: any) => <OrderStatusBadge status={row.status} />,
    },
    {
      header: 'Date',
      accessor: (row: any) => formatDateTime(row.orderDate),
    },
  ]

  return (
    <div className="order-tracking-page">
      <h1 className="order-page-title">Order Tracking</h1>
      <DataTable
        data={orders}
        columns={columns}
        keyField="orderId"
        onRowClick={(order) => {
          console.log('Selected order:', order)
        }}
      />
    </div>
  )
}

const OrderTracking = () => {
  return (
    <OrderProvider>
      <OrderTrackingContent />
    </OrderProvider>
  )
}

export default OrderTracking

