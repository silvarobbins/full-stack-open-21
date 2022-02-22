import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import UsersPage from './pages/users'
import SingleUserPage from './pages/singleUser'
import BlogList from './pages/blogList'
import SingleBlogPage from './pages/singleBlog'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout } from './reducers/loginReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import styled from 'styled-components'

const Navigation = styled.div`
  background: Gainsboro;
  padding: 1em;
`

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector((state) => state.login)

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
    <Router>
      <h1>Blog app</h1>
      <Navigation>
        <Link to='/'>Blogs</Link>&emsp;
        <Link to='/users'>Users</Link>&emsp;
        {user.name} is logged in &emsp;
        <button id='logout-button' type = "button" onClick = {handleLogout} >logout</button>
      </Navigation>
      <Notification/>
      <Routes>
        <Route path='/users' element={<UsersPage/>}/>
        <Route path="/users/:id" element={<SingleUserPage/>} />
        <Route path="/blogs/:id" element={<SingleBlogPage/>} />
        <Route path='/' element={<BlogList/>}/>
      </Routes>
    </Router>
  )
}

export default App
