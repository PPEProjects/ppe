import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  course: {},
  courses: [],
  coursesObj: {},
  access_token: ``,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.coursesObj !== "undefined") {
        state.coursesObj = payload.coursesObj;
      }
      if (typeof payload.courses !== "undefined") {
        state.courses = payload.courses;
      }
      if (typeof payload.course !== "undefined") {
        state.course = payload.course;
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

export const { setData } = coursesSlice.actions;
export const coursesSelector = (state) => state.courses;
export default coursesSlice.reducer;

const cookies = new Cookies();

export function setCourseData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}
export function deleteCourse(course) {
  return async (dispatch) => {
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${course.name}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[course.id] = course.id;
    let res = await Ajax.delete(`/courses/${course.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();
   
    dispatch(getCourses());
  };
}

export function getCourses(filterOpen) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/courses`, { status: filterOpen });
    dispatch(setData({ status: `success`, courses: res.data?.courses }));
  };
}

export function getCoursesObj() {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/courses`, { keyBy: `id` });
    dispatch(setData({ status: `success`, coursesObj: res.data?.courses }));
  };
}
