import blogService from '../services/blogs'

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const blogs = await blogService.like(blog)
    dispatch({
      type: 'LIKE',
      data: blogs
    })
  }
}

export const postComment = (blog, comment) => {
  return async dispatch => {
    const blogId = blog.id
    const newComment = await blogService.addComment(blog, comment)
    const returnData = { ...newComment, blogId }
    dispatch({
      type: 'ADD_COMMENT',
      data: returnData
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.del(blog)
    dispatch({
      type: 'DELETE',
      data: blog
    })
  }
}


const blogReducer = (state = [], action) => {
  console.log('blog state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS' :
    return action.data
  case 'LIKE': {
    const { id } = action.data
    const likedBlog = state.find((blog) => blog.id === id)
    const updatedBlog = {
      ...likedBlog,
      likes: likedBlog.likes + 1,
    }
    return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
  }
  case 'ADD_COMMENT': {
    const id = action.data.id
    const comment = action.data.comment
    const blogId = action.data.blogId
    const commentedBlog = state.find((blog) => blog.id === blogId)

    const newComment = { comment, id }
    const updatedBlog = {
      ...commentedBlog,
      comments: [...commentedBlog.comments, newComment]
    }
    return state.map((blog) => (blog.id !== blogId ? blog : updatedBlog))
  }
  case 'DELETE': {
    const { id } = action.data
    return state.filter((blog) => blog.id !== id)
  }
  default: return state
  }

}

export default blogReducer