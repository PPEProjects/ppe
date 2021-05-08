import React, { useState, useEffect } from "react";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { releasesSelector, getReleases } from "../../slices/releases";
import { setDetailData } from "../../slices/details";
import Ajax from "../../components/Ajax";

import { InputIcon, Button } from "../../components/Form";
import { projectsSelector, getProjectsObj } from "../../slices/projects";
import { deleteReleases } from "../../slices/releases";
import ReleasesDetailPage from "./ReleasesDetailPage";
// import { sidebarSelector } from "../../slices/sidebar";
import { filterSelector } from "../../slices/filter";
// import { setSidebarData } from "../../slices/sidebar";
import Filter from "../../components/Filter";
import { Link, useLocation } from "react-router-dom";
// import Language from "../../components/Language";
import { setFormData, setFormSelects, formSelector } from "../../slices/form";
import Search from "../../components/Search";
const ReleasesPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { selects } = useSelector(formSelector);
  // const { url, opens } = useSelector(sidebarSelector);
  const { filterOpen } = useSelector(filterSelector);
  const { release, releases, status } = useSelector(releasesSelector);
  const { projectsObj } = useSelector(projectsSelector);
  const [mode, setMode] = useState(`grid`);
  const [type, setType] = useState(``);
  const [search, setSearch] = useState(``);
  const [releasesSearch, setUsersSearch] = useState(releases);
  useEffect(() => {
    setUsersSearch(Search(`name`, search, releases))
  }, [search, releases]);

  useEffect(() => {
    dispatch(getProjectsObj());
    dispatch(getReleases(filterOpen));
    // let url = window.location.href;

    // dispatch(setSidebarData({ url: url }));
  }, [dispatch, location.pathname, location.search, filterOpen]);

  const renderMain = () => {
    return (
      <aside className="w-full">
        <div className="grid grid-cols-12 gap-4 mx-6 ">
          <div className="col-span-12 flex items-center justify-between mt-6 ">
            <h1 className="text-xl font-bold">Releases</h1>
          </div>
          <Filter />
          <div className="col-span-9 ">
            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3">
              <div className="flex items-center justify-between mx-4">
                <div className="">
                  <b className="">{releases?.length}</b>
                  <p className="text-gray-600">{releases?.length ===0 || releases?.length === 1 ? "Release" : "Releases"}</p>
                </div>
                <div className="flex ">
                  <Link
                    to={`/ReleasesCreatePage`}
                    className="bg-indigo-700 text-white h-10 px-2 rounded hover:opacity-75 flex items-center justify-center ml-3"
                  >
                    <span className="mx-2">Add releases</span>
                  </Link>
                </div>
              </div>
              <div className="px-4 border-t mt-2 ">
                <InputIcon
                  placeholder="Search All releases"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="px-4 mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Button
                    type={`button`}
                    title={`${Object.keys(selects).length} Selected`}
                    onClick={() => {
                      dispatch(setFormSelects("all", releases));
                    }}
                    className={`bg-gray-300 text-gray-800`}
                  />
                  <Button
                    type={`button`}
                    title={`x ${Object.keys(selects).length} Select All`}
                    onClick={() => {
                      console.log("1");
                      dispatch(setFormSelects("all", releases));
                    }}
                    className={`bg-gray-300 hidden text-gray-800 `}
                  />

                  <Button
                    type={`button`}
                    disabled={Object.keys(selects).length === 0}
                    title={`Delete`}
                    className={`bg-gray-300 text-gray-800 mx-2`}
                    onClick={(e) => dispatch(deleteReleases())}
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
                {releasesSearch.length === 0 && status !== `loading` && (
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
                  {releasesSearch.map((release, key) => (
                    <div className="col-span-3" key={key}>
                      <Link className="block relative border hover:border-indigo-700 rounded-md overflow-hidden group">
                        <button
                          type="button"
                          onClick={() => dispatch(setFormSelects(release.id))}
                          className="group-hover:block hidden border border-indigo-700 absolute top-0 right-0 z-20 mt-2 mr-2 bg-white text-gray-600 h-6 w-6 rounded-full hover:opacity-75 hover:bg-white hover:text-blue-700 flex items-center justify-center"
                        >
                          {selects[release.id] && (
                            <i className="text-xl material-icons">done</i>
                          )}
                        </button>

                        <div
                          className="mx-2"
                          onClick={() =>
                            dispatch(
                              setDetailData({
                                isShow: true,
                                release: release,
                                project: projectsObj[release.project_id],
                              })
                            )
                          }
                        >
                          <h1 className="truncate-2y text-sm leading-5 font-semibold">
                            {release.name}
                          </h1>
                        </div>
                        <div
                          className="w-full pb-1x1 relative bg-gray-300"
                          onClick={() =>
                            dispatch(
                              setDetailData({
                                isShow: true,
                                release: release,
                                project: projectsObj[release.project_id],
                              })
                            )
                          }
                        >
                          <div
                            onClick={() =>
                              dispatch(
                                setDetailData({
                                  isShow: true,
                                  release: release,
                                  project: projectsObj[release.project_id],
                                })
                              )
                            }
                            className="absolute top-0 left-0 right-0 bottom-0 bg-black-30 z-10 flex items-center justify-center"
                          >
                            <h3 className="text-white font-black mx-2 truncate-2y">
                              {projectsObj[release?.project_id]?.name}
                            </h3>
                          </div>
                          <img
                            alt=""
                            src={projectsObj[release?.project_id]?.image}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                        <div
                          className="mx-2 my-2"
                          onClick={() =>
                            dispatch(
                              setDetailData({
                                isShow: true,
                                release: release,
                                project: projectsObj[release.project_id],
                              })
                            )
                          }
                        >
                          <h2 className="truncate-2y text-sm leading-5 font-semibold">
                            {release.contents[0].name}
                          </h2>
                          <div className={`text-gray-500 text-xs truncate`}>
                            <p className="">
                              Created at: {moment(release.created_at).fromNow()}
                            </p>
                            <p className="">
                              Updated at: {moment(release.created_at).fromNow()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              {status === `success` && mode === `table` && (
                <table className=" table-auto text-sm w-full">
                  {releasesSearch.length != 0 && (
                    <thead className="border-black border-b ">
                      <tr className="">
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1">ID</td>
                        <td className="px-2 py-1">Name</td>
                        <td className="px-2 py-1"> Status</td>
                      </tr>
                    </thead>
                  )}
                  <tbody className="text-gray-600 border-gray-500 border-b overflow-hidden">
                    {releasesSearch.map((release, key) => (
                      <tr className="cursor-pointer" key={key}>
                        <td className="px-2 py-1 ">
                          <button
                            type="button"
                            onClick={() => dispatch(setFormSelects(release.id))}
                            className="overflow-hidden group border rounded-md bg-white text-gray-600 h-6 w-6 hover:border-indigo-500 relative"
                          >
                            {selects[release.id] && (
                              <i className="group-hover:block text-xl material-icons absolute absolute-x absolute-y">
                                done
                              </i>
                            )}
                          </button>
                        </td>
                        <td
                          className="px-2 py-1 "
                          onClick={() => {
                            dispatch(
                              setFormData({
                                checkboxes: { types: release.types },
                              })
                            );
                            dispatch(
                              setDetailData({ isShow: true, release: release })
                            );
                          }}
                        >
                          <p className="w-10 truncate">{release.id}</p>
                        </td>
                        <td
                          className="px-2 py-1 "
                          onClick={() => {
                            dispatch(
                              setFormData({
                                checkboxes: { types: release.types },
                              })
                            );
                            dispatch(
                              setDetailData({ isShow: true, release: release })
                            );
                          }}
                        >
                          <p className=" truncate">
                            {release.contents[0].name}
                          </p>
                        </td>

                        <td
                          className="px-2 py-1"
                          onClick={() => {
                            dispatch(
                              setFormData({
                                checkboxes: { types: release.types },
                              })
                            );
                            dispatch(
                              setDetailData({ isShow: true, release: release })
                            );
                          }}
                        >
                          <p className="truncate w-24">{release.status}</p>
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
      <ReleasesDetailPage />
      {renderMain()}
    </React.Fragment>
  );
};
export default ReleasesPage;
