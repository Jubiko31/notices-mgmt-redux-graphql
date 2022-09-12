import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    getCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice;