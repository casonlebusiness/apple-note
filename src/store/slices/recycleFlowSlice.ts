import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

export type RecycleFlowState = {
  productImageSrc: string;
};

const initialState: RecycleFlowState = {
  productImageSrc: null,
};

export const recycleFlowSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setProductImageSrc: (state, action: PayloadAction<any>) => {
      state.productImageSrc = action.payload;
    },
  },
});
export const { setProductImageSrc } = recycleFlowSlice.actions;

export const selectProductImageSrc = (state: RootState) => state.recycleFlow.productImageSrc;

export default recycleFlowSlice.reducer;
