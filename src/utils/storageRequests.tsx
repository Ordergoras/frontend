import { createRequest } from './fetchUtils';

export const getItems = (itemIds: Array<string>) => {
  createRequest('PUT', 'storage/getItems', {itemIds: itemIds})
    .then(res => {
      if(res) res.json().then(data => console.log(data))
    })
    .catch((e) => {alert(e)})
}

export const getAllItems = () => {
  createRequest('GET', 'storage/getAllItems')
    .then(res => {
      if(res) res.json().then(data => console.log(data))
    })
    .catch((e) => {alert(e)})
}

export const addItem = (name: string, amount: number, group: string) => {
  createRequest('POST', 'storage/postItem', {name: name, amount: amount, group: group})
    .then(res => {
      if(res) res.json().then(data => alert(data.message))
    })
    .catch((e) => {alert(e)})
}

export const updateItemAmount = (itemId: string, amountChange: number) => {
  createRequest('POST', 'storage/updateItemAmount', {itemId: itemId, amountChange: amountChange})
    .then(res => {
      if(res) res.json().then(data => console.log(data))
    })
    .catch((e) => {alert(e)})
}

export const retrieveItems = (retrievedItems: Object) => {
  createRequest('POST', 'storage/retrieveItems', {retrievedItems: retrievedItems})
    .then(res => {
      if(res) res.json().then(data => console.log(data))
    })
    .catch((e) => {alert(e)})
}