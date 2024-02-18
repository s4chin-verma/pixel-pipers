import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { modelsApi } from './api/mlModelsApi';

export const store = configureStore({
  reducer: { auth: authReducer, [modelsApi.reducerPath]: modelsApi.reducer },

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(modelsApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
