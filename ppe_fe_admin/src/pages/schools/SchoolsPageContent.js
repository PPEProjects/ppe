import React, { Component } from "react";
import moment from "moment";
import Ajax from "../../components/Ajax";
import { date } from "faker";

class SchoolsPageContent extends Component {
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

  componentWillReceiveProps(nextProps) {
    Object.values(nextProps.inputs ?? {}).map((item, key) =>
      this.handleAdd(null, item.topic, item.lists, item.date)
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

  handleAdd(e = null, topic = ``, lists = ``, date = ``) {
    if (e) {
      e.preventDefault();
    }
    let { inputs } = this.state;
    let id = this.getMax(inputs, "id") + 1;
    let pos = this.getMin(inputs, "pos") - 1;
    let input = {
      id: id,
      pos: pos,
      topic: topic,
      lists: lists,
      date: date,
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
          {inputs.map((input, key) => (
            <section className="mt-3 bg-white" key={key}>
              <textarea
                name={`contents[${input.id}][lists]`}
                onChange={(e) => this.handleChange(e, input.id, "lists")}
                className="w-full h-20 px-3 -mt-2 rounded-md"
                placeholder="Enter lists (separated by new line)"
                value={input.lists}
              ></textarea>
            </section>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default SchoolsPageContent;
