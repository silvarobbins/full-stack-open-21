require('express-async-errors')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogbjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogbjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('id not _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be posted', async () => {
  const newBlog = {
    title: 'exciting blog',
    author: 'exciting author',
    url: 'excitingurl.com',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(response.body[response.body.length-1].title).toContain('exciting blog')
})

test('if not given a like number, 0 is set as default', async () => {
  const newBlog = {
    title: 'scary blog',
    author: 'scary author',
    url: 'scaryurl.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(response.body[response.body.length-1].likes).toBe(0)
})

test('a urless blog cannot be posted', async () => {
  const titlelessBlog = {
    title: 'fearless blog',
    author: 'fearless author',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(titlelessBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a titleless blog cannot be posted', async () => {
  const titlelessBlog = {
    author: 'sad author',
    url: 'sadurl.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(titlelessBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.BlogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)


  const blogsAtEnd = await helper.BlogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length-1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('a blogs like score can be changed', async () => {
  const blogsAtStart = await helper.BlogsInDb()
  const blogToEdit = blogsAtStart[0]

  const editedBlog = {
    title: blogToEdit.title,
    author: blogToEdit.author,
    url: blogToEdit.url,
    likes: 10
  }

  await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(editedBlog)
    .expect(201)

  const blogsAtEnd = await helper.BlogsInDb()
  expect(blogsAtEnd[0].likes).toBe(10)
})

afterAll(() => {
    mongoose.connection.close()
  })