import { createRequest } from './fetchUtils';
import { setItemData } from '../Redux/dataSlice';
import i18next from 'i18next'
import store from '../Redux/store';

export const getItems = (itemIds: Array<string>) => {
  createRequest('PUT', 'storage/getItems', {itemIds: itemIds})
    .then(res => {
      if(res && res.ok) res.json().then(data => console.log(data))
      else if(res) res.json().then(data => alert(i18next.t(data.message, {dataType: i18next.t('item')})))
    })
    .catch((e) => console.log(e))
}

export const getAllItems = () => {
  const dispatch = store.dispatch
  createRequest('GET', 'storage/getAllItems')
    .then(res => {
      if(res && res.ok) res.json().then(data => dispatch(setItemData(data)))
      else if(res) res.json().then(data => alert(i18next.t(data.message)))
    })
    .catch((e) => console.log(e))
}

export const addItem = (name: string, amount: number, group: string, price: number) => {
  createRequest('POST', 'storage/postItem', {name: name, amount: amount, group: group, price: price})
    .then(res => {
      if(res && res.ok) res.json().then(data => alert(i18next.t(data.message, data.args)))
      else if(res) res.json().then(data => alert(i18next.t(data.message)))
    })
    .catch((e) => console.log(e))
}

export const updateItemAmount = (itemId: string, amountChange: number) => {
  createRequest('POST', 'storage/updateItemAmount', {itemId: itemId, amountChange: amountChange})
    .then(res => {
      if(res && res.ok) res.json().then(data => console.log(data))
      else if(res) res.json().then(data => alert(i18next.t(data.message)))
    })
    .catch((e) => console.log(e))
}

export const retrieveItems = (retrievedItems: Object) => {
  createRequest('POST', 'storage/retrieveItems', {retrievedItems: retrievedItems})
    .then(res => {
      if(res && res.ok) res.json().then(data => console.log(data))
      else if(res) res.json().then(data => alert(i18next.t(data.message)))
    })
    .catch((e) => console.log(e))
}
