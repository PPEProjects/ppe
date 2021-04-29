import React from "react"
import ReactDOM from "react-dom"

function RenderDialog({ resolve, obj }) {
    let { i, t, c } = obj
    c = c ?? []
    function clickOK() {
        removeDialog()
        resolve(true)
    }
    function clickCancel() {
        removeDialog()
        resolve(false)
    }
    return (
        <React.Fragment>
            <section className="bg-black-60 fixed top-0 left-0 right-0 bottom-0 z-50 ">
                <div className="absolute absolute-x absolute-y w-full px-4">
                    <div className="bg-white w-full max-w-sm mx-auto rounded-md shadow-md overflow-y-auto pt-2 pb-4 px-4">
                        <section className="relative">
                            <button
                                onClick={clickCancel}
                                type="button"
                                className="absolute top-0 right-0 bg-white text-gray-700 h-10 w-10 rounded-full hover:bg-gray-400 hover:text-black flex items-center justify-center"
                            >
                                <i className="material-icons text-2xl">close</i>
                            </button>
                            { i &&
                            <div className="text-center">
                                <i className="text-indigo-700 text-5xl material-icons text-2xl">
                                    {i}
                                </i>
                            </div>
                            }
                            { t &&
                            <h3 className="mt-2 pb-2 text-lg font-semibold first-letter">{t}</h3>
                            }
                            { c.length &&
                            c.map((content, key) => (
                                <p className="text-base mt-1 break-words" key={key}>
                                    {content}
                                </p>
                            ))
                            }

                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={clickCancel}
                                    className="w-32 h-10 rounded-md text-gray-700 hover:bg-gray-300 border-transparent"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={clickOK}
                                    className="w-32 h-10 rounded-md text-white bg-indigo-700 hover:bg-indigo-600 border-transparent"
                                >
                                    OK
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}

export default function Confirm(obj) {
    return new Promise((resolve, reject) => {
        addDialog(obj, resolve)
    })
}

function addDialog(obj, resolve) {
    const body = document.getElementsByTagName("body")[0]
    const div = document.createElement("div")
    div.setAttribute("id", "Confirm")
    body.appendChild(div)
    ReactDOM.render(<RenderDialog obj={obj} resolve={resolve} />, div)
}

function removeDialog() {
    const div = document.getElementById("Confirm")
    const body = document.getElementsByTagName("body")[0]
    body.removeChild(div)
}
