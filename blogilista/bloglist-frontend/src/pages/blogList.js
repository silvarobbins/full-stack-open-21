import React from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from '../components/Blog'
import NewBlogForm from '../components/NewBlogForm'
import Togglable from '../components/Togglable'
import { createBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const newBlogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  return(
    <div>
      <Togglable buttonLabel = "create new blog" ref = {newBlogFormRef}>
        <NewBlogForm createBlog = {createBlog} />
      </Togglable>
      <h2>Blogs</h2>
      {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default BlogList