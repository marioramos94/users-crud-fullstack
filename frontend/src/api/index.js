import axios from 'axios';
import config from './../config'
const API_URI = config.api.uri
export const listAllUsers = () => axios.get(`${API_URI}/list`, {
  headers: { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
})

export const getUser = (id) => axios.get(`${API_URI}/get/${id}`, {
  headers: { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
})

export const deleteApiUser = (id) => axios.delete(`${API_URI}/delete/${id}`, {
  headers: { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
})

export const updateApiUser = (id, user) => axios.put(`${API_URI}/update/${id}`, user, {
  headers: { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
})

export const createUser = (user) => axios.post(`${API_URI}/create`, user, {
  headers: { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
})

