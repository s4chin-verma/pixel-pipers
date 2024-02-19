import { createSlice } from '@reduxjs/toolkit';

import { DemoState } from '@/lib/types';

const initialState: DemoState = {
  baseImageUrl: null,
  resultImageUrl: null,
  
};

const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    setBaseImageUrl: (state, action) => {
      state.baseImageUrl = action.payload;
    },
    setResultImageUrl: (state, action) => {
      state.resultImageUrl = action.payload;
    },
  },
});

export const { setBaseImageUrl, setResultImageUrl } = demoSlice.actions;
export default demoSlice.reducer;
