import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'review/get',
    async (watchId) => {
      const response = await db.Reviews.getByWatchId(watchId);
      return response;
    }
  );

  export const getByUserAsync = createAsyncThunk(
    'review/getbyuser',
    async (userId) => {
      const response = await db.Reviews.getByUser(userId);
      return response;
    }
  );

  export const getAllAsync = createAsyncThunk(
    'review/getnew',
    async (check) => {
      const response = await db.Reviews.getChecked(check);
      return response;
    }
  );

  export const getByIdAsync = createAsyncThunk(
    'review/getbyid',
    async (id) => {
      const response = await db.Reviews.get(id);
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'review/create',
    async (entity) => {
      const response = await db.Reviews.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'review/update',
    async (entity) => {
      const response = await db.Reviews.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'review/delete',
    async (entity) => {
      const response = await db.Reviews.remove(entity);
      return response;
    }
  );

export const reviewSlice = createSlice({
        name: 'review',
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
              .addCase(getByUserAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getByUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload) {
                    state.values = action.payload;
                  }
                  else {
                      state.values = [];
                  }
              })
              .addCase(getAllAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getAllAsync.fulfilled, (state, action) => {
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

export const selectValues = (state) => state.review.values;
export const selectValue = (state) => state.review.value;
export const selectStatus = (state) => state.review.status;

export default reviewSlice.reducer