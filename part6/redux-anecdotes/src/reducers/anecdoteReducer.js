import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes' // Tehtävä 6.16

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
] 

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    //id: getId(), // poistettu tehtävässä 6.15
    votes: 0
  }
} */

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    /*
    addAnecdote: (state, action) => {
      const newAnecdote = action.payload
      console.log('New:', newAnecdote)
      state.push(newAnecdote)
    }, 
    voteAnecdote: (state, action) => {
      const id = action.payload.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      anecdoteToVote.votes++
    },*/
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    // Tehtävä 6.14:
    setAnecdotes(state, action) {
      return action.payload
    },
    voteA(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      anecdoteToVote.votes++
    }
  }
})

export const { appendAnecdote, setAnecdotes, voteA } = anecdoteSlice.actions // addAnecdote, voteAnecdote poistettu

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// Tehtävä 6.17
export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updated = await anecdoteService.update(anecdote)
    dispatch(voteA(updated))
  }
}

export default anecdoteSlice.reducer

/*
const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.payload.id
      const toVote = state.find(a => a.id === id)
      const updated = { ...toVote, votes: toVote.votes + 1 }
      return state.map(anecd => anecd.id === id ? updated : anecd)
    case 'NEW':
      return [...state, action.payload]
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'NEW',
    payload: asObject(content)
  }
}

export default anecdoteReducer */