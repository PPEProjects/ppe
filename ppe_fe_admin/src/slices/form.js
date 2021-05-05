import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  checkboxes: {},
  selects: {},
  editorData: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      Object.entries(initialState).map(([key, value], i) => {
        if (typeof payload[key] !== "undefined") {
          state[key] = payload[key];
        }
      });
      // console.log('payload', payload)
      // if (typeof payload.checkboxes !== "undefined") {
      //     state.checkboxes = payload.checkboxes;
      // }
    },
  },
});

export const { setData } = formSlice.actions;
export const formSelector = (state) => state.form;
export default formSlice.reducer;

export function setFormData(data) {
  console.log("data", data);
  return async (dispatch) => {
    dispatch(setData(data));
  };
}
// export function setFormSelects(id) {
//   console.log("data", data);
//   return async (dispatch) => {
//     dispatch(setData(data));
//   };
// }
