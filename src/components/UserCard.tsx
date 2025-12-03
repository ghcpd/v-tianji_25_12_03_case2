import React from 'react'
import './UserCard.module.css'

interface UserCardProps {
  userId: number
  userName: string
  emailAddress: string
  role: string
  onEdit?: () => void
  onDelete?: () => void
}

const UserCard: React.FC<UserCardProps> = ({
  userId,
  userName,
  emailAddress,
  role,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="user-card-container">
      <div className="user-info-section">
        <h3 className="user-name-text">{userName}</h3>
        <p className="user-email-text">{emailAddress}</p>
        <span className="user-role-badge">{role}</span>
      </div>
      <div className="user-actions-section">
        {onEdit && (
          <button className="edit-btn" onClick={onEdit}>
            Edit
          </button>
        )}
        {onDelete && (
          <button className="delete-btn" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default UserCard

