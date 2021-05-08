import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../slices/users";
import { sidebarSelector, setSidebarData } from "../slices/sidebar";
import { Link, useLocation } from "react-router-dom";
import { getPosts } from "../slices/posts";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);
  const { url, opens } = useSelector(sidebarSelector);

  useEffect(() => {
    let url = window.location.href;
    let tab = getOpenInit(url);
    dispatch(setSidebarData({ url: url }));
    if (url.match(/type/g)) {
      handleOpenClose(null, tab);
    }
  }, [location]);

  const getOpenInit = (url) => {
    if (
      url.match(/\/Users[^\?]*\?type=Office/gim) ||
      url.match(/\/Schools/gim) ||
      url.match(/\/Classes/gim)
    )
      return `Office`;
    if (url.match(/\/Users$/gim)) return `Users`;
    if (
      url.match(/\/Users[^\?]*\?type=Japanese/gim) ||
      url.match(/\/Courses/gim) ||
      url.match(/\/Syllabuses/gim)
    )
      return `Japanese`;
    if (
      url.match(/\/Users[^\?]*\?type=IT/gim) ||
      url.match(/\/Projects/gim) ||
      url.match(/\/Tasks/gim) ||
      url.match(/\/Releases/gim)
    )
      return `Projects`;
    if (
      url.match(/\/Users[^\?]*\?type=Job/gim) ||
      url.match(/\/Companies/gim) ||
      url.match(/\/Jobs/gim) ||
      url.match(/\/Reviews/gim)
    )
      return `Candidates`;
    if (
      url.match(/\/Users[^\?]*\?type=About/gim) ||
      url.match(/\/Posts/gim) ||
      url.match(/\/Comments/gim)
    )
      return `About`;
  };

  const handleOpenClose = (e, tab) => {
    if (e) {
      e.preventDefault();
    }
    let opens1 = Object.assign({}, opens);
    if (opens1[tab]) {
      delete opens1[tab];
      dispatch(setSidebarData({ opens: opens1 }));
      return;
    }
    opens1[tab] = 1;
    dispatch(setSidebarData({ opens: opens1 }));
  };

  return (
    <React.Fragment>
      <aside className="bg-white border-r border-gray-400 py-1 flex items-center justify-between flex-col h-screen w-full max-w-xs sticky top-0">
        <div className="w-full">
          <section className="flex items-center justify-between px-4 ">
            <a href={window.$home} className="text-xl hover:opacity-75">
              <h2 className="font-bold text-gray-700">PPE</h2>
            </a>
            <button
              type="button"
              className="bg-white text-gray-800 h-10 w-10 rounded hover:bg-gray-200 flex items-center justify-center -mr-2"
            >
              <i className="material-icons">apps</i>
            </button>
          </section>
          <h2 className="text-2xl font-semibold px-4 ">Admin Manager</h2>
          <ul className="mt-6 px-2">
            <li className="">
              <Link
                to={`/FilesPage`}
                className={`${
                  url.match(/\/FilesPage$/gim)
                    ? `font-bold text-indigo-600 bg-blue-100`
                    : `text-gray-800 bg-white hover:bg-gray-200 `
                } h-10 w-full rounded-sm flex items-center px-2`}
              >
                <i className="material-icons">filter</i>
                <span className="ml-2">Files</span>
              </Link>
            </li>
            <li className="">
              <Link
                to={`/UsersPage`}
                className={`${
                  url.match(/\/UsersPage$|\/UsersPage[^\?]*\?type=$/gim)
                    ? `font-bold text-indigo-600 bg-blue-100`
                    : `text-gray-800 bg-white hover:bg-gray-200 `
                } h-10 w-full rounded-sm flex items-center px-2`}
              >
                <i className="material-icons">people</i>
                <span className="ml-2">Users</span>
              </Link>
            </li>
            <li className="relative">
              <Link
                to={`/UsersPage?type=Japanese learner`}
                className={`${
                  url.match(/\/UsersPage[^\?]*\?type=Japanese/gim)
                    ? `font-bold text-indigo-600 bg-blue-100`
                    : `text-gray-800 bg-white hover:bg-gray-200 `
                } h-10 w-full rounded-sm hover:opacity-75 hover:bg-gray-200 flex items-center px-2`}
              >
                <i className="material-icons">book</i>
                <span className="ml-2">Japanese</span>
              </Link>
              <button
                type="button"
                onClick={(e) => handleOpenClose(e, `Japanese`)}
                className="absolute absolute-y right-0 mr-1 bg-white text-gray-800 h-8 w-8 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="material-icons">
                  {opens["Japanese"] ? `keyboard_arrow_up` : `expand_more`}
                </i>
              </button>
            </li>
            {opens["Japanese"] && (
              <React.Fragment>
                <li className="">
                  <Link
                    to={`/SyllabusesPage`}
                    className={`${
                      url.match(/\/SyllabusesPage/gim)
                        ? `font-bold text-indigo-600 bg-blue-100`
                        : `text-gray-800 bg-white hover:bg-gray-200 `
                    } pl-8 h-10 w-full rounded-sm flex items-center px-2`}
                  >
                    <span className="ml-2">Syllabus</span>
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={`/CoursesPage`}
                    className={`${
                      url.match(/\/CoursesPage/gim)
                        ? `font-bold text-indigo-600 bg-blue-100`
                        : `text-gray-800 bg-white hover:bg-gray-200 `
                    } pl-8 h-10 w-full rounded-sm flex items-center px-2`}
                  >
                    <span className="ml-2">Courses</span>
                  </Link>
                </li>
              </React.Fragment>
            )}

            <li className="relative">
              <Link
                to={`/UsersPage?type=IT project member`}
                className={`${
                  url.match(/\/UsersPage[^\?]*\?type=IT/gim)
                    ? `font-bold text-indigo-600 bg-blue-100`
                    : `text-gray-800 bg-white hover:bg-gray-200 `
                } h-10 w-full rounded-sm hover:opacity-75 hover:bg-gray-200 flex items-center px-2`}
              >
                <i className="material-icons">devices</i>
                <span className="ml-2">IT</span>
              </Link>

              <button
                type="button"
                onClick={(e) => handleOpenClose(e, `Projects`)}
                className="absolute absolute-y right-0 mr-1 bg-white text-gray-800 h-8 w-8 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="material-icons">
                  {opens["Projects"] ? `keyboard_arrow_up` : `expand_more`}
                </i>
              </button>
            </li>

            {opens["Projects"] && (
              <React.Fragment>
                <li className="">
                  <Link
                    to={`/ProjectsPage`}
                    className={`${
                      url.match(/\/ProjectsPage/gim)
                        ? `font-bold text-indigo-600 bg-blue-100`
                        : `text-gray-800 bg-white hover:bg-gray-200 `
                    } pl-8 h-10 w-full rounded-sm flex items-center px-2`}
                  >
                    <span className="ml-2">Projects</span>
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={`/TasksPage`}
                    className={`${
                      url.match(/\/TasksPage/gim)
                        ? `font-bold text-indigo-600 bg-blue-100`
                        : `text-gray-800 bg-white hover:bg-gray-200 `
                    } pl-8 h-10 w-full rounded-sm flex items-center px-2`}
                  >
                    <span className="ml-2">Tasks</span>
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={`/ReleasesPage`}
                    className={`${
                      url.match(/\/ReleasesPage/gim)
                        ? `font-bold text-indigo-600 bg-blue-100`
                        : `text-gray-800 bg-white hover:bg-gray-200 `
                    } pl-8 h-10 w-full rounded-sm flex items-center px-2`}
                  >
                    <span className="ml-2">Releases</span>
                  </Link>
                </li>
              </React.Fragment>
            )}

            <li className="relative">
              <Link
                to={`/UsersPage?type=Job hunter`}
                className={`${
                  url.match(/\/Users[^\?]*\?type=Job/gim)
                    ? `font-bold text-indigo-600 bg-blue-100`
                    : `text-gray-800 bg-white hover:bg-gray-200 `
                } h-10 w-full rounded-sm hover:opacity-75 hover:bg-gray-200 flex items-center px-2`}
              >
                <i className="material-icons">work</i>
                <span className="ml-2">Candidates</span>
              </Link>
              <button
                type="button"
                onClick={(e) => handleOpenClose(e, `Candidates`)}
                className="absolute absolute-y right-0 mr-1 bg-white text-gray-800 h-8 w-8 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="material-icons">
                  {opens["Candidates"] ? `keyboard_arrow_up` : `expand_more`}
                </i>
              </button>
            </li>

            {opens["Candidates"] && (
              <React.Fragment>
                <li className="">
                  <Link
                    to={`/CompaniesPage`}
                    className={`${
                      url.match(/\/CompaniesPage/gim)
                        ? `font-bold text-indigo-600 bg-blue-100`
                        : `text-gray-800 bg-white hover:bg-gray-200 `
                    } pl-8 h-10 w-full rounded-sm flex items-center px-2`}
                  >
                    <span className="ml-2">Companies</span>
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={`/JobsPage`}
                    className={`${
                      url.match(/\/JobsPage/gim)
                        ? `font-bold text-indigo-600 bg-blue-100`
                        : `text-gray-800 bg-white hover:bg-gray-200 `
                    } pl-8 h-10 w-full rounded-sm flex items-center px-2`}
                  >
                    <span className="ml-2">Jobs</span>
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={`/ReviewsPage`}
                    className={`${
                      url.match(/\/ReviewsPage/gim)
                        ? `font-bold text-indigo-600 bg-blue-100`
                        : `text-gray-800 bg-white hover:bg-gray-200 `
                    } pl-8 h-10 w-full rounded-sm flex items-center px-2`}
                  >
                    <span className="ml-2">Reviews</span>
                  </Link>
                </li>
              </React.Fragment>
            )}

            <li className="relative">
              <Link
                to={`/UsersPage?type=About us`}
                className={`${
                  url.match(/\/UsersPage[^\?]*\?type=About/gim)
                    ? `font-bold text-indigo-600 bg-blue-100`
                    : `text-gray-800 bg-white hover:bg-gray-200 `
                } h-10 w-full rounded-sm hover:opacity-75 hover:bg-gray-200 flex items-center px-2`}
              >
                <i className="material-icons">campaign</i>
                <span className="ml-2">About us</span>
              </Link>
              <button
                type="button"
                onClick={(e) => handleOpenClose(e, `About`)}
                className="absolute absolute-y right-0 mr-1 bg-white text-gray-800 h-8 w-8 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="material-icons">
                  {opens["About"] ? `keyboard_arrow_up` : `expand_more`}
                </i>
              </button>
            </li>
            {opens["About"] && (
              <React.Fragment>
                <li className="">
                  <Link
                    to={`/PostsPage`}
                    className={`${
                      url.match(/\/PostsPage/gim)
                        ? `font-bold text-indigo-600 bg-blue-100`
                        : `text-gray-800 bg-white hover:bg-gray-200 `
                    } pl-8 h-10 w-full rounded-sm flex items-center px-2`}
                  >
                    <span className="ml-2">Posts</span>
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={`/CommentsPage`}
                    className={`${
                      url.match(/\/CommentsPage/gim)
                        ? `font-bold text-indigo-600 bg-blue-100`
                        : `text-gray-800 bg-white hover:bg-gray-200 `
                    } pl-8 h-10 w-full rounded-sm flex items-center px-2`}
                  >
                    <span className="ml-2">Comments</span>
                  </Link>
                </li>
              </React.Fragment>
            )}
            <li className="relative">
              <Link
                to={`/UsersPage?type=Office leader`}
                className={`${
                  url.match(/\/UsersPage[^\?]*\?type=Office/gim)
                    ? `font-bold text-indigo-600 bg-blue-100`
                    : `text-gray-800 bg-white hover:bg-gray-200 `
                } h-10 w-full rounded-sm hover:opacity-75 hover:bg-gray-200 flex items-center px-2`}
              >
                <i className="material-icons">book</i>
                <span className="ml-2">Office leader</span>
              </Link>
              <button
                type="button"
                onClick={(e) => handleOpenClose(e, `Office`)}
                className="absolute absolute-y right-0 mr-1 bg-white text-gray-800 h-8 w-8 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
              >
                <i className="material-icons">
                  {opens["Office"] ? `keyboard_arrow_up` : `expand_more`}
                </i>
              </button>
            </li>
            {opens["Office"] && (
              <React.Fragment>
                <li className="">
                  <Link
                    to={`/SchoolsPage`}
                    className={`${
                      url.match(/\/SchoolsPage/gim)
                        ? `font-bold text-indigo-600 bg-blue-100`
                        : `text-gray-800 bg-white hover:bg-gray-200 `
                    } pl-8 h-10 w-full rounded-sm flex items-center px-2`}
                  >
                    <span className="ml-2">Schools</span>
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={`/ClassesPage`}
                    className={`${
                      url.match(/\/ClassesPage/gim)
                        ? `font-bold text-indigo-600 bg-blue-100`
                        : `text-gray-800 bg-white hover:bg-gray-200 `
                    } pl-8 h-10 w-full rounded-sm flex items-center px-2`}
                  >
                    <span className="ml-2">Classes</span>
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
        <section className="px-3 w-full">
          <hr className="my-2" />
          {opens["UserInfo"] && (
            <div className="bg-white shadow-md -mt-56 text-gray-800 w-full border rounded-lg px-1 relative ">
              <Link
                to={`/ChangeInformationPage`}
                type="button"
                className="bg-white pl-8 my-2 hover:opacity-95 hover:bg-gray-200 text-gray-800 h-10 w-full rounded-lg flex items-center justify-between px-1"
              >
                <span className="">Change information</span>
              </Link>
              <Link
                to={`/ChangePasswordPage`}
                type="button"
                className="bg-white pl-8 my-2 hover:opacity-95 hover:bg-gray-200 text-gray-800 h-10 w-full rounded-lg flex items-center justify-between px-1"
              >
                <span className="">Change password</span>
              </Link>
              <hr className="my-2 mx-2" />
              <Link
                to={`/auth?logout=logout`}
                className="bg-white my-2 text-gray-800 h-10 w-full flex items-center rounded-lg justify-between"
              >
                <figure className="w-full py-1 pl-1 h-10 flex rounded-lg items-center hover:opacity-95 hover:bg-gray-200">
                  <div className="w-6">
                    <div className="relative rounded-full overflow-hidden pt-1 ">
                      <i className="material-icons">login</i>
                    </div>
                  </div>
                  <span className="hover:border-gray-800 pl-2">Log Out</span>
                </figure>
              </Link>
            </div>
          )}
          <button
            type="button"
            onClick={(e) => handleOpenClose(e, `UserInfo`)}
            className="bg-white mt-2 text-gray-800 h-10 w-full rounded-sm hover:opacity-75 hover:bg-gray-200 flex items-center justify-between px-2"
          >
            <figure className="flex items-center">
              <div className="w-6">
                <div className="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                  <img
                    alt=""
                    src={user.image}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
              </div>
              <figcaption className="ml-2 truncate w-24">
                {user.name}
              </figcaption>
            </figure>
            <i className="material-icons">
              {opens["UserInfo"] ? `keyboard_arrow_up` : `expand_more`}
            </i>
          </button>
          <div className="flex items-center justify-between">
            <ul className="whitespace-no-wrap">
              <li className="inline-block">
                <button
                  type="button"
                  className="bg-white text-gray-800 h-10 w-10 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
                >
                  <i className="material-icons">settings</i>
                </button>
              </li>
              <li className="inline-block">
                <button
                  type="button"
                  className="bg-white text-gray-800 h-10 w-10 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
                >
                  <i className="material-icons">notifications_none</i>
                </button>
              </li>
              <li className="inline-block">
                <button
                  type="button"
                  className="bg-white text-gray-800 h-10 w-10 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
                >
                  <i className="material-icons">search</i>
                </button>
              </li>
              <li className="inline-block">
                <button
                  type="button"
                  className="bg-white text-gray-800 h-10 w-10 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
                >
                  <i className="material-icons">help_outline</i>
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="bg-white text-gray-800 h-10 w-10 rounded hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
            >
              <i className="material-icons">menu_open</i>
            </button>
          </div>
        </section>
      </aside>
    </React.Fragment>
  );
};
export default Sidebar;
