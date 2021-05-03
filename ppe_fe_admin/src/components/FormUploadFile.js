import React, { Component } from "react";
import Ajax from "./Ajax";
import Alert from "./Alert";

class FormUploadFile extends Component {
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
        image: ``
      };
      files[id] = file

      formData.append("file_paths[]", fileList[i]);
      formData.append("file_ids[]", id);
    }
    this.setState({
      files: files,
    });
    formData.append("type", `add_images`);
    let res = await Ajax.post(`/files`, formData);
    let images = res?.data?.files?.images;
    for (let i in images) {
      let image = images[i];
      files[i].image = image;
    }
    for (const key in files) {
      let item = files[key].image
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
        image: value
      };
      files1[id] = file;
    })
    return files1
    this.setState({
      files: files1
    });
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
      type: `delete_images`,
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

  componentDidMount() {
    if(!this.props.handle_first) return;
    this.setState({
      label: this.props.label,
      files: this.handleFiles(this.props.files)
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.handle_first) return;
    console.log('componentWillReceiveProps')
    this.setState({
      label: nextProps.label,
    });
    console.log('nextProps.files', nextProps.files)
    console.log('this.state.files', this.state.files)
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
        {files_length !== 0 && (
          <React.Fragment>
            <p className="mt-3 ">{label}</p>
            <section className={`whitespace-no-wrap mt-2`}>
              <label className="inline-block float-left relative">
                <input
                  type="file"
                  className={`hidden`}
                  accept={`image/*`}
                  name={`files_before[]`}
                  multiple
                  onChange={(e) => this.handleUploadFile(e)}
                />
                <div
                  type="button"
                  className="cursor-pointer ml-2 bg-white text-gray-800 h-20 w-20 rounded hover:opacity-75 hover:bg-gray-200 border border-gray-400 flex items-center justify-center"
                >
                  <i className="text-3xl material-icons">add</i>
                </div>
              </label>
              {files.map(({id, image}, key) => (
                <figure
                  className={`inline-block float-left ml-2 relative ${!image ? `spinner` : ``}`}
                  key={key}
                >
                  <input type="hidden" name={`files[images][]`} value={image} />
                  <button
                      type="button"
                      onClick={(e) => this.handleDelete(e, image, id)}
                      className=" absolute top-0 right-0 mt-1 mr-1 z-10 bg-white text-gray-800 h-6 w-6 rounded-full hover:bg-indigo-700 hover:text-white flex items-center justify-center"
                  >
                    <i className="text-base font-bold material-icons">close</i>
                  </button>
              
                  <div className="w-20 pb-2">
                    <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                      { image &&
                      <img
                        alt=""
                        src={image}
                        className="absolute h-full w-full object-cover"
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
          <label className={`cursor-pointer block hover:opacity-75`}>
            <input
              type="file"
              className={`hidden`}
              accept={`image/*`}
              name={`files_before[]`}
              multiple
              onChange={(e) => this.handleUploadFile(e)}
            />
            <p className="mt-3 ">{label}</p>
            <div className="py-4 mt-2 bg-white border-dashed border-2 border-gray-400 rounded-lg text-center text-sm">
              <i className="material-icons text-5xl text-gray-600">
                perm_media
              </i>
              <p className="mt-2 text-gray-700">Drag and drop to upload</p>
              <p className="text-center ">
                <span className="text-gray-700">Or</span>
                <span
                
                  className="text-indigo-700 hover:opacity-75 hover:underline ml-1"
                >
                  choose files on your device
                </span>
              </p>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Your image needs to be at least 500×500 pixels.
              <a
                href="#"
                className="text-indigo-700 hover:opacity-75 hover:underline "
              >
                Learn More
              </a>
            </p>
          </label>
        )}
      </React.Fragment>
    );
  }
}

export default FormUploadFile;
