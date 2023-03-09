import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'basket/get',
    async () => {
      const response = await db.Basket.get();
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'basket/update',
    async (entity) => {
      const response = await db.Basket.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'basket/delete',
    async () => {
      const response = await db.Basket.remove();
      return response;
    }
  );

export const basketSlice = createSlice({
        name: 'basket',
        initialState: {
            values: {
                details: []
            },
            status: "idle"
        },
        reducers: {
          set: (state, action) => {
            if(action && action.payload) {
              state.values = action.payload;
            }
            else {
              state.values = {
                details: []
              };
            }
          }, 
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
                      state.values = {
                        details: []
                      };
                }
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

export const { set } = basketSlice.actions

export const selectValues = (state) => state.basket.values;
export const selectStatus = (state) => state.basket.status;

export default basketSlice.reducer