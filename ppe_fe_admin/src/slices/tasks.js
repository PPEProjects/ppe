import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  task: {},
  tasks: [],
  access_token: ``,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.tasks !== "undefined") {
        state.tasks = payload.tasks;
      }
      if (typeof payload.task !== "undefined") {
        state.task = payload.task;
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

export const { setData } = tasksSlice.actions;
export const tasksSelector = (state) => state.tasks;
export default tasksSlice.reducer;

const cookies = new Cookies();

export function setTaskData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}

export function deleteTask(task) {
  return async (dispatch) => {
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${task.name}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[task.id] = task.id;
    let res = await Ajax.delete(`/tasks/${task.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();
  
    dispatch(getTasks());
  };
}

export function getTasks(filterOpen) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let type = new URL(window.location.href).searchParams.get("type") ?? ``;
    let res = await Ajax.get(`/tasks`, {status: filterOpen });
    dispatch(setData({ status: `success`, tasks: res.data?.tasks }));
  };
}
