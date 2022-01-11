import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
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
    console.log('logging out')
    setNotificationMessage('logged out')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      newBlogFormRef.current.toggleVisibility()
      await blogService
        .create(blogObject)
        .then(returnedBlog =>{
          setBlogs(blogs.concat(returnedBlog))
        })
      setNotificationMessage(`added ${blogObject.title}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage("couldn't add blog")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  } 

  const loginForm = () => (
    <div>
    <h2>Login to application</h2>
    <form onSubmit={handleLogin}>
    <div>
      username: &emsp;
      <input
      type = 'text'
      value = {username}
      name = 'Username'
      onChange = {({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password: &emsp;
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={blog.user}/>
      )}
    </div>
  )

  if(user === null) {
    return (
      <div>
      <h1>Blog app</h1>
      <Error message = {errorMessage} />
      <Notification message = {notificationMessage} />
      {loginForm()}
      </div>
  )}
  return(
  <div>
  <h1>Blog app</h1>
    <Error message = {errorMessage} />
    <Notification message = {notificationMessage} />
    <p>
      {user.name} is logged in &emsp;
      <button type = "button" onClick = {handleLogout} >logout</button>
    </p>
    <Togglable buttonLabel = "create new blog" ref = {newBlogFormRef}>
        <NewBlogForm createBlog = {addBlog} />
      </Togglable>
    <h2>Blogs</h2>
    {blogList(user)}
  </div>
  )
  }

export default App
