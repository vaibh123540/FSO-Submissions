import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
      switch (action.type) {
          case "SET":
              return action.payload
          case "CLEAR":
              return null
      }
      return state
  }

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey:['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes +1 })
    notificationDispatch({ type: "SET", payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if ( result.isLoading ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification/>
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
     </NotificationContext.Provider>
  )
}

export default App
