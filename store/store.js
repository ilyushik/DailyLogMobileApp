import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSilce';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
