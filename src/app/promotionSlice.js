import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'promotion/get',
    async () => {
        const response = await db.Promotions.get();
        return response;
    }
);

export const getByIdAsync = createAsyncThunk(
    'promotion/getbyid',
    async (id) => {
        const response = await db.Promotions.get(id);
        return response;
    }
);

export const getAllAsync = createAsyncThunk(
    'promotion/getall',
    async () => {
        const response = await db.Promotions.getAll();
        return response;
    }
);


export const createAsync = createAsyncThunk(
    'promotion/create',
    async (entity) => {
        const response = await db.Promotions.create(entity);
        return response;
    }
);

export const updateAsync = createAsyncThunk(
    'promotion/update',
    async (entity) => {
        const response = await db.Promotions.update(entity);
        return response;
    }
);

export const deleteAsync = createAsyncThunk(
    'promotion/delete',
    async (entity) => {
        const response = await db.Promotions.remove(entity);
        return response;
    }
);

export const promotionSlice = createSlice({
    name: 'promotion',
    initialState: {
        values: [],
        currentValue: null,
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
                if (action.payload && action.payload.value) {
                    state.values = action.payload.value;
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
                if (action.payload && action.payload.value) {
                    state.currentValue = action.payload.value;
                }
                else {
                    state.currentValue = null;
                }
            })
            .addCase(getAllAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload && action.payload.value) {
                    state.values = action.payload.value;
                }
                else {
                    state.values = [];
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

export const selectValues = (state) => state.promotion.values;
export const selectCurrent = (state) => state.promotion.currentValue;
export const selectStatus = (state) => state.promotion.status;

export default promotionSlice.reducer