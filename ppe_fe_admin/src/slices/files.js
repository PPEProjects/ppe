import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  file: {},
  files: [],
  filesType: [],
  filesObj: {},
  access_token: ``,
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.filesType !== "undefined") {
        state.filesType = payload.filesType;
      }
      if (typeof payload.filesObj !== "undefined") {
        state.filesObj = payload.filesObj;
      }
      if (typeof payload.files !== "undefined") {
        state.files = payload.files;
      }
      if (typeof payload.file !== "undefined") {
        state.file = payload.file;
      }
      if (typeof payload.status !== "undefined") {
        state.status = payload.status;
      }
      if (typeof payload.access_token !== "undefined") {
        state.access_token = payload.access_token;
      }
    },
  },
});

export const { setData } = filesSlice.actions;
export const filesSelector = (state) => state.files;
export default filesSlice.reducer;

export function setFileData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}

export function getFiles() {
  return async (dispatch) => {
    let res = await Ajax.get(`/files`);
    dispatch(setData(res?.data));
  };
}

export function getFilesObj() {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/files`, { keyBy: `id` });
    dispatch(setData({ status: `success`, filesObj: res.data?.files }));
  };
}
