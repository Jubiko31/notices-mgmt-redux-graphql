import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
    name: 'count',
    initialState: {
        count: 0,
    },
    reducers: {
        setCount(state, action) {
            state.count = action.payload;
        },
    },
});

export const countActions = countSlice.actions;

export default countSlice;