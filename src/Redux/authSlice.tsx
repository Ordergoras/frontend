import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface AuthState {
  isAuthenticated: boolean,
  staffId: string | undefined,
  name: string | undefined,
  error: boolean,
  errorMessage: string | undefined,
}

const initialState: AuthState = {
  isAuthenticated: false,
  staffId: undefined,
  name: undefined,
  error: false,
  errorMessage: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{staffId: string, name: string}>) => {
      state.isAuthenticated = true
      state.staffId = action.payload.staffId
      state.name = action.payload.name
      state.error = false
      state.errorMessage = undefined
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.staffId = undefined
      state.name = undefined
      state.error = false
      state.errorMessage = undefined
    },
    credError: (state, action: PayloadAction<{error: boolean, errorMessage: string | undefined}>) => {
      state.isAuthenticated = false
      state.staffId = undefined
      state.name = undefined
      state.error = action.payload.error
      state.errorMessage = action.payload.errorMessage
    }
  },
})

export const { login, logout, credError } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
