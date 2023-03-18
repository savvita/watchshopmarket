import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'city/get',
    async () => {
      const response = await db.Cities.get();
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'city/update',
    async () => {
      const response = await db.Cities.update();
      return response;
    }
  );

  export const getLastUpdateAsync = createAsyncThunk(
    'city/getLastUpdate',
    async () => {
      const response = await db.Cities.getLastUpdate();
      return response;
    }
  );

export const citySlice = createSlice({
        name: 'city',
        initialState: {
            values: [],
            lastUpdate: "",
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
                if(action.payload && action.payload.value) {
                    state.values = action.payload.value;
                  }
                  else {
                      state.values = [];
                  }
              })
              .addCase(updateAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(updateAsync.fulfilled, (state) => {
                state.status = 'idle';
                return state;
              })
              .addCase(getLastUpdateAsync.pending, (state, action) => {
                state.status = 'loading';
              })
              .addCase(getLastUpdateAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                    state.lastUpdate = action.payload.value;
                }
                else {
                    state.lastUpdate = "";
                }
                return state;
              });
          },
    }
);

// export const { } = categoriesSlice.actions

export const selectValues = (state) => state.city.values;
export const selectStatus = (state) => state.city.status;
export const selectLastUpdate = (state) => state.city.lastUpdate;

export default citySlice.reducer