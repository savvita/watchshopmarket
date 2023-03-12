import db from '../db/db_access';
import token from '../db/token';

import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

export const signInAsync = createAsyncThunk(
    'auth/signin',
    async (authModel) => {
      if(!authModel) {
        return null;
      }
      const response = await db.signIn(authModel.login, authModel.password);
      return response;
    }
  );

  export const signUpAsync = createAsyncThunk(
    'auth/signup',
    async (authModel) => {
      if(!authModel) {
        return null;
      }
      const response = await db.signUp(authModel.login, authModel.email, authModel.password);
      return response;
    }
  );

  export const getAsync = createAsyncThunk(
    'auth/get',
    async () => {
      const response = await db.Users.get();
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'auth/delete',
    async (entity) => {
      const response = await db.Users.remove(entity);
      return response;
    }
  );

  export const restoreAsync = createAsyncThunk(
    'auth/restore',
    async (entity) => {
      const response = await db.Users.restore(entity);
      return response;
    }
  );

export const authSlice = createSlice({
        name: 'auth',
        initialState: {
            values: [],
            currentValue: token.getUserInfo().expired ? null : token.getUserInfo(),
            status: "idle"
        },
        reducers: {
          logOut: (state) => {
            token.logOut();
            state.currentValue  = null;
          },
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
              .addCase(signInAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(signInAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                  state.currentValue = token.getUserInfo();
                }
                else {
                  state.currentValue = null;
                }
                
                return state;
              })
              .addCase(signUpAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(signUpAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                  state.currentValue = token.getUserInfo();
                }
                else {
                  state.currentValue = null;
                }
                return state;
              })
              .addCase(deleteAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(deleteAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                    state.currentValue = token.getUserInfo()
                  }
                  else {
                    state.currentValue = null;
                  }
                return state;
              })
              .addCase(restoreAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(restoreAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                    state.currentValue = token.getUserInfo()
                  }
                  else {
                    state.currentValue = null;
                  }
                return state;
              });
          },
    }
);

export const { logOut } = authSlice.actions

export const selectValues = (state) => state.auth.values;
export const selectCurrent = (state) => state.auth.currentValue;
export const selectStatus = (state) => state.auth.status;

export default authSlice.reducer