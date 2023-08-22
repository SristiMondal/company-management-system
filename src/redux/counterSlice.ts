import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type counterState = {
  count: number;
};

const initialState: counterState = { count: 0 };

const counterSlice = createSlice({
  name: "counterSlice",
  initialState,
  reducers: {
    //action parameter consist of payload:void and type:string
    increamentCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload + 1;
    },
    decreamentCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload - 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increamentCount, decreamentCount } = counterSlice.actions

export default counterSlice.reducer
