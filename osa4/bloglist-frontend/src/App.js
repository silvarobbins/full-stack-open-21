import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
      console.log("1")
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

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }

    blogService
      .create(blogObject)
      .then(returnedBlog =>{
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
    
    setNotificationMessage(`added ${blogObject.title}`)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  } 

  const loginForm = () => (
    <div>
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
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const createForm = () => (
    <div>
    <form onSubmit={addBlog}>
    <div>
      title: &emsp;
      <input
      type = 'text'
      value = {newTitle}
      name = 'Title'
      onChange = {({ target }) => setNewTitle(target.value)}
      />
    </div>
    <div>
      author: &emsp;
      <input
      type = 'text'
      value = {newAuthor}
      name = 'Author'
      onChange = {({ target }) => setNewAuthor(target.value)}
      />
    </div>
    <div>
      url: &emsp;
      <input
      type = 'text'
      value = {newUrl}
      name = 'Url'
      onChange = {({ target }) => setNewUrl(target.value)}
      />
    <br/>
      <button type = "submit">create</button>
    </div>
    </form>
    </div>
  )

  if(user === null) {
    return (
      <div>
      <h1>Blog app</h1>
      <Error message = {errorMessage} />
      <Notification message = {notificationMessage} />
      <h2>Login to application</h2>
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
    <h2>Create new</h2>
    {createForm()}
    <h2>Blogs</h2>
    {blogList(user)}
  </div>
  )
  }

export default App
