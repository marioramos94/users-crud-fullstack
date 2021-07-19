import React, { useContext } from 'react'
import Context from "./../Context";
import { deleteApiUser } from './../api';
const UserTable = () => {
  const { setUsers, users, editRow } = useContext(Context)
  const deleteUser = id => {
    deleteApiUser(id).then(() => {
      setUsers(users.filter(user => user.id !== id))
    })
  }
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name </th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="button muted-button"
                    onClick={() => {
                      editRow(user)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="button muted-button"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users</td>
            </tr>
          )
        }
      </tbody>
    </table>
  )
}

export default UserTable
