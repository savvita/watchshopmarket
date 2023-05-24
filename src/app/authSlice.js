import db from '../db/db_access';
import token from '../db/token';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
      const response = await db.signUp(authModel);
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

  export const getProfileAsync = createAsyncThunk(
    'auth/getprofile',
    async (id) => {
      const response = await db.Users.get(id);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'auth/update',
    async (entity) => {
      const response = await db.Users.update(entity);
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

  export const confirmEmailAsync = createAsyncThunk(
    'auth/confirmemail',
    async () => {
      const response = await db.Users.confirmEmail();
      return response;
    }
  );

export const authSlice = createSlice({
        name: 'auth',
        initialState: {
            values: [],
            currentValue: token.getUserInfo().expired ? null : token.getUserInfo(),
            profile: null,
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
              .addCase(getProfileAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getProfileAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                  state.currentValue = token.getUserInfo();
                  state.profile = action.payload.value;
                }
                else {
                  state.currentValue = null;
                  state.profile = null;
                }
                return state;
              })
              .addCase(updateAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(updateAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                    state.profile = action.payload.value;
                    state.currentValue = token.getUserInfo()
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
              })
              .addCase(confirmEmailAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(confirmEmailAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                return state;
              });
          },
    }
);

export const { logOut } = authSlice.actions

export const selectValues = (state) => state.auth.values;
export const selectCurrent = (state) => state.auth.currentValue;
export const selectProfile = (state) => state.auth.profile;
export const selectStatus = (state) => state.auth.status;

export default authSlice.reducer