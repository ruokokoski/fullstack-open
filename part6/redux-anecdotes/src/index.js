import React from 'react'
import ReactDOM from 'react-dom/client'
//import { createStore, combineReducers } from 'redux'
//import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
//import anecdReducer from './reducers/anecdoteReducer'
//import filterReducer from './reducers/filterReducer'
import store from './store'

/*
const reducer = combineReducers({
  notes: anecdReducer,
  filter: filterReducer
}) */

//const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)