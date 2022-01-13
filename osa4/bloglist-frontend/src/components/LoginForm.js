import React, { useState } from 'react'
import propTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const login = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return(
    <div>
      <h2>Login to application</h2>
      <form onSubmit={login}>
        <div>
        username: &emsp;
          <input
            type = 'text'
            value = {username}
            name = 'Username'
            onChange = {handleUsernameChange}
          />
        </div>
        <div>
        password: &emsp;
          <input
            type = 'password'
            value = {password}
            name = 'Password'
            onChange = {handlePasswordChange}
          />
        </div>
        <button type = "submit">login</button>
      </form>
    </div>
  )}

LoginForm.propTypes = {
  handleLogin: propTypes.func.isRequired
}

export default LoginForm