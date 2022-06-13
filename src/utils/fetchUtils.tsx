import store from '../Redux/store'
import { logout } from '../Redux/authSlice';

export const backendIP = 'http://localhost:5000'

export const createRequest = (method: 'GET' | 'POST' | 'PUT', apiEndpoint: string, body?: Object, pathArguments?: Object) => {
  const pathArgumentsString = pathArguments ? getPathArgumentString(pathArguments) : ''
  const dispatch = store.dispatch

  return fetch(
    `${backendIP}/${apiEndpoint}${pathArgumentsString}`,
    {
      method: method,
      credentials: 'include',
      headers: {
        ...body && {'Content-Type': 'application/json'},
      },
      ...body && {
        body: JSON.stringify(body),
      },
    })
    .then((res) => {
      if(res.status === 500) {
        alert('Server Error')
      }
      if(res.status === 401) {
        dispatch(logout())
      }
      return res
    })
    .catch((e) => console.log(e))
}

const getPathArgumentString = (pathArguments: Object) => {
  let result = '?'
  let firstDone = false
  for (const [key, value] of Object.entries(pathArguments)) {
    if(firstDone) result += '&'
    else firstDone = true
    result += key.toString() + '=' + value.toString()
  }
  return result
}
