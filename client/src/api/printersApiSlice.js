import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

export const printersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrinters: builder.query({
      query: () => '/impresoras',
      providesTags: ['Printers'],
    }),
    createPrinter: builder.mutation({
      query: (newPrinter) => ({
        url: '/impresoras',
        method: 'POST',
        body: newPrinter,
      }),
      invalidatesTags: ['Printers'],
    }),
    updatePrinter: builder.mutation({
      query: (updatePrinter) => ({
        url: `/impresoras/${updatePrinter.id}`,
        method: 'PUT',
        body: updatePrinter,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deletePrinter: builder.mutation({
      query: (printerId) => ({
        url: `/impresoras/${printerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Printers'],
    }),
    validatePrinter: builder.query({
      query: (printerId) => ({
        url: `/impresoras/validacion/${printerId}`,
      }),
      invalidatesTags: ['Printers'],
    }),
  }),
});

export const {
  useGetPrintersQuery,
  useCreatePrinterMutation,
  useDeletePrinterMutation,
  useValidatePrinterQuery,
} = printersApiSlice;
