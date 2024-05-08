import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchBooks = createAsyncThunk('/book/fetch', async () => {
    const { data } = await axios.get('/book/getBooks');
    return data;
})

export const fetchRemovedBook = createAsyncThunk('/book/delete', async (id) => {
    const { data } = await axios.delete(`/book/deleteBook/${id}`);
    return data;
})

export const createBook = createAsyncThunk('book/create', async (params, { _, rejectWithValue }) => {
    try {
        const { data } = await axios.post('/book/createBook', params);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
})

export const getBookById = createAsyncThunk('book/getById', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`/book/getBook/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
})

const initialState = {
    books: {
        items: [],
        isDeleted: 'pending',
        isLoading: 'loading',
        isUpdated: 'process',
        isCreated: 'process',
        item: null,
        error: null
    },
    
}

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.books.isLoading = 'loading'
                state.books.error = null
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.books.isLoading = 'loaded'
                state.books.items = action.payload.data
                state.books.error = null
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.books.isLoading = 'error'
                state.books.error = action.payload.message
            })
            .addCase(fetchRemovedBook.pending, (state) => {
                state.books.isLoading = 'loading'
                state.books.error = null
                state.books.isDeleted = 'pending'
            })
            .addCase(fetchRemovedBook.fulfilled, (state, action) => {
                state.books.isLoading = 'loaded'
                state.books.isDeleted = 'done'
                state.books.error = null
            })
            .addCase(fetchRemovedBook.rejected, (state, action) => {
                state.books.isLoading = 'error'
                state.books.error = action.payload.message
            })
            .addCase(createBook.pending, (state) => {
                state.books.isLoading = 'loading'
                state.books.error = null
            })
            .addCase(createBook.fulfilled, (state, action) => {
                state.books.isLoading = 'loaded'
                state.books.isCreated = 'done'
                state.books.error = null
            })
            .addCase(createBook.rejected, (state, action) => {
                state.books.isLoading = 'error'
                state.books.error = action.payload?.message
            })
            .addCase(getBookById.pending, (state) => {
                state.books.isLoading = 'loading'
                state.books.error = null
            })
            .addCase(getBookById.fulfilled, (state, action) => {
                state.books.isLoading = 'loaded'
                state.books.item = action.payload?.data
                state.books.error = null
            })
            .addCase(getBookById.rejected, (state, action) => {
                state.books.isLoading = 'error'
                state.books.error = action.payload.message
            })
    }
})

export const bookReducer = bookSlice.reducer;
export const bookByIdData = (state) => (state.books.books.item)