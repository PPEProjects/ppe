import React, {Component} from "react"
import {Link, useHistory} from "react-router-dom"


const Header = ({h1, className, isLogout, backLink}) => {
    const history = useHistory();
    return (
    <React.Fragment>
        <header className={`${className} flex items-center justify-between pt-3 `}>
            { !backLink &&
            <button type={`button`} onClick={() => history.goBack()}
                    className="bg-gray-400 text-gray-800 rounded-full hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
            >
                <figure className="flex items-center">
                    <div className="w-10">
                        <div className="pb-1x1 relative rounded-sm overflow-hidden">
                            <img
                                alt=""
                                src="assets/images/icons/11.png"
                                className="absolute h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </figure>
            </button>
            }
            { backLink &&
            <Link to={backLink}
                    className="bg-gray-400 text-gray-800 rounded-full hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
            >
                <figure className="flex items-center">
                    <div className="w-10">
                        <div className="pb-1x1 relative rounded-sm overflow-hidden">
                            <img
                                alt=""
                                src="assets/images/icons/11.png"
                                className="absolute h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </figure>
            </Link>
            }

            <h1 className="text-2xl font-bold text-yellow-500 uppercase text-shadow">{h1}</h1>
            { !isLogout &&
            <Link to={`/CharacterPage`}
                  className="bg-gray-400 text-gray-800 rounded-full hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
            >
                <figure className="flex items-center">
                    <div className="w-10">
                        <div className="pb-1x1 relative rounded-sm overflow-hidden">
                            <img
                                alt=""
                                src="assets/images/icons/22.png"
                                className="absolute h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </figure>
            </Link>
            }
            { isLogout &&
            <Link to={`/Auth?logout=logout`}
                  className="bg-gray-400 text-gray-800 rounded-full hover:opacity-75 hover:bg-gray-200 flex items-center justify-center"
            >
                <figure className="flex items-center">
                    <div className="w-10">
                        <div className="pb-1x1 relative rounded-sm overflow-hidden">
                            <img
                                alt=""
                                src="assets/images/icons/33.png"
                                className="absolute h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </figure>
            </Link>
            }

        </header>
    </React.Fragment>
)
}

export default Header
