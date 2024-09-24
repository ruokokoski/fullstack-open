import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
//import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  //const anecdotes = useSelector(state => state.notes.sort((a, b) => b.votes - a.votes))
  
  const anecdotes = useSelector(state => {
    const filter = state.filter.toLowerCase()
    const sorted = [...state.notes].sort((a, b) => b.votes - a.votes)
    console.log('Sorted:', sorted)
    const filteredAnecdotes = sorted.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter)
    )
    return filteredAnecdotes
  })
  console.log(anecdotes)
  const dispatch = useDispatch()

  const vote = async (id, anecdote) => { // content poistettu
    console.log('vote', id)
    // Tehtävä 6.15
    const newVote = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(voteAnecdote(newVote)) // Tehtävä 6
    dispatch(setNotification(`You voted: "${anecdote.content}"`, 5))
    //const updated = await anecdoteService.update(newVote)
    //dispatch(voteAnecdote(updated))
    //dispatch(voteAnecdote({ id }))
    /*
    dispatch(setNotification(`You voted: "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000) */ 
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes {' '}
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList