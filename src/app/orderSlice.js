import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createAsync = createAsyncThunk(
    'order/create',
    async (info) => {
      const response = await db.Orders.create(info);
      return response;
    }
  );

export const orderSlice = createSlice({
        name: 'order',
        initialState: {
            values: {
            },
            status: "idle"
        },
        reducers: {
        },
        extraReducers: (builder) => {
            builder
              .addCase(createAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(createAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                    state.values = action.payload.value;
                }
                  else {
                      state.values = {
                      };
                }
                return state;
              });
          },
    }
);

// export const {  } = orderSlice.actions

export const selectValues = (state) => state.order.values;
export const selectStatus = (state) => state.order.status;

export default orderSlice.reducer