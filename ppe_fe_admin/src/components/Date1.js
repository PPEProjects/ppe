import 'react-dates/initialize';
import {DateRangePicker, SingleDatePicker, DayPickerRangeController} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {render} from '@testing-library/react';
import React, {Component} from 'react';
import moment from "moment";
import Ajax from "./Ajax";
import {usersSelector, setUserData} from "../slices/users";
import {useSelector} from "react-redux";
import {connect} from 'react-redux';

class Date extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
        }
    }

    render() {
        return (

            <DateRangePicker
                className=""
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={async ({startDate, endDate}) => {
                    this.setState({startDate, endDate})
                    const sdate = moment(startDate).format('YYYY-MM-DD')
                    const edate = moment(endDate).format('YYYY-MM-DD')
                    console.log('sdate', sdate)
                    console.log('edate', edate)

                    // let res = await Ajax.get(`/users`, {types: [userType], status: `Activated`});
                    this.props.singIn()

                    // dispatch(setUserData({users: res.data.users, types: [userType]}));
                    // console.log('startDate', moment(startDate).format('YYYY-MM-DD'))
                    // console.log('endDate', moment(endDate).format('YYYY-MM-DD'))
                }} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
            />

        );
    }
}

const mapDispatchToProps =  {
    dispatch(setUserData({}))
};
export default connect(null, mapDispatchToProps)(Date)

// export default Date;
