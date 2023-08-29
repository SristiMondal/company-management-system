import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type authState = {
  authenticated: boolean;
};

const initialState: authState = { authenticated: false };

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    //action parameter consist of payload:void and type:string
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuthentication } = authSlice.actions;

export default authSlice.reducer;
