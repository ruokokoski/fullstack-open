import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', type: '' }

const notifSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      const { message, type } = action.payload
      state.message = message
      state.type = type
    }
  }
})

export const { createNotification } = notifSlice.actions
export default notifSlice.reducer