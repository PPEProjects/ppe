import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    checkboxes: {},
    selects: {},
    editorData: null,
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setData: (state, {payload}) => {
            Object.entries(initialState).map(([key, value], i) => {
                if (typeof payload[key] !== "undefined") {
                    state[key] = payload[key];
                }
            });
            // console.log('payload', payload)
            // if (typeof payload.checkboxes !== "undefined") {
            //     state.checkboxes = payload.checkboxes;
            // }
        },
    },
});

export const {setData} = formSlice.actions;
export const formSelector = (state) => state.form;
export default formSlice.reducer;

export function setFormData(data) {
    console.log("data", data);
    return async (dispatch) => {
        dispatch(setData(data));
    };
}

export function setFormSelects(id = 'all', arr=[]) {
    return async (dispatch, getState) => {
        const {selects} = getState().form
        let selects1 = JSON.parse(JSON.stringify(selects))
        if (id === 'all' && !Object.keys(selects).length) {
            arr.forEach((item) => {
                selects1[item.id] = item.id
            })
            dispatch(setData({selects: selects1}));
            return;
        }
        if (id === 'all' && Object.keys(selects).length) {
            dispatch(setData({selects: {}}));
            return;
        }
        if (selects1[id]) {
            delete selects1[id]
        } else {
            selects1[id] = id
        }
        dispatch(setData({selects: selects1}));
        console.log('selects1', selects1)
    };
}
