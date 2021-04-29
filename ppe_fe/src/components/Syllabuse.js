import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./.Dir/Header";
import Footer from "./.Dir/Footer";
import { withTranslation } from "react-i18next";
import Ajax from "./.Tools/Ajax";
import CourseList from "./.Child/CourseList";
import CourseSidebar from "./.Child/CourseSidebar";
import CourseMore from "./.Child/CourseMore";
import CourseHeaderImage from "./.Child/CourseHeaderImage";
import moment from "moment";

class Syllabuse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: `loading`,
      course_id: 0,
      course: {},
      courses: [],
    
      syllabuses: [],
      teachers: [],
    };
  }

  async componentDidMount() {
    this.setState({ status: "loading" });
    let url = new URL(window.location.href)
    let course_id = url.searchParams.get('course_id');

    let courses = await Ajax.get(`/courses`,{ status: `Activated`});
    courses = courses?.data?.courses ?? [];
    let course = courses.filter((course) => course.id == course_id)[0];
    ///
    let syllabuses = await Ajax.get(`/syllabuses`, {syllabus_ids: Object?.keys(course?.syllabus_ids ?? {})});
    syllabuses = syllabuses?.data?.syllabuses ?? [];

    let teachers = await Ajax.get(`/users`, {
      user_ids: Object.keys(course?.teachers ?? {}),
    });
    this.setState({
      status: `success`,
      course_id: course_id,
      courses: courses,
      course: course,
     
      syllabuses: syllabuses,

      teachers: teachers?.data?.users,
    });
  }

 

  set_state(obj) {
    this.setState(obj);
  }
  render() {
    let {
      status,
      course_id,
      course,
      courses,
      syllabuse_id,
      syllabuse,
      syllabuses,
      teachers,
    } = this.state;
  
    let { t } = this.props;
    return (
      <React.Fragment>
        <Header />
        <main className="">
          <div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl mx-auto lg:px-4 px-4 ">
            <CourseSidebar
              courses={courses}
              course_id={course_id}
              isShowAds={true}
            />
            <div className="lg:col-span-9 col-span-12">
              <section className="w-full max-w-screen-xl mx-auto ">
                <div className="grid grid-cols-12 gap-4">
                  <div className="lg:col-span-8 col-span-12 lg:mt-5">
                    {status === `loading` && (
                      <div className="flex items-center justify-center w-full">
                        <button
                          type="button"
                          className="h-10 w-32 rounded hover:opacity-75 flex items-center justify-center spinner overflow-hidden"
                        ></button>
                      </div>
                    )}
                    {status === `success` && (
                      <React.Fragment>
                      
                        <div class="lg:col-span-8 col-span-12">
                         
                          <h3 class="text-2xl font-semibold mb-2">
                            Syllabus of{" "}
                            <span class="text-gray-600">{course?.name}</span>
                          </h3>
                          <div className="grid grid-cols-12 gap-4 my-4 max-h-56 overflow-y-auto">
                          <div className="col-span-12">
                            {(syllabuses ?? []).map((syllabuse, key) => (
                              (syllabuse.contents ?? []).map((content, key1) => (
                                  <div key={key1}>
                                    { content.topic !== null &&
                                    <h3 className="text-xl mt-3 text-indigo-700 font-semibold  whitespace-pre-line">
                                    {content.topic}
                                    </h3>
                                    }
                                    <p className={`leading-6 whitespace-pre-line text-indigo-700 mt-3 border-b pb-2`}>{content.lists}</p>
                                  </div>
                                ))
                              ))}
                          </div>
                        </div>
                          
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                  <CourseMore course={course} isShowButton={true} />
                </div>
              </section>
            
            </div>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}
export default withTranslation()(Syllabuse);
