import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import styled from 'styled-components'
import './index.css'
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

const StyledApp = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Navigation = styled.div`
  display:flex;
  padding: 0.5em 1em;
  justify-content: space-between;
  font-family: Verdana, Helvetica, sans-serif;
  background: palegoldenrod;
`

const NavigationButtons = styled.div`
  display: flex;
  align-items: center;
  > * {margin-right: 50px;}
`

const UserStatus = styled.p`
  display: inline-block;
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1em;
  font-family: Verdana, Helvetica, sans-serif;
  font-size: small;
  background: palegoldenrod;
`
const Logo = styled.b`
  font-size: larger;
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
    <StyledApp>
      <Router>
        <Navigation>
          <NavigationButtons>
            <Logo>Blog app</Logo>&emsp;
            <Link className={'link'} to='/'>Blogs</Link>&emsp;
            <Link className={'link'} to='/users'>Users</Link>&emsp;
          </NavigationButtons>
          <UserStatus>
            {user.name} is logged in &emsp;
            <button id='logout-button' type = "button" onClick = {handleLogout} >logout</button>
          </UserStatus>
        </Navigation>
        <Notification/>
        <Routes>
          <Route path='/users' element={<UsersPage/>}/>
          <Route path="/users/:id" element={<SingleUserPage/>} />
          <Route path="/blogs/:id" element={<SingleBlogPage/>} />
          <Route path='/' element={<BlogList/>}/>
        </Routes>
        <Footer>
          <p>Blog app, Full Stack Open 2021</p>
        </Footer>
      </Router>
    </StyledApp>
  )
}

export default App
