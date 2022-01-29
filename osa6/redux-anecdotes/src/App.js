import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdotes from './components/AnecdoteList'

const App = () => {
  return (
    <div>
      <Notification />
    <h2>Anecdotes</h2>
      <Anecdotes />
      <AnecdoteForm />
    </div>
  )
}

export default App