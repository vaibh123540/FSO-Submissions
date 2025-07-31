import { useSelector, useDispatch } from "react-redux"
import { likeAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => [...state.anecdotes].filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())))
    const dispatch = useDispatch()

    const compareVote = (a, b) => {
        if (a.votes < b.votes) return 1
        else if (a.votes > b.votes) return -1
        return 0
    }

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(likeAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
        {anecdotes.sort(compareVote).map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList