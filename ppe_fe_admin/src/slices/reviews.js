import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  review: {},
  reviews: [],
  access_token: ``,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.reviews !== "undefined") {
        state.reviews = payload.reviews;
      }
      if (typeof payload.review !== "undefined") {
        state.review = payload.review;
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

export const { setData } = reviewsSlice.actions;
export const reviewsSelector = (state) => state.reviews;
export default reviewsSlice.reducer;

const cookies = new Cookies();

export function setReviewData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}

export function deleteReview(review) {
  return async (dispatch) => {
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${review.name}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[review.id] = review.id;
    let res = await Ajax.delete(`/reviews/${review.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();

    dispatch(getReviews());
  };
}

export function getReviews(filterOpen) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let type = new URL(window.location.href).searchParams.get("type") ?? ``;
    let res = await Ajax.get(`/reviews`, { status: filterOpen });
    dispatch(setData({ status: `success`, reviews: res.data.reviews ?? [] }));
  };
}
