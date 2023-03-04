import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'incrustationtype/get',
    async () => {
      const response = await db.IncrustationTypes.get();
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'incrustationtype/create',
    async (entity) => {
      const response = await db.IncrustationTypes.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'incrustationtype/update',
    async (entity) => {
      const response = await db.IncrustationTypes.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'incrustationtype/delete',
    async (entity) => {
      const response = await db.IncrustationTypes.remove(entity);
      return response;
    }
  );

export const incrustationtypeSlice = createSlice({
        name: 'incrustationtype',
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

export const selectValues = (state) => state.incrustationtype.values;
export const selectStatus = (state) => state.incrustationtype.status;

export default incrustationtypeSlice.reducer