import React, {Component} from "react";
import {Link} from "react-router-dom";
import Header from "./.Dir/Header";
import Footer from "./.Dir/Footer";
import {withTranslation} from "react-i18next";
import Ajax from "./.Tools/Ajax";
import CourseList from "./.Child/CourseList";
import CourseSidebar from "./.Child/CourseSidebar";
import CourseMore from "./.Child/CourseMore";
import CourseHeaderImage from "./.Child/CourseHeaderImage";
import Editor from "./.Tools/Editor";


class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: `loading`,
            course_id: 0,
            course: {},
            courses: [],
            teachers: [],
        };
    }

    async componentDidMount() {
        let obj = await this.loadData();
        let files = await Ajax.get(`/files`);
        this.setState(obj);
    }

    async loadData() {
        let courses = await Ajax.get(`/courses`, {status: `Activated`});
        courses = courses?.data?.courses ?? [];
        let course_id = parseInt(this.props.match.params.course_id);
        let course = courses.filter((course) => course.id == course_id)[0];
        let teachers = await Ajax.get(`/users`, {
            user_ids: Object.keys(course?.teachers ?? {}),
        });
        let obj = {
            status: `success`,
            course_id: course_id,
            courses: courses ?? [],
            course: course ?? {},
            teachers: teachers?.data?.users || [],
        }
        console.log('obj', obj)
        return obj;
    }

    set_state(obj) {
        this.setState(obj);
    }

    render() {
        let {status, course_id, course, courses, teachers} = this.state;
        let {descriptions} = course;
        descriptions = descriptions ?? [];
        let files = Object.values(course?.files?.videos ?? {});


        let {t} = this.props;
        return (
            <React.Fragment>
                <Header/>
                <main className="">
                    <CourseHeaderImage course={course}/>
                    {course_id !== 0 &&

                    <div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl mx-auto lg:px-4 px-4 ">
                        <CourseSidebar
                            courses={courses}
                            course_id={course_id}
                            isShowAds={true}
                        />
                        <div className="lg:col-span-9 col-span-12">
                            <section className="w-full max-w-screen-xl mx-auto ">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="lg:col-span-8 col-span-12 lg:mt-6 mt-4 ">
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

                                                <h3 className="text-2xl font-semibold">
                                                    {course.name}
                                                </h3>
                                                <Editor editorData={course.content}/>
                                                {/*{descriptions.map((description, key) => (
                                                    <div className="" key={key}>
                                                        <p
                                                            className={`${!key ? `text-gray-600 whitespace-pre-line` : ``} mt-3`}
                                                        >
                                                            {description.value}{" "}
                                                        </p>
                                                        {(description.files ?? []).map((file, key1) => (
                                                            <a
                                                                href={file}
                                                                key={key1}
                                                                target={`_blank`}
                                                                className="mt-3 block p-2 border border-transparent hover:border-indigo-700"
                                                            >
                                                                <div className="w-full">
                                                                    <div
                                                                        className="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                                                                        <img
                                                                            alt=""
                                                                            src={file}
                                                                            className="absolute h-full w-full object-cover"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <figcaption className="text-center mt-3">
                                                                    {course.name}
                                                                </figcaption>
                                                            </a>
                                                        ))}
                                                          <div>
                                          {(course.files.videos ?? []).map((file, key) => (
                                               <a
                                                href={course.files.videos}
                                                key={key}
                                                target={`_blank`}
                                                className="mt-3 block p-2 border border-transparent hover:border-indigo-700"
                                            >
                                              <figure class="mt-3">
                                                <div class="w-full">
                                                    <div class="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                                                        <video
                                                            alt=""
                                                            src={course.files.videos}
                                                            className="absolute h-full w-full object-cover"
                                                            controls

                                                        />
                                                    </div>
                                                </div>
                                                 <figcaption className="text-center mt-3">
                                                     {course.name}
                                                </figcaption>

                                            </figure>
                                            </a>
                                          ))}

                                        </div>
                                                    </div>
                                                ))}*/}

                                                {Object.keys(course.syllabus_ids ?? {}).length !== 0 &&
                                                <Link
                                                    to={`/Syllabuse?course_id=${course.id}&syllabus_ids=${Object.keys(course.syllabus_ids ?? {}).length !== 0}`}
                                                    class="text-white bg-orange-600 h-10 w-full rounded-sm hover:opacity-75 flex items-center justify-center border border-transparent mt-3"
                                                >
                                                    <i class="material-icons">book</i>
                                                    <span class="ml-2 font-semibold">
                                                                                {t("Syllabus")}
                                                                                </span>
                                                </Link>
                                                }

                                                <hr className="mt-5 "/>
                                                <h3 className="text-2xl font-semibold mt-3">
                                                    {t("Meet your instructors")}
                                                </h3>
                                                <div className="grid grid-cols-12 ">
                                                    {(teachers ?? []).map((user, key) => (
                                                        <div className="col-span-6" key={key}>
                                                            <Link
                                                                className="mt-3 block p-2 border border-transparent hover:border-indigo-700 "
                                                                to={`/User/${user.id}`}
                                                            >
                                                                <figure className="flex items-center">
                                                                    <div className="">
                                                                        <div className="w-12">
                                                                            <div
                                                                                className="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                                                                                <img
                                                                                    alt=""
                                                                                    src={user.image}
                                                                                    className="absolute h-full w-full object-cover"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <figcaption className="ml-3 truncate">
                                                                        <p className="">{user.name}</p>
                                                                        <div className="truncate text-gray-500">
                                                                            {" "}
                                                                            {t("Associate Professor at PPE")}
                                                                        </div>
                                                                    </figcaption>
                                                                </figure>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            </React.Fragment>
                                        )}
                                    </div>
                                    <CourseMore course={course} isShowButton={true}/>
                                </div>
                            </section>
                            <section className="w-full max-w-screen-xl mx-auto mt-8 ">
                                <h3 className="flex items-center text-2xl uppercase lg:mx-0 ">
                    <span className="pl-2 pb-1 border-b font-semibold w-full">
                        {t("Main courses")}
                    </span>
                                </h3>
                            </section>
                            <section className="w-full max-w-screen-xl mx-auto ">
                                <CourseList />
                            </section>
                        </div>
                    </div>
                    }

                </main>

                <Footer/>
            </React.Fragment>
        );

    }
}

export default withTranslation()(Course);
