import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'watch/get',
    async (filters) => {
      const response = await db.Watches.getByFilters(filters);
      return response;
    }
  );

  export const getByIdAsync = createAsyncThunk(
    'watch/getbyid',
    async (id) => {
      const response = await db.Watches.get(id);
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'watch/create',
    async (entity) => {
      const response = await db.Watches.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'watch/update',
    async (entity) => {
      const response = await db.Watches.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'watch/delete',
    async (entity) => {
      const response = await db.Watches.remove(entity);
      return response;
    }
  );

export const watchSlice = createSlice({
        name: 'watch',
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
              .addCase(getByIdAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
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

export const selectValues = (state) => state.watch.values;
export const selectStatus = (state) => state.watch.status;

export default watchSlice.reducer