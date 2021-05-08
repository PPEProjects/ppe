import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { syllabusesSelector, getSyllabuses } from "../../slices/syllabuses";
import { setDetailData } from "../../slices/details";
import { coursesSelector, getCoursesObj } from "../../slices/courses";
import { usersSelector, getUsersObj, getUsers } from "../../slices/users";
import Ajax from "../../components/Ajax";
import { InputIcon, Button } from "../../components/Form";
import SyllabusesDetailPage from "./SyllabusesDetailPage";
import { useLocation } from "react-router-dom";
// import { sidebarSelector, setSidebarData } from "../../slices/sidebar";
import { filterSelector } from "../../slices/filter";
import Filter from "../../components/Filter";
import Language from "../../components/Language";
import { setFormData } from "../../slices/form";
import Search from "../../components/Search";

const SyllabusesPage = () => {
  const { coursesObj } = useSelector(coursesSelector);
  const { usersObj } = useSelector(usersSelector);
  const location = useLocation();
  const dispatch = useDispatch();
  // const { url, opens } = useSelector(sidebarSelector);
  const { filterOpen } = useSelector(filterSelector);
  const { syllabuse, syllabuses, status } = useSelector(syllabusesSelector);
  const [mode, setMode] = useState(`grid`);
  const [type, setType] = useState(``);

  // const [search, setSearch] = useState(``);
  // const [syllabusesSearch, setUsersSearch] = useState(syllabuses);
  // useEffect(() => {
  //   const syllabusesSearch = syllabuses.filter((syllabuse) => {
  //     if (
  //       (syllabuse.name ?? ``)
  //         .toLowerCase()
  //         .includes((search ?? ``).toLowerCase())
  //     ) {
  //       return syllabuse;
  //     }
  //   });
  //   setUsersSearch(syllabusesSearch);
  // }, [search, syllabuses]);

  const [search, setSearch] = useState(``);
  const [syllabusesSearch, setUsersSearch] = useState(syllabuses);

  useEffect(() => {
    setUsersSearch(Search(`name`, search, syllabuses));
  }, [search, syllabuses]);

  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
    // dispatch(getCoursesObj());
    dispatch(getSyllabuses(filterOpen));
    console.log(location);
    // let url = window.location.href;

    // dispatch(setSidebarData({ url: url }));
  }, [dispatch, location.pathname, location.search, filterOpen]);

  const renderMain = () => {
    return (
      <aside className="w-full">
        <div className="grid grid-cols-12 gap-4 mx-6 ">
          <div className="col-span-12 flex items-center justify-between mt-6 ">
            <h1 className="text-xl font-bold">Syllabuses</h1>
          </div>
          <Filter />

          <div className="col-span-9 ">
            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3">
              <div className="flex items-center justify-between mx-4">
                <div className="">
                  <b className="">{syllabuses?.length}</b>
                  <p className="text-gray-600">{syllabuses?.length ===0 || syllabuses?.length === 1 ? "Syllabuse" : "Syllabuses"}</p>
                </div>
                <div className="flex ">
                  <Link
                    to={`/SyllabusesCreatePage`}
                    className="bg-indigo-700 text-white h-10 px-2 rounded hover:opacity-75 flex items-center justify-center ml-3"
                  >
                    <span className="mx-2">Add syllabuses</span>
                  </Link>
                </div>
              </div>
              <div className="px-4 border-t mt-2 ">
                <InputIcon
                  placeholder="Search All syllabuses"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="px-4 mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Button
                    type={`button`}
                    title={`Select All`}
                    className={`bg-gray-300 text-gray-800`}
                  />

                  <Button
                    type={`button`}
                    title={`Delete`}
                    className={`bg-gray-300 text-gray-800 ml-2`}
                  />

                  {/* <Button
                    type={`button`}
                    title={`Banned`}
                    className={`bg-gray-300 text-gray-800 ml-2`}
                  /> */}
                </div>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setMode(`grid`)}
                    className={`${
                      mode === `grid` ? `bg-gray-200` : ``
                    } text-gray-800 h-10 w-10 rounded hover:opacity-75 flex items-center justify-center hidden `}
                  >
                    <i className="material-icons">widgets</i>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode(`table`)}
                    className={`${
                      mode === `table` ? `bg-gray-200` : ``
                    } text-gray-800 h-10 w-10 rounded hover:opacity-75 flex items-center justify-center hidden`}
                  >
                    <i className="material-icons">menu</i>
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3 mt-4 ">
              <div>
                {syllabusesSearch.length === 0 && status !== `loading` && (
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
                  {syllabusesSearch.map((syllabuse, key) => (
                    <div className="col-span-3" key={key}>
                      <div
                        onClick={() =>
                          dispatch(
                            setDetailData({
                              isShow: true,
                              syllabuse: syllabuse,
                              course: coursesObj[syllabuse.course_id],
                            })
                          )
                        }
                        className="block relative border hover:border-indigo-700 rounded-md overflow-hidden group"
                      >
                        <button
                          type="button"
                          className="group-hover:block hidden border border-indigo-700 absolute top-0 right-0 z-20 mt-2 mr-2 bg-white text-gray-600 h-6 w-6 rounded-full hover:opacity-75 hover:bg-white hover:text-blue-700 flex items-center justify-center"
                        >
                          <i className="text-xl material-icons">done</i>
                        </button>
                        <div className="mx-2 my-2 h-20">
                          <h2 className="truncate-2y text-sm leading-5 font-semibold">
                            {syllabuse.name}
                          </h2>
                          <h2 className="truncate-2y text-sm leading-5 text-gray-500 font-semibold">
                            {usersObj[syllabuse.user_id]?.name}
                          </h2>
                          <div className={`text-gray-500 text-xs truncate`}>
                            <p className="">
                              Created at:{" "}
                              {moment(syllabuse.created_at).fromNow()}
                            </p>
                            <p className="">
                              Updated at:{" "}
                              {moment(syllabuse.created_at).fromNow()}
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
                  {syllabusesSearch.length != 0 && (
                    <thead className="border-black border-b ">
                      <tr className="">
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1">ID</td>
                        <td className="px-2 py-1 ">Name</td>
                        <td className="px-2 py-1">Phone</td>
                        <td className="px-2 py-1"> Email</td>
                        <td className="px-2 py-1"> Class name</td>
                        <td className="px-2 py-1">Status</td>
                      </tr>
                    </thead>
                  )}
                  <tbody className="text-gray-600 border-gray-500 border-b overflow-hidden">
                    {syllabusesSearch.map((syllabus, key) => (
                      <tr
                        className="cursor-pointer"
                        key={key}
                        onClick={() => {
                          dispatch(
                            setFormData({
                              checkboxes: { types: syllabus.types },
                            })
                          );
                          dispatch(
                            setDetailData({ isShow: true, syllabus: syllabus })
                          );
                        }}
                      >
                        <td className="px-2 py-1 ">
                          <button
                            type="button"
                            className="overflow-hidden group border rounded-md bg-white text-gray-600 h-6 w-6 hover:border-indigo-500 relative"
                          >
                            <i className="group-hover:block hidden text-xl material-icons absolute absolute-x absolute-y">
                              done
                            </i>
                          </button>
                        </td>
                        <td className="px-2 py-1 ">
                          <p className="w-10 truncate">{syllabus.id}</p>
                        </td>
                        <td className="px-2 py-1 text-indigo-700 ">
                          <figure className="flex items-center">
                            <div className="w-10">
                              <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                <img
                                  alt=""
                                  src={syllabus.image}
                                  className="absolute h-full w-full object-cover"
                                />
                              </div>
                            </div>
                            <figcaption className="ml-2">
                              {syllabus.name}
                            </figcaption>
                          </figure>
                        </td>
                        <td className="px-2 py-1">
                          <p className="truncate w-24">5562383859866</p>
                        </td>
                        <td className="px-2 py-1">hoang-nl-1</td>
                        <td className="px-2 py-1">₫18</td>
                        <td className="px-2 py-1">Out of stock</td>
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
      <SyllabusesDetailPage />
      {renderMain()}
    </React.Fragment>
  );
};
export default SyllabusesPage;
