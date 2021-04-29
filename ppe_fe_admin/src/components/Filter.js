import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {filterSelector, setFilterData} from "../slices/filter";
import {
  Select,
} from "../components/Form";
import FilterUser from './FilterUser';
const Filter = (props) => {
    const dispatch = useDispatch();
    const {filterOpen} = useSelector(filterSelector);

    useEffect(() => {
    }, [dispatch]);

    const handleFilterClick = (e, val) => {
        if(e){
            e.preventDefault();
        }
        dispatch(setFilterData({filterOpen: val}));
    }

    return (
        <React.Fragment>
           <div className="col-span-3 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 pt-3 pb-24 ">
            <section className="">
              <b className="px-3 font-semibold ">Filter by</b>
              <hr className="my-2" />
              <ul className="px-3">
                <li className="">
                <button
                   onClick={(e) => handleFilterClick(e, `Activated`)}
                    className="bg-transparent h-10 w-full rounded hover:opacity-75 flex items-center focus:outline-none "
                    type="button"
                  >
                    <i className="material-icons">
                        {filterOpen==='Activated' ? `radio_button_checked` :`radio_button_unchecked`}
                    </i>
                   <span className="ml-2">Activated</span>
                </button>
                </li>
                <li className="">
                <button
                   onClick={(e) => handleFilterClick(e, `Deleted`)}
                    className="bg-transparent h-10 w-full rounded hover:opacity-75 flex items-center focus:outline-none "
                    type="button"
                  >
                    <i className="material-icons">
                        {filterOpen==='Deleted' ? `radio_button_checked` :`radio_button_unchecked`}
                    </i>
                   <span className="ml-2">Deleted</span>
                </button>
                </li>
                <li className="">
                <button
                   onClick={(e) => handleFilterClick(e, ``)}
                    className="bg-transparent h-10 w-full rounded hover:opacity-75 flex items-center focus:outline-none "
                    type="button"
                  >
                    <i className="material-icons">
                        {filterOpen==='' ? `radio_button_checked` :`radio_button_unchecked`}
                    </i>
                   <span className="ml-2">All</span>
                </button>
                </li>
              </ul>
            </section>
            { props?.type==="user" &&
<FilterUser/>
            }
           
            {/*<section className="border-t mt-1 px-2">
            <div className="mx-2 mt-2">
            <span className="">Select a user set</span>
            <div className="-mt-3">
            <Select
                name={`language`}
                values={[`Admin`, `Office leader`, `Japanese instructor`, `IT project instructor`, `Job supporter`, `Life supporter`, `Japanese learner`, `IT project member`,`Job hunter`]}
              />
            </div>
              </div>
                <button
                type="button"
                className="my-1 bg-white text-gray-800 h-10 w-full px-2 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-between"
              >
                <b className="">Course</b>
                <i className="material-icons">chevron_right</i>
              </button>
            </section>
            <section className="border-t mt-1 px-2">
              <button
                type="button"
                className="my-1 bg-white text-gray-800 h-10 w-full px-2 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-between"
              >
                <b className="">Issues</b>
                <i className="material-icons">chevron_right</i>
              </button>
            </section>
            <section className="border-t mt-1 px-2 ">
              <button
                type="button"
                className="my-1 bg-white text-gray-800 h-10 w-full px-2 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-between"
              >
                <b className="">Sets</b>
                <i className="material-icons">chevron_right</i>
              </button>
              
    </section>*/}
          </div>
               
        </React.Fragment>
    )
}
export default Filter
