import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { modelsApi } from './api/mlModelsApi';
import { demoApi } from './api/demoApi';
import demoReducer from './slices/demoSlice';
import resultSlice from './slices/resultSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    demo: demoReducer,
    result: resultSlice,
    [modelsApi.reducerPath]: modelsApi.reducer,
    [demoApi.reducerPath]: demoApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(modelsApi.middleware, demoApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
