import { createRequest } from './fetchUtils';
import i18next from 'i18next';
import { setOrders } from '../Redux/dataSlice';
import store from '../Redux/store';

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
          alert(i18next.t(data.message, {dataType: i18next.t('order')}))
      })
    })
    .catch((e) => console.log(e))
}

export const getMyOrders = () => {
  const dispatch = store.dispatch
  createRequest('GET', 'orders/myOrders')
    .then(res => {
      if(res) res.json().then(data => {
        if(res.ok)
          dispatch(setOrders(data))
        else
          alert(i18next.t(data.message, {dataType: i18next.t('order')}))
      })
    })
    .catch((e) => console.log(e))
}

export const updateCompletedItems = (orderId: string, itemId: string, increaseCompleted: boolean) => {
  return createRequest('POST', 'orders/completeOrderItem', {orderId: orderId, itemId: itemId, increaseCompleted: increaseCompleted})
    .then(res => {
      if(res) {
        res.json().then(data => {
          if (res.ok)
            alert(i18next.t(data.message))
          else
            alert(i18next.t(data.message))
        })
        return res.ok;
      }
      else
        return false
    })
    .catch((e) => console.log(e))
}
