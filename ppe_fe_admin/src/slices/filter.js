import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  filterOpen: `Activated`,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      console.log("payload", payload)
      if (typeof payload.filterOpen !== "undefined") {
        state.filterOpen = payload.filterOpen;
      }
    },
  },
});

export const { setData } = filterSlice.actions;
export const filterSelector = (state) => state.filter;
export default filterSlice.reducer;

export function setFilterData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}
export function getFilter(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}
