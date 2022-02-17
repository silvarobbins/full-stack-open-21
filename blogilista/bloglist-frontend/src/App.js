import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Error from './components/Error'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const newBlogFormRef = useRef()

  const dispatch = useDispatch()

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

  const handleLogin = async (username, password) => {
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
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
    setNotification('logged out', 5)

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    try {
      newBlogFormRef.current.toggleVisibility()
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          console.log(blogs, returnedBlog)
          setBlogs(blogs.concat(returnedBlog))
        })
      setNotification(`added ${blogObject.title}`, 5)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('could not add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likeBlog = (blogObject) => {
    try {
      blogService
        .like(blogObject)
      blogs[blogs.indexOf(blogObject)].likes += 1
      setNotification(`liked ${blogObject.title}`, 5)(dispatch)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('could not like blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = (blogObject) => {
    try {
      blogService
        .del(blogObject)
      blogs.splice(blogs.indexOf(blogObject),1)
      setBlogs(blogs)
      setNotification(`deleted ${blogObject.title}`, 5)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('couldnt delete blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogList = () => {
    blogs.sort((a,b) => b.likes-a.likes)
    return(
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} loggedUser={user} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
        )}
      </div>
    )
  }

  if(user === null) {
    return (
      <div>
        <h1>Blog app</h1>
        <Error message = {errorMessage} />
        <Notification/>
        <LoginForm handleLogin = {handleLogin}/>
      </div>
    )}

  return(
    <div>
      <h1>Blog app</h1>
      <Error message = {errorMessage} />
      <Notification/>
      <p>
        {user.name} is logged in &emsp;
        <button id='logout-button' type = "button" onClick = {handleLogout} >logout</button>
      </p>
      <Togglable buttonLabel = "create new blog" ref = {newBlogFormRef}>
        <NewBlogForm createBlog = {addBlog} />
      </Togglable>
      <h2>Blogs</h2>
      {blogList()}
    </div>
  )
}

export default App
