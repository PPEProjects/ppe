import React, { useState, useEffect } from "react";

import moment from "moment";
import Ajax from "../../components/Ajax";
import { useDispatch, useSelector } from "react-redux";
import { setDetailData } from "../../slices/details";
import { InputIcon, Button } from "../../components/Form";
import CompaniesDetailPage from "./CompaniesDetailPage";
import { companiesSelector, getCompanies } from "../../slices/companies";
import {sidebarSelector} from "../../slices/sidebar";
import { filterSelector } from "../../slices/filter";
import { setSidebarData} from "../../slices/sidebar";
import Filter from "../../components/Filter";
import { Link,useLocation } from "react-router-dom";
import Language from "../../components/Language";
const CompaniesPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {url, opens} = useSelector(sidebarSelector);
  const {filterOpen} = useSelector(filterSelector);
  const { company, companies, status } = useSelector(companiesSelector);
  const [mode, setMode] = useState(`grid`);
  const [type, setType] = useState(``);

  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
    dispatch(getCompanies(filterOpen));
    let url = window.location.href;
  
    dispatch(setSidebarData({url: url}))
 
}, [dispatch, location, filterOpen]);

  const renderMain = () => {
    return (
      <aside className="w-full">
        <div className="grid grid-cols-12 gap-4 mx-6 ">
          <div className="col-span-12 flex items-center justify-between mt-6 ">
            <h1 className="text-xl font-bold">Companies</h1>
            <Language/>
          </div>
          <Filter/>
         
          <div className="col-span-9 ">
            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3">
              <div className="flex items-center justify-between mx-4">
                <div className="">
                  <b className="">{companies?.length}</b>
                  <p className="text-gray-600">companies</p>
                </div>
                <div className="flex ">
                  <Link
                    to={`/CompaniesCreatePage`}
                    className="bg-indigo-700 text-white h-10 px-2 rounded rounded-r-none hover:opacity-75 flex items-center justify-center ml-3"
                  >
                    <span className="mx-2">Add companies</span>
                  </Link>
                  <button
                    type="button"
                    className="bg-indigo-700 text-white h-10 px-2 rounded rounded-l-none hover:opacity-75 flex items-center justify-center border-l-2 border-white "
                  >
                    <i className="material-icons">arrow_drop_down</i>
                  </button>
                </div>
              </div>
              <div className="px-4 border-t mt-2 ">
                <InputIcon placeholder="Search All companies" />
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

                  <Button
                    type={`button`}
                    title={`Banned`}
                    className={`bg-gray-300 text-gray-800 ml-2`}
                  />
                </div>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setMode(`grid`)}
                    className="bg-gray-200 text-gray-800 h-10 w-10 rounded rounded-r-none hover:opacity-75 flex items-center justify-center"
                  >
                    <i className="material-icons">widgets</i>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode(`table`)}
                    className="bg-gray-200 text-gray-800 h-10 w-10 rounded rounded-l-none hover:opacity-75 flex items-center justify-center border-l-2 border-white"
                  >
                    <i className="material-icons">menu</i>
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3 mt-4 ">
            <div>
                  { companies.length === 0 && status !== `loading` && 
                    <div>
                      <h2 className="text-2xl text-center	font-light">Not data found</h2>
                    </div>
                  }
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
                  {companies.map((company, key) => (
                    <div className="col-span-3" key={key}>
                      <Link
                        onClick={() =>
                          dispatch(
                            setDetailData({ isShow: true, company: company })
                          )
                        }
                        className="block relative border hover:border-indigo-700 rounded-md overflow-hidden group"
                      >
                       
                         { Object.keys(company.more.ranking ?? {}).length !==0 && 
                         
                         <span className="absolute left-0 top-0 z-10 mt-2 ml-2 text-xs rounded-sm px-1 bg-black-50 text-white h-4 flex items-center">
                             {company.language}  / {company.more.ranking}
                           </span>
                       
                         }
                             { Object.keys(company.more.ranking ?? {}).length ===0 && 
                     
                          <span className="absolute left-0 top-0 z-10 mt-2 ml-2 text-xs rounded-sm px-1 bg-black-50 text-white h-4 flex items-center">
                              {company.language}
                            </span>
                        
                          }
    
                        <button
                          type="button"
                          className="group-hover:block hidden border border-indigo-700 absolute top-0 right-0 z-20 mt-2 mr-2 bg-white text-gray-600 h-6 w-6 rounded-full hover:opacity-75 hover:bg-white hover:text-blue-700 flex items-center justify-center"
                        >
                          <i className="text-xl material-icons">done</i>
                        </button>
                        <div className="w-full pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                          <img
                            alt=""
                            src={company.image}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                        <div className="mx-2 my-2">
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
                      </Link>
                    
                    </div>
                  ))}
                </div>
              )}
              {status === `success` && mode === `table` && (
                <table className=" table-auto text-sm w-full">
                  {companies.length!=0 &&
                  <thead className="border-black border-b ">
                    <tr className="">
                      <td className="px-2 py-1"></td>
                      <td className="px-2 py-1">ID</td>
                      <td className="px-2 py-1 ">Name</td>
                      <td className="px-2 py-1">Item Group ID</td>
                      <td className="px-2 py-1">Brand</td>
                      <td className="px-2 py-1">Price</td>
                      <td className="px-2 py-1">Stock availability</td>
                    </tr>
                  </thead>
                  }
                  <tbody className="text-gray-600 border-gray-500 border-b overflow-hidden">
                    {companies.map((company, key) => (
                      <tr>
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
                          <p className="w-10 truncate">{company.id}</p>
                        </td>
                        <td className="px-2 py-1 text-indigo-700 ">
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
                            <figcaption className="ml-2">
                              {company.name}
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
      <CompaniesDetailPage />
      {renderMain()}
    </React.Fragment>
  );
};
export default CompaniesPage;
