import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'brand/get',
    async () => {
      const response = await db.Brands.get();
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'brand/create',
    async (entity) => {
      const response = await db.Brands.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'brand/update',
    async (entity) => {
      const response = await db.Brands.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'brand/delete',
    async (entity) => {
      const response = await db.Brands.remove(entity);
      return response;
    }
  );

export const brandSlice = createSlice({
        name: 'brand',
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

export const selectValues = (state) => state.brand.values;
export const selectStatus = (state) => state.brand.status;

export default brandSlice.reducer