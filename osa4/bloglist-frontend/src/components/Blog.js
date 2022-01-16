import React, { useState } from 'react'
import '../index.css'

const BlogDetails = ({ blog, loggedUser, likeBlog, deleteBlog }) => {
  const isUser = loggedUser.username === blog.user?.username

  const del = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  const like = (event) => {
    event.preventDefault()
    likeBlog(blog)
  }

  return (
    <div className='blog-details'>
      <p>{blog.url}</p>
      <p className='likes'>
        {blog.likes} &emsp; {blog.likes === 1 ? 'like' : 'likes'}
        <button id='like-button' onClick={like}>like</button>
      </p>
      <p>{blog.user?.name}</p>
      {isUser && <button id='delete-button' onClick={del}> delete</button>}
    </div>
  )
}

const Blog = ({ blog, loggedUser, likeBlog, deleteBlog }) => {
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
    <div style = {blogStyle}>
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

export default Blog