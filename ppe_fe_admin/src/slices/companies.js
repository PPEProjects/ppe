import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Ajax from "../components/Ajax";
import Alert from "../components/Alert";
import Confirm from "../components/Confirm";

export const initialState = {
  status: `loading`,
  company: {},
  companies: [],
  companiesObj: {},
  access_token: ``,
};

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      if (typeof payload.companiesObj !== "undefined") {
        state.companiesObj = payload.companiesObj;
      }
      if (typeof payload.companies !== "undefined") {
        state.companies = payload.companies;
      }
      if (typeof payload.company !== "undefined") {
        state.company = payload.company;
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

export const { setData } = companiesSlice.actions;
export const companiesSelector = (state) => state.companies;
export default companiesSlice.reducer;

const cookies = new Cookies();

export function setcompanyData(data) {
  return async (dispatch) => {
    dispatch(setData(data));
  };
}

export function deleteCompany(company) {
  return async (dispatch) => {
    let confirm = await Confirm({
      t: `Confirm`,
      c: [`Do you want to delete: ${company.name}`],
    });
    if (!confirm) return;
    let params = { chooses: {} };
    params.chooses[company.id] = company.id;
    let res = await Ajax.delete(`/companies/${company.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    window.location.reload();
   
    dispatch(getCompanies());
  };
}

export function getCompanies(filterOpen) {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let type = new URL(window.location.href).searchParams.get("type") ?? ``;
    let res = await Ajax.get(`/companies`, { status: filterOpen });
    dispatch(setData({ status: `success`, companies: res.data?.companies }));
  };
}
export function getCompaniesObj() {
  return async (dispatch) => {
    dispatch(setData({ status: `loading` }));
    let res = await Ajax.get(`/companies`, { keyBy: `id` });
    dispatch(
      setData({ status: `success`, companiesObj: res.data.companies ?? {} })
    );
  };
}
