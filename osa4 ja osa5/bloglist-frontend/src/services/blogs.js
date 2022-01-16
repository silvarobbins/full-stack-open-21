import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const updatedObject = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id
  }

  const response = await axios.put(baseUrl + `/${blog.id}`, updatedObject, config)
  return response.data
}

const del = async blog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(baseUrl + `/${blog.id}`, config)
  return response.data
}

const exportObject = {
  setToken,
  getAll,
  create,
  like,
  del
}

export default exportObject