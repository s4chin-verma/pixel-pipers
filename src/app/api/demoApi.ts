import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/app/store';
import { DemoRequest, DemoResponse } from '@/lib/types/section';

export const demoApi = createApi({
  reducerPath: 'demoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.tokens?.access;
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
        url: '/api/demo',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useDemoApiMutation } = demoApi;
