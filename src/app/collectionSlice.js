import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'collection/get',
    async () => {
      const response = await db.Collections.get();
      return response;
    }
  );

  export const getByIdAsync = createAsyncThunk(
    'collection/getbyid',
    async (id) => {
      const response = await db.Collections.get(id);
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'collection/create',
    async (entity) => {
      const response = await db.Collections.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'collection/update',
    async (entity) => {
      const response = await db.Collections.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'collection/delete',
    async (entity) => {
      const response = await db.Collections.remove(entity);
      return response;
    }
  );

export const collectionSlice = createSlice({
        name: 'collection',
        initialState: {
            values: [],
            value: {},
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
                if(action && action.payload) {
                    state.value = action.payload;
                  }
                  else {
                      state.value = {};
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

export const selectValues = (state) => state.collection.values;
export const selectValue = (state) => state.collection.value;
export const selectStatus = (state) => state.collection.status;

export default collectionSlice.reducer