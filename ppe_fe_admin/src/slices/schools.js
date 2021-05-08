import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  school: {},
  schools: [],
  schoolsObj: {},
  school_contents: {},
};

const schoolsSlice = createSlice({
  name: "schools",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.school_contents !== "undefined") {
        state.school_contents = payload.school_contents;
      }
      if (typeof payload.schoolsObj !== "undefined") {
        state.schoolsObj = payload.schoolsObj;
      }
      if (typeof payload.schools !== "undefined") {
        state.schools = payload.schools;
      }
      if (typeof payload.status !== "undefined") {
        state.status = payload.status;
      }
    },
  },
});

export const { setData } = schoolsSlice.actions;
export const schoolsSelector = (state) => state.schools;
export default schoolsSlice.reducer;

const cookies = new Cookies();

export function setSchoolData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}

export function deleteSchool(school) {
  return async (dispatch) => {
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${school.name}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[school.id] = school.id;
    let res = await Ajax.delete(`/schools/${school.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();

    dispatch(getSchools());
  };
}

export function deleteSchools(school) {
  return async (dispatch, getState) => {
    const { selects } = getState().form;
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${Object.keys(selects).length} schools`],
    });
    if (!confirm) return;
    let params = { chooses: selects };
    let res = await Ajax.delete(`/schools/1`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();
    dispatch(getSchools());
  };
}
export function getSchools(filterOpen) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/schools`, { status: filterOpen });
    dispatch(setData({ status: `success`, schools: res.data?.schools }));
  };
}

export function getSchoolsObj() {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/schools`, { keyBy: `id` });
    dispatch(
      setData({ status: `success`, schoolsObj: res.data.schools ?? {} })
    );
  };
}
