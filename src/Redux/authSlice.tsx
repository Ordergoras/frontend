import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean,
  staffId: number | undefined,
  name: string | undefined,
}

const initialState: AuthState = {
  isAuthenticated: false,
  staffId: undefined,
  name: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{staffId: number, name: string}>) => {
      state.isAuthenticated = true;
      state.staffId = action.payload.staffId;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.staffId = undefined;
      state.name = undefined;
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
