import { useEffect, useState } from 'react'
import { fetchDashboardStats, getRecentActivity } from '../services/dashboard-api'
import './DashboardPage.css'

interface DashboardStats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  revenue: number
}

interface ActivityItem {
  id: string
  type: string
  description: string
  timestamp: string
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const [statsResult, activityResult] = await Promise.all([
        fetchDashboardStats(),
        getRecentActivity(),
      ])

      if (statsResult.success) {
        setStats(statsResult.data)
      }

      if (activityResult.success) {
        setActivities(activityResult.data)
      }

      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-label">Total Users</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Total Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Revenue</h3>
            <p className="stat-value">${stats.revenue.toLocaleString()}</p>
          </div>
        </div>
      )}
      <div className="activity-section">
        <h2 className="activity-title">Recent Activity</h2>
        <ul className="activity-list">
          {activities.map((activity) => (
            <li key={activity.id} className="activity-item">
              <span className="activity-type">{activity.type}</span>
              <span className="activity-description">{activity.description}</span>
              <span className="activity-time">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DashboardPage

