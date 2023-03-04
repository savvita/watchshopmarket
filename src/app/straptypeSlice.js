import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'straptypes/get',
    async () => {
      const response = await db.StrapTypes.get();
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'straptypes/create',
    async (entity) => {
      const response = await db.StrapTypes.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'straptypes/update',
    async (entity) => {
      const response = await db.StrapTypes.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'straptypes/delete',
    async (entity) => {
      const response = await db.StrapTypes.remove(entity);
      return response;
    }
  );

export const straptypeSlice = createSlice({
        name: 'straptypes',
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

export const selectValues = (state) => state.straptype.values;
export const selectStatus = (state) => state.straptype.status;

export default straptypeSlice.reducer