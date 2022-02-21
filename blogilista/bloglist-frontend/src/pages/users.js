import React from 'react'
import { useSelector } from 'react-redux'

const UsersPage = () => {
  const users = useSelector(state => state.user)

  return(
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th><b>blogs created</b></th>
          </tr>
          {users.map(user =>
            <tr key = {user.id}>
              <th>{user.name}</th>
              <th>{user.blogs.length}</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage

