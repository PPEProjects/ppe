import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  project1: {},
  projects: [],
  projectsObj: {},
  access_token: ``,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.projectsObj !== "undefined") {
        state.projectsObj = payload.projectsObj;
      }
      if (typeof payload.projects !== "undefined") {
        state.projects = payload.projects;
      }
      if (typeof payload.project1 !== "undefined") {
        state.project1 = payload.project1;
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

export const { setData } = projectsSlice.actions;
export const projectsSelector = (state) => state.projects;
export default projectsSlice.reducer;

const cookies = new Cookies();

export function setprojectData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}

export function deleteProject(project) {
  return async (dispatch) => {
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${project.name}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[project.id] = project.id;
    let res = await Ajax.delete(`/projects/${project.id}`, params);

    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();
    dispatch(getProjects());
  };
}

export function deleteProjects(project) {
  return async (dispatch, getState) => {
    const { selects } = getState().form;
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${Object.keys(selects).length} projects`],
    });
    if (!confirm) return;
    let params = { chooses: selects };
    let res = await Ajax.delete(`/projects/1`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();
    dispatch(getProjects());
  };
}

export function getProjects(filterOpen) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let type = new URL(window.location.href).searchParams.get("type") ?? ``;
    let res = await Ajax.get(`/projects`, { status: filterOpen });
    dispatch(setData({ status: `success`, projects: res.data?.projects }));
  };
}
export function getProjectsObj() {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/projects`, { keyBy: `id` });
    dispatch(
      setData({ status: `success`, projectsObj: res.data?.projects ?? {} })
    );
  };
}
