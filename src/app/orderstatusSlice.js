import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'orderstatus/get',
    async () => {
      const response = await db.OrderStatusses.get();
      return response;
    }
  );


export const orderstatusSlice = createSlice({
        name: 'orderstatus',
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
                if(action && action.payload && action.payload.value) {
                    state.values = action.payload.value;
                  }
                  else {
                      state.values = [];
                  }
              });
          },
    }
);

// export const { } = categoriesSlice.actions

export const selectValues = (state) => state.orderstatus.values;
export const selectStatus = (state) => state.orderstatus.status;

export default orderstatusSlice.reducer