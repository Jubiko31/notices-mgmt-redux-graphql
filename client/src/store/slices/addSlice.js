import { createSlice } from "@reduxjs/toolkit";

const addSlice = createSlice({
    name: 'notes',
    initialState: {
      notes: [],
      inputs: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        date: '',
        categoryId: '',
        text: '',
      },
    },

    reducers: {
        setInput(state, action) {
            state.inputs = {
                ...state.inputs,
                [action.payload.name] : action.payload.value,
            };
        },

        clearInput(state, action) {
            state.inputs = action.payload;
        },
    }
})

export const addActions = addSlice.actions;

export default addSlice;