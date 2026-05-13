// store.ts
import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './Slices/modalSlice';
import userSlice from './Slices/userSlice';
import { loadBindings } from 'next/dist/build/swc';
import loadingSlice from './Slices/loadingSlice';

export const store = configureStore({
  reducer: { modals: modalSlice,
    user:userSlice,
    loading:loadingSlice
  }
});

// Infer types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
