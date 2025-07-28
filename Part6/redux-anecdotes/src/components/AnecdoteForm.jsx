import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const add = (e) => {
        e.preventDefault()
        const content = e.target.content.value
        e.target.content.value = ""
        dispatch(addAnecdote(content))
        dispatch(setNotification(`you added anecdote '${content}'`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
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