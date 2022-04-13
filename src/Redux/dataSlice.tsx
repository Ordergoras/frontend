import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Item, Order } from '../utils/types'

interface DataState {
  drinks: Item[] | undefined,
  food: Item[] | undefined,
  other: Item[] | undefined,
  myOrders: Order[] | undefined,
}

const initialState: DataState = {
  drinks: undefined,
  food: undefined,
  other: undefined,
  myOrders: undefined,
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setItemData: (state, action: PayloadAction<Item[]>) => {
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
    setMyOrders: (state, action: PayloadAction<Order[]>) => {
      state.myOrders = action.payload
    },
  },
})

export const { setItemData, setMyOrders } = dataSlice.actions

export const selectData = (state: RootState) => state.data

export default dataSlice.reducer