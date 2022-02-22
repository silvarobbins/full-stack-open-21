import React from 'react'
import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const SingleUserPage = () => {
  const users = useSelector(state => state.user)

  const match = useMatch('/users/:id')

  const user = match ? users?.find((user) => user.id === match.params.id) : null

  if (!user){
    return null
  }
  return(
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default SingleUserPage

