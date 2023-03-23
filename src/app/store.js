import { configureStore } from "@reduxjs/toolkit";

import waterresistanceReducer from './waterresistanceSlice';
import styleReducer from './styleSlice';
import straptypeReducer from './straptypeSlice';
import movementtypeReducer from './movementtypeSlice';
import materialReducer from './materialSlice';
import incrustationtypeReducer from './incrustationtypeSlice';
import glasstypeReducer from './glasstypeSlice';
import genderReducer from './genderSlice';
import functionReducer from './functionSlice';
import dialtypeReducer from './dialtypeSlice';
import countryReducer from './countrySlice';
import colorReducer from './colorSlice';
import collectionReducer from './collectionSlice';
import caseshapeReducer from './caseshapeSlice';
import brandReducer from './brandSlice';
import watchReducer from './watchSlice';
import filterReducer from './filterSlice';
import basketReducer from './basketSlice';
import authReducer from './authSlice';
import deliveryReducer from './deliverySlice';
import paymentReducer from './paymentSlice';
import cityReducer from './citySlice';
import warehouseReducer from './warehouseSlice';
import orderReducer from './orderSlice';
import orderstatusReducer from './orderstatusSlice';

export const store = configureStore( {
    reducer: {
        waterresistance: waterresistanceReducer,
        style: styleReducer,
        straptype: straptypeReducer,
        movementtype: movementtypeReducer,
        material: materialReducer,
        incrustationtype: incrustationtypeReducer,
        glasstype: glasstypeReducer,
        gender: genderReducer,
        function: functionReducer,
        dialtype: dialtypeReducer,
        country: countryReducer,
        color: colorReducer,
        collection: collectionReducer,
        caseshape: caseshapeReducer,
        brand: brandReducer,
        watch: watchReducer,
        filter: filterReducer,
        basket: basketReducer,
        auth: authReducer,
        delivery: deliveryReducer,
        payment: paymentReducer,
        city: cityReducer,
        warehouse: warehouseReducer,
        order: orderReducer,
        orderstatus: orderstatusReducer
    }
});