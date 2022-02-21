import loginService from '../services/login'

const loggedInUserJSON = JSON.parse(
  window.localStorage.getItem('loggedInBloglistUser'),
)

const initialState = loggedInUserJSON ? loggedInUserJSON : null

export const login = ({ username, password }) => {
  console.log('reducer', { username, password })
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    console.log({ user })
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return async dispatch => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

const loginReducer = (state = initialState, action) => {
  console.log('login state:', state)
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export default loginReducer