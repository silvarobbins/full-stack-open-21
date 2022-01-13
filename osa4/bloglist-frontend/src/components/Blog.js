import React, { useState } from 'react'
import '../index.css'

const Blog = ({blog, user, likeBlog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const blogStyle = {
    
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (event) => {
    event.preventDefault()
    likeBlog(blog)
  }

  return (
  <div style = {blogStyle}>
    <div style = {hideWhenVisible}>
      <button className='clickableText' onClick={toggleVisibility}>{blog.title}</button>, {blog.author}
    </div>  
    <div style = {showWhenVisible}>
      <button className='clickableText' onClick={toggleVisibility}>{blog.title}</button>, {blog.author}<br/>
      {blog.url}<br/>
      {blog.likes} &emsp;
      <button onClick={like}>like</button> <br/>
      {user.name}
    </div>  
  </div>
  )
}

export default Blog