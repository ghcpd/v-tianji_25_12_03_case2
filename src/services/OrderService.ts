import axios, { AxiosError } from 'axios'

const API_ENDPOINT = 'https://api.example.com'

export interface OrderData {
  orderId: string
  customerName: string
  totalAmount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  orderDate: string
  items: OrderItem[]
}

export interface OrderItem {
  productId: string
  quantity: number
  price: number
}

class OrderService {
  async getAllOrders(): Promise<OrderData[]> {
    try {
      const response = await axios.get<OrderData[]>(`${API_ENDPOINT}/orders`)
      return response.data
    } catch (err) {
      const error = err as AxiosError
      throw new Error(`Error fetching orders: ${error.message}`)
    }
  }

  async getOrderById(orderId: string): Promise<OrderData> {
    try {
      const response = await axios.get<OrderData>(`${API_ENDPOINT}/orders/${orderId}`)
      return response.data
    } catch (err) {
      const error = err as AxiosError
      throw new Error(`Error fetching order ${orderId}: ${error.message}`)
    }
  }

  async createOrder(order: Omit<OrderData, 'orderId' | 'orderDate'>): Promise<OrderData> {
    try {
      const response = await axios.post<OrderData>(`${API_ENDPOINT}/orders`, order)
      return response.data
    } catch (err) {
      const error = err as AxiosError
      throw new Error(`Error creating order: ${error.message}`)
    }
  }

  async updateOrderStatus(orderId: string, status: OrderData['status']): Promise<OrderData> {
    try {
      const response = await axios.put<OrderData>(
        `${API_ENDPOINT}/orders/${orderId}/status`,
        { status }
      )
      return response.data
    } catch (err) {
      const error = err as AxiosError
      throw new Error(`Error updating order status: ${error.message}`)
    }
  }

  async cancelOrder(orderId: string): Promise<void> {
    try {
      await axios.delete(`${API_ENDPOINT}/orders/${orderId}`)
    } catch (err) {
      const error = err as AxiosError
      throw new Error(`Error cancelling order: ${error.message}`)
    }
  }
}

export default new OrderService()

