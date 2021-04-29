import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProjectSidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { project, project_id } = this.props;
    let it_tabs = [
      { icon: `notes`, title: `Description` },
      { icon: `view_list`, title: `Tasks` },
      { icon: `check`, title: `Releases` },
      { icon: `people_outline`, title: `Members` },
    ];
    return (
      <div className="lg:col-span-3 col-span-12">
        <div className="sticky top-0 pt-4">
          <Link
            to={`/Project/${project_id}`}
            className="flex items-center p-1 border-transparent border hover:border-yellow-600"
          >
            <div className="w-10">
              <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                <img
                  alt=""
                  src={project?.image}
                  className="absolute h-full w-full object-cover"
                />
              </div>
            </div>
            <figcaption className="ml-3 leading-5 w-48">
              <h4 className="">{project?.name}</h4>
              <p className="truncate text-sm text-gray-500 whitespace-pre-line">
                {project?.description}
              </p>
            </figcaption>
          </Link>
          <ul className="mt-3 lg:block hidden">
            {it_tabs.map((item, key) => (
              <li className="mt-1" key={key}>
                <button
                  type="button"
                  className={`bg-transparent text-gray-800 h-10 w-full rounded hover:opacity-75 hover:bg-gray-200 border border-transparent flex items-center px-2`}
                >
                  <i className="material-icons">{item["icon"]}</i>
                  <span className="ml-3">{item["title"]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default ProjectSidebar;
