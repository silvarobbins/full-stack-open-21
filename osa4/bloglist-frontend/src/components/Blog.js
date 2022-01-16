import React, { useState } from 'react'
import '../index.css'

const Blog = ({ blog, loggedUser, likeBlog, deleteBlog }) => {
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

  const del = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  if (blog.user?.username === loggedUser.username) {
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
          {blog.user.name} &emsp;
          <button onClick={del}>delete</button> <br/>
        </div>
      </div>
    )
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
        {blog.user?.name}
      </div>
    </div>
  )
}

export default Blog