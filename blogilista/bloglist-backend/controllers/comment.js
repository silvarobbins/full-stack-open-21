
const commentRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

commentRouter.get('/:id/comments', async(request, response) => {
  const { id } = request.params
  const blog = await Blog
    .findById(id).populate('comments')
  response.json(blog)
})

commentRouter.post('/:id/comments', async(request, response) => {
  const body = request.body
  const { id } = request.params
  const blog = await Blog.findById(id)

  const comment = new Comment({
    comment: body.comment
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  return response.status(201).json(savedComment.toJSON())
})

module.exports = commentRouter