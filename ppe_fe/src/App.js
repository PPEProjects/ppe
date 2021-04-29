import "./assets/css/material-icons.css";
import "./assets/css/tailwind-output.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import User from "./components/User";

import Home from "./components/Home";
import Course from "./components/Course";
import CourseRegister from "./components/CourseRegister";
import Syllabuse from "./components/Syllabuse";

import Project from "./components/Project";
import ProjectRegister from "./components/ProjectRegister";
import Job from "./components/Job";
import JobRegister from "./components/JobRegister";
// import PostRegister from "./components/PostRegister";
import Post from "./components/Post";
import { useTranslation } from "react-i18next";
import Ajax from "./components/.Tools/Ajax";
import Header from "./components/.Dir/Header";
import Auth from "./components/Auth";

export const useMountEffect = (fun) => useEffect(fun, []);

function App() {
  // let menus = await Ajax.get(`/base/menus`, {});
  // menus = menus?.data?.menus;
  // setMenus(menus?.data?.menus ?? {});
  // const { t, i18n } = useTranslation();
  // function handleClick(lang) {
  //   i18n.changeLanguage(lang);
  // }
  return (
    <BrowserRouter>
      <div className="App">
        {/* <nav
          style={{ width: "100%", padding: "2rem 0", backgroundColor: "gray" }}
        >
          <button onClick={() => handleClick("en")}>English</button>
          <button onClick={() => handleClick("vn")}>vn</button>
          <button onClick={() => handleClick("ja")}>ja</button>
        </nav>
        <header className="App-header">
          <p>{t("Thanks.1")}</p>
          <p>{t("Why.1")}</p>
        </header> */}
        <Switch>
          <Route exact path={`/Auth`} component={Auth} />
          <Route exact path={`/Post/:post_id`} component={Post} />
          {/* <Route
            exact
            path={`/PostRegister/:post_id`}
            component={PostRegister}
          /> */}

          <Route exact path={`/JobRegister/:job_id`} component={JobRegister} />
          <Route exact path={`/Job/:job_id`} component={Job} />
          <Route
            exact
            path={`/ProjectRegister/:project_id`}
            component={ProjectRegister}
          />
          <Route exact path={`/Project/:project_id`} component={Project} />
          {/* <Route exact path={`/Syllabus/:course_id`} component={Syllabus} /> */}
          <Route
            exact
            path={`/CourseRegister/:course_id`}
            component={CourseRegister}
          />
          <Route exact path={`/Syllabuse`} component={Syllabuse} />
          <Route exact path={`/User/:user_id`} component={User} />
          <Route exact path={`/Course/:course_id`} component={Course} />
          <Route exact path={`/Home`} component={Home} />
          <Route exact path={`/`} render={() => <Header isHome={true} />} />
          <Route exact path={`/login`} component={Login} />
          <Route exact path={`/register`} component={Register} />
          <Route exact path={`/ForgotPassword`} component={ForgotPassword} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
