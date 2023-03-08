

import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
        name: 'filter',
        initialState: {
            value: {}
        },
        reducers: {
          set: (state, action) => {
            if(action && action.payload) {
              state.value = action.payload;
            }
            else {
              state.value = {};
            }
          },
        }
    }
);

export const { set } = filterSlice.actions

export const selectValue = (state) => state.filter.value;

export default filterSlice.reducer