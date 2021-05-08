import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./.Dir/Header";
import Footer from "./.Dir/Footer";
import { withTranslation } from "react-i18next";
import Ajax from "./.Tools/Ajax";
import ProjectList from "./.Child/ProjectList";
import ProjectSidebar from "./.Child/ProjectSidebar";
import ProjectMore from "./.Child/ProjectMore";
import ProjectMember from "./.Child/ProjectMember";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: `loading`,
      project_id: 0,
      project: {},
      users: {},
      tasks: [],
      releases: [],
    };
  }

  async componentDidMount() {
    this.setState({ status: "loading" });
    let project_id = this.props.match.params.project_id;
    let releases = await Ajax.get(`/releases`, { project_id: project_id });
    let tasks = await Ajax.get(`/tasks`, { project_id: project_id });
    let project = await Ajax.get(`/projects/${project_id}`);
    let users = await Ajax.get(`/users`, { keyBy: `id` });
    this.setState({
      releases: releases?.data?.releases ?? {},
      tasks: tasks?.data?.tasks ?? {},
      users: users?.data?.users ?? {},
      status: `success`,
      project_id: project_id,
      project: project?.data ?? {},
    });

  }

  async componentDidUpdate() {
    let { project_id } = this.state;
    if (this.props.match.params.project_id !== project_id) {
      project_id = this.props.match.params.project_id;
      this.setState({ project_id: project_id });
      this.componentDidMount();
    }
  }

  set_state(obj) {
    this.setState(obj);
  }

  render() {
    let { status, project_id, project, users, tasks, releases } = this.state;
    let { descriptions, members } = project;
    members = members ?? {};
    console.log(users)

    descriptions = descriptions ?? [];
    let { t } = this.props;
    return (
      <React.Fragment>
        <Header />
        <main className="">
          <div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl mx-auto lg:px-4 px-4 ">
            <ProjectSidebar project={project} project_id={project_id} />
            <div className="lg:col-span-9 col-span-12">
              <div className="grid grid-cols-12 gap-4">
                <div className="lg:col-span-8 col-span-12 mt-4">
                  <ProjectMember project={project} users={users} />
                  <section className="">
                  {descriptions.map((description, key) => (
                    <div key={key}>
                  { [description.name].length !== 0 && [description.name].length !== "" && 
                    <h3 className="text-2xl font-semibold mt-3">
                      {t("Description")}
                    </h3>
                    }
                    </div>
                  ))}
                  {descriptions.map((description, key) => (
                    <div key={key}>
                  { [description.name].length === 0 && [description.name].length === "" && 
                    <h3 className="text-2xl font-semibold mt-3">
                     
                    </h3>
                    }
                    </div>
                  ))}
                    {/* <h3 className="text-2xl font-semibold mt-3">
                      {t("Description")}
                    </h3> */}
                    {descriptions.map((description, key) => (
                      <div className="" key={key}>
                        <p className={`${!key ? `text-gray-600 whitespace-pre-line` : ``} mt-3`}>
                          {description.value}
                        </p>
                        {(description.files ?? []).map((file, key1) => (
                          <a
                            href={project.image}
                            key={key1}
                            target={`_blank`}
                            className="mt-3 block p-2 border border-transparent hover:border-indigo-700"
                          >
                            <div className="w-full">
                              <div className="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                                <img
                                  alt=""
                                  src={project.image}
                                  className="absolute h-full w-full object-cover"
                                />
                              </div>
                            </div>
                            <figcaption className="text-center mt-3">
                              {project.name}
                            </figcaption>
                          </a>
                        ))}
                      </div>
                    ))}
                  </section>
                  <section className="overflow-auto">
                  {tasks.map((task, key) => (
                    <div key={key}>
                  { [task.name].length !== 0 && [task.name].length !== "" && 
                    <h3 className="text-2xl font-semibold mt-3">
                      {t("Tasks")}
                    </h3>
                    }
                    </div>
                  ))}
                    {tasks.map((task, key) => (
                    <div key={key}>
                  { [task.name].length === 0 && [task.name].length === "" && 
                    <h3 className="text-2xl font-semibold mt-3">
                     
                    </h3>
                    }
                    </div>
                  ))}
                   
                    <table className="table-auto w-full mt-3 border whitespace-no-wrap">
                      <tbody>
                        {tasks.map((task, key) => (
                          <tr key={key}>
                            <td className="border-b px-4 py-2 w-full">
                              <div className="truncate flex items-center ">
                                <button
                                  type="button"
                                  className="bg-blue-500 text-white rounded-sm h-4 w-4 hover:opacity-75 flex items-center justify-center"
                                >
                                  <i className="material-icons text-xs">home</i>
                                </button>
                                <p className="w-64 truncate ml-2">
                                  {task.name}
                                </p>
                              </div>
                            </td>
                            <td className="border-b px-4 py-2">
                              {task.status === `todo` && (
                                <span className="bg-gray-100 text-gray-700 uppercase text-xs font-bold rounded-sm pt-px pb-px px-1">
                                  {t("todo")}
                                </span>
                              )}
                              {task.status === `in process` && (
                                <span className="bg-blue-100 text-blue-700 uppercase text-xs font-bold rounded-sm pt-px pb-px px-1">
                                  {t("in process")}
                                </span>
                              )}
                              {task.status === `pending` && (
                                <span className="bg-red-100 text-red-700 uppercase text-xs font-bold rounded-sm pt-px pb-px px-1">
                                  {t("pending")}
                                </span>
                              )}
                              {task.status === `testing` && (
                                <span className="bg-yellow-100 text-yellow-700 uppercase text-xs font-bold rounded-sm pt-px pb-px px-1">
                                  {t("testing")}
                                </span>
                              )}
                              {task.status === `done` && (
                                <span className="bg-indigo-100 text-indigo-700 uppercase text-xs font-bold rounded-sm pt-px pb-px px-1">
                                  {t("done")}
                                </span>
                              )}
                            </td>
                            <td className="border-b px-4 py-2 flex">
                              {Object.entries(task?.members ?? {}).map(
                                ([user_id, value], key) => (
                                  <figure className="" key={key}>
                                    <div className="w-6">
                                      <div className="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                                        <img
                                          alt=""
                                          src={users[user_id]?.image}
                                          className="absolute h-full w-full object-cover"
                                        />
                                      </div>
                                    </div>
                                  </figure>
                                )
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                  <section className="">
                  {releases.map((release, key) => (
                    <div key={key}>
                  { [release.name].length !== 0 && [release.name].length !== "" && 
                    <h3 className="text-2xl font-semibold mt-3">
                      {t("Releases")}
                    </h3>
                    }
                    </div>
                  ))}
                    {releases.map((release, key) => (
                    <div key={key}>
                  { [release.name].length === 0 && [release.name].length === "" && 
                    <h3 className="text-2xl font-semibold mt-3">
                     
                    </h3>
                    }
                    </div>
                  ))}

                    <ul className="relative">
                      <li className="absolute top-0 bottom-0 left-0 ml-6 mb-3 w-px bg-blue-500"></li>

                      {releases.map((release, key) => (
                        <li
                          className="bg-white shadow-md border rounded-lg p-3 relative mt-10"
                          key={key}
                        >
                          <button
                            type="button"
                            className="bg-blue-500 text-white h-8 w-8 rounded-full border border-white flex items-center justify-center absolute top-0 -mt-4"
                          >
                            <i className="material-icons">check</i>
                          </button>
                          <div className="lg:ml-12 ml-0 mt-2 lg:flex lg:justify-between ">
                            <article className="">
                              <h3 className="text-xl">{release.name}</h3>
                              <div className="leading-6 text-gray-700 ">
                                {release.description}
                              </div>
                            </article>
                            <time className="text-gray-500 block mt-2">
                              {release.date}
                            </time>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section className="">

                  {Object.entries(members).length !== 0 &&
                    <h3 className="text-2xl font-semibold mt-3">
                      {t("Members")}
                    </h3>
                    }
                    {/* <h3 className="text-2xl font-semibold mt-3">
                      {t("Members")}
                    </h3> */}
                    <div className="grid grid-cols-12 gap-0 mt-3 ">
                      {Object.entries(members).map(([user_id, value], key) => (
                        <div className="lg:col-span-2 col-span-3" key={key}>
                          <a
                            href="#"
                            className="block lg:p-2 p-1 border border-transparent hover:border-indigo-700 w-full"
                          >
                            <div className="w-full">
                              <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                <img
                                  alt=""
                                  src={users[user_id]?.image}
                                  className="absolute h-full w-full object-cover"
                                />
                              </div>
                            </div>
                            <figcaption className="mt-2 truncate-2y leading-5 h-10">
                              {users[user_id]?.name}
                             
                            </figcaption>
                          </a>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
                <ProjectMore project={project} isShowButton={true} />
              </div>

              <section className="w-full max-w-screen-xl mx-auto mt-8 ">
                <h3 className="flex items-center text-2xl uppercase lg:mx-0 ">
                  <span className="pl-2 pb-1 font-light w-full">
                    {t("Projects")}
                  </span>
                </h3>
              </section>
              <section className="w-full max-w-screen-xl mx-auto ">
                <ProjectList />
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}
export default withTranslation()(Project);
