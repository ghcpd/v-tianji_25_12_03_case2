import axios from 'axios'

const BASE_URL = 'https://api.example.com'

type Product = {
  id: string
  name: string
  price: number
  description: string
  inStock: boolean
  category: string
}

export const getProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${BASE_URL}/products`)
  return res.data
}

export const getProduct = async (id: string): Promise<Product> => {
  const res = await axios.get(`${BASE_URL}/products/${id}`)
  return res.data
}

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const res = await axios.post(`${BASE_URL}/products`, product)
  return res.data
}

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  const res = await axios.patch(`${BASE_URL}/products/${id}`, product)
  return res.data
}

export const removeProduct = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/products/${id}`)
}

