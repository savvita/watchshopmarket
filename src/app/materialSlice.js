import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'material/get',
    async () => {
      const response = await db.Materials.get();
      return response;
    }
  );

  export const getByIdAsync = createAsyncThunk(
    'material/getbyid',
    async (params) => {
      if(!params) {
        return undefined;
      }

      const response = await db.Materials.getByType(params.id, params.type);
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'material/create',
    async (entity) => {
      const response = await db.Materials.create(entity);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'material/update',
    async (entity) => {
      const response = await db.Materials.update(entity);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'material/delete',
    async (entity) => {
      const response = await db.Materials.remove(entity);
      return response;
    }
  );

export const materialSlice = createSlice({
        name: 'material',
        initialState: {
            values: [],
            value: {},
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
              .addCase(getByIdAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload) {
                    state.value = action.payload;
                  }
                  else {
                      state.value = {};
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

export const selectValues = (state) => state.material.values;
export const selectValue = (state) => state.material.value;
export const selectStatus = (state) => state.material.status;

export default materialSlice.reducer