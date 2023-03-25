import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'gender/get',
    async () => {
      const response = await db.Genders.get();
      return response;
    }
  );

  
  export const getByIdAsync = createAsyncThunk(
    'gender/getbyid',
    async (id) => {
      const response = await db.Genders.get(id);
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'gender/create',
    async (entity) => {
      const response = await db.Genders.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'gender/update',
    async (entity) => {
      const response = await db.Genders.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'gender/delete',
    async (entity) => {
      const response = await db.Genders.remove(entity);
      return response;
    }
  );

export const genderSlice = createSlice({
        name: 'gender',
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

export const selectValues = (state) => state.gender.values;
export const selectValue = (state) => state.gender.value;
export const selectStatus = (state) => state.gender.status;

export default genderSlice.reducer