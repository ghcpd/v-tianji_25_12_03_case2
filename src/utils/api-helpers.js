export const handleApiError = (error) => {
  if (error.response) {
    return {
      message: error.response.data?.message || 'An error occurred',
      status: error.response.status,
    }
  } else if (error.request) {
    return {
      message: 'Network error. Please check your connection.',
      status: null,
    }
  } else {
    return {
      message: error.message || 'An unexpected error occurred',
      status: null,
    }
  }
}

export const buildQueryString = (params) => {
  const queryParams = new URLSearchParams()
  Object.keys(params).forEach((key) => {
    if (params[key] !== null && params[key] !== undefined) {
      queryParams.append(key, params[key])
    }
  })
  return queryParams.toString()
}

