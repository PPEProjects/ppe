import React, {Component} from "react";
import moment from "moment";
import Ajax from "../../components/Ajax";
import FormUploadFileWithDescription from "../../components/FormUploadFileWithDescription";

class PictureFormURL extends Component {
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

    async componentDidMount() {
     

        if (!this.props.inputs) {
            this.handleAdd();
            return;
        }

        await this.setStateSynchronous(state => ({inputs: {}}));
        Object.values(this.props.inputs ?? {}).map((item, key) =>
            this.handleAdd(null, item.value, item.files)
        );
        this.setState({
            label: this.props.label,
            className: this.props.className,
        });
    }

    async componentWillReceiveProps(nextProps) {
        if(nextProps.handle_first) return;
        if (!nextProps.inputs) return;
        await this.setStateSynchronous(state => ({inputs: {}}));
        Object.values(nextProps.inputs ?? {}).map((item, key) =>
            this.handleAdd(null, item.value, item.files)
        );
        this.setState({
            label: nextProps.label,
            className: nextProps.className,
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

    handleAdd(e = null, value = ``, files = {}) {
        if (e) {
            e.preventDefault();
        }
        let {inputs} = this.state;
        let id = this.getMax(inputs, "id") + 1;
        let pos = this.getMin(inputs, "pos") - 1;
        let input = {
            id: id,
            pos: pos,
            value: value,
            files: Object.assign({}, files) ?? {},
        };
        inputs[id] = input;
        this.setState({
            inputs: inputs,
        });
    }

    handlePosition(e, id, pos) {
        e.preventDefault();
        let {inputs} = this.state;
        inputs[id]["pos"] += pos;
        this.setState({
            inputs: inputs,
        });
    }

    handleDelete(e, id) {
        e.preventDefault();
        let {inputs} = this.state;
        delete inputs[id];
        this.setState({
            inputs: inputs,
        });
    }

    handleChangeValue(e, id) {
        e.preventDefault();
        let {inputs} = this.state;
        inputs[id]["value"] = e.target.value;
        this.setState({
            inputs: inputs,
        });
    }

    handleChangeFile(id, files) {
        let {inputs} = this.state;
        inputs[id]["files"] = files;
        this.setState({
            inputs: inputs,
        });
    }

    render() {
        let {label, className, inputs} = this.state;
        inputs = Object.values(inputs);
        inputs.sort((a, b) => Number(a.pos) - Number(b.pos));
        return (
            <React.Fragment>
                <div className={`${className} block mt-2 py-4`}>
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
                            <input
                                name={`descriptions[${input.id}][value]`}
                                onChange={(e) => this.handleChangeValue(e, input.id)}
                                className="text-sm border border-gray-400 hover:border-gray-500 w-full h-10 px-3 py-1 mt-2 rounded-md outline-none focus:border-blue-700 "
                                placeholder="Enter a URL"
                                value={input.value}
                            ></input>
                            <div className="flex">
                                <FormUploadFileWithDescription
                                    data={input}
                                    handleChangeFile={this.handleChangeFile.bind(this)}
                                />
                                <b className="text-red-600 ml-1 mt-4">(*)</b>

                            </div>

                        </section>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

export default PictureFormURL;
