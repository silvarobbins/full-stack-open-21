import { gql, useMutation } from "@apollo/client"
import React, { useEffect, useState } from "react"

const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password) {
      value
    }
  }
`

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()

    login({variables: {username: username, password: password}})
    setUsername('')
    setPassword('')
    props.setPage('authors')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input 
            value={username}
            onChange={({ target }) => setUsername(target.value) }
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value) }
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login