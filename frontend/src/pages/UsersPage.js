import React, {  useEffect, useContext } from 'react';
import UserTable from './../components/UserTable';
import AddUserForm from './../components/AddUserForm';
import EditYo from './../components/EditYo';
import { listAllUsers } from './../api'
import Context from "./../Context";

export const UsersPage = () => {
  const { removeAuth, setUsers, editing } = useContext(Context)
  useEffect(() => {
    listAllUsers().then((result) => {
      setUsers(result.data)
    }).catch((e)=>{
      console.log(e)
    })
  },[setUsers])
  return (
    <div className="container">
      <div className="row" >
        <button onClick={removeAuth}>Logout</button>
      </div>
      <h1>Serverless User CRUD</h1>
      <p>Backend: DynamoDB - C# on Lambda - API Gateway </p>
      <p>Frontend: Reactjs Spa- Hosted on Firebase </p>
      <p>Backend Deploy: Serverless Framework</p>
      <p>Frontend Deploy: Firebase tools</p>
      <div className="flex-row">
        <div className="flex-large">
        {editing ? (
          <div>
            <h2>Edit user</h2>
            <EditYo />
          </div>
        ) : (
          <div>
            <h2>Add user</h2>
            <AddUserForm />
          </div>
        )}
      </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable />
        </div>
      </div>
    </div>
  );
}
