import React, { Component } from "react";
import { Link } from "react-router-dom";
import Ajax from "../.Tools/Ajax";
import ProjectMember from "./ProjectMember";
import { withTranslation } from "react-i18next";
import moment from "moment";
class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      projects: [],
      tasks: [],
    };
  }

  set_state(obj) {
    this.setState(obj);
  }

  async componentDidMount() {
    let users = await Ajax.get(`/users`, { keyBy: `id` });
    let projects = await Ajax.get(`/projects`,{ status: `Activated`});
    let tasks = await Ajax.get(`/tasks`, { by_status: `by_status` });
    this.setState({
      users: users?.data?.users ?? {},
      projects: projects?.data?.projects ?? [],
      tasks: tasks?.data?.tasks ?? [],
    });
  }

  render() {
    let { users, projects, tasks } = this.state;
    let { project, isShowButton } = this.props;
    let { t } = this.props;
    return (
      <React.Fragment>
        <div className="grid grid-cols-12 mt-2 lg:gap-4 gap-2 lg:mx-0 mx-2">
          {projects.map((project, key) => (
            <div className="lg:col-span-4 col-span-12" key={key}>
              <a
                href={`/Project/${project.id}`}
                className="block bg-white rounded-sm overflow-hidden border border-gray-200 shadow-lg pb-4 hover:border-orange-300 hover:shadow-xl"
              >
                <ProjectMember users={users} project={project} />
                <section className="mt-6 mx-4">
                  <span className="text-xs font-semibold text-gray-500 uppercase">
                    {t("project")}
                  </span>
                  <h4 className="font-semibold text-2xl leading-7 mt-1">
                    {project.name}
                  </h4>
                  <div className="flex items-center text-sm mt-2">
                    <i className="material-icons text-gray-500">today</i>
                    <span className="ml-1 text-gray-500">{t("In progress for")} </span>
                    <b className="ml-1 ">
                      {/* {moment(project.more.start_day).diff(moment(project.more.deadline), 'days')} {t("days")} */}
                      {moment(project.more.deadline).diff(moment(project.more.start_day), 'days')} {t("days")}
                    </b>
                  </div>
                  <p className="mt-2 text-gray-500 truncate-2y h-12 whitespace-pre-line">
                    {project.description}
                  </p>
                </section>
                <section className="mt-6 mx-4">
                  <b className="">
                    {tasks[project.id]?.all} {t("task")}
                  </b>{" "}
                
                
                    { Object.keys(project.members ?? {}).length !==0 && 
                  <span className="text-gray-500 text-sm">
                  
                  </span>
                }
                  { Object.keys(project.members ?? {}).length ===0 && 
                  <span className="text-gray-500 text-sm">
                    (
                    {Math.round(
                      (100 * tasks[project.id]?.done) / tasks[project.id]?.all
                    )}
                    % {t("completed")})
                  </span>
                 } 
                  
                  <div className="relative rounded-full overflow-hidden bg-gray-200 h-2 mt-1">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-yellow-600"
                      style={{
                        width: `${
                          (100 * tasks[project.id]?.done) /
                          tasks[project.id]?.all
                        }%`,
                      }}
                    ></div>
                  </div>
                  <a
                    // to={`/ProjectRegister/${project.id}`}
                    href={project?.more?.google_form_url}
                    className="bg-pink-500 text-white h-10 w-full rounded-sm hover:opacity-75 mt-3 flex items-center justify-center"
                  >
                    <span className="">{t("Join")}</span>
                  </a>
                
                </section>
              </a>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
export default withTranslation()(ProjectList);
