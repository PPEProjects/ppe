import { createSlice } from "@reduxjs/toolkit";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";

export const initialState = {
  isShow: false,
  mode: `grid`,
  user: {},
  course: {},
  syllabuse: {},
  project: {},
  task: {},
  release: {},
  company: {},
  job: {},
  review: {},
  post: {},
  comment: {},
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.comment !== "undefined") {
        state.comment = payload.comment;
      }
      if (typeof payload.post !== "undefined") {
        state.post = payload.post;
      }
      if (typeof payload.review !== "undefined") {
        state.review = payload.review;
      }
      if (typeof payload.job !== "undefined") {
        state.job = payload.job;
      }
      if (typeof payload.company !== "undefined") {
        state.company = payload.company;
      }
      if (typeof payload.release !== "undefined") {
        state.release = payload.release;
      }
      if (typeof payload.task !== "undefined") {
        state.task = payload.task;
      }
      if (typeof payload.project !== "undefined") {
        state.project = payload.project;
      }
      if (typeof payload.syllabuse !== "undefined") {
        state.syllabuse = payload.syllabuse;
      }
      if (typeof payload.school !== "undefined") {
        state.school = payload.school;
      }
      if (typeof payload.classe !== "undefined") {
        state.classe = payload.classe;
      }
     
      if (typeof payload.course !== "undefined") {
        state.course = payload.course;
      }
      if (typeof payload.mode !== "undefined") {
        state.mode = payload.mode;
      }
      if (typeof payload.user !== "undefined") {
        state.user = payload.user;
      }
      if (typeof payload.isShow !== "undefined") {
        state.isShow = payload.isShow;
      }
    },
  },
});

export const { setData } = detailsSlice.actions;
export const detailsSelector = (state) => state.details;
export default detailsSlice.reducer;
export const detailsSelector1 = (state) => state.details;

export function setDetailData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}
export function setDetailData1(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}
