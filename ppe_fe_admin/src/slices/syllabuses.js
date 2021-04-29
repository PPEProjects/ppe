import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  syllabuse: {},
  syllabuses: [],
  syllabusesObj: {},
  syllabuse_contents:{},
};

const syllabusesSlice = createSlice({
  name: "syllabuses",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.syllabuse_contents !== "undefined") {
        state.syllabuse_contents = payload.syllabuse_contents;
      }
      if (typeof payload.syllabusesObj !== "undefined") {
        state.syllabusesObj = payload.syllabusesObj;
      }
      if (typeof payload.syllabuses !== "undefined") {
        state.syllabuses = payload.syllabuses;
      }
      if (typeof payload.status !== "undefined") {
        state.status = payload.status;
      }
    },
  },
});

export const { setData } = syllabusesSlice.actions;
export const syllabusesSelector = (state) => state.syllabuses;
export default syllabusesSlice.reducer;

const cookies = new Cookies();

export function setSyllabuseData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}

export function deleteSyllabuse(syllabuse) {
  return async (dispatch) => {
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${syllabuse.name}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[syllabuse.id] = syllabuse.id;
    let res = await Ajax.delete(`/syllabuses/${syllabuse.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();
  
    dispatch(getSyllabuses());
  };
}

export function getSyllabuses(filterOpen) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/syllabuses`, { status: filterOpen });
    dispatch(setData({ status: `success`, syllabuses: res.data?.syllabuses }));
  };
}

export function getSyllabusesObj() {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/syllabuses`, { keyBy: `id` });
    dispatch(
        setData({ status: `success`, syllabusesObj: res.data.syllabuses ?? {} })
    );
  };
}
