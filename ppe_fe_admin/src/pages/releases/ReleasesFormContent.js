import React, { Component } from "react";
import moment from "moment";

import FormUploadFileWithDescription from "../../components/FormUploadFileWithDescription";

class ReleasesFormContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ``,
      label: this.props.label,
      className: this.props.className,
      inputs: {},
    };
  }

  set_state(obj) {
    this.setState(obj);
  }
  setStateSynchronous(stateUpdate) {
    return new Promise(resolve => {
        this.setState(stateUpdate, () => resolve());
    });
}
async componentWillReceiveProps(nextProps) {
    if(!nextProps.inputs) return;
    await this.setStateSynchronous(state => ({inputs: {}}));
    Object.values(nextProps.inputs ?? {}).map((item, key) =>
      this.handleAdd(null, item.name, item.description, item.date, item.status)
    );
    this.setState({
      label: nextProps.label,
      className: nextProps.className,
    });
  }

  componentDidMount() {
    if (!this.props.inputs) {
      this.handleAdd();
    }
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
    return max;
  }

  getMin(obj, key) {
    let arr = Object.values(obj);
    let min = arr.length
      ? Math.min.apply(
          Math,
          arr.map(function (o) {
            return o[key];
          })
        )
      : 0;
    return min;
  }

  handleAdd(e = null, name = ``, description = ``, date = ``, status = ``) {
    if (e) {
      e.preventDefault();
    }
    let { inputs } = this.state;
    let id = this.getMax(inputs, "id") + 1;
    let pos = this.getMin(inputs, "pos") - 1;
    let input = {
      id: id,
      pos: pos,
      name: name,
      description: description,
      date: date,
      status: status,
    };
    inputs[id] = input;
    this.setState({
      inputs: inputs,
    });
  }

  handlePosition(e, id, pos) {
    e.preventDefault();
    let { inputs } = this.state;
    inputs[id]["pos"] += pos;
    this.setState({
      inputs: inputs,
    });
  }

  handleDelete(e, id) {
    e.preventDefault();
    let { inputs } = this.state;
    delete inputs[id];
    this.setState({
      inputs: inputs,
    });
  }

  handleChange(e, id, type) {
    e.preventDefault();
    let { inputs } = this.state;
    inputs[id][type] = e.target.value;
    this.setState({
      inputs: inputs,
    });
  }

  render() {
    let { label, className, inputs } = this.state;
    inputs = Object.values(inputs);
    inputs.sort((a, b) => Number(a.pos) - Number(b.pos));
    return (
      <React.Fragment>
        <div className={`${className} block mt-4`}>
          <section className="flex items-center">
            <span className="block font-medium ">{label}</span>
            <button
              type="button"
              onClick={(e) => this.handleAdd(e)}
              className="ml-2 bg-indigo-700 text-white h-5 w-5 rounded-full hover:opacity-75 flex items-center justify-center"
            >
              <i className="material-icons text-xl">add</i>
            </button>
            <b className="text-red-600 ml-1">(*)</b>
          </section>

          {inputs.map((input, key) => (
            <section className="mt-3" key={key}>
              <div className="flex items-center justify-end">
                <div className="rounded overflow-hidden flex">
                  <button
                    type="button"
                    onClick={(e) => this.handlePosition(e, input.id, -1)}
                    className="bg-gray-200 text-gray-800 h-8 w-8 hover:bg-gray-400 flex items-center justify-center"
                  >
                    <i className="material-icons text-lg">arrow_upward</i>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => this.handlePosition(e, input.id, +1)}
                    className="bg-gray-200 text-gray-800 h-8 w-8 hover:bg-gray-400 flex items-center justify-center border-l border-white "
                  >
                    <i className="material-icons text-lg">arrow_downward</i>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => this.handleDelete(e, input.id)}
                    className="bg-gray-200 text-gray-800 h-8 w-8 hover:bg-gray-400 flex items-center justify-center border-l border-white "
                  >
                    <i className="material-icons text-lg">close</i>
                  </button>
                </div>
              </div>
              <div className="">
                <input
                  type="text"
                  name={`contents[${input.id}][name]`}
                  onChange={(e) => this.handleChange(e, input.id, "name")}
                  className={`border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 activate:border-blue-500`}
                  value={input.name}
                  placeholder={`Release name`}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <input
                  type="date"
                  name={`contents[${input.id}][date]`}
                  onChange={(e) => this.handleChange(e, input.id, "date")}
                  className={`border w-full h-10 border-gray-400 hover:border-gray-500 px-3 rounded-md outline-none focus:border-blue-700 activate:border-blue-500`}
                  value={input.date}
                  placeholder={`Release date`}
                />
                <select
                  name={`contents[${input.id}][status]`}
                  onChange={(e) => this.handleChange(e, input.id, "status")}
                  className={`ml-3 border w-full h-10 border-gray-400 hover:border-gray-500 px-3  rounded-md outline-none focus:border-blue-700 activate:border-blue-500`}
                  value={input.status}
                >
                  <option value="">Release status</option>
                  <option value="todo">Todo</option>
                  <option value="in process">In process</option>
                  <option value="pending">Pending</option>
                  <option value="testing">Testing</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <textarea
                name={`contents[${input.id}][description]`}
                onChange={(e) => this.handleChange(e, input.id, "description")}
                className=" border border-gray-400 hover:border-gray-500 w-full h-18 px-3 py-1 mt-2 rounded-md outline-none focus:border-blue-700 "
                placeholder="Description about release"
                value={input.description}
              ></textarea>
            </section>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default ReleasesFormContent;
