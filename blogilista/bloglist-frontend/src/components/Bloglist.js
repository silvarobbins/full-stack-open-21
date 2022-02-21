import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import '../index.css'

const BlogDetails = ({ blog, loggedUser }) => {
  const isUser = loggedUser.username === blog.user.username
  const dispatch = useDispatch()

  const del = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog))
        dispatch(setNotification(`deleted ${blog.title}`, 5))
      } catch (exception) {
        setNotification('couldnt delete blog', 5)(dispatch)
      }
    }
  }

  const like = (event) => {
    event.preventDefault()
    try {
      console.log({ likeBlog, deleteBlog })
      dispatch(likeBlog(blog))
      dispatch(setNotification(`liked ${blog.title}`, 5))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('Could not like blog', 5))
    }
  }

  return (
    <div className='blog-details'>
      <p>{blog.url}</p>
      <p className='likes'>
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'} &emsp;
        <button id='like-button' onClick={like}>like</button>
      </p>
      <p>{blog.user.name}</p>
      {isUser && <button id='delete-button' onClick={del}> delete</button>}
    </div>
  )
}

const Blog = ({ blog, loggedUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog' style = {blogStyle}>
      <div className='title'>
        <button className='clickableText' onClick={toggleVisibility}>{blog.title}</button>, {blog.author}
      </div>
      <div>
        {visible ? (
          <BlogDetails blog={blog} loggedUser={loggedUser} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
        ) : null}
      </div>
    </div>
  )
}

const Bloglist = () => {
  const user = useSelector((state) => state.login)
  const blogs = useSelector((state) => state.blogs)
  console.log('blogs:', blogs)
  return(
    <div>
      {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} loggedUser={user}/>
      )}
    </div>
  )
}

export default Bloglist