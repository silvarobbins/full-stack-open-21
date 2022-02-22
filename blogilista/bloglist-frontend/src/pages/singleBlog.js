import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
import { deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog } from '../reducers/blogReducer'

const SingleBlogPage = () => {
  const blogs = useSelector((state) => state.blogs)
  const loggedUser = useSelector(state => state.login)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')

  const blog = match ? blogs?.find((blog) => blog.id === match.params.id) : null
  if (!blog){
    return null
  }
  const isUser = loggedUser.username === blog.user.username


  const del = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog))
        dispatch(setNotification(`deleted ${blog.title}`, 5))
        navigate('/')
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

  return(
    <div>
      <h1>{blog.title}, {blog.author}</h1>
      <p>
        {blog.url}<br/>
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'} &emsp;
        <button id='like-button' onClick={like}>like</button> <br/>
        added by {blog.user.name} <br/>
        {isUser && <button id='delete-button' onClick={del}> delete blog</button>}
      </p>
    </div>
  )
}

export default SingleBlogPage