// Tehtävä 6.10
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})
console.log(store.getState())

export default store