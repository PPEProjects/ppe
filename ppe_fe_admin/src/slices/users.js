import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  user: {},
  users: [],
  usersObj: {},
  access_token: ``,
  types: {},
  course_id: ``,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.course_id !== "undefined") {
        state.course_id = payload.course_id;
      }
      if (typeof payload.types !== "undefined") {
        state.types = payload.types;
      }
      if (typeof payload.usersObj !== "undefined") {
        state.usersObj = payload.usersObj;
      }
      if (typeof payload.users !== "undefined") {
        state.users = payload.users;
      }
      if (typeof payload.user !== "undefined") {
        state.user = payload.user;
      }
      if (typeof payload.status !== "undefined") {
        state.status = payload.status;
      }
      if (typeof payload.access_token !== "undefined") {
        state.access_token = payload.access_token;
      }
    },
    checkUser: (state, { payload }) => {
      const { id, checked } = payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      state.users[userIndex].checked = checked;
    },
    selectedAll: (state, { payload }) => {
      const { checked } = payload;
      const updateUser = state.users.map((user) => ({ ...user, checked }));
      state.users = updateUser;
    },
  },
});

export const { setData, checkUser, selectedAll } = usersSlice.actions;
export const usersSelector = (state) => state.users;

export default usersSlice.reducer;

const cookies = new Cookies();

export function setUserData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}

export function deleteUser(user) {
  return async (dispatch) => {
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${user.name}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[user.id] = user.id;
    let res = await Ajax.delete(`/users/${user.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();

    dispatch(getUsers());
  };
}

export function getUsers(filterOpen, types = null) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    types = types ?? [
      new URL(window.location.href).searchParams.get("type") ?? ``,
    ];
    let res = await Ajax.get(`/users`, { types: types, status: filterOpen });
    dispatch(setData({ status: `success`, users: res.data?.users }));
  };
}

export function getUsersObj() {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/users`, { keyBy: `id` });
    dispatch(setData({ status: `success`, usersObj: res.data.users ?? {} }));
  };
}

export function getUserInfo() {
  return async (dispatch) => {
    let res = await Ajax.get(`/users`, { get_info: `get_info` });
    let user = { user: res.data };
    dispatch(setData(user));
    let access_token = { access_token: cookies.get("access_token") };
    dispatch(setData(access_token));
    if (res.errors[0] === `Unauthenticated.`) {
      cookies.remove("access_token");
      cookies.remove("user");
      window.location.assign(`${window.$home}/auth?logout=logout`);
    }
  };
}

export function handleAuthSumit(e) {
  e.preventDefault();
  const params = new FormData(e.target);
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.post(`/users`, params);
    dispatch(setData(res));
    if (res.status === `success`) {
      let { access_token, user } = res.data;
      cookies.set("access_token", access_token, { path: "/" });
      cookies.set("user", JSON.stringify(user), { path: "/" });
      if (user.types.indexOf(`Admin`) !== -1) {
        window.location.assign(
          `${window.$admin}/authentication?username=${user.username}&access_token=${access_token}`
        );
        return;
      }
      window.location.assign(`${window.$home}/CharacterPage`);
      return;
    }
    Alert({ t: res.status, c: res.errors });
  };
}

export function checkAuth() {
  return async (dispatch) => {
    let data = cookies.getAll();
    let { access_token, user } = data;
    if (!user) return;

    window.location.assign(`${window.$home}/CharacterPage`);
  };
}
