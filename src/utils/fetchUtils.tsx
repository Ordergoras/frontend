import store from '../Redux/store'

export const backendIP = 'http://localhost:5000'

export const createRequest = (method: 'GET' | 'POST' | 'PUT', apiEndpoint: string, body?: Object, pathArguments?: Object) => {
  const pathArgumentsString = pathArguments ? getPathArgumentString(pathArguments) : ''

  const requestOptions = {
    method: method,
    headers: {
      ...store.getState().auth.isAuthenticated && {'authorization': store.getState().auth.token},
      ...body && {'Content-Type': 'application/json'},
    },
    ...body && {
      body: JSON.stringify(body),
    },
  }

  return fetch(`${backendIP}/${apiEndpoint}${pathArgumentsString}`, requestOptions)
    .then((res) => {
      if(res.status === 500) {
        alert('Server Error')
      }
      if(res.status === 401) {
        if(store.getState().auth.isAuthenticated) {
          // TODO handle getting new token
        } else {
          // TODO open login prompt
        }
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
