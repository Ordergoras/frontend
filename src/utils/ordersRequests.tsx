import { createRequest } from './fetchUtils';
import i18next from 'i18next';

export const postOrder = (tableNr: number, staffId: string, orderedItems: Object) => {
  createRequest('POST', 'orders/postOrder', {tableNr: tableNr, staffId: staffId, orderedItems: orderedItems})
    .then(res => {
      if(res) res.json().then(data => alert(i18next.t(data.message)))
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
          alert(i18next.t(data.message))
      })
    })
    .catch((e) => console.log(e))
}
