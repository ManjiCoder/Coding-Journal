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
      switch (sortField) {
        case "ascending":
          state.solutions.sort((a, b) => {
            return a[sortField] - b[sortField];
          });
          break;
        case "date":
          sortField = "createdAt";
          state.solutions.sort((a, b) => {
            // console.log(a[sortField], b[sortField]);
            return (
              parseInt(new Date(b[sortField]).getTime()) -
              parseInt(new Date(a[sortField]).getTime())
            );
          });
          break;

        default:
          state.solutions.sort((a, b) => {
            return b[sortField] - a[sortField];
          });
          break;
      }
    },
    setSortByOrder(state, action) {
      state.sortBy = action.payload;
    },
    setSortByQuery(state, action) {
      state.sortByQuery = action.payload;
    },
  },
});

export const { setSolutions, filterSolution, setSortByOrder, setSortByQuery } =
  Solutions.actions;

export default Solutions.reducer;
