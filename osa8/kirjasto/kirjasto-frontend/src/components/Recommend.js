import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_BOOKS = gql`
  query allBooks($genre: String){
    allBooks(genre: $genre){
      title
      published
      author{
        name
      }
      genres
    }
  }
`

const GET_CURRENT_USER = gql`
  query me {
    me {
        favoriteGenre
      }
  }
`

const Recommended = (props) => {
  const result = useQuery(GET_CURRENT_USER)
  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { genre: result.data?.me.favoriteGenre },
    pollInterval: 500
  });

  if (loading) {
    return(
      <div>
        loading...
      </div>
    )
  }

  if (!props.show) {
    return null
  }

  const books = data.allBooks

  return (
    <div>
      <h2>books</h2>
      <div>
        books in your favorite category
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
