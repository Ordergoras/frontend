import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface AuthState {
  isAuthenticated: boolean,
  token: string | undefined,
  name: string | undefined,
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: undefined,
  name: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{token: string, name: string}>) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      state.name = action.payload.name
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = undefined
      state.name = undefined
    },
  },
})

export const { login, logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
