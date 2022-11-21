import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = {
  appBarHeight: number;
  notes: any;
  selectedNote: number;
};

const initialState: AppState = {
  appBarHeight: 0,
  notes: [],
  selectedNote: 0
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppBarHeight: (state, action: PayloadAction<number>) => {
      state.appBarHeight = action.payload;
    },
    setNotes: (state,  action: PayloadAction<any>) => {
      state.notes = action.payload
    },
    setSelectedNote: (state,  action: PayloadAction<number>) => {
      state.selectedNote = action.payload
    }
  },
});
