const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('username length of under 3 will not be created', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'si',
    name: 'Silva',
    password: 'salainen',
  }

  const result = await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
  .expect('Content-Type', /application\/json/)

  console.log(result.body.error)

  expect(result.body.error).toContain('shorter than the minimum allowed length (3)')
  
  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('password length of under 3 will not be created', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'silvarob',
    name: 'Silva',
    password: 'sa',
  }

  const result = await api
  .post('/api/users')
  .send(newUser)
  .expect(400)
  .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('shorter than the minimum allowed length (3)')
  
  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})


test('creation succeeds with a fresh username', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'silvarob',
    name: 'Silva',
    password: 'salainen',
  }
  
  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

  test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('`username` to be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  
  afterAll(() => {
    mongoose.connection.close()
  })
