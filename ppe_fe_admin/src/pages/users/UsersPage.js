import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector, getUsers } from "../../slices/users";
import { filterSelector } from "../../slices/filter";
import { setDetailData } from "../../slices/details";
import Ajax from "../../components/Ajax";
import { InputIcon, Button } from "../../components/Form";
import UserDetailPage from "./UserDetailPage";
import { sidebarSelector, setSidebarData } from "../../slices/sidebar";
import Filter from "../../components/Filter";
import { setFormData, formSelector, setFormSelects } from "../../slices/form";

const UsersPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { url, opens } = useSelector(sidebarSelector);
  const { filterOpen } = useSelector(filterSelector);
  const { selects } = useSelector(formSelector);

  const { users, status } = useSelector(usersSelector);
  const [mode, setMode] = useState(`grid`);
  const [type, setType] = useState(``);
  const [search, setSearch] = useState(``);
  const [usersSearch, setUsersSearch] = useState(users);
  useEffect(() => {
    const usersSearch = users.filter((user) => {
      if (
        (user.name ?? ``).toLowerCase().includes((search ?? ``).toLowerCase())
      ) {
        return user;
      }
    });
    setUsersSearch(usersSearch);
  }, [search, users]);

  const [learners, setLearners] = useState({});

  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
    dispatch(getUsers(filterOpen));
    let url = window.location.href;
    dispatch(setSidebarData({ url }));

    fetchData();
    async function fetchData() {
      let res = await Ajax.get(`/classes`, { learners: `learners` });
      setLearners(res.data?.learners);
    }
  }, [dispatch, location, filterOpen]);

  const renderMain = () => {

    return (
      <aside className="w-full">
        <div className="grid grid-cols-12 gap-4 mx-6 ">
          <div className="col-span-12 flex items-center justify-between mt-6 ">
            {/* {type === `` && <h1 className="text-xl font-bold">Users</h1>}
            {type === `Japanese learner` && (
              <h1 className="text-xl font-bold">Japanese learner</h1>
            )}
            {type === `IT project member` && (
              <h1 className="text-xl font-bold">IT project member</h1>
            )}
            {type === `Job hunter` && (
              <h1 className="text-xl font-bold">Job hunter</h1>
            )} */}

            <h1 className="text-xl font-bold">{type || "Users"}</h1>
          </div>
          <Filter type="user" />

          <div className="col-span-9 ">
            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3">
              <div className="flex items-center justify-between mx-4">
                <div className="">
                  <b className="">{users?.length}</b>
                  <p className="text-gray-600">{users.length ===0 || users.length === 1 ? "User" : "Users"}</p>
                </div>
                <div className="flex ">
                  <Link
                    to={`/UsersCreatePage?type=${type}`}
                    className="bg-indigo-700 text-white h-10 px-2 rounded hover:opacity-75 flex items-center justify-center ml-3"
                  >
                    <span className="mx-2">Add User</span>
                  </Link>
                </div>
              </div>
              <div className="px-4 border-t mt-2 ">
                <InputIcon
                  placeholder="Search All Users "
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="px-4 mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Button
                    type={`button`}
                    title={`${Object.keys(selects).length} Selected`}
                    onClick={() => {
                      dispatch(setFormSelects("all", users));
                      // dispatch(selectedAll({ checked: true }));
                    }}
                    className={`bg-gray-300 text-gray-800`}
                  />
                  <Button
                    type={`button`}
                    title={`x ${Object.keys(selects).length} Select All`}
                    onClick={
                      () => {
                        console.log("1");
                        dispatch(setFormSelects("all", users));
                      } /*{
                      // dispatch(selectedAll({ checked: true }));
                    }*/
                    }
                    className={`bg-gray-300 hidden text-gray-800 `}
                  />

                  <Button
                    type={`button`}
                    disabled={Object.keys(selects).length === 0}
                    title={`Delete`}
                    className={`bg-gray-300 text-gray-800 mx-2`}
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
                {usersSearch.length === 0 && status !== `loading` && (
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
                  {usersSearch.map((user, key) => (
                    <div
                      className="col-span-3 "
                      key={key}
                      onClick={() => {
                        dispatch(
                          setFormData({
                            checkboxes: { types: user.types },
                          })
                        );
                        dispatch(setDetailData({ isShow: true, user: user }));
                      }}
                    >
                      <Link className="block relative border hover:border-indigo-700 rounded-md overflow-hidden group">
                        <button
                          type="button"
                          className="group-hover:block hidden border border-indigo-700 absolute top-0 right-0 z-20 mt-2 mr-2 bg-white text-gray-600 h-6 w-6 rounded-full hover:opacity-75 hover:bg-white hover:text-blue-700 flex items-center justify-center"
                        >
                          <i className="text-xl material-icons">done</i>
                        </button>
                        <div className="w-full pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                          <img
                            alt=""
                            src={user.image}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                        <div className="mx-2 my-2">
                          <h1
                            className="truncate-2y text-sm leading-5 font-semibold"
                            onClick={() => {
                              dispatch(
                                setFormData({
                                  checkboxes: { types: user.types },
                                })
                              );
                              dispatch(
                                setDetailData({ isShow: true, user: user })
                              );
                            }}
                          >
                            {user.name !== null ? user.name : user?.infos_lang?.vi?.name}
                            
                            {/* {user.name} */}
                          </h1>

                          <div className={`text-gray-500 text-xs truncate`}>
                            <p className="">
                              Created at: {moment(user.created_at).fromNow()}
                            </p>
                            {moment(user.created_at).fromNow() ===
                              moment(user.updated_at).fromNow() && (
                              <h3 className="text-gray-500 text-xs truncate">
                                Not joined yet
                              </h3>
                            )}
                            {moment(user.created_at).fromNow() !==
                              moment(user.updated_at).fromNow() && (
                              <h3 className="text-gray-500 text-xs truncate">
                                Login at: {moment(user.updated_at).fromNow()}
                              </h3>
                            )}

                            <p className="text-sm text-indigo-700 truncate">
                              Roles: {Object.keys(user.types).join(", ")}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {status === `success` && mode === `table` && (
                <table className="table-auto text-sm w-full">
                  {usersSearch.length !== 0 && (
                    <thead className="border-black border-b">
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
                    {usersSearch.map((user) => (
                      <tr key={user.id}>
                        <td className="pl-4 pr-2 py-1 ">
                          <button
                            type="button"
                            onClick={() => dispatch(setFormSelects(user.id))}
                            className="overflow-hidden group border rounded-md bg-white text-gray-600 h-6 w-6 hover:border-indigo-500 relative"
                          >
                            {selects[user.id] && (
                              <i className="group-hover:block text-xl material-icons absolute absolute-x absolute-y">
                                done
                              </i>
                            )}
                          </button>
                        </td>
                        <td
                          className="px-2 py-1 cursor-pointer"
                          onClick={() => {
                            dispatch(
                              setFormData({
                                checkboxes: { types: user.types },
                              })
                            );
                            dispatch(
                              setDetailData({ isShow: true, user: user })
                            );
                          }}
                        >
                          <p className="w-10 truncate">{user.id}</p>
                        </td>
                        <td
                          className="px-2 py-1 text-indigo-700 cursor-pointer"
                          onClick={() => {
                            dispatch(
                              setFormData({
                                checkboxes: { types: user.types },
                              })
                            );
                            dispatch(
                              setDetailData({ isShow: true, user: user })
                            );
                          }}
                        >
                          <figure className="flex items-center">
                            <div className="w-10">
                              <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                <img
                                  alt=""
                                  src={user.image}
                                  className="absolute h-full w-full object-cover"
                                />
                              </div>
                            </div>
                            <figcaption className="ml-2 truncate w-24 cursor-pointer">
                              {user.name !== null
                                ? user.name
                                : user?.infos_lang?.vi?.name}
                            </figcaption>
                          </figure>
                        </td>
                        <td className="px-2 py-1">
                          <p className="truncate w-24">{user?.infos?.phone}</p>
                        </td>
                        <td className="px-2 py-1">
                          <p
                            className="truncate w-24 cursor-pointer"
                            onClick={() => {
                              dispatch(
                                setFormData({
                                  checkboxes: { types: user.types },
                                })
                              );
                              dispatch(
                                setDetailData({ isShow: true, user: user })
                              );
                            }}
                          >
                            {user.email}
                          </p>
                        </td>
                        {/* <td className="py-1 truncate w-24">{user.email}</td> */}
                        <td className="px-2 py-1">{learners[user.id]?.name}</td>
                        <td className="px-2 py-1">
                          {learners[user.id] && (
                            <span className={`text-indigo-700`}>Confirmed</span>
                          )}
                          {!learners[user.id] && (
                            <span className={`text-red-700`}>Not yet</span>
                          )}
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
      <UserDetailPage />
      {renderMain()}
    </React.Fragment>
  );
};

export default UsersPage;
