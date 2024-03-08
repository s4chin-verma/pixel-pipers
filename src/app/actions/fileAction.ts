import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { showToast } from '@/lib/validators';

export const sendImageToServer = createAsyncThunk(
  'file/sendImage',
  async ({ previewImage, confidence_threshold, toggleState, color }: any, { rejectWithValue }) => {
    if (!previewImage) {
      showToast('No image selected', 'warning');
      return rejectWithValue('No image selected');
    }

    const formData = new FormData();
    const blob = await fetch(previewImage).then(res => res.blob());
    formData.append('uploadImage', blob);
    formData.append('confidence_threshold', confidence_threshold);
    formData.append('key', toggleState);
    formData.append('color', color);

    try {
      showToast('Request Send to Server', 'info');
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/frontend`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${import.meta.env.VITE_ML_TOKEN}`,
        },
      });

      if (response.status === 200) showToast('Object Counted Successful', 'success');
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      showToast('Error uploading image', 'error');
      return rejectWithValue(error);
    }
  }
);
