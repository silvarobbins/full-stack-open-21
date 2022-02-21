import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      await dispatch(login({ username, password }))
      dispatch(setNotification(`Logged in with ${username}`, 5))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 5))
    }
  }

  return(
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
        username: &emsp;
          <input
            id = 'username'
            type = 'text'
            value = {username}
            name = 'Username'
            onChange = {handleUsernameChange}
          />
        </div>
        <div>
        password: &emsp;
          <input
            id = 'password'
            type = 'password'
            value = {password}
            name = 'Password'
            onChange = {handlePasswordChange}
          />
        </div>
        <button id = 'login-button' type = "submit">login</button>
      </form>
    </div>
  )}


export default LoginForm