import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'function/get',
    async () => {
      const response = await db.Functions.get();
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'function/create',
    async (entity) => {
      const response = await db.Functions.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'function/update',
    async (entity) => {
      const response = await db.Functions.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'function/delete',
    async (entity) => {
      const response = await db.Functions.remove(entity);
      return response;
    }
  );

export const functionSlice = createSlice({
        name: 'function',
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

export const selectValues = (state) => state.function.values;
export const selectStatus = (state) => state.function.status;

export default functionSlice.reducer