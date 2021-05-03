import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { Button } from "../../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { detailsSelector, setDetailData } from "../../slices/details";
import SchoolsEditForm from "./SchoolsEditForm";
import { deleteCourse } from "../../slices/courses";
import Alert from "../../components/Alert";
import { Link, useHistory } from "react-router-dom";
import Ajax from "../../components/Ajax";
import { deleteSchool } from "../../slices/schools";

const SchoolsDetailPage = () => {
  const dispatch = useDispatch();
  const { isShow, mode, school } = useSelector(detailsSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const history = useHistory();
  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
  }, []);
  const renderMain = () => {
    return (
      <React.Fragment>
        <section className="bg-black-60 fixed top-0 left-0 right-0 bottom-0 z-30">
          <div className="absolute absolute-x absolute-y w-full px-4">
            <section className="w-full max-w-3xl mx-auto px-4 py-2 bg-white rounded-lg overflow-hidden shadow-md ">
              <div className=" text-lg flex items-center justify-between ">
                <h1 className="font-semibold text-gray-700 truncate mr-8">
                  {school.name}
                </h1>
                <Button
                  onClick={() => dispatch(setDetailData({ isShow: false }))}
                  className={` -mr-2 block bg-white text-gray-900 h-10 w-10 rounded-lg hover:opacity-75 hover:bg-gray-300 flex items-center justify-center`}
                  type={`button`}
                  icon={`close`}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <ul className="flex text-sm text-gray-700 font-semibold">
                  <li className="text-blue-500 px-3 pb-1 border-b-4 border-blue-600">
                    <a
                      href="#"
                      onClick={(e) => dispatch(setDetailData({ mode: `grid` }))}
                    >
                      Detail
                    </a>
                  </li>
                </ul>

                <div className="flex">
                  <Button
                    onClick={() => dispatch(setDetailData({ mode: `edit` }))}
                    type={`button`}
                    title={`Edit`}
                    className={`bg-gray-300 text-gray-800 ml-2`}
                  />

                  <div className="flex justify-between ml-2 ">
                    <button
                      onClick={() => dispatch(setDetailData({ mode: `grid` }))}
                      type="button"
                      className={`
                    ${mode === `grid` ? `bg-gray-400` : `bg-gray-300`} 
                    text-gray-900 h-10 w-10 rounded-l-md hover:opacity-75 flex items-center justify-center`}
                    >
                      <i className="material-icons">widgets</i>
                    </button>
                    <button
                      onClick={() => dispatch(setDetailData({ mode: `table` }))}
                      type="button"
                      className={`
                    ${mode === `table` ? `bg-gray-400` : `bg-gray-300`} 
                    text-gray-900 h-10 w-10 rounded-r-md hover:opacity-75 flex items-center justify-center border-l-2 border-white`}
                    >
                      <i className="material-icons">notes</i>
                    </button>
                  </div>
                  <Button
                    onClick={() => dispatch(deleteSchool(school))}
                    type={`button`}
                    title={`Delete`}
                    className={`bg-gray-300 text-gray-800 ml-2`}
                  />
                </div>
              </div>
              {mode === `edit` && <SchoolsEditForm />}

              {mode !== `edit` && (
                <div className="grid grid-cols-12 gap-4 my-4 max-h-56 overflow-y-auto">
                  <div className="col-span-4">
                    <figure className="">
                      <div className="w-48 mx-auto">
                        <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                          <img
                            alt=""
                            src={school.image}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </figure>
                    <a
                      href={school.image}
                      className="text-sm text-blue-500 mt-2 hover:opacity-75 hover:underline block truncate-3y"
                    >
                      ImageURL: {school.image}
                    </a>
                  </div>
                  <div className="col-span-8">
                    {mode === `grid` && (
                      <section className="grid grid-cols-12 gap-4 ">
                        <div className="col-span-6">
                          <div>
                            <h2 className="font-medium truncate w-36">Name</h2>
                            <p className="text-sm text-gray-700">
                              {school.name}
                            </p>
                          </div>
                          <div className="mt-3">
                            <h2 className="font-medium">Address</h2>
                            <p className="text-sm text-gray-700 truncate-3y ">
                              {school.infos.address}
                            </p>
                          </div>
                          <a
                            href={`${window.$api}/schools?csv_download=csv_download&id=${school?.id}`}
                            type="button"
                            className="bg-indigo-700 text-white h-8 w-32 truncate rounded-lg hover:opacity-75 flex items-center justify-center mt-3"
                          >
                            <i className="material-icons">save_alt</i>
                            <span className="ml-2 w-20 truncate">
                              list of class
                            </span>
                          </a>
                          <button
                            type="button"
                            onClick={() =>
                              dispatch(setDetailData({ mode: `table` }))
                            }
                            className="bg-gray-200 text-sm text-gray-900 mt-3 h-8 w-32 rounded-lg hover:bg-gray-300 my-1"
                          >
                            <span className="">View more fields</span>
                          </button>
                        </div>
                        <div className="col-span-6">
                          <div className="w-full">
                            <div>
                              <h2 className="font-medium">Created at</h2>
                              <p
                                className="text-sm text-gray-700"
                                title={school.created_at}
                              >
                                {moment(school.created_at).fromNow()}
                              </p>
                            </div>
                            <div className="mt-3">
                              <h2 className="font-medium">Updated at</h2>
                              <p
                                className="text-sm text-gray-700"
                                title={school.updated_at}
                              >
                                {moment(school.updated_at).fromNow()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}
                    {mode === `table` && (
                      <table className="table-auto text-sm border-gray-400 border">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700 font-bold border-gray-400 border shadow-sm">
                            <th className="py-2 text-left px-2 w-40">
                              property
                            </th>
                            <th className="py-2 border-l border-gray-400 text-left px-2">
                              value
                            </th>
                          </tr>
                        </thead>
                        <tbody className="border-gray-400 border">
                          {Object.entries(school).map(([key, item], i) => (
                            <tr className="hover:bg-gray-300" key={i}>
                              <td className="px-2 py-2">{key}</td>
                              <td className="px-2 py-2 border-l border-gray-400">
                                {JSON.stringify(item ?? `-`).replace(
                                  /^"|"$/g,
                                  ""
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
              {mode !== `edit` && (
                <div className="flex justify-end mb-2">
                  <Button
                    type={`button`}
                    title={`Close`}
                    onClick={() => dispatch(setDetailData({ isShow: false }))}
                  />
                </div>
              )}
            </section>
          </div>
        </section>
      </React.Fragment>
    );
  };

  return <React.Fragment>{isShow ? renderMain() : ``}</React.Fragment>;
};

export default SchoolsDetailPage;
