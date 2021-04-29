import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  url: window.location.href,
  opens: {},
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.url !== "undefined") {
        state.url = payload.url;
      }
      if (typeof payload.opens !== "undefined") {
        state.opens = payload.opens;
      }
    },
  },
});

export const { setData } = sidebarSlice.actions;
export const sidebarSelector = (state) => state.sidebar;
export default sidebarSlice.reducer;

export function setSidebarData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}
