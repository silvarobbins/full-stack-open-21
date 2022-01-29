const initialState = 'Default notification'

const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export default notificationReducer