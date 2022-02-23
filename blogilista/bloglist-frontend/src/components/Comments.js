import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewCommentForm = ({ blog }) => {
  const [newComment, setNewComment] = useState('')

  const dispatch = useDispatch()

  const handleNewComment = (event) => {
    setNewComment(event.target.value)
  }

  const addComment = async (event) => {
    event.preventDefault()
    const commentObject = {
      comment: newComment,
    }
    try {
      await dispatch(postComment(blog, commentObject))
      dispatch(setNotification(`commented '${commentObject.comment}' on ${blog.title}`, 5))
      setNewComment('')
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('Could not post comment', 5))
    }
  }

  return (
    <form onSubmit={addComment}>
      comment: &emsp;
      <input
        id = 'comment'
        type = 'text'
        value = {newComment}
        name = 'Comment'
        onChange = {handleNewComment}
      /> &emsp;
      <button id='submit-button' type = "submit">add comment</button>
    </form>
  )

}

const Comments = ({ blog }) => {
  console.log('comments', blog)
  const comments = blog.comments
  if(!comments) {
    return(
      <div>
        <h3>Comments</h3>
        <NewCommentForm blog={blog}/>
      </div>
    )
  }
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map(comment =>
          <li key={comment.id}>{comment.comment}</li>
        )}
      </ul>
      <NewCommentForm blog={blog}/>
    </div>
  )
}

export default Comments