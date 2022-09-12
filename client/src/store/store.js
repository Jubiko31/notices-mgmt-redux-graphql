import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './slices/noteSlice';
import categorySlice from './slices/categorySlice';
import addSlice from './slices/addSlice';
import pageSlice from './slices/paginationSlice';
import countSlice from './slices/filterSlice';

const store = configureStore({
    reducer: {
        notes: notesSlice.reducer,
        categories: categorySlice.reducer,
        newNotes: addSlice.reducer,
        pagination: pageSlice.reducer,
        count: countSlice.reducer,
    }
});

export default store;