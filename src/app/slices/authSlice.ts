import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin } from '@/app/actions/authActions';
import { AuthState } from '@/lib/types';

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  tokens: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    resetLoading: state => {
      state.loading = false;
    },
    resetAuthState: state => {
      state.success = false;
      state.userInfo = null;
      state.tokens = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload.user;
        state.tokens = action.payload.tokens;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string | null;
      })
      .addCase(userLogin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userInfo = action.payload.user;
        state.tokens = action.payload.tokens;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
    // .addCase(resetPassword.pending, state => {
    //   state.loading = true;
    // })
    // .addCase(resetPassword.fulfilled, state => {
    //   state.loading = false;
    // })
    // .addCase(resetPassword.rejected, (state, { payload }) => {
    //   state.error = payload as string;
    // })
    // .addCase(changePassword.pending, state => {
    //   state.loading = true;
    // })
    // .addCase(changePassword.fulfilled, state => {
    //   state.loading = false;
    // })
    // .addCase(changePassword.rejected, (state, { payload }) => {
    //   state.error = payload as string;
    // });
  },
});

export const { setLoading, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
