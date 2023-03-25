import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'country/get',
    async () => {
      const response = await db.Countries.get();
      return response;
    }
  );

  export const getByIdAsync = createAsyncThunk(
    'country/getbyid',
    async (id) => {
      const response = await db.Countries.get(id);
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'country/create',
    async (entity) => {
      const response = await db.Countries.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'country/update',
    async (entity) => {
      const response = await db.Countries.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'country/delete',
    async (entity) => {
      const response = await db.Countries.remove(entity);
      return response;
    }
  );

export const countrySlice = createSlice({
        name: 'country',
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

export const selectValues = (state) => state.country.values;
export const selectValue = (state) => state.country.value;
export const selectStatus = (state) => state.country.status;

export default countrySlice.reducer