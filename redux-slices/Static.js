import { createSlice } from "@reduxjs/toolkit";

const Static = createSlice({
  name: "static",
  initialState: {
    title: "Coding-Journal",
    toastDuration: 3000,
  },
  reducers: {},
});

// export const { logIn, logOut } = Auth.actions;

export default Static.reducer;
