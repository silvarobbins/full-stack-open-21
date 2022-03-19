import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, GET_BOOKS } from './queries'

export const updateCache = (cache, query, addedBook) => {
  cache.updateQuery(query, (data) => {
    console.log({data})
    return {
      allBooks: data?.allBooks.concat(addedBook),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    setToken(window.localStorage.getItem('library-user-token'))
  }, [])
  
  const { data, error } = useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      // updateCache(client.cache, { query: GET_BOOKS }, addedBook)
      client.cache.updateQuery({ query: GET_BOOKS, variables: {genre: null}}, (data) => ({allBooks: data?.allBooks.concat(addedBook) || []}))
    }
  })

  console.log({data, error})

  const logout = () => {
    setToken(null)
    localStorage.clear()
  }

  if (!token) {
    return (
        <div>
          <div>
            <button onClick={() => setPage('authors')}>authors</button>
            <button onClick={() => setPage('books')}>books</button>
            <button onClick={() => setPage('login')}>login</button>
          </div>

          <Authors show={page === 'authors'} />

          <Books show={page === 'books'} />

          <Login show={page === 'login'} setToken={setToken} setPage={setPage} />
        </div>
      )
  } else {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommended')}>recommended</button>
          <button onClick={() => logout()}>logout</button>
        </div>

        <Authors show={page === 'authors'} />

        <Books show={page === 'books'} />

        <NewBook show={page === 'add'} />

        <Recommended show={page === 'recommended'}/>
      </div>
    )
  }

  
}

export default App
