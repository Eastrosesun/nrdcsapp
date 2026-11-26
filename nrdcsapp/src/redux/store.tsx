import { configureStore } from '@reduxjs/toolkit';
import orderSlice from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    orders: orderSlice,
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
