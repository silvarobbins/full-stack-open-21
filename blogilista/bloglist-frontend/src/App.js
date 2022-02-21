import React, { useEffect, useRef } from 'react'
import Bloglist from './components/Bloglist'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { logout } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'


const App = () => {
  const newBlogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector((state) => state.login)
  console.log('user', { user })

  useEffect(() => {
    const loggedInUserJSON = JSON.parse(
      window.localStorage.getItem('loggedInBloglistUser'),
    )
    if (loggedInUserJSON) {
      const user = loggedInUserJSON
      blogService.setToken(user?.token)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user))
    blogService.setToken(user?.token)
  }, [user])

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')

    try {
      dispatch(logout())
      dispatch(setNotification('Logged out', 5))
    } catch (exception) {
      dispatch(setNotification('could not log out', 5))
    }
  }

  if(user === null) {
    return (
      <div>
        <h1>Blog app</h1>
        <Notification/>
        <LoginForm />
      </div>
    )}

  return(
    <div>
      <h1>Blog app</h1>
      <Notification/>
      <p>
        {user.name} is logged in &emsp;
        <button id='logout-button' type = "button" onClick = {handleLogout} >logout</button>
      </p>
      <Togglable buttonLabel = "create new blog" ref = {newBlogFormRef}>
        <NewBlogForm createBlog = {createBlog} />
      </Togglable>
      <h2>Blogs</h2>
      <Bloglist/>
    </div>
  )
}

export default App
