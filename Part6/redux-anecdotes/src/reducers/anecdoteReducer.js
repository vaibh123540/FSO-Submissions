import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map(a => a.id === action.payload.id ? action.payload : a)
    },
    addAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const likeAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote({ id: anecdote.id, content: anecdote.content, votes: anecdote.votes + 1 })
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
