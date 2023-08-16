import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from './apiSlice';

const printersAdapter = createEntityAdapter({});

const initialState = printersAdapter.getInitialState();

export const printersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrinters: builder.query({
      query: () => '/impresoras',
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((printer) => {
          printer.id = printer._id;
          return printer;
        });
        return printersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Printer', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Printer', id })),
          ];
        } else return [{ type: 'Printer', id: 'LIST' }];
      },
    }),
    createPrinter: builder.mutation({
      query: (newPrinter) => ({
        url: '/impresoras',
        method: 'POST',
        body: newPrinter,
      }),
      invalidatesTags: [{ type: 'Printer', id: 'LIST' }],
    }),
    updatePrinter: builder.mutation({
      query: (updatePrinter) => ({
        url: `/impresoras/${updatePrinter.id}`,
        method: 'PUT',
        body: updatePrinter,
      }),
      invalidatesTags: [{ type: 'Printer', id: 'LIST' }],
    }),
    deletePrinter: builder.mutation({
      query: (printerId) => ({
        url: `/impresoras/${printerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Printer', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPrintersQuery,
  useCreatePrinterMutation,
  useDeletePrinterMutation,
} = printersApiSlice;

export const selectPrintersResult =
  printersApiSlice.endpoints.getPrinters.select();

const selectPrintersData = createSelector(
  selectPrintersResult,
  (printersResult) => printersResult.data
);

export const {
  selectAll: selectAllPrinters,
  selectById: selectPrinterById,
  selectIds: selectPrinterIds,
  // Pass in a selector that returns the users slice of state
} = printersAdapter.getSelectors(
  (state) => selectPrintersData(state) ?? initialState
);
