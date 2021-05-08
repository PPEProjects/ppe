import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  release: {},
  releases: [],
  access_token: ``,
};

const releasesSlice = createSlice({
  name: "releases",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.releases !== "undefined") {
        state.releases = payload.releases;
      }
      if (typeof payload.release !== "undefined") {
        state.release = payload.release;
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

export const { setData } = releasesSlice.actions;
export const releasesSelector = (state) => state.releases;
export default releasesSlice.reducer;

const cookies = new Cookies();

export function setReleaseData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}
export function deleteRelease(release) {
  return async (dispatch) => {
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${release.name}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[release.id] = release.id;
    let res = await Ajax.delete(`/releases/${release.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();

    dispatch(getReleases());
  };
}

export function deleteReleases(release) {
  return async (dispatch, getState) => {
    const { selects } = getState().form;
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${Object.keys(selects).length} releases`],
    });
    if (!confirm) return;
    let params = { chooses: selects };
    let res = await Ajax.delete(`/releases/1`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();
    dispatch(getReleases());
  };
}

export function getReleases(filterOpen) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let type = new URL(window.location.href).searchParams.get("type") ?? ``;
    let res = await Ajax.get(`/releases`, { status: filterOpen });
    dispatch(setData({ status: `success`, releases: res.data?.releases }));
  };
}
