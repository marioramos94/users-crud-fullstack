import React, { useContext } from 'react';
import { UsersPage } from './pages/UsersPage';
import { Login } from './pages/Login';
import Context from './Context';

export const App = () => {
const { isAuth = false  } = useContext(Context);
return  isAuth? <UsersPage/> : <Login/>
};
