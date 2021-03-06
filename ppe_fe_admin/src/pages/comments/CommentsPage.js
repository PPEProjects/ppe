import React, { useState, useEffect } from "react";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  commentsSelector,
  getComments,
  deleteComments,
} from "../../slices/comments";
import { setDetailData } from "../../slices/details";
// import Ajax from "../../components/Ajax";
import { InputIcon, Button } from "../../components/Form";
import { postsSelector, getPostsObj } from "../../slices/posts";
import CommentsDetailPage from "./CommentsDetailPage";
// import { sidebarSelector } from "../../slices/sidebar";
import { filterSelector } from "../../slices/filter";
// import { setSidebarData } from "../../slices/sidebar";
import Filter from "../../components/Filter";
import { Link, useLocation } from "react-router-dom";
// import Language from "../../components/Language";
import { setFormData, formSelector, setFormSelects } from "../../slices/form";
import { usersSelector } from "../../slices/users";
import Search from "../../components/Search";
const CommentsPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  // const { url, opens } = useSelector(sidebarSelector);
  const { filterOpen } = useSelector(filterSelector);
  const { comment, comments, status } = useSelector(commentsSelector);
  const { postsObj } = useSelector(postsSelector);
  const { selects } = useSelector(formSelector);
  const { users } = useSelector(usersSelector);
  const [mode, setMode] = useState(`grid`);
  const [type, setType] = useState(``);
  const [search, setSearch] = useState(``);
  const [commentsSearch, setUsersSearch] = useState(comments);

  useEffect(() => {
    setUsersSearch(Search(`name`, search, comments));
  }, [search, comments]);

  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
    dispatch(getPostsObj());
    dispatch(getComments(filterOpen));
    // let url = window.location.href;

    // dispatch(setSidebarData({ url: url }));
  }, [dispatch, location.pathname, location.search, filterOpen]);

  const handleOnclick = (comment) => {
    dispatch(
      setDetailData({
        isShow: true,
        comment: comment,
        post: postsObj[comment.post_id],
      })
    );
  };

  const renderMain = () => {
    return (
      <aside className="w-full">
        <div className="grid grid-cols-12 gap-4 mx-6 ">
          <div className="col-span-12 flex items-center justify-between mt-6 ">
            <h1 className="text-xl font-bold">Comments</h1>
          </div>
          <Filter />

          <div className="col-span-9 ">
            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3">
              <div className="flex items-center justify-between mx-4">
                <div className="">
                  <b className="">{comments?.length}</b>
                  <p className="text-gray-600">
                    {comments?.length === 0 || comments?.length === 1
                      ? "Comment"
                      : "Comments"}
                  </p>
                </div>
                <div className="flex ">
                  <Link
                    to={`/CommentsCreatePage`}
                    className="bg-indigo-700 text-white h-10 px-2 rounded hover:opacity-75 flex items-center justify-center ml-3"
                  >
                    <span className="mx-2">Add comment</span>
                  </Link>
                </div>
              </div>
              <div className="px-4 border-t mt-2 ">
                <InputIcon
                  placeholder="Search All comments"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="px-4 mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Button
                    type={`button`}
                    title={`${Object.keys(selects).length} Selected`}
                    onClick={() => {
                      dispatch(setFormSelects("all", comments));
                    }}
                    className={`bg-gray-300 text-gray-800`}
                  />
                  <Button
                    type={`button`}
                    title={`x ${Object.keys(selects).length} Select All`}
                    onClick={() => {
                      console.log("1");
                      dispatch(setFormSelects("all", comments));
                    }}
                    className={`bg-gray-300 hidden text-gray-800 `}
                  />

                  <Button
                    type={`button`}
                    disabled={Object.keys(selects).length === 0}
                    title={`Delete`}
                    className={`bg-gray-300 text-gray-800 mx-2`}
                    onClick={(e) => dispatch(deleteComments())}
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
                {commentsSearch.length === 0 && status !== `loading` && (
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
                  {commentsSearch.map((comment, key) => (
                    <div className="col-span-3 cursor-pointer" key={key}>
                      <div className="block relative border hover:border-indigo-700 rounded-md overflow-hidden group">
                        <button
                          type="button"
                          onClick={() => dispatch(setFormSelects(comment.id))}
                          className="group-hover:block border border-indigo-700 absolute top-0 right-0 z-20 mt-2 mr-2 bg-white text-gray-600 h-6 w-6 rounded-full hover:opacity-75 hover:bg-white hover:text-blue-700 flex items-center justify-center"
                        >
                          {selects[comment.id] && (
                            <i className="text-xl material-icons">done</i>
                          )}
                        </button>

                        <div
                          className="mx-2"
                          onClick={(e) => handleOnclick(comment)}
                        >
                          <h1 className="truncate-2y text-sm leading-5 font-semibold">
                            {comment.name}
                          </h1>
                        </div>
                        <div
                          className="w-full pb-1x1 relative bg-gray-300"
                          onClick={(e) => handleOnclick(comment)}
                        >
                          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black-30 z-10 flex items-center justify-center">
                            <h3 className="text-white font-black mx-2 truncate-2y">
                              {postsObj[comment?.post_id]?.title ?? `-`}
                            </h3>
                          </div>
                          <img
                            alt=""
                            src={comment.image}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                        <div
                          className="mx-2 my-2"
                          onClick={(e) => handleOnclick(comment)}
                        >
                          <h2 className="truncate-2y text-sm leading-5 font-semibold">
                            {comment.content}
                          </h2>
                          <div className={`text-gray-500 text-xs truncate`}>
                            <p className="">
                              Created at: {moment(comment.created_at).fromNow()}
                            </p>
                            <p className="">
                              Updated at: {moment(comment.created_at).fromNow()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {status === `success` && mode === `table` && (
                <div className="overflow-auto">
                  <table className=" table-auto text-sm w-full">
                    {commentsSearch.length != 0 && (
                      <thead className="border-black border-b ">
                        <tr className="">
                          <td className="px-2 py-1"></td>
                          <td className="px-2 py-1">ID</td>
                          <td className="px-2 py-1 ">Post</td>
                          <td className="px-2 py-1">Content</td>
                          <td className="px-2 py-1"> Image</td>
                          <td className="px-2 py-1">User</td>
                          <td className="px-2 py-1"> created at</td>
                          <td className="px-2 py-1">Status</td>
                        </tr>
                      </thead>
                    )}
                    <tbody className="text-gray-600 border-gray-500 border-b overflow-hidden">
                      {commentsSearch.map((comment, key) => (
                        <tr className="cursor-pointer" key={key}>
                          <td className="px-2 py-1 ">
                            <button
                              type="button"
                              onClick={() =>
                                dispatch(setFormSelects(comment.id))
                              }
                              className="overflow-hidden group border rounded-md bg-white text-gray-600 h-6 w-6 hover:border-indigo-500 relative"
                            >
                              {selects[comment.id] && (
                                <i className="group-hover:block  text-xl material-icons absolute absolute-x absolute-y">
                                  done
                                </i>
                              )}
                            </button>
                          </td>
                          <td
                            className="px-2 py-1 "
                            onClick={(e) => handleOnclick(comment)}
                          >
                            <p className="w-8 truncate">{comment.id}</p>
                          </td>
                          <td
                            className="px-2 py-1 "
                            onClick={(e) => handleOnclick(comment)}
                          >
                            <p className="w-25 truncate">
                              {postsObj[comment?.post_id]?.title ??
                                comment.post_id}
                            </p>
                          </td>
                          <td
                            className="px-2 py-1 "
                            onClick={(e) => handleOnclick(comment)}
                          >
                            <p className="w-24 truncate">{comment.content}</p>
                          </td>
                          <td
                            className="px-2 py-1 text-indigo-700 "
                            onClick={(e) => handleOnclick(comment)}
                          >
                            <figure className="flex items-center">
                              <div className="w-10">
                                <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                  <img
                                    alt=""
                                    src={comment.image}
                                    className="absolute h-full w-full object-cover"
                                  />
                                </div>
                              </div>
                              <figcaption className="ml-2">
                                {comment.title}
                              </figcaption>
                            </figure>
                          </td>
                          <td
                            className="px-2 py-1 "
                            onClick={(e) => handleOnclick(comment)}
                          >
                            <p className="w-25 truncate">
                              {users[comment?.user_id]?.name ?? comment.user_id}
                            </p>
                          </td>
                          <td
                            className="px-2 py-1 "
                            onClick={(e) => handleOnclick(comment)}
                          >
                            <p className="w-25 truncate">
                              {comment.created_at}
                            </p>
                          </td>
                          <td
                            className="px-2 py-1 "
                            onClick={(e) => handleOnclick(comment)}
                          >
                            <p className="w-20 truncate">{comment.status}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </div>
      </aside>
    );
  };
  return (
    <React.Fragment>
      <CommentsDetailPage />
      {renderMain()}
    </React.Fragment>
  );
};
export default CommentsPage;
