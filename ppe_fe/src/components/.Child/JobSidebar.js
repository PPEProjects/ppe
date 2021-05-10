import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
class JobSidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { company } = this.props;
    let { t } = this.props;
    return (
      <div className="lg:col-span-3 col-span-12">
        <div className="sticky top-0 p-3 pt-4 bg-red-100">
          <figure className="">
            <div className="w-full">
              <div className="pb-3x1 relative rounded-sm overflow-hidden bg-gray-300">
                <img
                  alt=""
                  src={company.image}
                  className="absolute h-full w-full object-cover"
                />
              </div>
            </div>
            <figcaption className="">
              <h3 className="text-xl mt-3 ">{company.name}</h3>
              <p className="text-gray-600 leading-5 mt-2 whitespace-pre-wrap ">{company.about_us}</p>
            </figcaption>
          </figure>

          <ul className="mt-3 lg:block hidden">
            <li className="mt-1">
              <button
                type="button"
                className="text-gray-800 h-10 w-full rounded border border-transparent flex items-center px-2"
              >
                <i className="material-icons">settings</i>
                <span className="ml-3">{company.type}</span>
              </button>
            </li>
            <li className="mt-1">
              <button
                type="button"
                className="text-gray-800 h-10 w-full rounded border border-transparent flex items-center px-2"
              >
                <i className="material-icons">supervisor_account</i>
                <span className="ml-3">
                  {company?.more?.members.from}-{company?.more?.members.to}
                </span>
              </button>
            </li>
            <li className="mt-1">
              <button
                type="button"
                className="text-gray-800 h-10 w-full rounded border border-transparent flex items-center px-2"
              >
                <i className="material-icons">flag</i>
                <span className="ml-3">{company?.more?.country}</span>
              </button>
            </li>
            <li className="mt-1">
              <button
                type="button"
                className="text-gray-800 h-10 w-full rounded border border-transparent flex items-center px-2"
              >
                <i className="material-icons">date_range</i>
                <span className="ml-3">{t("Monday - Friday")}</span>
              </button>
            </li>
            {company.more?.ot_salary && (
              <li className="mt-1">
                <button
                  type="button"
                  className="text-gray-800 h-10 w-full rounded border border-transparent flex items-center px-2"
                >
                  <i className="material-icons">schedule</i>
                  <span className="ml-3">{t("Extra salary for OT")}</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
export default withTranslation()(JobSidebar);
