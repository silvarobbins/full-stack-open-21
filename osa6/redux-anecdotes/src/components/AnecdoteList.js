import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notificationChange } from "../reducers/notificationReducer"

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
  const anecdotes = useSelector(state => state.anecdotes).sort((a,b) => b.votes-a.votes)

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
        key = {anecdote.id}
        anecdote = {anecdote}
        handleClick = {() => {
          dispatch(voteAnecdote(anecdote.id))
          dispatch(notificationChange(`You voted '${anecdote.content}'`))
          setTimeout(() => {
            dispatch(notificationChange(null))
          }, 5000)
        }
        }/>
      )}
    </div>
  )
}

export default Anecdotes