import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import recycleFlowReducer from './slices/recycleFlowSlice';
import binSettingReducer from './slices/binSettingSlice';
import { appSlice } from 'store/slices/appSlice';

const reducers = {
  app: appSlice.reducer,
}

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const persistor = persistStore(store);
