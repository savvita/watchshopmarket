import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'style/get',
    async () => {
      const response = await db.Styles.get();
      return response;
    }
  );

  export const getByIdAsync = createAsyncThunk(
    'style/getbyid',
    async (id) => {
      const response = await db.Styles.get(id);
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'style/create',
    async (entity) => {
      const response = await db.Styles.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'style/update',
    async (entity) => {
      const response = await db.Styles.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'style/delete',
    async (entity) => {
      const response = await db.Styles.remove(entity);
      return response;
    }
  );

export const styleSlice = createSlice({
        name: 'style',
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

export const selectValues = (state) => state.style.values;
export const selectValue = (state) => state.style.value;
export const selectStatus = (state) => state.style.status;

export default styleSlice.reducer