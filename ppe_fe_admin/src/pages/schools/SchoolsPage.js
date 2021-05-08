import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { schoolsSelector, getSchools } from "../../slices/schools";
import { setDetailData } from "../../slices/details";
import { classesSelector, getClassesObj } from "../../slices/classes";
import { usersSelector, getUsersObj, getUsers } from "../../slices/users";
import Ajax from "../../components/Ajax";
import { InputIcon, Button } from "../../components/Form";
import SchoolsDetailPage from "./SchoolsDetailPage";
import { useLocation } from "react-router-dom";
// import { sidebarSelector, setSidebarData } from "../../slices/sidebar";
import { filterSelector } from "../../slices/filter";
import Filter from "../../components/Filter";
import { setFormData } from "../../slices/form";
import Language from "../../components/Language";
import Search from "../../components/Search";

const SchoolsPage = () => {
  const { classesObj } = useSelector(classesSelector);
  const { usersObj } = useSelector(usersSelector);
  const location = useLocation();
  const dispatch = useDispatch();
  // const { url, opens } = useSelector(sidebarSelector);
  const { filterOpen } = useSelector(filterSelector);
  const { school, schools, status } = useSelector(schoolsSelector);
  const [mode, setMode] = useState(`grid`);

  const [type, setType] = useState(``);
  const [search, setSearch] = useState(``);
  const [schoolsSearch, setUsersSearch] = useState(schools);
  useEffect(() => {
<<<<<<< HEAD
    const schoolsSearch = schools.filter((school) => {
      if (
        (school.name ?? ``).toLowerCase().includes((search ?? ``).toLowerCase())
      ) {
        return school;
      }
    });
    setUsersSearch(schoolsSearch);
=======
    setUsersSearch(Search(`name`, search, schools));
>>>>>>> nhofix
  }, [search, schools]);


  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
    dispatch(getClassesObj());
    dispatch(getSchools(filterOpen));
    // let url = window.location.href;

    // dispatch(setSidebarData({ url: url }));
  }, [dispatch, location.pathname, location.search, filterOpen]);

  const renderMain = () => {
    return (
      <aside className="w-full">
        <div className="grid grid-cols-12 gap-4 mx-6 ">
          <div className="col-span-12 flex items-center justify-between mt-6 ">
            <h1 className="text-xl font-bold">Schools</h1>
          </div>
          <Filter />

          <div className="col-span-9 ">
            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3">
              <div className="flex items-center justify-between mx-4">
                <div className="">
                  <b className="">{schools?.length}</b>
                  <p className="text-gray-600">{schools?.length ===0 || schools?.length === 1 ? "School" : "Schools"}</p>
                </div>
                <div className="flex ">
                  <Link
                    to={`/SchoolsCreatePage`}
                    className="bg-indigo-700 text-white h-10 px-2 rounded hover:opacity-75 flex items-center justify-center ml-3"
                  >
                    <span className="mx-2">Add school</span>
                  </Link>
                </div>
              </div>
              <div className="px-4 border-t mt-2 ">
                <InputIcon
                  placeholder="Search All schoolses"
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
                {schoolsSearch.length === 0 && status !== `loading` && (
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
                  {schoolsSearch.map((school, key) => (
                    <div className="col-span-3" key={key}>
                      <div
                        onClick={() => {
                          let checkboxes = {
                            leaders: school.leaders,
                          };
                          dispatch(setFormData({ checkboxes: checkboxes }));
                          dispatch(
                            setDetailData({ isShow: true, school: school })
                          );
                        }}
                        className="block relative border hover:border-indigo-700 rounded-md overflow-hidden group"
                      >
                        <button
                          type="button"
                          className="group-hover:block hidden border border-indigo-700 absolute top-0 right-0 z-20 mt-2 mr-2 bg-white text-gray-600 h-6 w-6 rounded-full hover:opacity-75 hover:bg-white hover:text-blue-700 flex items-center justify-center"
                        >
                          <i className="text-xl material-icons">done</i>
                        </button>
                        <div className="w-full pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                          <img
                            alt=""
                            src={school.image}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                        <div className="mx-2 my-2">
                          <h2 className="truncate-2y text-sm leading-5 font-semibold">
                            {school.name}
                          </h2>
                          {/* <h2 className="truncate-2y text-sm leading-5 text-gray-500 font-semibold">
                            {usersObj[schoolse.user_id]?.name}
                          </h2> */}
                          <div className={`text-gray-500 text-xs truncate`}>
                            <p className="">
                              Created at: {moment(school.created_at).fromNow()}
                            </p>
                            <p className="">
                              Updated at: {moment(school.created_at).fromNow()}
                            </p>
                            <p className="text-sm text-indigo-700 truncate">
                              Address: {school.infos.address}
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
                  {schoolsSearch.length != 0 && (
                    <thead className="border-black border-b ">
                      <tr className="">
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1">ID</td>
                        <td className="px-2 py-1 ">Name</td>
                        <td className="px-2 py-1">Address</td>
                        <td className="px-2 py-1"> Created at</td>
                        <td className="px-2 py-1">Status</td>
                      </tr>
                    </thead>
                  )}
                  <tbody className="text-gray-600 border-gray-500 border-b overflow-hidden">
                    {schoolsSearch.map((school, key) => (
                      <tr
                        className="cursor-pointer"
                        key={key}
                        onClick={() => {
                          dispatch(
                            setFormData({
                              checkboxes: { types: school.types },
                            })
                          );
                          dispatch(
                            setDetailData({ isShow: true, school: school })
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
                          <p className="w-10 truncate">{school.id}</p>
                        </td>
                        <td className="px-2 py-1 text-indigo-700 ">
                          <figure className="flex items-center">
                            <div className="w-10">
                              <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                <img
                                  alt=""
                                  src={school.image}
                                  className="absolute h-full w-full object-cover"
                                />
                              </div>
                            </div>
                            <figcaption className="ml-2">
                              {school.name}
                            </figcaption>
                          </figure>
                        </td>
                        <td className="px-2 py-1">
                          <p className="truncate w-24">
                            {school.infos.address}
                          </p>
                        </td>
                        <td className="px-2 py-1 ">
                          <p className="w-25 truncate">{school.created_at}</p>
                        </td>
                        <td className="px-2 py-1 ">
                          <p className="w-20 truncate">{school.status}</p>
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
      <SchoolsDetailPage />
      {renderMain()}
    </React.Fragment>
  );
};
export default SchoolsPage;
