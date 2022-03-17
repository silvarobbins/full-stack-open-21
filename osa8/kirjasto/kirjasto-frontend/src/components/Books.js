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
const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const { loading, error, data, refetch } = useQuery(GET_BOOKS, {
    variables: { genre: filter }
  });
  console.log(data)

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
  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  }
  const genres = books.flatMap((b) => b.genres).filter(onlyUnique)

  return (
    <div>
      <h2>books</h2>
      {filter ? <div>in genre {filter}</div>: <div>showing all</div>}
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
      <div>
        {genres.map((g) => 
          <button key={g} onClick={() => setFilter(g)}>{g}</button>
        )}
        <button key={'empty'} onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
