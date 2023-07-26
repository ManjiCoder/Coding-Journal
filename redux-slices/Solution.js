import { createSlice } from "@reduxjs/toolkit";

const Solutions = createSlice({
  name: "solutions",
  initialState: {
    sortByQuery: "score",
    sortByOrder: "descending",
    solutions: [],
  },
  reducers: {
    setSolutions(state, action) {
      state.solutions = action.payload;
    },
    filterSolution(state, action) {
      let sortField = action.payload;
      if (sortField === "date") {
        sortField = "createdAt";
        if (state.sortByOrder === "ascending") {
          state.solutions.sort((a, b) => {
            return a[sortField] - b[sortField];
          });
        } else {
          state.solutions.sort((a, b) => {
            return b[sortField] - a[sortField];
          });
        }
      } else {
        if (state.sortByOrder === "ascending") {
          return {
            ...state,
            solutions: state.solutions.sort((a, b) => {
              return a[sortField] - b[sortField];
            }),
          };
        } else {
          return {
            ...state,
            solutions: state.solutions.sort((a, b) => {
              return b[sortField] - a[sortField];
            }),
          };
        }
      }
    },
    setSortByOrder(state, action) {
      state.sortByOrder = action.payload;
    },
    setSortByQuery(state, action) {
      state.sortByQuery = action.payload;
    },
  },
});

export const { setSolutions, filterSolution, setSortByOrder, setSortByQuery } =
  Solutions.actions;

export default Solutions.reducer;
