import { createSlice } from '@reduxjs/toolkit';
import { sendImageToServer } from '../actions/fileAction';
import { FileState } from '@/lib/types';

const initialState: FileState = {
  loading: false,
  count: null,
  image_url: null,
  error: null,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    resetLoading: state => {
      state.loading = false;
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
        state.image_url = action.payload.image_url;
        state.error = null;
      })
      .addCase(sendImageToServer.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string | null;
      });
  },
});

export const { setLoading } = fileSlice.actions;
export default fileSlice.reducer;
