import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
}

export const dataSlice = createSlice({
    name: 'dataSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = [...state, action.payload]
        },
        clearData: (state, action) => {
            state.data = [action.payload]
        },
    },
})

// Action creators are generated for each case reducer function
export const { setData, clearData } = dataSlice.actions

export default dataSlice.reducer