import store from '../Redux/store'
import { createRequest } from './fetchUtils';
import { credError, login, logout } from '../Redux/authSlice';
import i18next from 'i18next';
const shajs = require('sha.js');

export const registerStaff = (name: string, password: string) => {
  const dispatch = store.dispatch
  createRequest('POST', 'staff/registerStaff', {name: name, password: shajs('sha256').update(password).digest('hex')})
    .then(res => {
      if(res) res.json().then(data => {
        if(res.ok)
          dispatch(login({staffId: data.staffId, name: data.name}))
        else
          dispatch(credError({error: true, errorMessage: i18next.t(data.message)}))
      })
    })
    .catch((e) => console.log(e))
}

export const loginStaff = (name: string, password: string) => {
  const dispatch = store.dispatch
  createRequest('POST', 'staff/login', {name: name, password: shajs('sha256').update(password).digest('hex')})
    .then(res => {
      if(res) res.json().then(data => {
        if(res.ok)
          dispatch(login({staffId: data.staffId, name: data.name}))
        else
          dispatch(credError({error: true, errorMessage: i18next.t(data.message)}))
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
          alert(i18next.t(data.message))
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
      else if(res) res.json().then(data => alert(i18next.t(data.message, {dataType: i18next.t('staff')})))
    })
    .catch((e) => console.log(e))
}

export const setAdmin = (staffId: string, newStatus: boolean) => {
  createRequest('POST', 'staff/setAdmin', {staffId: staffId, newStatus: newStatus})
    .then(res => {
      if(res && res.ok) res.json().then(data => console.log(data))
      else if(res) res.json().then(data => alert(i18next.t(data.message)))
    })
    .catch((e) => console.log(e))
}
