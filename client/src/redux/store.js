import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from "./slices/auth";
import { bookReducer } from './slices/bookSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: bookReducer,
    }
})