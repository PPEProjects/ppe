import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Ajax from "../.Tools/Ajax";

class CourseSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: `loading`,
      files: [],
      course_id: 0,
      course: {},
      courses: [],
      teachers: [],
    };
  }
  set_state(obj) {
    this.setState(obj);
  }
  async componentDidMount() {
    let obj = await this.loadData();
    Ajax.get(`/users`, { type: `Job supporter`});
    let files = await Ajax.get(`/files`);
    let files1 = files?.data?.filesObj['Pictures for Advertisement']?.descriptions ?? [];
    this.setState({
      
      files: files?.data?.filesObj['Pictures for Advertisement']?.descriptions ?? [],
    });
  }
  async loadData(){
    let courses = await Ajax.get(`/courses`,{ status: `Activated`});
    courses = courses?.data?.courses ?? [];
   
    let obj = {
      status: `success`,
     
      courses: courses ?? [],
     
    }
    return obj;
  }
  render() {
    let { courses, course_id, isShowAds } = this.props;
    let {  files,course } = this.state;
    let { descriptions } = course;
    descriptions = descriptions ?? [];
    let { t } = this.props;
    console.log('files', files);
    return (
      
      <div className="lg:col-span-3 col-span-12">
        <h3 className="flex items-center text-lg uppercase mt-5">
          <i className="material-icons text-4xl text-gray-400">public</i>
          <span className="pl-2 pb-1 border-b w-full">{t("Japanese")}</span>
        </h3>
        <ul className="mt-3">
          {courses.map((item, key) => (
            <li className="" key={key}>
              <a
                href={`/Course/${item.id}`}
                className={`${
                  item.id == course_id
                    ? `bg-indigo-700 text-white`
                    : `hover:underline hover:text-indigo-700`
                } block py-2 px-3`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        {/* <div>
        {files}
        </div> */}
      {isShowAds && (
          <div className="mt-3">
            {files.map((file, key) => (
            <div className="w-full"  key={key}>
              {/* {(file.files ?? []).map((file, key1) => ( */}
              <a
                href={file?.value}
                style={{ paddingBottom: "200%" }}
                className="pb-9x16 relative rounded-sm overflow-hidden bg-gray-300 block"
              >
                <img
                  alt=""
                  src={file?.files[0]}
                  className="absolute h-full w-full object-cover"
                />
              </a>
               {/* ))} */}
            </div>
            ))}
          </div>
        )} 
       
         
      </div>
    );
  }
}
export default withTranslation()(CourseSidebar);
