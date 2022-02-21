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
  console.log('blog now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS' :
    return action.data
  case 'LIKE':{
    const { id } = action.data
    const likedBlog = state.find((blog) => blog.id === id)
    const updatedBlog = {
      ...likedBlog,
      likes: likedBlog.likes + 1,
    }
    return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
  }
  case 'DELETE': {
    const { id } = action.data
    console.log(id)
    return state.filter((blog) => blog.id !== id)
  }
  default: return state
  }

}

export default blogReducer