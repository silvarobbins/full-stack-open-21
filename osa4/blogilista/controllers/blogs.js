require('express-async-errors')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async(request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}
  
blogRouter.post('/', async(request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

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
    response.status(201).json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'})
    }
    const userid = decodedToken.id
    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)

    if ( blog.user.toString() === userid ) {
      await Blog.findByIdAndRemove(request.params.id)
      user.blogs.splice(user.blogs.indexOf(blog._id), 1)
      await user.save()
      response.status(204).end()
    } else {
      return response.status(401).json({error: 'user not authorized to delete blog'})
    }

})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }


  const res = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(201).json(res.toJSON())
})

module.exports = blogRouter