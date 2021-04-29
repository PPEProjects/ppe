import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Flickity from "react-flickity-component";
import Ajax from "../.Tools/Ajax";

class CourseHeaderImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  set_state(obj) {
    this.setState(obj);
  }
  async componentDidMount() {
    let files = await Ajax.get(`/files?nvt=1`);
    let courses = await Ajax.get(`/courses`);
    let users = await Ajax.get(`/users`, { type: `Job supporter` });
    this.setState({
      courses: courses?.data?.courses ?? [],
      jobs_support: users?.data?.users ?? [],
      files: files?.data?.filesObj['Pictures for Japanese Tab slider']?.files?.images ?? [],
   
  });
}

  render() {
    let { courses, jobs_support, files } = this.state;
  
    const flickityOptions = {
      autoPlay: true,
      groupCells: true,
    };
    return (
      <React.Fragment>
        <div className={`${files.length ? `` : `hidden`} col-span-12`}>
          <Flickity
            className={"mt-2"} 
            elementType={"div"}
            options={flickityOptions}
            disableImagesLoaded={false} 
            reloadOnUpdate
            static
          >
            {files.map((item, key) => (
              <div
                href={item}
                className={`${
                  key ? `ml-3` : ``
                } flex items-center carousel-cell w-56`}
                key={key}
              >
                <div className="w-full">
                  <div className="pb-1x1 relative overflow-hidden bg-gray-300">
                    <img
                      alt=""
                      src={item}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Flickity>
        </div>
      </React.Fragment>
    );
  }
}
export default withTranslation()(CourseHeaderImage);
