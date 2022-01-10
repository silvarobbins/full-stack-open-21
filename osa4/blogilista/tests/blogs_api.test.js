require('express-async-errors')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const User = require('../models/user')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

describe( 'not requiring token', () => {
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
  
  test('without a token, a blog cannot be poster', async () => {
    const newBlog = {
      title: 'exciting blog',
      author: 'exciting author',
      url: 'excitingurl.com',
      likes: 4
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

describe('require token', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const newUser = { username: 'user', name: "user", password: 'secretpassword' }
    await api
      .post('/api/users')
      .send(newUser)

    await Blog.deleteMany({})

    const login = await api
    .post('/api/login')
    .send({ username: 'user', password: 'secretpassword' })
    const token = login.body.token

    const blogbjects = helper.initialBlogs
    for(let i = 0; i < blogbjects.length; i++) {
      const newBlog = {
        title: blogbjects[i].title,
        author: blogbjects[i].author,
        url: blogbjects[i].url,
        likes: blogbjects[i].likes
      }

    await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    }

  })


test('a valid blog can be posted', async () => {  
  const login = await api
    .post('/api/login')
    .send({ username: 'user', password: 'secretpassword' })
  const token = login.body.token

  const newBlog = {
    title: 'exciting blog',
    author: 'exciting author',
    url: 'excitingurl.com',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(response.body[response.body.length-1].title).toContain('exciting blog')
})

test('if not given a like number, 0 is set as default', async () => {
  const login = await api
    .post('/api/login')
    .send({ username: 'user', password: 'secretpassword' })
  const token = login.body.token

  const newBlog = {
    title: 'scary blog',
    author: 'scary author',
    url: 'scaryurl.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(response.body[response.body.length-1].likes).toBe(0)
})

test('a urless blog cannot be posted', async () => {
  const login = await api
    .post('/api/login')
    .send({ username: 'user', password: 'secretpassword' })
  const token = login.body.token

  const titlelessBlog = {
    title: 'fearless blog',
    author: 'fearless author',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(titlelessBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a titleless blog cannot be posted', async () => {
  const login = await api
    .post('/api/login')
    .send({ username: 'user', password: 'secretpassword' })
  const token = login.body.token

  const titlelessBlog = {
    author: 'sad author',
    url: 'sadurl.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(titlelessBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const login = await api
    .post('/api/login')
    .send({ username: 'user', password: 'secretpassword' })
  const token = login.body.token

  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${token}`)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length-1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('a blogs like score can be changed', async () => {
  const login = await api
    .post('/api/login')
    .send({ username: 'user', password: 'secretpassword' })
  const token = login.body.token

  const blogsAtStart = await helper.blogsInDb()
  const blogToEdit = blogsAtStart[0]

  const editedBlog = {
    title: blogToEdit.title,
    author: blogToEdit.author,
    url: blogToEdit.url,
    likes: 10
  }

  const res = await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(editedBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].likes).toBe(10)
})


})
afterAll(() => {
    mongoose.connection.close()
  })