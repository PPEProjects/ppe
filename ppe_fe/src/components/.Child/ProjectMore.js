import React, { Component } from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { withTranslation } from "react-i18next";
class ProjectMore extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { project, isShowButton } = this.props;
    let { t } = this.props;
    return (
      <div className="lg:col-span-4 col-span-12 lg:mt-5 mt-0">
        <h3 className="text-2xl font-semibold pt-3 border-t lg:hidden block">
          {t("Overview")}
        </h3>
        <ul className="sticky top-0 pt-4">
          {project?.more?.version && (
            <li className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                <i className="material-icons text-3xl text-indigo-700">
                  widgets
                </i>
              </div>
              <div className="ml-3">
                <div className="text-xl">{t("Version number")}</div>
                <div className="text-gray-600">{project.more.version}</div>
              </div>
            </li>
          )}
          {project?.more?.installs_number && (
            <li className="flex items-center mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                <i className="material-icons text-3xl text-indigo-700">
                  system_update
                </i>
              </div>
              <div className="ml-3">
                <div className="text-xl">
                  {project.more.installs_number}
                  {/* + {t("installs")} */}
                </div>
                <div className="text-gray-600">
                  {project.more.installs_countries}
                  {/* + {t("countries")} */}
                </div>
              </div>
            </li>
          )}
          {project?.more?.next_release && (
            <li className="flex items-center mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                <i className="material-icons text-3xl text-indigo-700">
                  event_note
                </i>
              </div>
              <div className="ml-3">
                <div className="text-xl">{t("Next release")}</div>
                <div className="text-gray-600">{project.more.next_release}</div>
              </div>
            </li>
          )}
          {project?.more?.revenue && (
            <li className="flex items-center mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                <i className="material-icons text-3xl text-indigo-700">
                  payments
                </i>
              </div>
              <div className="ml-3">
                <div className="text-xl">{t("Revenue")}</div>
                <div className="text-gray-600">
                   <NumberFormat value= {project.more.revenue} displayType={'text'} thousandSeparator={true}/> {t("$")}
                </div>
              </div>
            </li>
          )}
          {isShowButton && (
            <li className="flex items-center mt-6">
              <a
                // to={`/ProjectRegister/${project?.id}`}
                href={project?.more?.google_form_url}
                className="bg-pink-500 text-white h-10 w-full rounded-sm hover:opacity-75 mt-3 flex items-center justify-center"

            >
            <span className="">{t("Join")}</span>

              
              </a>
            </li>
          )}
          <li className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-gray-600">{t("Platforms")}:</h4>
            <div className="pt-2 flex items-center text-indigo-700">
              <a
                className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full"
                href="#"
              >
                <svg
                  className="inline fill-current text-brand-ondark w-6 h-6"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                >
                  <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941c-.476.264-1.059.26-1.532-.011l-.192-.13zm9.469-11.56l-10.04 10.011v-20.022l10.04 10.011zm6.274-4.137l4.905 2.719c.482.268.781.77.781 1.314s-.299 1.046-.781 1.314l-5.039 2.793-4.015-4.003 4.149-4.137zm-15.854-7.534c.09-.087.191-.163.303-.227.473-.271 1.056-.275 1.532-.011l12.653 7.015-3.846 3.835-10.642-10.612z" />
                </svg>
              </a>
              <a
                className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full ml-4"
                href="#"
              >
                <svg
                  className="inline fill-current text-brand-ondark w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z" />
                </svg>
              </a>
              <a
                className="h-10 px-4 flex items-center justify-center bg-gray-200 rounded-full ml-4"
                href={project?.more?.website}
              >
                <svg
                  className="inline fill-current text-brand-ondark w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z" />
                </svg>
                <span className="ml-2 truncate w-32">{project?.more?.website}</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
export default withTranslation()(ProjectMore);
