import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'caseshape/get',
    async () => {
      const response = await db.Caseshapes.get();
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'caseshape/create',
    async (entity) => {
      const response = await db.Caseshapes.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'caseshape/update',
    async (entity) => {
      const response = await db.Caseshapes.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'caseshape/delete',
    async (entity) => {
      const response = await db.Caseshapes.remove(entity);
      return response;
    }
  );

export const caseshapeSlice = createSlice({
        name: 'caseshape',
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

export const selectValues = (state) => state.caseshape.values;
export const selectStatus = (state) => state.caseshape.status;

export default caseshapeSlice.reducer