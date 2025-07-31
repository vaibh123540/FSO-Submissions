import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: '',
    reducers: {
        setNotif(state, action) {
            return action.payload
        }
    }
})

export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch(setNotif(notification))
        setTimeout(() => {
            dispatch(setNotif(''))
        }, time*1000)
    }
}

export default notificationSlice.reducer
export const { setNotif } = notificationSlice.actions