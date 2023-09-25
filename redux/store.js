'use client';

import { configureStore } from "@reduxjs/toolkit";
import workingHoursReducer from "./workingHours/workingHoursSlice"; 
import tableReducer from "./tables/tablesSlice";
import detailsSlice from "./stepper/detailsSlice";
import BoHSlice from "./stepper/BoHSlice";
import staffSlice from "./stepper/staffSlice";
import menuSlice from "./stepper/menuSlice";
import categoriesSlice from "./categories/categoriesSlice";
import authSlice from "./auth/authSlice";
import brandingSlice from "./stepper/brandingSlice";


const store = configureStore({
  reducer: {
    workingHours: workingHoursReducer,
    table: tableReducer,
    details: detailsSlice,
    BoH: BoHSlice,
    staff: staffSlice,
    menu: menuSlice,
    categories: categoriesSlice,
    authentication: authSlice,
    branding: brandingSlice,
  },
});

export default store;