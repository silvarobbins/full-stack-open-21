const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Fun blog',
    author: 'Fun author',
    url: 'funurl.com',
    likes: '5'
  },
  {
    title: 'Boring blog',
    author: 'Boring author',
    url: 'boringurl.com',
    likes: '1'
  }
]

const BlogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, BlogsInDb
}