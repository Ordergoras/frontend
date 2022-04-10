import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { Item } from '../utils/types'

interface DataState {
  allItems: Item[] | undefined,
}

const initialState: DataState = {
  allItems: undefined
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setItemData: (state, action: PayloadAction<Item[]>) => {
      state.allItems = action.payload
    },
  },
})

export const { setItemData } = dataSlice.actions

export const selectData = (state: RootState) => state.data

export default dataSlice.reducer
