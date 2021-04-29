import 'react-dates/initialize';
import {DateRangePicker, SingleDatePicker, DayPickerRangeController} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {render} from '@testing-library/react';
import React, {Component, useState} from 'react';
import moment from "moment";
import Ajax from "./Ajax";
import {usersSelector, setUserData} from "../slices/users";
import { useDispatch, useSelector } from "react-redux";

const Date = () => {
    const dispatch = useDispatch();
    const {types, course_id} = useSelector(usersSelector);
    const [sdate, setSdate] = useState(null);
    const [edate, setEdate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);

    const handleDatesChange = async ({startDate, endDate}) => {
        setSdate(startDate);
        setEdate(endDate);
        const sdate1 = moment(startDate).format('YYYY-MM-DD')
        const edate1 = moment(endDate).format('YYYY-MM-DD')
        console.log('types', types)
        let res = await Ajax.get(`/users`, {types, status: `Activated`, startDate: sdate1, endDate: edate1, course_id});
        dispatch(setUserData({users:res.data.users}));
    };
    return (

        <DateRangePicker
            block={true}
            small={true}
            startDate={sdate} // momentPropTypes.momentObj or null,
            endDate={edate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
            isOutsideRange={() => false}
        />

    );
}
export default Date;
