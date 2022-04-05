import store from '../Redux/store'
import { createRequest } from './fetchUtils';
import { login, logout } from '../Redux/authSlice';

export const registerStaff = (name: string, password: string) => {
  createRequest('POST', 'staff/registerStaff', {name: name, password: password})
    .then(res => {
      if(res) res.json().then(data => {
        if(res.ok)
          console.log(data)
        else
          alert(data.message)
      })
    })
    .catch((e) => console.log(e))
}

export const loginStaff = (name: string, password: string) => {
  const dispatch = store.dispatch
  createRequest('POST', 'staff/login', {name: name, password: password})
    .then(res => {
      if(res) res.json().then(data => {
        if(res.ok)
          dispatch(login({staffId: data.staffId, name: data.name}))
        else
          alert(data.message)
      })
    })
    .catch((e) => console.log(e))
}

export const logoutStaff = () => {
  const dispatch = store.dispatch
  createRequest('POST', 'staff/logout')
    .then(res => {
      if(res)
        res.json().then(data => {
          alert(data.message)
          if(res.ok)
            dispatch(logout())
        })
    })
    .catch((e) => console.log(e))
}

export const getStaff = (staffId: string) => {
  createRequest('GET', 'staff/getStaff', undefined, {staffId: staffId})
    .then(res => {
      if(res && res.ok) res.json().then(data => console.log(data))
    })
    .catch((e) => console.log(e))
}

export const setAdmin = (staffId: string, newStatus: boolean) => {
  createRequest('POST', 'staff/setAdmin', {staffId: staffId, newStatus: newStatus})
    .then(res => {
      if(res && res.ok) res.json().then(data => console.log(data))
    })
    .catch((e) => console.log(e))
}
