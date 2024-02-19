import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DemoRequest, DemoResponse } from '@/lib/types/section';

export const demoApi = createApi({
  reducerPath: 'demoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    prepareHeaders: headers => {
      const token = import.meta.env.VITE_ML_TOKEN;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['DemoResponse'],
  endpoints: builder => ({
    demoApi: builder.mutation<DemoResponse, DemoRequest>({
      query: body => ({
        url: '/cloudinary',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useDemoApiMutation } = demoApi;
