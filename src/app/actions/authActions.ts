import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterUserPayload, LoginInput } from '@/lib/types';
import { showToast } from '@/lib/validators';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { first_name, last_name, username, email, password, picture }: RegisterUserPayload,
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}api/register/`,
        { first_name, last_name, username, email, password, picture },
        config
      );

      localStorage.setItem('tokens', JSON.stringify(data.tokens));
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error: any) {
      // if(error.response.data)
      console.log(error);
      showToast('sachin', 'error');
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginInput, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}api/login/`,
        { username, password },
        config
      );

      localStorage.setItem('tokens', JSON.stringify(data.tokens));
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error: any) {
      //have to show the error in toast
      showToast(error.response.data.msg, 'error');
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
