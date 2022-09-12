import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name: 'pagination',
    initialState: {
        page: 0,
    },
    reducers: {
        slide(state, action) {
            state.page = action.payload;
        },
    },
});

export const pageActions = pageSlice.actions;

export default pageSlice;