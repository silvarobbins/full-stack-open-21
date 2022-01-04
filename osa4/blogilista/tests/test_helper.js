const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}