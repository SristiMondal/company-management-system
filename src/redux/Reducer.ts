import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import dashboardSlice from "./Dashboard/dashboardSlice";
import authSlice from "./authSlice";

export const rootReducers=combineReducers({
counter:counterSlice,
company:dashboardSlice,
auth:authSlice
})