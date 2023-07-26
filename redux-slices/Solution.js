import { createSlice } from "@reduxjs/toolkit";

const Solutions = createSlice({
  name: "solutions",
  initialState: {
    sortBy: "descending",
    solutions: [],
  },
  reducers: {
    setSolutions(state, action) {
      state.solutions = action.payload;
    },
    filterSolution(state, action) {
      if (state.sortBy === "ascending") {
        state.solutions.sort((a, b) => {
          return a[action.payload] - b[action.payload];
        });
      } else {
        state.solutions.sort((a, b) => {
          return b[action.payload] - a[action.payload];
        });
      }
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
});

export const { setSolutions, filterSolution, setSortBy } = Solutions.actions;

export default Solutions.reducer;
