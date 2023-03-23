import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createAsync = createAsyncThunk(
    'order/create',
    async (info) => {
      const response = await db.Orders.create(info);
      return response;
    }
  );

  
export const getAsync = createAsyncThunk(
  'order/get',
  async (params) => {
    const response = await db.Orders.get(params);
    return response;
  }
);

export const getByFiltersAsync = createAsyncThunk(
  'order/getbyfilters',
  async (filters) => {
    const response = await db.Orders.getByFilters(filters);
    return response;
  }
);

export const getNewAsync = createAsyncThunk(
  'order/getnew',
  async () => {
    const response = await db.Orders.get({ statusses: [1]});
    return response;
  }
);

export const getByIdAsync = createAsyncThunk(
  'order/getbyid',
  async (id) => {
    const response = await db.Orders.getById(id);
    return response;
  }
);

export const cancelAsync = createAsyncThunk(
  'order/cancel',
  async (id) => {
    const response = await db.Orders.remove(id);
    return response;
  }
);

export const acceptAsync = createAsyncThunk(
  'order/accept',
  async (id) => {
    const response = await db.Orders.update(id, { statusId: 2 });
    return response;
  }
);

export const setStatusAsync = createAsyncThunk(
  'order/setstatus',
  async (params) => {
    if(!params || !params.id || !params.statusId) {
      return null;
    }
    const response = await db.Orders.update(params.id, { statusId: params.statusId });
    return response;
  }
);

export const orderSlice = createSlice({
        name: 'order',
        initialState: {
            values: [],
            current: {},
            hits: 0,
            neworders: [],
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
                return state;
              })
              .addCase(getAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                  state.values = action.payload.value;
                  state.hits = action.payload.hits;
                }
                else {
                  state.values = [];
                }
                return state;
              })
              .addCase(getByFiltersAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getByFiltersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              })
              .addCase(getNewAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getNewAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                  state.neworders = action.payload.value;
                }
                else {
                  state.neworders = [];
                }
                return state;
              })
              .addCase(getByIdAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                  state.current = action.payload.value;
                }
                else {
                  state.current = {};
                }
                return state;
              })
              .addCase(cancelAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(cancelAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              })
              .addCase(acceptAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(acceptAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              })
              .addCase(setStatusAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(setStatusAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              });
          },
    }
);

// export const {  } = orderSlice.actions

export const selectValues = (state) => state.order.values;
export const selectNewOrders = (state) => state.order.neworders;
export const selectCurrent = (state) => state.order.current;
export const selectHits = (state) => state.order.hits;
export const selectStatus = (state) => state.order.status;

export default orderSlice.reducer