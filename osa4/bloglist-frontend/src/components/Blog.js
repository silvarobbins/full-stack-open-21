import React, { useState } from 'react'
import '../index.css'

const Blog = ({blog, user}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const blogStyle = {
    
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5,
    'text-align': 'left'
  }
  
  const toggleVisibility = () => {
    setVisible(!visible)
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
      <button>like</button> <br/>
      {user.name}
    </div>  
  </div>
  )
}

export default Blog