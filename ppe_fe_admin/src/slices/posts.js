import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  post: {},
  posts: [],
  postsObj: {},
  access_token: ``,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.postsObj !== "undefined") {
        state.postsObj = payload.postsObj;
      }
      if (typeof payload.posts !== "undefined") {
        state.posts = payload.posts;
      }
      if (typeof payload.post !== "undefined") {
        state.post = payload.post;
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

export const { setData } = postsSlice.actions;
export const postsSelector = (state) => state.posts;
export default postsSlice.reducer;

const cookies = new Cookies();

export function setpostData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}

export function deletePost(post) {
  return async (dispatch) => {
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${post.title}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[post.id] = post.id;
    let res = await Ajax.delete(`/posts/${post.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();
  
    dispatch(getPosts());
  };
}

export function getPosts(filterOpen) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let type = new URL(window.location.href).searchParams.get("type") ?? ``;
    let res = await Ajax.get(`/posts`, { status: filterOpen});
    dispatch(setData({ status: `success`, posts: res.data?.posts }));
  };
}
export function getPostsObj() {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/posts`, { keyBy: `id` });
    dispatch(setData({ status: `success`, postsObj: res.data?.posts }));
  };
}
