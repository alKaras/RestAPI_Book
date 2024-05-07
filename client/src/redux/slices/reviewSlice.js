import axios from '../../axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchReview = createAsyncThunk('/reviews/fetch', async () => {
    const { data } = await axios.get('/review/fetch');
    return data;
})

export const createReview = createAsyncThunk('/reviews/create', async (params) => {
    
})