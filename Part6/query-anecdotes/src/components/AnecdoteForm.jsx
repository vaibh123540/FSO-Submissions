import { createAnecdote } from "../requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const [notification, dispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey:['anecdotes'] })
    },
    onError: () => {
      dispatch({ type: "SET", payload: `too short anecdote, must have length 5 or more` })
      setTimeout(() => {
        dispatch({ type: "CLEAR" })
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    try {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      dispatch({ type: "SET", payload: `anecdote '${content}' added` })
      setTimeout(() => {
        dispatch({ type: "CLEAR" })
      }, 5000);
      console.log('new anecdote')
    } catch(error) {
      console.log(error)
    }
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
