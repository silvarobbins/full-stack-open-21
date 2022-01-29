const initialState = null

export const setNotification = notification => {
  return {
    type: 'SHOW_NOTIFICATION',
    notification
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      setTimeout(() => { hideNotification() }, 5000)
      return action.notification
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default notificationReducer