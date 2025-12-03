export interface BaseEntity {
  id: string | number
  createdAt: string
  updatedAt?: string
}

export type Status = 'active' | 'inactive' | 'pending' | 'archived'

