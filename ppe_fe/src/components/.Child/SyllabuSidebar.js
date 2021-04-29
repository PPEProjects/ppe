import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
class SyllabuSidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { syllabus, syllabu_id, isShowAds } = this.props;
    let { t } = this.props;
    return (
      <div className="lg:col-span-3 col-span-12">
        <h3 className="flex items-center text-lg uppercase mt-5">
          <i className="material-icons text-4xl text-gray-400">public</i>
          <span className="pl-2 pb-1 border-b w-full">{t("Japanese")}</span>
        </h3>
        <ul className="mt-3">
          {syllabus.map((item, key) => (
            <li className="" key={key}>
              <Link
                to={`/syllabu/${item.id}`}
                className={`${
                  item.id == syllabu_id
                    ? `bg-indigo-700 text-white`
                    : `hover:underline hover:text-indigo-700`
                } block py-2 px-3`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        {isShowAds && (
          <figure className="flex mt-4">
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
        )}
      </div>
    );
  }
}
export default withTranslation()(SyllabuSidebar);
