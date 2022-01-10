require('express-async-errors')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogRouter.get('/', async(request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})
  
blogRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async(request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    return response.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    const userid = user._id.toString()

    if ( blog.user.toString() === userid ) {
      await Blog.findByIdAndRemove(request.params.id)
      user.blogs.splice(user.blogs.indexOf(blog._id), 1)
      await user.save()
      response.status(204).end()
    } else {
      return response.status(401).json({error: 'user not authorized to delete blog'})
    }

})

blogRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const body = request.body
  const user = request.user
  const userid = user._id.toString()

  const editedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  if ( blog.user.toString() === userid ) {
    const res = await Blog.findByIdAndUpdate(request.params.id, editedBlog, { new: true })
    response.status(201).json(res.toJSON())
  } else {
    return response.status(401).json({error: 'user not authorized to edit blog'})
  }

})

module.exports = blogRouter