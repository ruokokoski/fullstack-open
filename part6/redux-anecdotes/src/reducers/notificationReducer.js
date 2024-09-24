import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    }
  }
})

//export const { setNotification } = notificationSlice.actions
export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(notificationSlice.actions.setNotification(content));
    setTimeout(() => {
      dispatch(notificationSlice.actions.setNotification(''));
    }, time*1000)
  }
}

export default notificationSlice.reducer