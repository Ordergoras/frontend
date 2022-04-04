import { createRequest } from './fetchUtils';

export const postOrder = (tableNr: number, staffId: string, orderedItems: Object) => {
  createRequest('POST', 'orders/postOrder', {tableNr: tableNr, staffId: staffId, orderedItems: orderedItems})
    .then(res => {
      if(res) res.json().then(data => alert(data.message))
    })
    .catch((e) => console.log(e))
}

export const getOrder = (orderId: string) => {
  createRequest('GET', 'orders/getOrder', undefined, {orderId: orderId})
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
