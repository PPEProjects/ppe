import "./assets/css/material-icons.css";
import "./assets/css/tailwind-output.css";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, usersSelector } from "./slices/users";
import Auth from "./components/Auth";
import Sidebar from "./components/Sidebar";

import UsersPage from "./pages/users/UsersPage";
import UsersCreatePage from "./pages/users/UsersCreatePage";
import CoursesPage from "./pages/courses/CoursesPage";
import CoursesCreatePage from "./pages/courses/CoursesCreatePage";

import ClassesPage from "./pages/classes/ClassesPage";
import ClassesCreatePage from "./pages/classes/ClassesCreatePage";

import SyllabusesPage from "./pages/syllabuses/SyllabusesPage";
import SyllabusesCreatePage from "./pages/syllabuses/SyllabusesCreatePage";

import SchoolsPage from "./pages/schools/SchoolsPage";
import SchoolsCreatePage from "./pages/schools/SchoolsCreatePage";

import ProjectsPage from "./pages/projects/ProjectsPage";
import ProjectsCreatePage from "./pages/projects/ProjectsCreatePage";
import TasksPage from "./pages/tasks/TasksPage";
import TasksCreatePage from "./pages/tasks/TasksCreatePage";
import ReleasesPage from "./pages/releases/ReleasesPage";
import ReleasesCreatePage from "./pages/releases/ReleasesCreatePage";
import CompaniesPage from "./pages/companies/CompaniesPage";
import CompaniesCreatePage from "./pages/companies/CompaniesCreatePage";
import JobsPage from "./pages/jobs/JobsPage";
import JobsCreatePage from "./pages/jobs/JobsCreatePage";
import ReviewsPage from "./pages/reviews/ReviewsPage";
import ReviewsCreatePage from "./pages/reviews/ReviewsCreatePage";
import PostsPage from "./pages/posts/PostsPage";
import PostsCreatePage from "./pages/posts/PostsCreatePage";
import CommentsPage from "./pages/comments/CommentsPage";
import CommentsCreatePage from "./pages/comments/CommentsCreatePage";
import FilesPage from "./pages/files/FilesPage";
import ChangeInformationPage from "./pages/users/ChangeInformationPage";
import ChangePasswordPage from "./pages/users/ChangePasswordPage";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);
  useEffect(() => {
    let url = window.location.href.replace(/\/$/gim, "");
    if (window.$home === url || url.match(/RegisterPage$/gim)) return;
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <section className="bg-red-100 flex relative">
          <Sidebar />
          <Switch>
            <Route
              exact
              path={`/FilesPage`}
              component={FilesPage}
            />
             <Route
              exact
              path={`/ChangeInformationPage`}
              component={ChangeInformationPage}
            />
          <Route
              exact
              path={`/ChangePasswordPage`}
              component={ChangePasswordPage}
            />
            <Route
              exact
              path={`/CommentsCreatePage`}
              component={CommentsCreatePage}
            />
            <Route exact path={`/CommentsPage`} component={CommentsPage} />
            <Route
              exact
              path={`/PostsCreatePage`}
              component={PostsCreatePage}
            />
            <Route exact path={`/PostsPage`} component={PostsPage} />
            <Route
              exact
              path={`/ReviewsCreatePage`}
              component={ReviewsCreatePage}
            />
            <Route exact path={`/ReviewsPage`} component={ReviewsPage} />
            <Route exact path={`/JobsCreatePage`} component={JobsCreatePage} />
            <Route exact path={`/JobsPage`} component={JobsPage} />
            <Route
              exact
              path={`/CompaniesCreatePage`}
              component={CompaniesCreatePage}
            />
            <Route exact path={`/CompaniesPage`} component={CompaniesPage} />
            <Route
              exact
              path={`/ReleasesCreatePage`}
              component={ReleasesCreatePage}
            />
            <Route exact path={`/ReleasesPage`} component={ReleasesPage} />
            <Route
              exact
              path={`/TasksCreatePage`}
              component={TasksCreatePage}
            />
            <Route exact path={`/TasksPage`} component={TasksPage} />
            <Route exact path={`/ProjectsPage`} component={ProjectsPage} />
            <Route
              exact
              path={`/ProjectsCreatePage`}
              component={ProjectsCreatePage}SchoolsPage
            />
             <Route exact path={`/SchoolsPage`} component={SchoolsPage} />
             <Route
              exact
              path={`/SchoolsCreatePage`}
              component={SchoolsCreatePage}
            />
            <Route exact path={`/SyllabusesPage`} component={SyllabusesPage} />
            <Route
              exact
              path={`/SyllabusesCreatePage`}
              component={SyllabusesCreatePage}
            />
            <Route exact path={`/CoursesPage`} component={CoursesPage} />
            <Route
              exact
              path={`/CoursesCreatePage`}
              component={CoursesCreatePage}
            />
              <Route exact path={`/ClassesPage`} component={ClassesPage} />
             <Route
              exact
              path={`/ClassesCreatePage`}
              component={ClassesCreatePage}
            />
            <Route exact path={`/`} render={() => <Redirect to="/UsersPage" />} />
            <Route exact path={`/UsersPage`} component={UsersPage} />
            <Route
              exact
              path={`/UsersCreatePage`}
              component={UsersCreatePage}
            />
            <Route exact path={`/Auth`} component={Auth} />
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
};

export default App;

