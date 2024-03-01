import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendImageToServer } from '../actions/resultAction';
import { ResultState } from '@/lib/types';

const initialState: ResultState = {
  loading: false,
  count: null,
  previewImage: null,
  coordinates: null,
  error: null,
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    resetLoading: state => {
      state.loading = false;
    },
    setPreviewImage: (state, action: PayloadAction<string | null>) => {
      state.previewImage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendImageToServer.pending, state => {
        state.loading = true;
      })
      .addCase(sendImageToServer.fulfilled, (state, action) => {
        state.loading = false;
        state.count = action.payload.count;
        state.coordinates = action.payload.coordinates;
        state.error = null;
      })
      .addCase(sendImageToServer.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string | null;
      });
  },
});

export const { setLoading, resetLoading, setPreviewImage } = resultSlice.actions;
export default resultSlice.reducer;
