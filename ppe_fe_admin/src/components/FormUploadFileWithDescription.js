import React, { Component } from "react";
import moment from "moment";
import Ajax from "./Ajax";

class FormUploadFileWithDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ``,
      label: this.props.label,
      errors: {},
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete(e, fileName, fileId) {
    e.preventDefault();
    let { data, handleChangeFile } = this.props;
    let res = await Ajax.post(`/files`, {
      file_paths: [fileName],
      type: `delete_images`,
    });
    if (res.status === `success`) {
      delete data.files[fileId];
      handleChangeFile(data.id, data.files);
    }
  }

  async handleUpload(e) {
    e.preventDefault();
    let { data, handleChangeFile } = this.props;
    let formData = new FormData();
    const fileList = e.target.files;
    for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
      const file_id = Math.round(moment().unix() + Math.random() * 999999999);
      data.files[file_id] = ``;
      const file = fileList[i];
      formData.append("file_paths[]", file);
      formData.append("file_ids[]", file_id);
    }
    handleChangeFile(data.id, data.files);
    formData.append("type", `add_images`);
    let res = await Ajax.post(`/files`, formData);
    let images = res?.data?.files?.images;
    for (let i in images) {
      let image = images[i];
      data.files[i] = image;
    }
    for (const key in data.files) {
      let item = data.files[key]
      if(!item){
        delete data.files[key]
      }
    }
    handleChangeFile(data.id, data.files);
  }

  set_state(obj) {
    this.setState(obj);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      label: nextProps.label,
      files: nextProps.files,
    });
  }

  render() {
    let { label, status } = this.state;
    let { data } = this.props;
    let { files } = data;
    let files_length = Object.values(files).length;
    return (
      <React.Fragment>
        <section className={`whitespace-no-wrap mt-1 overflow-x-auto`}>
          <label className="inline-block float-left relative">
            <input
              type="file"
              className={`hidden`}
              accept={`image/*`}
              name={`files_before[]`}
              multiple
              onChange={(e) => this.handleUpload(e)}
            />
            <div
              type="button"
              className="cursor-pointer bg-white text-gray-800 h-12 w-12 rounded hover:text-indigo-700 border border-gray-400 flex items-center justify-center"
            >
              <i className="text-3xl material-icons">add_photo_alternate</i>
            </div>
          </label>
          {/* <pre className="text-sm">
              {JSON.stringify(files, null, '  ')}
          </pre>
          <pre className="text-sm">
              {JSON.stringify(data, null, '  ')}
          </pre> */}
          {Object.entries(files).map(([id, image], key) => (
            <figure
              className="inline-block ml-2 relative border border-gray-400 w-12 h-12 overflow-hidden rounded group"
              key={key}
            >
              <input
                type="hidden"
                name={`descriptions[${data.id}][files][]`}
                value={image}
              />
              <button
                type="button"
                onClick={(e) => this.handleDelete(e, image, id)}
                className="group-hover:flex hidden absolute top-0 right-0 mt-1 mr-1 z-10 bg-white text-gray-800 h-6 w-6 rounded-full hover:bg-indigo-700 hover:text-white  items-center justify-center"
              >
                <i className="text-base font-bold material-icons">close</i>
              </button>
              <div className="w-12">
                <div className="pb-1x1 relative overflow-hidden bg-gray-300 ">
                  <img
                    alt=""
                    src={image}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
              </div>
            </figure>
          ))}
        </section>
        <div className={`clear-both`}></div>
      </React.Fragment>
    );
  }
}

export default FormUploadFileWithDescription;
