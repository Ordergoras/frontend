import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Item, Order } from '../utils/types'

interface DataState {
  itemsFetched: boolean,
  drinks: Item[] | undefined,
  food: Item[] | undefined,
  other: Item[] | undefined,
  orders: Order[] | undefined,
  itemIdMap: { [key: string]: string } | undefined,
}

const initialState: DataState = {
  itemsFetched: false,
  drinks: undefined,
  food: undefined,
  other: undefined,
  orders: undefined,
  itemIdMap: undefined,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setItemData: (state, action: PayloadAction<Item[]>) => {
      state.itemsFetched = true
      state.drinks = undefined
      state.food = undefined
      state.other = undefined
      action.payload.forEach((item: Item) => {
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
    setItemIdMap: (state, action: PayloadAction<{[key: string] : string}>) => {
      state.itemIdMap = action.payload
    },
    updateCompletedItem: (state, action: PayloadAction<{orderId: string, newOrder: Order}>) => {
      if(state.orders === undefined)
        return
      state.orders = state.orders.map(order => order.orderId === action.payload.orderId ? action.payload.newOrder : order)
    },
  },
})

export const { setItemData, setOrders, setItemIdMap, updateCompletedItem } = dataSlice.actions

export const selectData = (state: RootState) => state.data

export default dataSlice.reducer
