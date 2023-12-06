import { createSlice } from '@reduxjs/toolkit';

const Solutions = createSlice({
  name: 'solutions',
  initialState: {
    sortByQuery: 'score',
    sortByOrder: 'descending',
    solutions: [],
    searchSolution: [],
    searchQuery: '',
    page: 1,
    limit: 9,
    totalResults: 0,
  },
  reducers: {
    setSolutions(state, action) {
      state.solutions = action.payload;
    },
    setSearchSolution(state, action) {
      state.searchSolution = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    sortSolution(state, action) {
      let query = action.payload;
      if (state.sortByOrder === 'ascending') {
        if (query === 'date') {
          query = 'createdAt';
          state.solutions.sort((a, b) => {
            return (
              parseInt(new Date(a[query]).getTime()) -
              parseInt(new Date(b[query]).getTime())
            );
          });
        } else if (query === 'accuracy') {
          state.solutions.sort((a, b) => b[query] - a[query]);
        } else {
          state.solutions.sort((a, b) => a[query] - b[query]);
        }
      } else {
        if (query === 'date') {
          query = 'createdAt';
          state.solutions.sort((a, b) => {
            return (
              parseInt(new Date(b[query]).getTime()) -
              parseInt(new Date(a[query]).getTime())
            );
          });
        } else if (query === 'accuracy') {
          state.solutions.sort((a, b) => a[query] - b[query]);
        } else {
          state.solutions.sort((a, b) => b[query] - a[query]);
        }
      }
    },
    setSortByOrder(state, action) {
      state.sortByOrder = action.payload;
    },
    setSortByQuery(state, action) {
      state.sortByQuery = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotalResults(state, action) {
      state.totalResults = action.payload;
    },
  },
});

export const {
  setSolutions,
  setSearchSolution,
  sortSolution,
  setSortByOrder,
  setSortByQuery,
  setSearchQuery,
  setPage,
  setTotalResults,
} = Solutions.actions;

export default Solutions.reducer;
