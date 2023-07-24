import { createSlice } from "@reduxjs/toolkit";

const Static = createSlice({
  name: "static",
  initialState: {
    title: "Coding-Journal",
  },
  reducers: {},
});

// export const { logIn, logOut } = Auth.actions;

export default Static.reducer;
