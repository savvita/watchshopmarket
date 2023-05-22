import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'slide/get',
    async () => {
        const response = await db.Slides.get();
        return response;
    }
);

export const getAllAsync = createAsyncThunk(
    'slide/getall',
    async () => {
        const response = await db.Slides.getAll();
        return response;
    }
);


export const createAsync = createAsyncThunk(
    'slide/create',
    async (entity) => {
        const response = await db.Slides.create(entity);
        return response;
    }
);

export const updateAsync = createAsyncThunk(
    'slide/update',
    async (entity) => {
        const response = await db.Slides.update(entity);
        return response;
    }
);

export const deleteAsync = createAsyncThunk(
    'slide/delete',
    async (entity) => {
        const response = await db.Slides.remove(entity);
        return response;
    }
);

export const slideSlice = createSlice({
    name: 'slide',
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
                if (action.payload && action.payload.value) {
                    state.values = action.payload.value;
                }
                else {
                    state.values = [];
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

export const selectValues = (state) => state.slide.values;
export const selectStatus = (state) => state.slide.status;

export default slideSlice.reducer