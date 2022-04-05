import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface AuthState {
  isAuthenticated: boolean,
  name: string | undefined,
}

const initialState: AuthState = {
  isAuthenticated: false,
  name: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{name: string}>) => {
      state.isAuthenticated = true
      state.name = action.payload.name
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.name = undefined
    },
  },
})

export const { login, logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
