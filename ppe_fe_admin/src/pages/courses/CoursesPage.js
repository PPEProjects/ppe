import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import Ajax from "../../components/Ajax";

import { useDispatch, useSelector } from "react-redux";
import { setDetailData } from "../../slices/details";
import { InputIcon, Button } from "../../components/Form";
import CourseDetailPage from "./CourseDetailPage";
import {
  coursesSelector,
  getCourses,
  deleteCourses,
} from "../../slices/courses";
// import { sidebarSelector, setSidebarData } from "../../slices/sidebar";
import { filterSelector } from "../../slices/filter";
import Filter from "../../components/Filter";
import { setFormData, formSelector, setFormSelects } from "../../slices/form";
import Language from "../../components/Language";
import Search from "../../components/Search";

const CoursesPage = () => {
  const { course, courses, status } = useSelector(coursesSelector);
  const location = useLocation();
  const dispatch = useDispatch();
  // const { url, opens } = useSelector(sidebarSelector);
  const { selects } = useSelector(formSelector);
  const { filterOpen } = useSelector(filterSelector);
  const [mode, setMode] = useState(`grid`);
  const [type, setType] = useState(``);
  const [search, setSearch] = useState(``);
  const [coursesSearch, setUsersSearch] = useState(courses);

  useEffect(() => {
    setUsersSearch(Search(`name`, search, courses));
  }, [search, courses]);

  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
    dispatch(getCourses(filterOpen));
  }, [dispatch, location.pathname, location.search, filterOpen]);

  const handleOnclick = (course) => {
    let checkboxes = {
      syllabus_ids: course.syllabus_ids,
      teachers: course.teachers,
    };
    dispatch(setFormData({ checkboxes: checkboxes }));
    dispatch(setDetailData({ isShow: true, course: course }));
    try {
      dispatch(setFormData({ editorData: JSON.parse(course.content) }));
    } catch (e) {
      dispatch(setFormData({ editorData: course.content }));
    }
  };

  const renderMain = () => {
    return (
      <aside className="w-full">
        <div className="grid grid-cols-12 gap-4 mx-6 ">
          <div className="col-span-12 flex items-center justify-between mt-6 ">
            <h1 className="text-xl font-bold">Courses</h1>
            <Language />
          </div>
          <Filter />
          <div className="col-span-9 ">
            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3">
              <div className="flex items-center justify-between mx-4">
                <div className="">
                  <b className="">{courses?.length}</b>
                  <p className="text-gray-600">
                    {courses?.length === 0 || courses?.length === 1
                      ? "Course"
                      : "Courses"}
                  </p>
                </div>
                <div className="flex ">
                  <Link
                    to={`/CoursesCreatePage`}
                    className="bg-indigo-700 text-white h-10 px-2 rounded hover:opacity-75 flex items-center justify-center ml-3"
                  >
                    <span className="mx-2">Add courses</span>
                  </Link>
                </div>
              </div>
              <div className="px-4 border-t mt-2 ">
                <InputIcon
                  placeholder="Search All courses"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="px-4 mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Button
                    type={`button`}
                    title={`${Object.keys(selects).length} Selected`}
                    onClick={() => {
                      dispatch(setFormSelects("all", courses));
                    }}
                    className={`bg-gray-300 text-gray-800`}
                  />
                  <Button
                    type={`button`}
                    title={`x ${Object.keys(selects).length} Select All`}
                    onClick={() => {
                      console.log("1");
                      dispatch(setFormSelects("all", courses));
                    }}
                    className={`bg-gray-300 hidden text-gray-800 `}
                  />

                  <Button
                    type={`button`}
                    disabled={Object.keys(selects).length === 0}
                    title={`Delete`}
                    className={`bg-gray-300 text-gray-800 mx-2`}
                    onClick={(e) => dispatch(deleteCourses())}
                  />
                </div>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setMode(`grid`)}
                    className={`${
                      mode === `grid` ? `bg-gray-200` : ``
                    } text-gray-800 h-10 w-10 rounded hover:opacity-75 flex items-center justify-center `}
                  >
                    <i className="material-icons">widgets</i>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode(`table`)}
                    className={`${
                      mode === `table` ? `bg-gray-200` : ``
                    } text-gray-800 h-10 w-10 rounded hover:opacity-75 flex items-center justify-center `}
                  >
                    <i className="material-icons">menu</i>
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3 mt-4 ">
              <div>
                {coursesSearch.length === 0 && status !== `loading` && (
                  <div>
                    <h2 className="text-2xl text-center	font-light">
                      Not data found
                    </h2>
                  </div>
                )}
              </div>

              {status === `loading` && (
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    className="h-10 w-32 rounded hover:opacity-75 flex items-center justify-center spinner overflow-hidden"
                  ></button>
                </div>
              )}
              {status === `success` && mode === `grid` && (
                <div className=" grid grid-cols-12 gap-3 mx-3 ">
                  {coursesSearch.map((course, key) => (
                    <div className="col-span-3" key={key}>
                      <div className="block relative border hover:border-indigo-700 rounded-md overflow-hidden group">
                        {Object.keys(course.more.ranking ?? {}).length !==
                          0 && (
                          <span className="absolute left-0 top-0 z-10 mt-2 ml-2 text-xs rounded-sm px-1 bg-black-50 text-white h-4 flex items-center">
                            {course.language} / {course.more.ranking}
                          </span>
                        )}
                        {Object.keys(course.more.ranking ?? {}).length ===
                          0 && (
                          <span className="absolute left-0 top-0 z-10 mt-2 ml-2 text-xs rounded-sm px-1 bg-black-50 text-white h-4 flex items-center">
                            {course.language}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => dispatch(setFormSelects(course.id))}
                          className="group-hover:block border border-indigo-700 absolute top-0 right-0 z-20 mt-2 mr-2 bg-white text-gray-600 h-6 w-6 rounded-full hover:opacity-75 hover:bg-white hover:text-blue-700 flex items-center justify-center"
                        >
                          {selects[course.id] && (
                            <i className="text-xl material-icons">done</i>
                          )}
                        </button>
                        <div
                          className="w-full pb-1x1 relative rounded-sm overflow-hidden bg-gray-300 cursor-pointer"
                          onClick={(e) => handleOnclick(course)}
                        >
                          <img
                            alt=""
                            src={course.image}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                        <div
                          className="mx-2 my-2 cursor-pointer"
                          onClick={(e) => handleOnclick(course)}
                        >
                          <h1 className="truncate-2y text-sm leading-5 font-semibold">
                            {course.name}
                          </h1>
                          <div className={`text-gray-500 text-xs truncate`}>
                            <p className="">
                              Created at: {moment(course.created_at).fromNow()}
                            </p>
                            <p className="">
                              Updated at: {moment(course.updated_at).fromNow()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {status === `success` && mode === `table` && (
                <table className=" table-auto text-sm w-full">
                  {coursesSearch.length != 0 && (
                    <thead className="border-black border-b ">
                      <tr className="">
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1">ID</td>
                        <td className="px-2 py-1 ">Name</td>
                        <td className="px-2 py-1 ">Time</td>
                        <td className="px-2 py-1 ">Price</td>
                        <td className="px-2 py-1 ">Discount </td>
                      </tr>
                    </thead>
                  )}
                  <tbody className="text-gray-600 border-gray-500 border-b overflow-hidden">
                    {coursesSearch.map((course, key) => (
                      <tr className="cursor-pointer" key={key}>
                        <td className="px-2 py-1 ">
                          <button
                            type="button"
                            onClick={() => dispatch(setFormSelects(course.id))}
                            className="overflow-hidden group border rounded-md bg-white text-gray-600 h-6 w-6 hover:border-indigo-500 relative"
                          >
                            {selects[course.id] && (
                              <i className="group-hover:block  text-xl material-icons absolute absolute-x absolute-y">
                                done
                              </i>
                            )}
                          </button>
                        </td>
                        <td
                          className="px-2 py-1 cursor-pointer"
                          onClick={(e) => handleOnclick(course)}
                        >
                          <p className="w-10 truncate">{course.id}</p>
                        </td>
                        <td
                          className="px-2 py-1 text-indigo-700 cursor-pointer "
                          onClick={(e) => handleOnclick(course)}
                        >
                          <figure className="flex items-center">
                            <div className="w-10">
                              <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                <img
                                  alt=""
                                  src={course.image}
                                  className="absolute h-full w-full object-cover"
                                />
                              </div>
                            </div>
                            <figcaption
                              className="ml-2 cursor-pointer"
                              onClick={(e) => handleOnclick(course)}
                            >
                              {course.name}
                            </figcaption>
                          </figure>
                        </td>
                        <td
                          className="px-2 py-1 cursor-pointer"
                          onClick={(e) => handleOnclick(course)}
                        >
                          <p
                            className="truncate w-24 cursor-pointer"
                            onClick={(e) => handleOnclick(course)}
                          >
                            {course.more.time}
                          </p>
                        </td>
                        <td
                          className="px-2 py-1 cursor-pointer"
                          onClick={(e) => handleOnclick(course)}
                        >
                          {course.more.price}
                        </td>
                        <td
                          className="px-2 py-1 cursor-pointer"
                          onClick={(e) => handleOnclick(course)}
                        >
                          {course.more.discount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          </div>
        </div>
      </aside>
    );
  };

  return (
    <React.Fragment>
      <CourseDetailPage />
      {renderMain()}
    </React.Fragment>
  );
};

export default CoursesPage;
