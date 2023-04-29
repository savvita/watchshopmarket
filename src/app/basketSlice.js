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
            status: "idle",
            valid: [],
            count: 0
        },
        reducers: {
          set: (state, action) => {
            if(action && action.payload) {
              state.values = action.payload;
              state.count = action.payload.details.length;
            }
            else {
              state.values = {
                details: [],
              };
              state.count = 0;
            }
          }, 
          setValid: (state, action) => {
            if(action && action.payload) {
              state.valid = action.payload;
            }
            else {
              state.valid = [];
            }
          }
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
                    state.count = action.payload.value.details.length;
                }
                  else {
                      state.values = {
                        details: []
                      };
                      state.count = 0;
                }
                return state;
              })
              .addCase(updateAsync.pending, (state, action) => {
                state.status = 'loading';
              })
              .addCase(updateAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload && action.payload.value) {
                  state.values = action.payload.value;
                  state.count = action.payload.value.details.length;
                }
                else {
                  state.values = {
                    details: []
                  };
                  state.count = 0;
                }
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

export const { set, setValid } = basketSlice.actions

export const selectValues = (state) => state.basket.values;
export const selectStatus = (state) => state.basket.status;
export const selectValid = (state) => state.basket.valid;
export const selectCount = (state) => state.basket.count;

export default basketSlice.reducer