import axios from 'axios'

const API_BASE_URL = 'https://api.example.com'

export interface User {
  id: number
  name: string
  email: string
  role: string
  createdAt: string
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch users:', error)
    throw error
  }
}

export const getUserById = async (userId: number): Promise<User> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch user ${userId}:`, error)
    throw error
  }
}

export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData)
    return response.data
  } catch (error) {
    console.error('Failed to create user:', error)
    throw error
  }
}

export const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData)
    return response.data
  } catch (error) {
    console.error(`Failed to update user ${userId}:`, error)
    throw error
  }
}

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/users/${userId}`)
  } catch (error) {
    console.error(`Failed to delete user ${userId}:`, error)
    throw error
  }
}

