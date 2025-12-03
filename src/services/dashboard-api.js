import axios from 'axios'

const apiUrl = 'https://api.example.com'

export const fetchDashboardStats = async () => {
  try {
    const response = await axios.get(`${apiUrl}/dashboard/stats`)
    return {
      success: true,
      data: response.data
    }
  } catch (err) {
    return {
      success: false,
      error: err.message,
      data: null
    }
  }
}

export const getRecentActivity = async () => {
  try {
    const response = await axios.get(`${apiUrl}/dashboard/activity`)
    return {
      success: true,
      data: response.data
    }
  } catch (err) {
    return {
      success: false,
      error: err.message,
      data: null
    }
  }
}

