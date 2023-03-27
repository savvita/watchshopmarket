import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'file/get',
    async () => {
      const response = await db.Files.get();
      return response;
    }
  );

  export const downloadAsync = createAsyncThunk(
    'file/download',
    async (file) => {
      const response = await db.Files.get(file);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'file/delete',
    async (files) => {
      const response = await db.Files.remove(files);
      return response;
    }
  );

export const fileSlice = createSlice({
        name: 'file',
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
              .addCase(downloadAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(downloadAsync.fulfilled, (state, action) => {
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

export const selectValues = (state) => state.file.values;
export const selectStatus = (state) => state.file.status;

export default fileSlice.reducer