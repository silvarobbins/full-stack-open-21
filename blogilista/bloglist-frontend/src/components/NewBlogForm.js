import React, { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const NewBlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    try {
      await dispatch(createBlog(newBlog))
      dispatch(setNotification(`added ${newBlog.title}`, 5))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('Could not add blog', 5))
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title: &emsp;
          <input
            id = 'title'
            type = 'text'
            value = {newTitle}
            name = 'Title'
            onChange = {handleNewTitle}
          />
        </div>
        <div>
          Author: &emsp;
          <input
            id = 'author'
            type = 'text'
            value = {newAuthor}
            name = 'Author'
            onChange = {handleNewAuthor}
          />
        </div>
        <div>
          Url: &emsp;
          <input
            id = 'url'
            type = 'text'
            value = {newUrl}
            name = 'Url'
            onChange = {handleNewUrl}
          />
          <br/>
          <button id='submit-button' type = "submit">create</button>
        </div>
      </form>
    </div>)
}

export default NewBlogForm