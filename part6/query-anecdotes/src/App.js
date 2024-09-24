import { useQuery, useMutation, useQueryClient } from 'react-query'
//import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { NotificationProvider } from './NotifContext'
import NotificationContext from './NotifContext'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })
  // Tehtävä 6.20
  const notAvailable = 'anecdote service not available due to problems in server'

  const { isLoading, isError, data } = useQuery(
    'anecdotes', getAnecdotes,
    {
      retry: false
    }
  )
  console.log('Loading:', isLoading, 'Error:', isError)

  if ( isLoading ) {
    return <span>loading data...</span>
  }

  if (isError) {
    return <span>{notAvailable}</span>
  }

  const anecdotes = data

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 }) // Tehtävä 6.22
    showNotification('VOTE', anecdote.content)
  }
/*
  const anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ] */

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
