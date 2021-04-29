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

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: `loading`,
      user: {},
      courses: [],
    };
  }

  async componentDidMount() {
    let obj = await this.loadData();
    this.setState(obj);
  }
 
  async loadData(){
  
    
    let user_id = this.props.match.params.user_id;
    let user = await Ajax.get(`/users/${user_id}`);
    user = user?.data ?? {};
    let courses = await Ajax.get(`/courses`, {teacher_id: user_id});
   
    courses = courses?.data?.courses ?? [];
    let course_id = this.props.match.params.course_id;
    let course = courses.filter((course) => course.id == course_id)[0];
    let teachers = await Ajax.get(`/users`, {
      user_ids: Object.keys(course?.teachers??{}),
    });
    let obj = {
        user: user,
        course_id: course_id,
      courses: courses ?? [],
      course: course ?? {},
      teachers: teachers?.data?.users || [],
    };
    return obj;
  }

  

  set_state(obj) {
    this.setState(obj);
  }
  render() {
    let { user, courses } = this.state;
    let about_me = user?.infos?.about_me ?? {};
    let types = user?.types ?? {};
    let { t } = this.props;

  
    return (
      <React.Fragment>
        <Header  />
        <div class="h-32 bg-gray-200">

        </div>
        <main class="w-full max-w-screen-xl mx-auto px-4 pt-10">
        <div class="grid grid-cols-12 gap-4 w-full max-w-screen-xl mx-auto lg:px-4 px-4 ">
        <div class="lg:col-span-4 col-span-12">
            <figure class="-mt-24">
                <div class="w-32">
                        <div class="pb-1x1 relative rounded-full overflow-hidden bg-gray-300  border-white border">
                            <img
                                alt=""
                                src={user.image}
                                class="absolute h-full w-full object-cover"/>
                    </div>
                </div>
            </figure>
            <h1 class="text-3xl">{user.name}</h1>
              {Object.entries(types).map(([key, value], i) => (

                  <figcaption class="whitespace-pre-line" key={key}>{key}</figcaption>
                )
                  )}
           <figure class="mt-3 pt-3 border-t">
              
                <p className="font-medium">{t("Education/Work/Organization place")}</p>
                <div class="ml-2 text-sm">
              
                  {user?.infos?.universities}
                </div>
             
            </figure>
            <ul class="mt-3 pt-3 border-t ">
                <li class="font-medium">
                    {t("Areas of expertise")}
                </li>
                <li class="ml-2 whitespace-pre-line">
                   {user?.infos?.expertise}
                </li>
              
            </ul>
            <ul class="mt-3 pt-3 border-t ">
                <li class="font-medium">
                   {t("Social links")}
                </li>
                <li class="">
                    <a href="#"
                        class="text-gray-800 text-indigo-700 flex items-center hover:opacity-75 mt-3"
                    >
                        <i class="material-icons">link</i>
                        <span class="ml-2">{user?.infos?.social_links}</span>
                    </a>
                </li>
            </ul>
        </div>

        <div class="lg:col-span-7 col-span-12">

            <section class="">
                 <p class="mt-3 whitespace-pre-line">{user?.infos?.about_me}</p>
         
            </section>
 
            <section class="mt-5">

            
                <figure class="mt-3">
                    <div class="w-full">
                        <div class="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                            <video
                                alt=""
                                src={user?.files?.videos}
                                className="absolute h-full w-full object-cover"
                                controls
                               
                            />
                        </div>
                    </div>
                </figure>


            </section>
            <section class="mt-5">
                <h4 class="font-medium"> {t("Courses and Programs taught by")} {user.name}</h4>
                <div class="grid grid-cols-12 mt-2 lg:gap-4 gap-2 lg:mx-0 mx-2">                  
                    {courses.map((course, key) => (
                    <div class="lg:col-span-4 col-span-12">
                        <a  href={`/Course/${course.id}`}
                        class="block p-2 hover:border-blue-500 border border-transparent" key={key}>
                            <figure class="flex items-center">
                                <div class="w-full">
                                    <div class="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                                        <img alt=""  src={course.image}
                                             class="absolute h-full w-full object-cover"/>
                                    </div>
                                </div>
                            </figure>
                            <h3 class="truncate text-lg leading-6 mt-2">{course.name}</h3>
                            <p class="truncate-3y font-light text-gray-800 leading-5 mt-2 h-16 whitespace-pre-line"> {course.description}</p>
                       
                          
                            
                          <a
                            // to={`/CourseRegister/${course.id}`}
                            href={course?.more?.google_form_url}
                            className="bg-pink-500 text-white h-10 w-full rounded-sm hover:opacity-75 mt-3 flex items-center justify-center "
                          >
                            <span className="">Register</span>
                          </a>
                                  </a>
                       
                    </div>
              ))}
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
export default withTranslation()(User);
