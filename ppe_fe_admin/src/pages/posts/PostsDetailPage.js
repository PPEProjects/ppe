import React, { useState } from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { Button } from "../../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { detailsSelector, setDetailData } from "../../slices/details";
import { deletePost } from "../../slices/posts";
import PostsEditForm from "./PostsEditForm";
const PostsDetailPage = () => {
  const dispatch = useDispatch();
  const { isShow, mode, post } = useSelector(detailsSelector);

  const renderMain = () => {
    return (
      <React.Fragment>
        <section className="bg-black-60 fixed top-0 left-0 right-0 bottom-0 z-30">
          <div className="absolute absolute-x absolute-y w-full px-4">
            <section className="w-full max-w-3xl mx-auto px-4 py-2 bg-white rounded-lg overflow-hidden shadow-md ">
              <div className=" text-lg flex items-center justify-between ">
                <h1 className="font-semibold text-gray-700 truncate mr-8">
                  {post.title}
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
                    <a href="#">Detail</a>
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
                    onClick={() => dispatch(deletePost(post))}
                    type={`button`}
                    title={`Delete`}
                    className={`bg-gray-300 text-gray-800 ml-2`}
                  />
                </div>
              </div>
              {mode === `edit` && <PostsEditForm />}

              {mode !== `edit` && (
                <div className="grid grid-cols-12 gap-4 my-4 max-h-56 overflow-y-auto">
                  <div className="col-span-4">
                    <figure className="">
                      <div className="w-48 mx-auto">
                        <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                          <img
                            alt=""
                            src={post.image}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </figure>
                    <a
                      href={post.image}
                      className="text-sm text-blue-500 mt-2 hover:opacity-75 hover:underline block truncate-3y"
                    >
                      ImageURL: {post.image}
                    </a>
                  </div>
                  <div className="col-span-8">
                    {mode === `grid` && (
                      <section className="grid grid-cols-12 gap-4 ">
                        <div className="col-span-6">
                          <div>
                            <h2 className="font-medium ">Name</h2>
                            <p className="text-sm text-gray-700">
                              {post.title}
                            </p>
                          </div>
                          {/* <div className="mt-3">
                            <h2 className="font-medium">Email</h2>
                            <p className="text-sm text-gray-700">
                              {post.email}
                            </p>
                          </div> */}
                          <div className="mt-3">
                            <h2 className="font-medium  ">Url</h2>
                            <a
                              href={`${window.$home}/profile/${post.id}`}
                              className="text-sm text-blue-600 hover:opacity-75 hover:underline w-full block"
                            >
                              Profile: {window.$home}/profile/{post.id}
                            </a>
                          </div>

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
                                title={post.created_at}
                              >
                                {moment(post.created_at).fromNow()}
                              </p>
                            </div>
                            <div className="mt-3">
                              <h2 className="font-medium">Updated at</h2>
                              <p
                                className="text-sm text-gray-700"
                                title={post.updated_at}
                              >
                                {moment(post.updated_at).fromNow()}
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
                          {Object.entries(post).map(([key, item], i) => (
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

export default PostsDetailPage;
