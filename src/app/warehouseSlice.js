import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'warehouse/get',
    async (ref) => {
      const response = await db.Warehouses.get(ref);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'warehouse/update',
    async () => {
      const response = await db.Warehouses.update();
      return response;
    }
  );

  export const getLastUpdateAsync = createAsyncThunk(
    'warehouse/getLastUpdate',
    async () => {
      const response = await db.Warehouses.getLastUpdate();
      return response;
    }
  );

export const warehouseSlice = createSlice({
        name: 'warehouse',
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
              .addCase(getLastUpdateAsync.pending, (state) => {
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

export const selectValues = (state) => state.warehouse.values;
export const selectStatus = (state) => state.warehouse.status;
export const selectLastUpdate = (state) => state.warehouse.lastUpdate;

export default warehouseSlice.reducer