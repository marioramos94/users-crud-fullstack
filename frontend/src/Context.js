import React, { createContext, useState } from "react";
export const Context = createContext();

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return window.sessionStorage.getItem('token')
  });
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ id: null, firstName: '', lastName: '', email: '' })
  const [editing, setEditing] = useState(false)
  const editRow = user => {
    setEditing(true)
    setCurrentUser({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email })
  }
  const value = {
    isAuth,
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    editing,
    editRow,
    setEditing,
    activateAuth: (token) => {
      setIsAuth(true)
      window.sessionStorage.setItem('token', token)
    },
    removeAuth: () => {
      setIsAuth(false)
      window.sessionStorage.removeItem('token')
    }
  }
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
};
const Consumer = ({ children }) => {

  return (
    <Context.Consumer >
      {children}
    </Context.Consumer>
  )
};
export { Consumer, Provider, Context as default };
