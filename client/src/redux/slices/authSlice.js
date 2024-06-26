
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios'

const initialState = {
    user: null,
    token: null,
    isLoading: 'loading',
    error: null,
    isRegistered: false
}

export const loginUser = createAsyncThunk('auth/loginUser', async (params, { _, rejectWithValue }) => {
    try {
        const { data } = await axios.post('/user/auth/login', params);
        if (data.token) {
            window.localStorage.setItem('token', data.token);
        }
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const registerUser = createAsyncThunk('auth/register', async (params, { _, rejectWithValue }) => {
    try {
        const { data } = await axios.post('/user/auth/signup', params);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getUser = createAsyncThunk('auth/getUser', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get('/user/getUser');
        return data;
    } catch (error) {
        return rejectWithValue(error.response.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.error = null
            state.token = null
            state.isLoading = 'logout'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = 'loading'
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = 'loaded'
                state.user = action.payload.user
                state.error = null
                state.isRegistered = true
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = 'error'
                state.error = action.payload.message
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = 'loading'
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = 'loaded'
                state.user = action.payload.user
                state.token = action.payload.token
                state.error = null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = 'error'
                state.error = action.payload.message
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = 'loading'
                state.error = null
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = 'loaded'
                state.user = action.payload?.user
                state.token = action.payload?.token
                state.error = null
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = 'error'
                state.error = action.payload?.message
            })

    }
})

export const selectIsRegged = (state) => (state.auth.isRegistered)
export const selectIsLogged = (state) => Boolean(state.auth.token)
export const userInfo = (state) => (state.auth.user)

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;