import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'payment/get',
    async (all) => {
        if(all && all === true) {
            return await db.Payments.getAll();
        }
      const response = await db.Payments.get();
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'payment/create',
    async (entity) => {
      const response = await db.Payments.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'payment/update',
    async (entity) => {
      const response = await db.Payments.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'payment/delete',
    async (entity) => {
      const response = await db.Payments.remove(entity);
      return response;
    }
  );

export const paymentSlice = createSlice({
        name: 'payment',
        initialState: {
            values: [],
            status: "idle"
        },
        reducers: {
        },
        extraReducers: (builder) => {
            builder
              .addCase(getAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload) {
                    state.values = action.payload;
                  }
                  else {
                      state.values = [];
                  }
              })
              .addCase(createAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(createAsync.fulfilled, (state) => {
                state.status = 'idle';
                return state;
              })
              .addCase(updateAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(updateAsync.fulfilled, (state) => {
                state.status = 'idle';
                return state;
              })
              .addCase(deleteAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(deleteAsync.fulfilled, (state) => {
                state.status = 'idle';
                return state;
              });
          },
    }
);

// export const { } = categoriesSlice.actions

export const selectValues = (state) => state.payment.values;
export const selectStatus = (state) => state.payment.status;

export default paymentSlice.reducer