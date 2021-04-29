import React, {Component} from "react"

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ``,
            children: ``,
            errors: {},
        }
    }

    set_state(obj) {
        this.setState(obj)
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            status: nextProps.status,
            success: nextProps.success,
            errors: nextProps.errors
        })
    }

    render() {
        let {success, errors, status} = this.state;
        return (
            <React.Fragment>

                {status === `success` &&
                <section className="bg-black-60 fixed top-0 left-0 right-0 bottom-0 z-50 ">
                    <div className="absolute absolute-x absolute-y w-full px-4">
                        <div
                            className=" bg-white w-full max-w-md mx-auto rounded shadow-lg z-20 overflow-y-auto ">
                            <div className="modal-content py-4 text-left px-4">
                                <div className="flex items-center pb-3">
                                    <p className="text-2xl font-bold capitalize">{status}</p>
                                </div>
                                <p className="mt-1 break-words" >{success}</p>
                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={() => this.set_state({status: ``})}
                                        className="w-full h-10 rounded bg-indigo-700 hover:bg-indigo-500 text-white font-bold">OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                }

                {status === `error` &&
                <section className="bg-black-60 fixed top-0 left-0 right-0 bottom-0 z-50 ">
                    <div className="absolute absolute-x absolute-y w-full px-4">
                        <div
                            className=" bg-white w-full max-w-md mx-auto rounded shadow-lg z-20 overflow-y-auto ">
                            <div className="modal-content py-4 text-left px-4">
                                <div className="flex items-center pb-3">
                                    <p className="text-2xl font-bold capitalize">{status}</p>
                                </div>
                                {errors.map((error, i) => (
                                    <p className="mt-1 break-words" dangerouslySetInnerHTML={{ __html:error}}  key={i}></p>
                                ))}
                                <div className="flex justify-end mt-6">
                                    <button
                                        onClick={() => this.set_state({status: ``})}
                                        className="w-full h-10 rounded bg-gray-300 hover:bg-gray-500 ">Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                }
            
            </React.Fragment>
        )
    }
}

export default Alert