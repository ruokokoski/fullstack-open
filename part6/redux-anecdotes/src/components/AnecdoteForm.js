import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
//import anecdoteService from '../services/anecdotes' // Tehtävä 6.15

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('Content:', content)
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    // Tehtävä 6.15:
    //const newAnecdote = await anecdoteService.createNew(content)
    //dispatch(addAnecdote(newAnecdote))
    dispatch(setNotification(`You created: "${content}"`, 5))
    /*
    dispatch(setNotification(`You created: "${content}"`))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000) */
  }

  return (
    <>
      <h3>create new</h3>
      <form onSubmit={add}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
      <br></br>
    </>
  )
}

export default AnecdoteForm