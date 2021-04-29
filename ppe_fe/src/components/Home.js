import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./.Dir/Header";
import Footer from "./.Dir/Footer";

import Ajax from "./.Tools/Ajax";
import Flickity from "react-flickity-component";
import ".././assets/css/flickity.css";
import ".././assets/css/flickity-custom.css";
import CourseList from "./.Child/CourseList";
import ProjectList from "./.Child/ProjectList";
import JobList from "./.Child/JobList";
import PostList from "./.Child/PostList";
import { withTranslation } from "react-i18next";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      jobs_support: [],
      files: []
    };
  }

  set_state(obj) {
    this.setState(obj);
  }
  async componentDidMount() {
    let courses = await Ajax.get(`/courses`);
    let users = await Ajax.get(`/users`, { type: `Job supporter`});
    let files = await Ajax.get(`/files`);
    this.setState({
      courses: courses?.data?.courses ?? [],
      jobs_support: users?.data?.users ?? [],
      files: files?.data?.filesObj['Pictures for Home page slider']?.files?.images ?? [],
    });
  }

  render() {
    let { courses, jobs_support, files } = this.state;
    let { t } = this.props;
    const flickityOptions = {
      autoPlay: true,
      groupCells: true,
    };
    return (
      <React.Fragment>
        <Header />
        <section  className={`${files.length ? `` : `hidden`} col-span-12`}>
          <Flickity
            className={"mt-2"} 
            elementType={"div"}
            options={flickityOptions} 
            disableImagesLoaded={false}
            reloadOnUpdate
            static 
          >
            {files.map((item, key) => (
                 <div
                 href={item}
                 className={`${
                   key ? `ml-3` : ``
                 } flex items-center carousel-cell w-56`}
                 key={key}
               >
                <div className="w-full">
                  <div className="pb-1x1 relative overflow-hidden bg-gray-300">
                    <img
                      alt=""
                      src={item}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Flickity>
        </section>

        <div className="w-full max-w-screen-xl mx-auto flex mt-8 lg:px-4  ">
          <div className="lg:block hidden w-64">
            <figure className="flex ">
              <div className="w-full">
                <div
                  style={{ paddingBottom: "200%" }}
                  className="pb-9x16 relative rounded-sm overflow-hidden bg-gray-200"
                >
                  <img
                    alt=""
                    src={`${window.$asset}/fe-amazon/assets/images/oylien-school.gif`}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
              </div>
            </figure>
            <figure className="flex mt-8">
              <div className="w-full">
                <div
                  style={{ paddingBottom: "200%" }}
                  className="pb-9x16 relative rounded-sm overflow-hidden bg-gray-300"
                >
                  <img
                    alt=""
                    src={`${window.$asset}/fe-amazon/assets/images/discount.gif`}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
              </div>
            </figure>
          </div>
          <div className="lg:pl-5 w-full">
            <section className="w-full max-w-screen-xl mx-auto ">
              <h3 className="flex items-center text-2xl uppercase lg:mx-0 mx-2">
                <i className="material-icons text-6xl text-gray-400">public</i>
                <span className="pl-2 pb-1 border-b font-light w-full">
                  {t("Japanese")}
                </span>
              </h3>
            </section>
            <section className="w-full max-w-screen-xl mx-auto ">
              <CourseList courses={courses} />
            </section>
            <section className="w-full max-w-screen-xl mx-auto mt-8">
              <h3 className="flex items-center text-2xl uppercase lg:mx-0 mx-2">
                <i className="material-icons text-6xl text-gray-400">devices</i>
                <span className="pl-2 pb-1 border-b font-light w-full">
                  {t("IT")}
                </span>
              </h3>
            </section>
            <section className="w-full max-w-screen-xl mx-auto ">
              <ProjectList />
            </section>
            <section className="w-full max-w-screen-xl mx-auto mt-8">
              <h3 className="flex items-center text-2xl uppercase lg:mx-0 mx-2">
                <i className="material-icons text-6xl text-gray-400">
                  work_outline
                </i>
                <span className="pl-2 pb-1 border-b font-light w-full">
                  {t("jobs")}
                </span>
              </h3>
            </section>
            <section className="w-full max-w-screen-xl mx-auto ">
              <div className="grid grid-cols-12 lg:gap-4 gap-2">
                <div className="lg:col-span-9 col-span-12 lg:mx-0 mx-2">
                  <JobList />
                </div>
                <div className="lg:col-span-3 col-span-12 lg:mx-0 mx-2 relative ">
                  <section className="sticky top-0 pt-4">
                    <div className="border p-2 rounded-sm">
                      <h4 className="text-sm uppercase font-semibold text-gray-500">
                        {t("Find job supporters")}
                      </h4>
                      {jobs_support.map((user, key) => (
                        <a
                          className="mt-3 block hover:opacity-75"
                          key={key}
                          href={`tel:${user.infos["phone"]}`}
                        >
                          <figure className="flex items-center">
                            <div className="w-12">
                              <div className="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                                <img
                                  alt=""
                                  src={user.image}
                                  className="absolute h-full w-full object-cover"
                                />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p className="">{user.name}</p>
                              <button className="px-2 bg-gray-200 flex items-center text-sm rounded-sm mt-1">
                                <i className="material-icons text-lg">call</i>
                                <span className="ml-1">
                                  {user.infos["phone"]}
                                </span>
                              </button>
                            </figcaption>
                          </figure>
                        </a>
                      ))}
                      <h4 className="text-sm uppercase font-semibold text-gray-500 mt-5">
                        {t("leave your phone number")}
                      </h4>
                      <p className="leading-5 mt-1 text-sm">
                        {t(
                          "If you so shy to make a call Lets leave your phone number we will call you later"
                        )}
                        .
                      </p>
                      <label className="block">
                        <input
                          type="text"
                          className="border border-gray-400 h-8 w-full px-3 mt-2 rounded-sm"
                          placeholder="0xxx99999"
                        />
                      </label>
                      <button
                        type="button"
                        className="bg-red-600 text-white h-8 w-full rounded-sm hover:opacity-75 mt-2"
                      >
                        <span className="uppercase text-sm">{t("submit")}</span>
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </section>

            <section className="w-full max-w-screen-xl mx-auto mt-8">
              <h3 className="flex items-center text-2xl uppercase lg:mx-0 mx-2">
                <i className="material-icons text-6xl text-gray-400">home</i>
                <span className="pl-2 pb-1 border-b font-light w-full">
                  {t("about us")}
                </span>
              </h3>
            </section>
            <section className="w-full max-w-screen-xl mx-auto ">
              <div class="grid grid-cols-12 mt-2 lg:gap-4 gap-2 lg:mx-0 mx-2">
                <PostList />
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
export default withTranslation()(Home);
