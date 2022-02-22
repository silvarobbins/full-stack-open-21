import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style = {blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}, {blog.author}</Link>
    </div>
  )
}

export default Blog