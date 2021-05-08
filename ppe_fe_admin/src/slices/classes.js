import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  class1: {},
  classes: [],
  classesObj: {},
  access_token: ``,
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.classesObj !== "undefined") {
        state.classesObj = payload.classesObj;
      }
      if (typeof payload.classes !== "undefined") {
        state.classes = payload.classes;
      }
      if (typeof payload.class1 !== "undefined") {
        state.class1 = payload.class1;
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

export const { setData } = classesSlice.actions;
export const classesSelector = (state) => state.classes;
export default classesSlice.reducer;

const cookies = new Cookies();

export function setClasseData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}
export function deleteClasse(classe) {
  return async (dispatch) => {
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${classe.name}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[classe.id] = classe.id;
    let res = await Ajax.delete(`/classes/${classe.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();

    dispatch(getClasses());
  };
}

export function deleteClasses(classe) {
  return async (dispatch, getState) => {
    const { selects } = getState().form;
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${Object.keys(selects).length} classes`],
    });
    if (!confirm) return;
    let params = { chooses: selects };
    let res = await Ajax.delete(`/classes/1`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();
    dispatch(getClasses());
  };
}

export function getClasses(filterOpen) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/classes`, { status: filterOpen });
    dispatch(setData({ status: `success`, classes: res.data?.classes }));
  };
}

export function getClassesObj() {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/classes`, { keyBy: `id` });
    dispatch(setData({ status: `success`, classesObj: res.data?.classes }));
  };
}
