import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import Select from 'react-select'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'


const Authors = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(SET_BIRTHYEAR)

  const result = useQuery(ALL_AUTHORS, {
    // pollInterval: 1000
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return(
      <div>
        loading...
      </div>
    )
  }
  const authors = result.data.allAuthors
  const options = authors.map(a => {
    return {
      value: a.name, 
      label: a.name
    }
  })

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: {name: name.value, setBornTo: parseInt(born)} })
    setName(null)
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <Select defaultValue={name} onChange={setName} options={options}/>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
        </form>
    </div>
  )
}

export default Authors
