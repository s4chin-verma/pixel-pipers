import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/app/store';
import { MlModels } from '@/lib/types/section';

export const modelsApi= createApi({
  reducerPath: 'mlModelsApi',
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
  tagTypes: ['MlModels'],
  endpoints: builder => ({
    getModels: builder.query<MlModels[], void>({
      query: () => `api/mlmodels/`,
    }),
    getSpecificModel: builder.query<MlModels, string>({
      query: (_id: string) => `mlmodels/${_id}/`,
    }),
  }),
});

export const { useGetModelsQuery, useGetSpecificModelQuery } = modelsApi;
