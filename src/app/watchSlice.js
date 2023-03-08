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

  export const restoreAsync = createAsyncThunk(
    'watch/restore',
    async (entity) => {
      const response = await db.Watches.restore(entity);
      return response;
    }
  );

export const watchSlice = createSlice({
        name: 'watch',
        initialState: {
            values: [],
            currentValue: null,
            status: "idle"
        },
        reducers: {
          setCurrentValue: (state, action) => {
            if(action) {
              state.currentValue = action.payload;
            }
          },
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
                if(action && action.payload && action.payload.value) {
                  state.currentValue = action.payload.value;
                }
                else {
                  state.currentValue = null;
                }
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
              })
              .addCase(restoreAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(restoreAsync.fulfilled, (state) => {
                state.status = 'idle';
                return state;
              });
          },
    }
);

export const { setCurrentValue } = watchSlice.actions

export const selectValues = (state) => state.watch.values;
export const selectCurrent = (state) => state.watch.currentValue;
export const selectStatus = (state) => state.watch.status;

export default watchSlice.reducer