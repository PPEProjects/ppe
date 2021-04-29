import React, { Component } from "react";
import Ajax from "./Ajax";
import Alert from "./Alert";

class FormUploadVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ``,
      label: this.props.label,
      errors: {},
      count: 0,
      files: this.handleFiles(Object.assign({}, this.props.files) ?? {}),
    };
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePosition = this.handlePosition.bind(this);
  }

  async handleUploadFile(e) {
    e.preventDefault();
    let { files } = this.state
    let formData = new FormData();
    const fileList = e.target.files;
    for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
      let id = this.getMax(files, "id") + 1;
      let pos = this.getMax(files, "pos") + 1;
      let file = {
        id: id,
        pos: pos,
        video: ``
      };
      files[id] = file
    
      formData.append("file_paths[]", fileList[i]);
      formData.append("file_ids[]", id);
    }
    this.setState({
      files: files,
    });
    formData.append("type", `add_videos`);
    let res = await Ajax.post(`/files`, formData);
    let videos = res?.data?.files?.videos;
    for (let i in videos) {
      let video = videos[i];
      files[i].video = video;
    }
    for (const key in files) {
      let item = files[key].video
      if(!item){
        delete files[key]
      }
    }
    this.setState({
      files: files,
    });
    if(res.errors.length && res.errors[1] && res.errors[1].match(/PostTooLargeException/g)){
      Alert({t: `Error`, c: [`File size too big`]});
      return;
    }
    if(res.errors.length){
      Alert({t: `Error`, c: res.errors});
    }
  }
  handleFiles(files) {
    let files1 = {}
    Object.entries(files).map(([key, value], i) => {
      let id = this.getMax(files1, "id") + 1;
      let pos = this.getMax(files1, "pos") + 1;
      let file = {
        id: id,
        pos: pos,
        video: value
      };
      files1[id] = file;
    })
    return files1
  }

  getMax(obj, key) {
    let arr = Object.values(obj);
    let max = arr.length
        ? Math.max.apply(
            Math,
            arr.map(function (o) {
              return o[key];
            })
        )
        : 0;
    return isNaN(max) ? 0 : max;
  }

  handlePosition(e, id, pos) {
    e.preventDefault();
    let { files } = this.state;
    files[id]["pos"] += pos;
    this.setState({
      files: files
    });
  }

  async handleDelete(e, fileName, fileId) {
    e.preventDefault();
    let { files } = this.state;
    let res = await Ajax.post(`/files`, {
      file_paths: [fileName],
      type: `delete_videos`,
    });
    if (res.status === `success`) {
      delete files[fileId];
      this.setState({
        files: files,
      });
    }
  }


  set_state(obj) {
    this.setState(obj);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      label: nextProps.label,
    });
    if(nextProps.files){

      this.setState({
        files: this.handleFiles(nextProps.files)
      });
    }
  }

  render() {
    let { label, files, status } = this.state;
    files = Object.values(files);
    files.sort((a, b) => Number(a.pos) - Number(b.pos));
    let files_length = Object.values(files).length;
    return (
      <React.Fragment>
        <p className="mt-3 ">{label}</p>

        {files_length !== 0 && (
          <React.Fragment>
            <section className={`whitespace-no-wrap mt-2`}>
              {files.map(({id, video}, key) => (
                <figure
                  className={`inline-block float-left ml-2 relative ${!video ? `spinner` : ``}`}
                  key={key}
                >
                  <input type="hidden" name={`files[videos][]`} value={video} />
                  <button
                      type="button"
                      onClick={(e) => this.handleDelete(e, video, id)}
                      className=" absolute top-0 right-0 mt-1 mr-1 z-10 bg-white text-gray-800 h-6 w-6 rounded-full hover:bg-indigo-700 hover:text-white flex items-center justify-center"
                  >
                    <i className="text-base font-bold material-icons">close</i>
                  </button>
                  <div className="w-48">
                    <div className="pb-16x9 relative rounded-sm overflow-hidden bg-gray-300">
                      { video &&
                      <video
                        alt=""
                        src={video}
                        className="absolute h-full w-full object-cover"
                        controls
                        autoplay
                      />
                      }
                    </div>
                  </div>
                </figure>
              ))}
            </section>
            <div className={`clear-both`}></div>
          </React.Fragment>
        )}
        {files_length === 0 && (
          <label className={`mt-3 cursor-pointer block hover:opacity-75`}>
            <input
              type="file"
              className={``}
              accept={`video/*`}
              name={`files_before[]`}
              multiple
              onChange={(e) => this.handleUploadFile(e)}
            />
          </label>
        )}
      </React.Fragment>
    );
  }
}

export default FormUploadVideo;
