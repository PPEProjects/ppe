import React, { Component,useState, useRef,useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./.Dir/Header";
import Alert from "./.Tools/Alert";
import Ajax from "./.Tools/Ajax";
import SubmitButton from "./.Tools/SubmitButton";
import CourseSidebar from "./.Child/CourseSidebar";
import CourseMore from "./.Child/CourseMore";
import CourseHeaderImage from "./.Child/CourseHeaderImage";
import { withTranslation } from "react-i18next";
import RegisterForm from "./.Child/RegisterForm";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: `loading`,
      errors: {},
      data: {},
      course_id: 0,
      course: {},
      courses: [],
    };
  }

  async componentDidMount() {
    let obj = await this.loadData();
    this.setState({ status: "loading" });
    let courses = await Ajax.get(`/courses`,{ status: `Activated`});
    courses = courses?.data?.courses ?? [];
    let course_id = this.props.match.params.course_id;
    let course = courses.filter((course) => course.id == course_id)[0];
    this.setState({
      status: ``,
      errors: {},
      course_id: course_id,
      courses: courses,
      course: course,
    });
  }

 
  async loadData(){
    let courses = await Ajax.get(`/courses`,{ status: `Activated`});
    courses = courses?.data?.courses ?? [];
    let course_id = this.props.match.params.course_id;
    let course = courses.filter((course) => course.id == course_id)[0];
    let teachers = await Ajax.get(`/users`, {
      user_ids: Object.keys(course?.teachers??{}),
    });

    let obj = {
      status: `success`,
      course_id: course_id,
      courses: courses ?? [],
      course: course ?? {},
      teachers: teachers?.data?.users || [],
    }
    return obj;
  }

  set_state(obj) {
    this.setState(obj);
  }
  render() {
    let { status, errors, data, course_id, course, courses, show } = this.state;
    let { t } = this.props;
    let { descriptions } = course;
    descriptions = descriptions ?? [];
    return (
      <React.Fragment>
        <Alert
          status={status}
          errors={errors}
          success={[
            `Register success: `,
            <b class="font-bold">{data?.name}</b>,
          ]}
        />
        <Header />
        <main className="">
          <CourseHeaderImage course={course} isShowTitle={true} />
          <div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl mx-auto lg:px-4 px-4 ">
            <CourseSidebar
              courses={courses}
              course_id={course_id}
              isShowAds={true}
            />
            <div className="lg:col-span-9 col-span-12">
              <section className="w-full max-w-screen-xl mx-auto ">
                <div className="grid grid-cols-12 gap-4">
                  <RegisterForm type={`course`} type_id={course_id}/>
                  <CourseMore course={course} isShowButton={false} />
                </div>
              </section>
            </div>
          </div>
        </main>
      
      </React.Fragment>
    );
  }


}
export default withTranslation()(Course);

