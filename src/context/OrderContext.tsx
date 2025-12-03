import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import OrderService, { OrderData } from '../services/OrderService'

interface OrderContextType {
  orders: OrderData[]
  loading: boolean
  error: string | null
  loadOrders: () => Promise<void>
  refreshOrder: (orderId: string) => Promise<void>
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const useOrderContext = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrderContext must be used within OrderProvider')
  }
  return context
}

interface OrderProviderProps {
  children: ReactNode
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<OrderData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadOrders = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await OrderService.getAllOrders()
      setOrders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const refreshOrder = async (orderId: string) => {
    try {
      const updatedOrder = await OrderService.getOrderById(orderId)
      setOrders((prev) =>
        prev.map((order) => (order.orderId === orderId ? updatedOrder : order))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh order')
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  return (
    <OrderContext.Provider value={{ orders, loading, error, loadOrders, refreshOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

