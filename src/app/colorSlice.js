import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'color/get',
    async () => {
      const response = await db.Colors.get();
      return response;
    }
  );

  export const getByIdAsync = createAsyncThunk(
    'color/getbyid',
    async (params) => {
      if(!params) {
        return undefined;
      }

      const response = await db.Colors.getByType(params.id, params.type);
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'color/create',
    async (entity) => {
      const response = await db.Colors.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'color/update',
    async (entity) => {
      const response = await db.Colors.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'color/delete',
    async (entity) => {
      const response = await db.Colors.remove(entity);
      return response;
    }
  );

export const colorSlice = createSlice({
        name: 'color',
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

export const selectValues = (state) => state.color.values;
export const selectValue = (state) => state.color.value;
export const selectStatus = (state) => state.color.status;

export default colorSlice.reducer