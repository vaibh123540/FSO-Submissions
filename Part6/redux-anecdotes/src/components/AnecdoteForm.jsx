import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const add = async (e) => {
        e.preventDefault()
        const content = e.target.content.value
        e.target.content.value = ""
        dispatch(createAnecdote(content))
        dispatch(setNotification(`you added anecdote '${content}'`, 5))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name="content" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm