import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  comment: {},
  comments: [],
  access_token: ``,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.comments !== "undefined") {
        state.comments = payload.comments;
      }
      if (typeof payload.comment !== "undefined") {
        state.comment = payload.comment;
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

export const { setData } = commentsSlice.actions;
export const commentsSelector = (state) => state.comments;
export default commentsSlice.reducer;

const cookies = new Cookies();

export function setCommentData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}

export function deleteComment(comment) {
  return async (dispatch) => {
    console.log(comment);
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${comment.image}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[comment.id] = comment.id;
    let res = await Ajax.delete(`/comments/${comment.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();

    dispatch(getComments());
  };
}

export function deleteComments(comment) {
  return async (dispatch, getState) => {
    const { selects } = getState().form;
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${Object.keys(selects).length} comments`],
    });
    if (!confirm) return;
    let params = { chooses: selects };
    let res = await Ajax.delete(`/comments/1`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();
    dispatch(getComments());
  };
}

export function getComments(filterOpen) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let type = new URL(window.location.href).searchParams.get("type") ?? ``;
    let res = await Ajax.get(`/comments`, { status: filterOpen });
    dispatch(setData({ status: `success`, comments: res.data?.comments }));
  };
}
