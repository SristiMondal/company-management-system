import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import dashboardSlice from "./Dashboard/dashboardSlice";

export const rootReducers=combineReducers({
counter:counterSlice,
company:dashboardSlice
})