import React, { Component } from "react";
import moment from "moment";
import Ajax from "./Ajax";
import SyllabusesFormContent from "../pages/syllabuses/SyllabusesFormContent";
import { setSyllabuseData } from "../slices/syllabuses";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class UploadCSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: this.props.label,
      errors: {},
      lists: [],
      files: Object.assign({}, this.props.files) ?? {},
    };
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  async handleUploadFile(e) {
    e.preventDefault();
    let { files } = this.state;
    let formData = new FormData();
    const fileList = e.target.files;
    for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
      const file_id = Math.round(moment().unix() + Math.random() * 999999999);
      files[file_id] = ``;
      const file = fileList[i];
      formData.append("file_paths[]", file);
      formData.append("file_ids[]", file_id);
    }
    this.setState({
      files: files,
    });
    formData.append("type", `csv`);
    let res = await Ajax.post(`/files`, formData);
    this.props.dispatch(setSyllabuseData({syllabuse_contents:res?.data}))
 
  }

  set_state(obj) {
    this.setState(obj);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      label: nextProps.label,
    });
  }

  render() {
    let { label, files } = this.state;

    return (
      <React.Fragment>
        <label className="block mt-3">
          <span className="block">{label}</span>
          <div className="border border-gray-400 h-10 w-full px-3 mt-2 rounded flex items-center">
            <input
                type="file"
                accept={`.xlsx, .xls, .csv`}
                name={`files_before[]`}
                multiple
                onChange={(e) => this.handleUploadFile(e)}
                className="w-full"
            />
          </div>
        </label>
      </React.Fragment>
    );
  }
}


export default connect()(UploadCSV);

