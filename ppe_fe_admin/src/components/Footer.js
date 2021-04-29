import React, { Component } from "react"
import {Link} from "react-router-dom"

class Footer extends Component {
    render() {
        let {h1} = this.props
        return (
            <React.Fragment>
                <footer className="fixed bottom-0 left-0 right-0 p-3 w-full max-w-2xl mx-auto z-20">
                    <section
                        className="mt-6 bg-black-40 rounded-lg p-3 text-sm text-yellow-500 block"
                    >
                        <div className="grid grid-cols-12 gap-1">
                            <div className="col-span-3 w-full text-sm">
                                <Link to={`/BuyAllCharactersPage`} className="w-full">
                                    <div className="w-12 mx-auto">
                                        <div className="pb-1x1 relative rounded-sm overflow-hidden">
                                            <img
                                                alt=""
                                                src="assets/images/icons/Card_Type_08_Human.png"
                                                className="absolute h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-yellow-500 text-xs leading-3 pt-4">
                                        <p className="text-center">NẮM 1 LẦN</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-span-3 w-full text-sm">
                                <Link to={`/BuySellPage`} className="w-full block">
                                    <div className="w-12 mx-auto">
                                        <div className="pb-1x1 relative rounded-sm overflow-hidden">
                                            <img
                                                alt=""
                                                src="assets/images/icons/Card_Type_05_Summoner.png"
                                                className="absolute h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-yellow-500 text-xs leading-3 pt-4">
                                        <p className="text-center"> MUA BÁN</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-span-3 w-full text-sm">
                                <Link to={`/CenterPage`} className="w-full">
                                    <div className="w-12 mx-auto">
                                        <div className="pb-1x1 relative rounded-sm overflow-hidden">
                                            <img
                                                alt=""
                                                src="assets/images/icons/icon39.png"
                                                className="absolute h-full w-full object-cover text-red-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-yellow-500 text-xs leading-3 pt-4">
                                        <p className="text-center">TRUNG TÂM</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-span-3 w-full text-sm">
                                <Link to={`/PersonalQrInvitePage`} className="w-full">
                                    <div className="w-12 mx-auto">
                                        <div className="pb-1x1 relative rounded-sm overflow-hidden">
                                            <img
                                                alt=""
                                                src="assets/images/icons/Card_Type_02_Archer.png"
                                                className="absolute h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-yellow-500 text-xs leading-3 pt-4">
                                        <p className="text-center">MỜI BẠN BÈ</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </section>
                </footer>
            </React.Fragment>
        )
    }
}
export default Footer
