import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { setAuth } = authSlice.actions;

export const checkAuthentication = () => async (dispatch) => {
    const token = await SecureStore.getItemAsync('jwt_token');
    dispatch(setAuth(!!token));
};

export const login = (token) => async (dispatch) => {
    await SecureStore.setItemAsync('jwt_token', token);
    dispatch(setAuth(true));
};

export const logout = () => async (dispatch) => {
    try {
        await SecureStore.deleteItemAsync('jwt_token');
        console.log("Token removed successfully");
    } catch (error) {
        console.log("Error removing token", error);
    }
    dispatch(setAuth(false));
};

export default authSlice.reducer;
