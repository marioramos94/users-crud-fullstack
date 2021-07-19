import React, { useContext } from 'react';
import { useForm } from 'react-hook-form'
import Context from "./../Context";
import { v4 as uuidv4 } from 'uuid';
import { createUser } from './../api'
const AddUserForm = () => {
  const { setUsers, users } = useContext(Context)
  const { register, errors, handleSubmit } = useForm();
  const addUser = (user) => {
    user.id = uuidv4()
    createUser(user).then(() => {
      setUsers([
        ...users,
        user
      ])
    }).catch((e) => {
      console.log({ e })
    })
  }
  const onSubmit = (data, e) => {
    data.id = null
    addUser(data)
    e.target.reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input
        type="text"
        name="firstName"
        ref={register({ required: { value: true, message: 'Valor requerido' } })}
      />
      <div>
        {errors?.name?.message}
      </div>
      <label>Last Name</label>
      <input
        type="text"
        name="lastName"
        ref={register({ required: { value: true, message: 'Valor requerido' } })}
      />
      <div>
        {errors?.username?.message}
      </div>
      <label>Email</label>
      <input
        type="email"
        name="email"
        ref={register({ required: { value: true, message: 'Valor requerido' } })}
      />
      <div>
        {errors?.username?.message}
      </div>
      <button type="submit">Add new user</button>
    </form>
  );
}

export default AddUserForm;
