import db from '../db/db_access';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getWaterResistanceAsync = createAsyncThunk(
    'sales/waterresistance',
    async () => {
      const response = await db.Sales.waterResistance();
      return response;
    }
);

export const getStrapTypeAsync = createAsyncThunk(
    'sales/straptype',
    async () => {
      const response = await db.Sales.strapType();
      return response;
    }
);

export const getIncrustationTypeAsync = createAsyncThunk(
    'sales/incrustationtype',
    async () => {
      const response = await db.Sales.incrustationtType();
      return response;
    }
);

export const getDialTypeAsync = createAsyncThunk(
    'sales/dialtype',
    async () => {
      const response = await db.Sales.dialType();
      return response;
    }
);

export const getCaseShapeAsync = createAsyncThunk(
    'sales/caseshape',
    async () => {
      const response = await db.Sales.caseShape();
      return response;
    }
);

export const getStyleAsync = createAsyncThunk(
    'sales/style',
    async () => {
      const response = await db.Sales.style();
      return response;
    }
);

export const getCollectionAsync = createAsyncThunk(
    'sales/collection',
    async () => {
      const response = await db.Sales.collection();
      return response;
    }
);

export const getGenderAsync = createAsyncThunk(
    'sales/gender',
    async () => {
      const response = await db.Sales.gender();
      return response;
    }
);

export const getBrandAsync = createAsyncThunk(
    'sales/brand',
    async () => {
      const response = await db.Sales.brand();
      return response;
    }
);

export const getGlassTypeAsync = createAsyncThunk(
    'sales/glasstype',
    async () => {
      const response = await db.Sales.glassType();
      return response;
    }
);

export const getMovementTypeAsync = createAsyncThunk(
    'sales/movementtype',
    async () => {
      const response = await db.Sales.movementType();
      return response;
    }
);

export const getFunctionAsync = createAsyncThunk(
  'sales/function',
  async () => {
    const response = await db.Sales.function();
    return response;
  }
);

export const getCountryAsync = createAsyncThunk(
  'sales/country',
  async () => {
    const response = await db.Sales.country();
    return response;
  }
);

export const getDialColorAsync = createAsyncThunk(
  'sales/dialcolor',
  async () => {
    const response = await db.Sales.color('dial');
    return response;
  }
);

export const getStrapColorAsync = createAsyncThunk(
  'sales/strapcolor',
  async () => {
    const response = await db.Sales.color('strap');
    return response;
  }
);

export const getCaseColorAsync = createAsyncThunk(
  'sales/casecolor',
  async () => {
    const response = await db.Sales.color('case');
    return response;
  }
);

export const getCaseMaterialAsync = createAsyncThunk(
  'sales/casematerial',
  async () => {
    const response = await db.Sales.material('case');
    return response;
  }
);

export const salesSlice = createSlice({
        name: 'sales',
        initialState: {
            waterResistance: [],
            strapType: [],
            incrustationType: [],
            dialType: [],
            caseShape: [],
            gender: [],
            style: [],
            collection: [],
            brand: [],
            glassType: [],
            movementType: [],
            function: [],
            country: [],
            dialColor: [],
            strapColor: [],
            caseColor: [],
            caseMaterial: [],
            status: "idle"
        },
        reducers: {
        },
        extraReducers: (builder) => {
            builder
              .addCase(getWaterResistanceAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getWaterResistanceAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.waterResistance = action.payload.value;
                  }
                  else {
                      state.waterResistance = [];
                  }
              })
              .addCase(getStrapTypeAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getStrapTypeAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.strapType = action.payload.value;
                  }
                  else {
                      state.strapType = [];
                  }
              })
              .addCase(getIncrustationTypeAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getIncrustationTypeAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.incrustationType = action.payload.value;
                  }
                  else {
                      state.incrustationType = [];
                  }
              })
              .addCase(getDialTypeAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getDialTypeAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.dialType = action.payload.value;
                  }
                  else {
                      state.dialType = [];
                  }
              })
              .addCase(getGenderAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getGenderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.gender = action.payload.value;
                  }
                  else {
                      state.gender = [];
                  }
              })
              .addCase(getStyleAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getStyleAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.style = action.payload.value;
                  }
                  else {
                      state.style = [];
                  }
              })
              .addCase(getCollectionAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getCollectionAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.collection = action.payload.value;
                  }
                  else {
                      state.collection = [];
                  }
              })
              .addCase(getBrandAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getBrandAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.brand = action.payload.value;
                  }
                  else {
                      state.brand = [];
                  }
              })
              .addCase(getGlassTypeAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getGlassTypeAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.glassType = action.payload.value;
                  }
                  else {
                      state.glassType = [];
                  }
              })
              .addCase(getMovementTypeAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getMovementTypeAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.movementType = action.payload.value;
                  }
                  else {
                      state.movementType = [];
                  }
              })
              .addCase(getCaseShapeAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getCaseShapeAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.caseShape = action.payload.value;
                  }
                  else {
                      state.caseShape = [];
                  }
              })
              .addCase(getFunctionAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getFunctionAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.function = action.payload.value;
                  }
                  else {
                      state.function = [];
                  }
              })
              .addCase(getCountryAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getCountryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.country = action.payload.value;
                  }
                  else {
                      state.country = [];
                  }
              })
              .addCase(getDialColorAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getDialColorAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.dialColor = action.payload.value;
                  }
                  else {
                      state.dialColor = [];
                  }
              })
              .addCase(getStrapColorAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getStrapColorAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.strapColor = action.payload.value;
                  }
                  else {
                      state.strapColor = [];
                  }
              })
              .addCase(getCaseColorAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getCaseColorAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.caseColor = action.payload.value;
                  }
                  else {
                      state.caseColor = [];
                  }
              })
              .addCase(getCaseMaterialAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getCaseMaterialAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action.payload && action.payload.value) {
                    state.caseMaterial = action.payload.value;
                  }
                  else {
                      state.caseMaterial = [];
                  }
              })
          },
    }
);

// export const { } = categoriesSlice.actions

export const selectWaterResistance = (state) => state.sales.waterResistance;
export const selectStrapType = (state) => state.sales.strapType;
export const selectIncrustationType = (state) => state.sales.incrustationType;
export const selectDialType = (state) => state.sales.dialType;
export const selectGender = (state) => state.sales.gender;
export const selectStyle = (state) => state.sales.style;
export const selectCollection = (state) => state.sales.collection;
export const selectBrand = (state) => state.sales.brand;
export const selectGlassType = (state) => state.sales.glassType;
export const selectMovementType = (state) => state.sales.movementType;
export const selectCaseShape = (state) => state.sales.caseShape;
export const selectFunction = (state) => state.sales.function;
export const selectCountry = (state) => state.sales.country;
export const selectDialColor = (state) => state.sales.dialColor;
export const selectStrapColor = (state) => state.sales.strapColor;
export const selectCaseColor = (state) => state.sales.caseColor;
export const selectCaseMaterial = (state) => state.sales.caseMaterial;
export const selectStatus = (state) => state.sales.status;

export default salesSlice.reducer