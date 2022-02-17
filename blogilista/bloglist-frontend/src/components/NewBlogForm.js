import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: &emsp;
          <input
            id = 'title'
            type = 'text'
            value = {newTitle}
            name = 'Title'
            onChange = {handleNewTitle}
          />
        </div>
        <div>
          author: &emsp;
          <input
            id = 'author'
            type = 'text'
            value = {newAuthor}
            name = 'Author'
            onChange = {handleNewAuthor}
          />
        </div>
        <div>
          url: &emsp;
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

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm