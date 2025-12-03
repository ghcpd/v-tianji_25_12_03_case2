import { create } from 'zustand'
import { User } from '../services/userService'

interface UserState {
  users: User[]
  loading: boolean
  error: string | null
  fetchUsers: () => Promise<void>
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => Promise<void>
  updateUser: (id: number, userData: Partial<User>) => Promise<void>
  removeUser: (id: number) => Promise<void>
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const { fetchUsers } = await import('../services/userService')
      const users = await fetchUsers()
      set({ users, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch users', loading: false })
    }
  },

  addUser: async (userData) => {
    try {
      const { createUser } = await import('../services/userService')
      const newUser = await createUser(userData)
      set((state) => ({ users: [...state.users, newUser] }))
    } catch (error) {
      set({ error: 'Failed to create user' })
    }
  },

  updateUser: async (id, userData) => {
    try {
      const { updateUser } = await import('../services/userService')
      const updatedUser = await updateUser(id, userData)
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u)),
      }))
    } catch (error) {
      set({ error: 'Failed to update user' })
    }
  },

  removeUser: async (id) => {
    try {
      const { deleteUser } = await import('../services/userService')
      await deleteUser(id)
      set((state) => ({ users: state.users.filter((u) => u.id !== id) }))
    } catch (error) {
      set({ error: 'Failed to delete user' })
    }
  },
}))

