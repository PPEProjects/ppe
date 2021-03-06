import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Filter from "../../components/Filter";
import { Button, InputIcon } from "../../components/Form";
import Language from "../../components/Language";
import { setDetailData } from "../../slices/details";
import { filterSelector } from "../../slices/filter";
import { setFormData, setFormSelects, formSelector } from "../../slices/form";
import { getPosts, postsSelector, deletePosts } from "../../slices/posts";
import { setSidebarData, sidebarSelector } from "../../slices/sidebar";
import { usersSelector } from "../../slices/users";
import PostsDetailPage from "./PostsDetailPage";
import Search from "../../components/Search";

const PostsPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { selects } = useSelector(formSelector);
  const { url, opens } = useSelector(sidebarSelector);
  const { filterOpen } = useSelector(filterSelector);
  const { post, posts, status } = useSelector(postsSelector);
  const [mode, setMode] = useState(`grid`);
  const [type, setType] = useState(``);
  const { users } = useSelector(usersSelector);
  const [search, setSearch] = useState(``);
  const [postsSearch, setUsersSearch] = useState(posts);

  useEffect(() => {
    setUsersSearch(Search(`title`, search, posts));
  }, [search, posts]);

  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
    dispatch(getPosts(filterOpen));
    let url = window.location.href;

    dispatch(setSidebarData({ url: url }));
  }, [dispatch, location, filterOpen]);

  // const [text, setText] = useState("Select All ");

  const handleOnclick = (post) => {
    dispatch(setDetailData({ isShow: true, post: post }));
    try {
      dispatch(setFormData({ editorData: post.descriptions }));
    } catch (e) {}
  };

  const renderMain = () => {
    return (
      <aside className="w-full">
        <div className="grid grid-cols-12 gap-4 mx-6 ">
          <div className="col-span-12 flex items-center justify-between mt-6 ">
            <h1 className="text-xl font-bold">Posts</h1>
            <Language />
          </div>
          <Filter />

          <div className="col-span-9 ">
            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3">
              <div className="flex items-center justify-between mx-4">
                <div className="">
                  <b className="">{posts?.length}</b>
                  <p className="text-gray-600">posts</p>
                </div>
                <div className="flex ">
                  <Link
                    to={`/PostsCreatePage`}
                    className="bg-indigo-700 text-white h-10 px-2 rounded hover:opacity-75 flex items-center justify-center ml-3"
                  >
                    <span className="mx-2">Add post</span>
                  </Link>
                </div>
              </div>
              <div className="px-4 border-t mt-2 ">
                <InputIcon
                  placeholder="Search All posts"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="px-4 mt-3 flex items-center justify-between">
                <div className="flex items-center">
                  <Button
                    type={`button`}
                    title={`${Object.keys(selects).length} Selected`}
                    onClick={() => {
                      dispatch(setFormSelects("all", posts));
                    }}
                    className={`bg-gray-300 text-gray-800`}
                  />
                  <Button
                    type={`button`}
                    title={`x ${Object.keys(selects).length} Select All`}
                    onClick={() => {
                      console.log("1");
                      dispatch(setFormSelects("all", posts));
                    }}
                    className={`bg-gray-300 hidden text-gray-800 `}
                  />

                  <Button
                    type={`button`}
                    disabled={Object.keys(selects).length === 0}
                    title={`Delete`}
                    className={`bg-gray-300 text-gray-800 mx-2`}
                    onClick={(e) => dispatch(deletePosts())}
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
                {postsSearch.length === 0 && status !== `loading` && (
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
                  {postsSearch.map((post, key) => (
                    <div className="col-span-3 cursor-pointer" key={key}>
                      <div className="block relative border hover:border-indigo-700 rounded-md overflow-hidden group">
                        <span className="absolute left-0 top-0 z-10 mt-2 ml-2 text-xs rounded-sm px-1 bg-black-50 text-white h-4 flex items-center">
                          {post.language}
                        </span>
                        <button
                          type="button"
                          onClick={() => dispatch(setFormSelects(post.id))}
                          className="group-hover:block border border-indigo-700 absolute top-0 right-0 z-20 mt-2 mr-2 bg-white text-gray-600 h-6 w-6 rounded-full hover:opacity-75 hover:bg-white hover:text-blue-700 flex items-center justify-center"
                        >
                          {selects[post.id] && (
                            <i className="text-xl material-icons">done</i>
                          )}
                        </button>
                        <div
                          onClick={(e) => handleOnclick(post)}
                          className="w-full pb-1x1 relative rounded-sm overflow-hidden bg-gray-300"
                        >
                          <img
                            alt=""
                            src={post.image}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                        <div
                          className="mx-2 my-2"
                          onClick={(e) => handleOnclick(post)}
                        >
                          <h1 className="truncate-2y text-sm leading-5 font-semibold">
                            {post.title}
                          </h1>
                          <div className={`text-gray-500 text-xs truncate`}>
                            <p className="">
                              Created at: {moment(post.created_at).fromNow()}
                            </p>
                            <p className="">
                              Updated at: {moment(post.created_at).fromNow()}
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
                    {postsSearch.length != 0 && (
                      <thead className="border-black border-b ">
                        <tr className="">
                          <td className="px-2 py-1"></td>
                          <td className="px-2 py-1">ID</td>
                          <td className="px-2 py-1 ">Title</td>
                          <td className="px-2 py-1">Description</td>
                          <td className="px-2 py-1">User</td>
                          <td className="px-2 py-1">Created at</td>
                          <td className="px-2 py-1">Status</td>
                        </tr>
                      </thead>
                    )}
                    <tbody className="text-gray-600 border-gray-500 border-b overflow-hidden">
                      {postsSearch.map((post, key) => (
                        <tr className="cursor-pointer" key={key}>
                          <td className="px-2 py-1 ">
                            <button
                              type="button"
                              onClick={() => dispatch(setFormSelects(post.id))}
                              className="overflow-hidden group border rounded-md bg-white text-gray-600 h-6 w-6 hover:border-indigo-500 relative"
                            >
                              {selects[post.id] && (
                                <i className="group-hover:block  text-xl material-icons absolute absolute-x absolute-y">
                                  done
                                </i>
                              )}
                            </button>
                          </td>
                          <td
                            className="px-2 py-1 "
                            onClick={(e) => handleOnclick(post)}
                          >
                            <p className="w-10 truncate">{post.id}</p>
                          </td>
                          <td
                            className="px-2 py-1 text-indigo-700 "
                            onClick={(e) => handleOnclick(post)}
                          >
                            <figure className="flex items-center">
                              <div className="w-10">
                                <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                  <img
                                    alt=""
                                    src={post.image}
                                    className="absolute h-full w-full object-cover"
                                  />
                                </div>
                              </div>
                              <figcaption className="ml-2 truncate w-25">
                                {post.title}
                              </figcaption>
                            </figure>
                          </td>
                          <td
                            className="px-2 py-1 "
                            onClick={(e) => handleOnclick(post)}
                          >
                            <p className="w-20 truncate">{post.description}</p>
                          </td>
                          <td
                            className="px-2 py-1 "
                            onClick={(e) => handleOnclick(post)}
                          >
                            <p className="w-25 truncate">
                              {users[post?.user_id]?.name ?? post.user_id}
                            </p>
                          </td>
                          <td
                            className="px-2 py-1 "
                            onClick={(e) => handleOnclick(post)}
                          >
                            <p className="w-25 truncate">{post.created_at}</p>
                          </td>
                          <td
                            className="px-2 py-1 "
                            onClick={(e) => handleOnclick(post)}
                          >
                            <p className="w-20 truncate">{post.status}</p>
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
      <PostsDetailPage />
      {renderMain()}
    </React.Fragment>
  );
};
export default PostsPage;
