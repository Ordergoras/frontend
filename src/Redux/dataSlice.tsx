import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Item, Order } from '../utils/types'

interface DataState {
  itemsFetched: boolean,
  drinks: Item[] | undefined,
  food: Item[] | undefined,
  other: Item[] | undefined,
  orders: Order[] | undefined,
  itemIdMap: { [key: string]: Item } | undefined,
  snackbarMessageCode: string | undefined,
  lastOrderUpdate: {order: Order, itemId: string, increaseCompleted: boolean} | undefined,
}

const initialState: DataState = {
  itemsFetched: false,
  drinks: undefined,
  food: undefined,
  other: undefined,
  orders: undefined,
  itemIdMap: undefined,
  snackbarMessageCode: undefined,
  lastOrderUpdate: undefined,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setItemData: (state, action: PayloadAction<{[key: string] : Item}>) => {
      state.itemsFetched = true
      state.drinks = undefined
      state.food = undefined
      state.other = undefined
      state.itemIdMap = action.payload
      Object.values(action.payload).forEach((item: Item) => {
        switch (item.group) {
          case "Drink":
            state.drinks ? state.drinks.push(item) : state.drinks = new Array(item)
            break

          case "Food":
            state.food ? state.food.push(item) : state.food = new Array(item)
            break

          case "Other":
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
    setSnackbarMessage: (state, action: PayloadAction<string>) => {
      state.snackbarMessageCode = action.payload
    },
  },
})

export const { setItemData, setOrders, updateCompletedItem, setSnackbarMessage, undoOrderUpdate } = dataSlice.actions

export const selectData = (state: RootState) => state.data

export default dataSlice.reducer
