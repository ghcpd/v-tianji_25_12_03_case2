import { format, parseISO } from 'date-fns'

export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString)
    return format(date, 'MMM dd, yyyy')
  } catch (error) {
    return dateString
  }
}

export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString)
    return format(date, 'MMM dd, yyyy HH:mm')
  } catch (error) {
    return dateString
  }
}

