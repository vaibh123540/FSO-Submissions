import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})

export default notificationSlice.reducer
export const { setNotification } = notificationSlice.actions