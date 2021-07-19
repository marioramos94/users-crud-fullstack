import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import Context from "./../Context";
import { updateApiUser } from './../api';
const EditYo = () => {
  const { setUsers, users, currentUser, setEditing } = useContext(Context)
  const { register, errors, handleSubmit, setValue } = useForm({
    defaultValues: currentUser
  });
  setValue('firstName', currentUser.firstName)
  setValue('lastName', currentUser.lastName)
  setValue('email', currentUser.email)
  const updateUser = (id, updatedUser) => {
    setEditing(false)
    updateApiUser(id, updatedUser).then(() => {
      setUsers(users.map(user => (user.id === id ? updatedUser : user)))
    })
  }
  const onSubmit = (data, e) => {
    data.id = currentUser.id
    updateUser(currentUser.id, data)
    e.target.reset()
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
        {errors?.name?.message}
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
      <button type="submit">Edit user</button>
      <button onClick={() => setEditing(false)} className="button muted-button">
        Cancel
      </button>
    </form>
  );
}

export default EditYo;
