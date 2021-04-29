import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class SyllabuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      syllabus: [],
    };
  }

  set_state(obj) {
    this.setState(obj);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      syllabus: nextProps.syllabus,
    });
  }

  render() {
    let { syllabus } = this.state;
    let { t } = this.props;
    return (
      <React.Fragment>
        <div className=" grid grid-cols-12 mt-2 lg:gap-4 gap-2 lg:mx-0 mx-2">
          {syllabus.map((syllabu, key) => (
            <div className="lg:col-span-4 col-span-12" key={key}>
              <Link
                to={`/syllabu/${syllabu.id}`}
                className="block p-2 hover:border-blue-500 border border-transparent"
              >
                <figure className="flex items-center">
                  <div className="w-full">
                    <div className="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                      <img
                        alt=""
                        src={syllabu.image}
                        className="absolute h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </figure>
                <h3 className="truncate-2y text-lg leading-6 mt-2 h-12">
                  {syllabu.name}
                </h3>
                <p className="truncate-3y font-light text-gray-800 h-10 leading-5 whitespace-pre-line">
                  {syllabu.description}
                </p>
                <Link
                  to={`/Syllabus/${syllabu.id}`}
                  className="text-white bg-orange-600 h-10 w-full rounded-sm hover:opacity-75 flex items-center justify-center border border-transparent mt-3"
                >
                  <i className="material-icons">book</i>
                  <span className="ml-2 uppercase font-semibold">
                    {t("Syllabus")}
                  </span>
                </Link>
                {/* <Link
                  to={`/syllabuRegister/${syllabu.id}`}
                  className="bg-indigo-700 text-white h-10 w-full rounded-sm hover:opacity-75 mt-3 flex items-center justify-center "
                >
                  <span className="">{t("Register")}</span>
                </Link> */}
              </Link>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(SyllabuList);
