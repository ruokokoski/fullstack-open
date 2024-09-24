import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotifContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      console.log('Successful mutation:', data.content)
      showNotification('CREATE', data.content)
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      console.log('Mutation failed:', error)
      showNotification('FAIL', 'Too short anecdote. Must have length 5.')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote', content)
    newAnecdoteMutation.mutate({ content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
