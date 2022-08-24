import { createRequest } from './fetchUtils';
import i18next from 'i18next';
import { setLastAddedOrder, setOrders, setSnackbarMessage } from '../Redux/dataSlice';
import store from '../Redux/store';

export const postOrder = (tableNr: number, orderedItems: Object) => {
  const dispatch = store.dispatch
  return createRequest('POST', 'orders/postOrder', {tableNr: tableNr, orderedItems: orderedItems})
    .then(res => {
      if(res) {
        res.json().then(data => {
          if (res.ok) {
            dispatch(setSnackbarMessage({messageCode: data.message, args: undefined, error: false}))
            dispatch(setLastAddedOrder(data.orderId))
          }
          else
            dispatch(setSnackbarMessage({messageCode: data.message, args: undefined, error: true}))
        })
        return res.ok
      }
      else
        return false
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

export const deleteOrder = (orderId: string) => {
  const dispatch = store.dispatch
  return createRequest('POST', 'orders/deleteOrder', {orderId: orderId})
    .then(res => {
      if(res) return res.json().then(data => {
        if(res.ok) {
          dispatch(setSnackbarMessage({messageCode: data.message, args: undefined, error: false}))
          return data
        }
        else {
          dispatch(setSnackbarMessage({messageCode: data.message, args: undefined, error: true}))
          return undefined
        }
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

export const getOpenOrders = () => {
  const dispatch = store.dispatch
  createRequest('GET', 'orders/openOrders')
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

export const updateCompletedItemRequest = (orderId: string, outerKey: string, itemId: string, increaseCompleted: boolean, amount: number) => {
  const dispatch = store.dispatch
  return createRequest('POST', 'orders/completeOrderItem',
    {orderId: orderId, outerKey: outerKey, itemId: itemId, increaseCompleted: increaseCompleted, amount: amount})
    .then(res => {
      if(res) {
        res.json().then(data => {
          if (res.ok)
            dispatch(setSnackbarMessage({messageCode: data.message, args: undefined, error: false}))
          else
            dispatch(setSnackbarMessage({messageCode: data.message, args: undefined, error: true}))
        })
        return res.ok
      }
      else
        return false
    })
    .catch((e) => console.log(e))
}
