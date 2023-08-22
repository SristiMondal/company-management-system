import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type dashboardState = {
  companyList: any[];
};

const initialState: dashboardState = { companyList: [] };

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    //action parameter consist of payload:void and type:string
    getCompanyList: (state, action: PayloadAction<any>) => {
      state.companyList = [...action.payload];
    },
    // decreamentCount: (state, action: PayloadAction<number>) => {
    //   state.count = action.payload - 1;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { getCompanyList } = dashboardSlice.actions

export default dashboardSlice.reducer
