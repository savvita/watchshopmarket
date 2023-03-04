import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'waterresistance/get',
    async () => {
      const response = await db.WaterResistances.get();
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'waterresistance/create',
    async (entity) => {
      const response = await db.WaterResistances.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'waterresistance/update',
    async (entity) => {
      const response = await db.WaterResistances.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'waterresistance/delete',
    async (entity) => {
      const response = await db.WaterResistances.remove(entity);
      return response;
    }
  );

export const waterresistanceSlice = createSlice({
        name: 'waterresistance',
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

export const selectValues = (state) => state.waterresistance.values;
export const selectStatus = (state) => state.waterresistance.status;

export default waterresistanceSlice.reducer