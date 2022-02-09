const initialState = null
let timeoutID

export const setNotification = (notification, time) => {
  return async dispatch => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => { dispatch(hideNotification()) }, time*1000)
    dispatch({
      type: 'SHOW_NOTIFICATION',
      notification
    })
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
      return action.notification
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default notificationReducer