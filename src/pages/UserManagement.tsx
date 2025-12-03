import { useEffect } from 'react'
import { useUserStore } from '../store/userStore'
import UserCard from '../components/UserCard'
import { formatDate } from '../utils/formatDate'
import './UserManagement.css'

const UserManagement = () => {
  const { users, loading, error, fetchUsers, removeUser } = useUserStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleDelete = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await removeUser(userId)
    }
  }

  if (loading) {
    return <div className="page-loading">Loading users...</div>
  }

  if (error) {
    return <div className="page-error">Error: {error}</div>
  }

  return (
    <div className="user-management-page">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <button className="add-user-button">Add New User</button>
      </div>
      <div className="users-list">
        {users.map((user) => (
          <UserCard
            key={user.id}
            userId={user.id}
            userName={user.name}
            emailAddress={user.email}
            role={user.role}
            onDelete={() => handleDelete(user.id)}
          />
        ))}
        {users.length === 0 && (
          <div className="empty-state">No users found</div>
        )}
      </div>
    </div>
  )
}

export default UserManagement

