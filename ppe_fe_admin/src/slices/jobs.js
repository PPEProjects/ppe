import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  job: {},
  jobs: [],
  access_token: ``,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.jobs !== "undefined") {
        state.jobs = payload.jobs;
      }
      if (typeof payload.job !== "undefined") {
        state.job = payload.job;
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

export const { setData } = jobsSlice.actions;
export const jobsSelector = (state) => state.jobs;
export default jobsSlice.reducer;

const cookies = new Cookies();

export function setJobData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}

export function deleteJob(job) {
  return async (dispatch) => {
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${job.name}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[job.id] = job.id;
    let res = await Ajax.delete(`/jobs/${job.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();
  
    dispatch(getJobs());
  };
}

export function getJobs(filterOpen) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
  
    let res = await Ajax.get(`/jobs`, {  status: filterOpen });
    dispatch(setData({ status: `success`, jobs: res.data?.jobs }));
  };
}
