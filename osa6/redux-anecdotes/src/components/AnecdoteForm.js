import React from "react"
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notificationChange } from "../reducers/notificationReducer"

const NewAnecdote = (props) => {
  const dispatch = useDispatch()
  
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notificationChange(`You created a new anecdote: '${content}'`))
    setTimeout(() => {
      dispatch(notificationChange(null))
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <input name = 'anecdote' />
          <button type='submit'>add</button>
        </form>
    </div>
  )
}

export default NewAnecdote