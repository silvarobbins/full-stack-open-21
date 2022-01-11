import React from "react"

  const NewBlogForm = ({
      addBlog,
      handleNewTitle,
      handleNewAuthor,
      handleNewUrl,
      newTitle,
      newAuthor,
      newUrl
  }) => (
    <div>
    <h2>Create new</h2>
    <form onSubmit={addBlog}>
    <div>
      title: &emsp;
      <input
      type = 'text'
      value = {newTitle}
      name = 'Title'
      onChange = {handleNewTitle}
      />
    </div>
    <div>
      author: &emsp;
      <input
      type = 'text'
      value = {newAuthor}
      name = 'Author'
      onChange = {handleNewAuthor}
      />
    </div>
    <div>
      url: &emsp;
      <input
      type = 'text'
      value = {newUrl}
      name = 'Url'
      onChange = {handleNewUrl}
      />
    <br/>
      <button type = "submit">create</button>
    </div>
    </form>
    </div>
  )

export default NewBlogForm