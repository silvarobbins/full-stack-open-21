import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

const handleLogin = async (event) => {
  event.preventDefault()
  console.log('logging in with', username, password)

  try {
    const user = await loginService.login({username, password})
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

const handleLogout = async (event) => {
  event.preventDefault()
  console.log('loggin out')

  window.localStorage.removeItem('loggedBlogappUser')
  setUser(null)
}

const loginForm = () => (
  <div>
  <h2>Login to application</h2>
  <form onSubmit={handleLogin}>
  <div>
    username
    <input
    type = 'text'
    value = {username}
    name = 'Username'
    onChange = {({ target }) => setUsername(target.value)}
    />
  </div>
  <div>
    password
    <input
    type = 'password'
    value = {password}
    name = 'Password'
    onChange = {({ target }) => setPassword(target.value)}
    />
  </div>
    <button type = "submit">login</button>
  </form>
  </div>
)

const blogList = (user) => (
  <div>
    <h2>Blogs</h2>
    <p>
      {user.name} is logged in &emsp;<t/>
      <button type = "button" onClick = {handleLogout} >logout</button>
    </p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

return (
  <div>
    <Notification message = {errorMessage} />
    {user === null ?
      loginForm():
      blogList(user)
    }


  </div>
  ) 
}

export default App