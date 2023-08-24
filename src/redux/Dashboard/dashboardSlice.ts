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
      if (Array.isArray(action.payload)) {
        state.companyList = [...action.payload];
      } else {
        state.companyList = action.payload;
      }
    },
    deleteCompanyRow: (state, action: PayloadAction<number>) => {
      state.companyList = state.companyList.filter(
        (cur: any) => cur.id !== action.payload
      );
    },
    addCompanyRow: (state, action: PayloadAction<number>) => {
      state.companyList.push(action.payload)
    },
    editCompanyRow: (state, action: PayloadAction<any>) => {
      let newElement={...state.companyList[action.payload.id],...action.payload.data}
      state.companyList[action.payload.id]=newElement
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCompanyList, deleteCompanyRow, addCompanyRow,editCompanyRow } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
