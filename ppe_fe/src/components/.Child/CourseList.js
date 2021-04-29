import React, { Component } from "react";
import { Link } from "react-router-dom";
import Ajax from "../.Tools/Ajax";

import { withTranslation } from "react-i18next";

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  set_state(obj) {
    this.setState(obj);
  }
  async componentDidMount() {
    let courses = await Ajax.get(`/courses`,{ status: `Activated`});
    this.setState({
      courses: courses?.data?.courses ?? [],
    });
  }
 

  render() {
    let { users,courses } = this.state;
    let { t } = this.props;
    return (
      <React.Fragment>
        <div className=" grid grid-cols-12 mt-2 lg:gap-4 gap-2 lg:mx-0 mx-2">
          {courses.map((course, key) => (
            <div className="lg:col-span-4 col-span-12 hover:border-blue-700 border-blue-500 border border-transparent" key={key}>
              <a
                href={`/Course/${course.id}`}
                className="block p-2  border border-transparent"
              >
        
                <figure className="flex items-center">
                  <div className="w-full">
                    <div className="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                      <img
                        alt=""
                        src={course.image}
                        className="absolute h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </figure>
                <h3 className="truncate-2y text-lg leading-6 mt-2 h-12">
                  {course.name}
                </h3>
                <p className="truncate-3y font-light text-gray-800 h-10 leading-5 whitespace-pre-line">
                  {course.description}
                </p>
         
            
              
                { Object.keys(course.syllabus_ids ?? {}).length !==0 && 
                <Link
                  to={`/Syllabuse?course_id=${course.id}&syllabus_ids=${Object.keys(course?.syllabus_ids ?? {}).length !==0}`}
                  className="text-white bg-orange-600 h-10 w-full rounded-sm hover:opacity-75 flex items-center justify-center border border-transparent mt-3"
                >
                  <i className="material-icons">book</i>
                  <span className="ml-2 font-semibold">
                    {t("Syllabus")}
                  </span>
                </Link>
  }
                <a
                  // to={`/CourseRegister/${course.id}`}
                  href={course?.more?.google_form_url}
                  className="bg-pink-500 text-white h-10 w-full rounded-sm hover:opacity-75 mt-3 flex items-center justify-center "
                >
                  <span className="">{t("Register")}</span>
                </a>
              </a>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation()(CourseList);
