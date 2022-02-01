import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, hideNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
  console.log(state.anecdotes)
    if (state.filter === null) {
      return state.anecdotes
    } else {
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter)).sort((a,b) => b.votes-a.votes)
    }
  })
    

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
        key = {anecdote.id}
        anecdote = {anecdote}
        handleClick = {() => {
          dispatch(voteAnecdote(anecdote))
          dispatch(setNotification(`You voted '${anecdote.content}'`))
          setTimeout(() => {
            dispatch(hideNotification())
          }, 5000)
        }
        }/>
      )}
    </div>
  )
}

export default Anecdotes