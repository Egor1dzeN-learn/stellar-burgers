import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorSlice } from './constructorSlice';
import { feedSlice } from './feedSlice';
import { ingredientsSlice } from './ingredientsSlice';
import { userSlice } from './userSlice';
import { ordersSlice } from './orderSlice';

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  feedSlice,
  userSlice,
  ordersSlice
); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
