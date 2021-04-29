import React, {Component} from "react"

class SubmitButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {name, status1, className} = this.props;
        return (
            <React.Fragment>
                {status1 === `loading` &&
                <button
                    type="button"
                    className={`${className} bg-white text-gray-800 h-10 rounded hover:opacity-75 flex items-center justify-center dots`}
                >
                    <span>&bull;</span>
                    <span>&bull;</span>
                    <span>&bull;</span>
                </button>
                }
                {status1 !== `loading` &&
                <button
                    type="submit"
                    className={`${className} bg-indigo-700 text-white h-10 hover:opacity-75`}
                >
                    <span className="">{name}</span>
                </button>
                }
            </React.Fragment>
        )
    }
}

export default SubmitButton