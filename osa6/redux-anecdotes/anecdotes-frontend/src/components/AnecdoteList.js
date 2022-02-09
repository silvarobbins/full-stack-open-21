import React from "react"
import { connect } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes &nbsp;
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = (props) => {
  return (
    <div>
      {props.anecdotes
        .sort((a,b) => b.votes-a.votes)
        .map(anecdote =>
          <Anecdote
            key = {anecdote.id}
            anecdote = {anecdote}
            handleClick = {() => {
              props.voteAnecdote(anecdote)
              props.setNotification(`You voted '${anecdote.content}'`, 5)
          }
          }/>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if ( state.filter === null) {
    return {
      anecdotes: state.anecdotes
    }
  }
  return {
    anecdotes: state.anecdotes.filter(anecdote => 
    anecdote.content
      .toLowerCase()
      .includes(state.filter))
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps,
  )(Anecdotes)

export default ConnectedAnecdotes