import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Item, Order, ItemEnum } from '../utils/types'

interface DataState {
  itemsFetched: boolean,
  allItems: Item[] | undefined,
  drinks: Item[] | undefined,
  food: Item[] | undefined,
  wine: Item[] | undefined,
  other: Item[] | undefined,
  orders: Order[] | undefined,
  itemIdMap: {[key: string]: Item} | undefined,
  snackbarMessage: {messageCode: string, args: {[key: string]: string | number} | undefined, error: boolean} | undefined,
  lastOrderUpdate: {order: Order, itemId: string, increaseCompleted: boolean} | undefined,
  lastItemUpdate: {item: Item, action: 'update' | 'delete'} | undefined,
}

const initialState: DataState = {
  itemsFetched: false,
  allItems: undefined,
  drinks: undefined,
  food: undefined,
  wine: undefined,
  other: undefined,
  orders: undefined,
  itemIdMap: undefined,
  snackbarMessage: undefined,
  lastOrderUpdate: undefined,
  lastItemUpdate: undefined,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setItemData: (state, action: PayloadAction<{[key: string] : Item}>) => {
      state.itemsFetched = true
      state.drinks = undefined
      state.food = undefined
      state.wine = undefined
      state.other = undefined
      state.allItems = Object.values(action.payload).sort((a, b) => ItemEnum[a.group] - ItemEnum[b.group])
      state.itemIdMap = action.payload
      Object.values(action.payload).forEach((item: Item) => {
        switch (item.group) {
          case Object.values(ItemEnum)[0]:
            state.drinks ? state.drinks.push(item) : state.drinks = new Array(item)
            break

          case Object.values(ItemEnum)[1]:
            state.food ? state.food.push(item) : state.food = new Array(item)
            break

          case Object.values(ItemEnum)[2]:
            state.wine ? state.wine.push(item) : state.wine = new Array(item)
            break

          case Object.values(ItemEnum)[3]:
            state.other ? state.other.push(item) : state.other = new Array(item)
            break
        }
      })
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload
    },
    updateCompletedItem: (state, action: PayloadAction<{order: Order, itemId: string, increaseCompleted: boolean, newOrder: Order}>) => {
      if(state.orders === undefined)
        return
      state.orders = state.orders.map(order => order.orderId === action.payload.order.orderId ? action.payload.newOrder : order)
      state.lastOrderUpdate = {order: action.payload.order, itemId: action.payload.itemId, increaseCompleted: action.payload.increaseCompleted}
    },
    undoOrderUpdate: (state) => {
      if(state.orders === undefined || state.lastOrderUpdate === undefined)
        return
      const {order: oldOrder} = state.lastOrderUpdate;
      state.orders = state.orders.map(order => order.orderId === oldOrder.orderId ? oldOrder : order)
      state.lastOrderUpdate = undefined
    },
    setSnackbarMessage: (state, action: PayloadAction<{messageCode: string, args: { [key: string]: string | number } | undefined, error: boolean}>) => {
      state.snackbarMessage = action.payload
    },
    updateAllItems: (state, action: PayloadAction<Item[]>) => {
      state.allItems = action.payload
    },
    setLastChangedItem: (state, action: PayloadAction<{item: Item, action: 'update' | 'delete'} | undefined>) => {
      state.lastItemUpdate = action.payload
    },
  },
})

export const { setItemData, setOrders, updateCompletedItem, setSnackbarMessage, undoOrderUpdate, updateAllItems, setLastChangedItem } = dataSlice.actions

export const selectData = (state: RootState) => state.data

export default dataSlice.reducer
