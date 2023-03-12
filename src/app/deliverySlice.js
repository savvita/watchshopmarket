import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'delivery/get',
    async (all) => {
        if(all && all === true) {
            return await db.Deliveries.getAll();
        }
      const response = await db.Deliveries.get();
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'delivery/create',
    async (entity) => {
      const response = await db.Deliveries.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'delivery/update',
    async (entity) => {
      const response = await db.Deliveries.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'delivery/delete',
    async (entity) => {
      const response = await db.Deliveries.remove(entity);
      return response;
    }
  );

export const deliverySlice = createSlice({
        name: 'delivery',
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

export const selectValues = (state) => state.delivery.values;
export const selectStatus = (state) => state.delivery.status;

export default deliverySlice.reducer