import React, { useState, useEffect } from "react";

import moment from "moment";
import Ajax from "../../components/Ajax";
import { useDispatch, useSelector } from "react-redux";
import { setDetailData } from "../../slices/details";
import { InputIcon, Button } from "../../components/Form";
import CompaniesDetailPage from "./CompaniesDetailPage";
import {
  companiesSelector,
  getCompanies,
  deleteCompanys,
} from "../../slices/companies";
// import { sidebarSelector } from "../../slices/sidebar";
import { filterSelector } from "../../slices/filter";
// import { setSidebarData } from "../../slices/sidebar";
import Filter from "../../components/Filter";
import { Link, useLocation } from "react-router-dom";

import Language from "../../components/Language";
import { setFormData, setFormSelects, formSelector } from "../../slices/form";
import Search from "../../components/Search";
const CompaniesPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  // const { url, opens } = useSelector(sidebarSelector);
  const { filterOpen } = useSelector(filterSelector);
  const { company, companies, status } = useSelector(companiesSelector);
  const [mode, setMode] = useState(`grid`);
  const [type, setType] = useState(``);
  const { selects } = useSelector(formSelector);
  const [search, setSearch] = useState(``);
  const [companiesSearch, setUsersSearch] = useState(companies);
  useEffect(() => {
    setUsersSearch(Search(`name`, search, companies));
  }, [search, companies]);

  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
    dispatch(getCompanies(filterOpen));
    // let url = window.location.href;

    // dispatch(setSidebarData({ url: url }));
  }, [dispatch, location.pathname, location.search, filterOpen]);

  const handleOnclick = (company) => {
    let checkboxes = {
      syllabus_ids: company.syllabus_ids,
      teachers: company.teachers,
    };
    dispatch(setFormData({ checkboxes: checkboxes }));
    dispatch(setDetailData({ isShow: true, company: company }));
  };

  const renderMain = () => {
    return (
      <aside className="w-full">
        <div className="grid grid-cols-12 gap-4 mx-6 ">
          <div className="col-span-12 flex items-center justify-between mt-6 ">
            <h1 className="text-xl font-bold">Companies</h1>
            <Language />
          </div>
          <Filter />

          <div className="col-span-9 ">
            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3">
              <div className="flex items-center justify-between mx-4">
                <div className="">
                  <b className="">{companies?.length}</b>
                  <p className="text-gray-600">
                    {companies?.length === 0 || companies?.length === 1
                      ? "Company"
                      : "Companies"}
                  </p>
                </div>
                <div className="flex ">
                  <Link
                    to={`/CompaniesCreatePage`}
                    className="bg-indigo-700 text-white h-10 px-2 rounded hover:opacity-75 flex items-center justify-center ml-3"
                  >
                    <span className="mx-2">Add companies</span>
                  </Link>
                </div>
              </div>
              <div className="px-4 border-t mt-2 ">
                <InputIcon
                  placeholder="Search All companies"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="px-4 mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Button
                    type={`button`}
                    title={`${Object.keys(selects).length} Selected`}
                    onClick={() => {
                      dispatch(setFormSelects("all", companies));
                    }}
                    className={`bg-gray-300 text-gray-800`}
                  />
                  <Button
                    type={`button`}
                    title={`x ${Object.keys(selects).length} Select All`}
                    onClick={() => {
                      console.log("1");
                      dispatch(setFormSelects("all", companies));
                    }}
                    className={`bg-gray-300 hidden text-gray-800 `}
                  />

                  <Button
                    type={`button`}
                    disabled={Object.keys(selects).length === 0}
                    title={`Delete`}
                    className={`bg-gray-300 text-gray-800 mx-2`}
                    onClick={(e) => dispatch(deleteCompanys())}
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
                {companiesSearch.length === 0 && status !== `loading` && (
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
                  {companiesSearch.map((company, key) => (
                    <div className="col-span-3" key={key}>
                      <div className="block relative border hover:border-indigo-700 rounded-md overflow-hidden group">
                        {Object.keys(company.more.ranking ?? {}).length !==
                          0 && (
                          <span className="absolute left-0 top-0 z-10 mt-2 ml-2 text-xs rounded-sm px-1 bg-black-50 text-white h-4 flex items-center">
                            {company.language} / {company.more.ranking}
                          </span>
                        )}
                        {Object.keys(company.more.ranking ?? {}).length ===
                          0 && (
                          <span className="absolute left-0 top-0 z-10 mt-2 ml-2 text-xs rounded-sm px-1 bg-black-50 text-white h-4 flex items-center">
                            {company.language}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => dispatch(setFormSelects(company.id))}
                          className="group-hover:block border border-indigo-700 absolute top-0 right-0 z-20 mt-2 mr-2 bg-white text-gray-600 h-6 w-6 rounded-full hover:opacity-75 hover:bg-white hover:text-blue-700 flex items-center justify-center"
                        >
                          {selects[company.id] && (
                            <i className="text-xl material-icons">done</i>
                          )}
                        </button>
                        <div
                          onClick={(e) => handleOnclick(company)}
                          className="w-full pb-1x1 relative rounded-sm overflow-hidden bg-gray-300"
                        >
                          <img
                            alt=""
                            src={company.image}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                        <div
                          className="mx-2 my-2"
                          onClick={(e) => handleOnclick(company)}
                        >
                          <h1 className="truncate-2y text-sm leading-5 font-semibold">
                            {company.name}
                          </h1>
                          <div className={`text-gray-500 text-xs truncate`}>
                            <p className="">
                              Created at: {moment(company.created_at).fromNow()}
                            </p>
                            <p className="">
                              Updated at: {moment(company.created_at).fromNow()}
                            </p>
                            <p className="text-sm text-indigo-700">
                              Type: {company.type}
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
                  {companiesSearch.length != 0 && (
                    <thead className="border-black border-b ">
                      <tr className="">
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1">ID</td>
                        <td className="px-2 py-1 ">Name</td>
                        <td className="px-2 py-1">Member</td>
                        <td className="px-2 py-1"> Address</td>
                      </tr>
                    </thead>
                  )}
                  <tbody className="text-gray-600 border-gray-500 border-b overflow-hidden">
                    {companiesSearch.map((company, key) => (
                      <tr className="cursor-pointer" key={key}>
                        <td className="px-2 py-1 ">
                          <button
                            type="button"
                            onClick={() => dispatch(setFormSelects(company.id))}
                            className="overflow-hidden group border rounded-md bg-white text-gray-600 h-6 w-6 hover:border-indigo-500 relative"
                          >
                            {selects[company.id] && (
                              <i className="group-hover:block text-xl material-icons absolute absolute-x absolute-y">
                                done
                              </i>
                            )}
                          </button>
                        </td>
                        <td
                          className="px-2 py-1 w-10 truncate cursor-pointer"
                          onClick={(e) => handleOnclick(company)}
                        >
                          {company.id}
                        </td>
                        <td
                          className="px-2 py-1 text-indigo-700 cursor-pointer"
                          onClick={(e) => handleOnclick(company)}
                        >
                          <figure className="flex items-center">
                            <div className="w-10">
                              <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                <img
                                  alt=""
                                  src={company.image}
                                  className="absolute h-full w-full object-cover"
                                />
                              </div>
                            </div>
                            <figcaption
                              className="ml-2 cursor-pointer"
                              onClick={(e) => handleOnclick(company)}
                            >
                              {company.name}
                            </figcaption>
                          </figure>
                        </td>
                        <td
                          className="px-2 py-1 truncate w-24 cursor-pointer"
                          onClick={(e) => handleOnclick(company)}
                        >
                          {Object.keys(company.more.members).length}
                        </td>
                        <td
                          className="px-2 py-1 cursor-pointer"
                          onClick={(e) => handleOnclick(company)}
                        >
                          {company.more.address}
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
      <CompaniesDetailPage />
      {renderMain()}
    </React.Fragment>
  );
};
export default CompaniesPage;
