import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'movementtype/get',
    async () => {
      const response = await db.MovementTypes.get();
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'movementtype/create',
    async (entity) => {
      const response = await db.MovementTypes.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'movementtype/update',
    async (entity) => {
      const response = await db.MovementTypes.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'movementtype/delete',
    async (entity) => {
      const response = await db.MovementTypes.remove(entity);
      return response;
    }
  );

export const movementtypeSlice = createSlice({
        name: 'movementtype',
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

export const selectValues = (state) => state.movementtype.values;
export const selectStatus = (state) => state.movementtype.status;

export default movementtypeSlice.reducer