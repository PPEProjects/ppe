import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Flickity from "react-flickity-component";

class SyllabuHeaderImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { syllabu } = this.props;
    let images = syllabu?.files?.images ?? [];
    const flickityOptions = {
      autoPlay: true,
      groupCells: true,
    };
    return (
      <React.Fragment>
        <div className={`${images.length ? `` : `hidden`} col-span-12`}>
          <Flickity
            className={"mt-2"} 
            elementType={"div"} 
            options={flickityOptions}
            disableImagesLoaded={false}
            reloadOnUpdate
            static
          >
            {images.map((item, key) => (
              <a
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
              </a>
            ))}
          </Flickity>
        </div>
      </React.Fragment>
    );
  }
}
export default withTranslation()(SyllabuHeaderImage);
