import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import Cookies from "universal-cookie";
import {withTranslation} from "react-i18next";
import Ajax from "../.Tools/Ajax";
import CourseHeaderImage from "../.Child/CourseHeaderImage";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: ``,
            openLanguage: ``,
            access_token: null,
            lang: ``,
            menus: {},
        };
    }

    changeLanguage(lang) {
        const cookies = new Cookies();
        cookies.set("lang", lang, {path: "/"});
        window.location.assign("/");
    }

    async componentDidMount() {
        let courses = await Ajax.get(`/courses`, {status: `Activated`});
        const cookies = new Cookies();
        let access_token = cookies.get("access_token");
        let menus = await Ajax.get(`/base/menus`, {});
        this.setState({
            access_token: access_token,
            lang: cookies.get("lang") ?? "English",
            menus: menus?.data?.menus ?? {},
        });
        if (this.props.isHome) {
            if (this.state.menus?.Japanese?.id) {
                return this.props.history?.push(`/Course/${courses?.data?.courses[0].id}`)
            } else {
                return this.props.history?.push(`/Course/0`)
            }
        }
    }

    set_state(obj) {
        this.setState(obj);
    }

    render() {
        const {t, isHome} = this.props;
        const languages = [
            {
                name: "English",
                key: "English",
                image: "/assets/images/flags/united-kingdom.png",
            },
            {
                name: "Japanese",
                key: "Japanese",
                image: "/assets/images/flags/japan.png",
            },
            {
                name: "Tiếng Việt",
                key: "Vietnamese",
                image: "/assets/images/flags/vietnam.png",
            },
        ];
        const {openMenu, openLanguage, access_token, menus, lang} = this.state;
        const yourList = [
            "Create a Wish List",
            "Find a Wish List",
            "Find a Gift",
            "Explore Showroom",
        ];
        const yourAccount = [
            "Your Account",
            "Your Orders",
            "Your Wish List",
            "Your Recommendations",
            "Your Subscribe & Save Items",
            "Memberships & Subscriptions",
            "Your Prime Membership",
            "Register for a Business Account",
            "Your Watchlist",
        ];


        // if (isHome && menus?.Japanese?.id) {
        //   window.location.assign(`/Course/${menus?.Japanese?.id}`);
        // }

        return (
            <React.Fragment>
                <header className="">
                    {/* <section className="px-4 py-4 lg:hidden  ">
                  <div
        
            class="w-full ml-2  flex items-center justify-end"
          >
            <i class="material-icons text-indigo-700 text-lg">phone</i>
            <span class="ml-2 text-sm text-gray-600">Hotline tư vấn khóa học: 0986 77 66 22</span>
          </div>
          <div
           
            class="w-full ml-2 flex items-center justify-end mt-1"
          >
            <i class="material-icons text-indigo-700 text-lg">phone</i>
            <span class="ml-3 text-sm text-gray-600">Zalo tư vấn khóa học: 0986 77 66 22</span>
          </div>
          <div
           
           class="w-full ml-2 flex items-center justify-end mt-1"
         >
           <i class="material-icons text-indigo-700 text-lg">email</i>
           <span class="ml-2 text-sm text-gray-600">Email: ppe.edu@gmail.com</span>
         </div>
         </section> */}
                    <section className="bg-gray-900 h-16 flex items-center justify-between lg:px-4 ">
                        <div className="w-64 flex items-center">
                            <Link
                                to={`/Course/${menus?.Japanese?.id ?? 0}`}
                                className="hover:border-white border border-transparent px-2 leading-6"
                            >

                                {/* <h3 className="text-3xl font-semibold">
                  <span className="text-blue-500">P</span>
                  <span className="text-red-600">P</span>
                  <span className="text-white">E</span>
                </h3> */}
                                {/* <figure class="">
                      <div class="w-32">
                        <div class="pb-1x1 relative rounded-sm overflow-hidden">
                          <img
                            alt=""
                            src="../assets/images/flags/logo.png"
                            class="h-full w-full"
                          />
                        </div>
                      </div>
                          <figcaption class="">
                         <h4 className="whitespace-no-wrap mb-1 font-semibold text-gray-200">
                          <span className="text-blue-500">Paracel</span>{" "}
                          <span className="text-red-600">Project</span>{" "}
                          <span className="text-white">Education</span>
                        </h4>
                     </figcaption>
                    </figure> */}
                                <div className="">
                                    <img src="../assets/images/flags/logo.png"
                                         className="w-20 pt-2 text-6xl -ml-4"></img>
                                    <h4 className="whitespace-no-wrap font-semibold text-gray-200 -mt-2">
                                        <span className="text-blue-500">Paracel</span>{" "}
                                        <span className="text-red-600">Project</span>{" "}
                                        <span className="text-white">Education</span>
                                    </h4>
                                </div>

                            </Link>
                        </div>
                        <div
                            className={`fixed top-0 left-0 bottom-0 right-0 bg-white z-20 ${
                                openMenu === `mobile` ? `block` : `hidden`
                            }`}
                        >
                            <section className="bg-gray-900 h-16 flex items-center justify-between lg:px-4 ">
                                <div className="w-64 flex items-center">
                                    <Link
                                        to={`/`}
                                        className="hover:border-white border border-transparent px-2 leading-6"
                                    >
                                        <div className="">
                                            <img src="../assets/images/flags/logo.png"
                                                 className="w-20 pt-2 text-6xl -ml-4"></img>
                                            <h4 className="whitespace-no-wrap font-semibold text-gray-200 -mt-2">
                                                <span className="text-blue-500">Paracel</span>{" "}
                                                <span className="text-red-600">Project</span>{" "}
                                                <span className="text-white">Education</span>
                                            </h4>
                                        </div>
                                        {/* <h3 className="text-3xl font-semibold">
                      <span className="text-blue-500">P</span>
                      <span className="text-red-600">P</span>
                      <span className="text-white">E</span>
                    </h3>
                    <h4 className="whitespace-no-wrap -mb-1 font-semibold text-gray-200">
                      <span className="text-blue-500">Paracel</span>{" "}
                      <span className="text-red-600">Project</span>{" "}
                      <span className="text-white">Education</span>
                    </h4> */}
                                    </Link>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => this.set_state({openMenu: ``})}
                                    className="lg:hidden flex mr-2 items-center justify-center bg-transparent text-white h-12 px-3 rounded-sm hover:opacity-75 hover:border-white border border-transparent "
                                >
                                    <i className="material-icons">close</i>
                                </button>
                            </section>

                            <section className="">
                                <h3 className="text-xl mx-3 py-3">{t("Language")}</h3>
                                <ul className="">
                                    {languages.map((language, i) => (
                                        <li className="" key={i}>
                                            <button
                                                onClick={() => this.changeLanguage(language.key)}
                                                className={`w-full flex items-center py-3 px-3 hover:opacity-75 border-t ${
                                                    i ? "" : "text-indigo-700"
                                                }`}
                                            >
                                                <div className="w-6">
                                                    <div
                                                        className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                                        <img
                                                            alt=""
                                                            src={language.image}
                                                            className="absolute h-full w-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <figcaption className="ml-2">
                                                    {language.name}
                                                </figcaption>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            <section className="">
                                <h3 className="text-xl mx-3 py-3">{t("Account")}</h3>
                                <ul className="">
                                    {access_token && (
                                        <li className="">
                                            <a
                                                href={window.$admin}
                                                className="flex items-center py-3 px-3 hover:opacity-75 border-t "
                                            >
                                                {t("Admin")}
                                            </a>
                                        </li>
                                    )}
                                    {!access_token && (
                                        <React.Fragment>
                                            <li className="">
                                                <Link
                                                    to={`/login`}
                                                    className="flex items-center py-3 px-3 hover:opacity-75 border-t "
                                                >
                                                    {t("Sign-in")}
                                                </Link>
                                            </li>
                                            <li className="">
                                                <Link
                                                    to={`/register`}
                                                    className="flex items-center py-3 px-3 hover:opacity-75 border-t "
                                                >
                                                    {t("Create account")}
                                                </Link>
                                            </li>
                                        </React.Fragment>
                                    )}
                                </ul>
                            </section>
                        </div>
                        <section>
                            <h2 className="mx-auto font-bold text-gray-200 lg:flex hidden item-center justify-center text-2xl">{t("Experience for learning")}</h2>
                            {/* <img src="../assets/images/flags/vip.jpg" className="h-14 w-full" ></img> */}
                            <div className="mx-auto font-bold text-gray-200 lg:flex hidden item-center justify-center">
                                <i className="material-icons font-bold text-gray-200">phone</i>
                                <p className="pl-2 ">0917982428 - 0962414125</p>
                            </div>
                        </section>
                        <button
                            type="button"
                            onClick={() => this.set_state({openMenu: `mobile`})}
                            className="lg:hidden flex mr-2 items-center justify-center bg-transparent text-white h-12 px-3 rounded-sm hover:opacity-75 hover:border-white border border-transparent "
                        >
                            <i className="material-icons">menu</i>
                        </button>
                        <div className="lg:flex hidden relative">
                            <ul
                                className={`${
                                    openLanguage == `language` ? `block` : `hidden`
                                } w-64 border shadow-md rounded-md mt-16 bg-white arrow arrow-left-2 absolute z-20 top-0 left-0 -ml-2 `}
                            >
                                {languages.map((language, i) => (
                                    <li className="" key={i}>
                                        <button
                                            onClick={() => this.changeLanguage(language.key)}
                                            className={`w-full flex items-center py-3 px-3 hover:opacity-75 ${
                                                i ? "border-t" : ""
                                            }`}
                                        >
                                            <div className="w-6">
                                                <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                                                    <img
                                                        alt=""
                                                        src={language.image}
                                                        className="absolute h-full w-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <figcaption className="ml-2">{language.name}</figcaption>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                onClick={() => this.set_state({openLanguage: `language`})}
                                className="bg-transparent text-white h-12 px-2 rounded-sm hover:opacity-75 flex items-center justify-center hover:border-white border border-transparent "
                            >
                                <figure className="flex items-center">
                                    <div className="w-6">
                                        <div className="pb-4x3 relative rounded-sm overflow-hidden bg-gray-300">
                                            <img
                                                alt=""
                                                src={languages.find(item => item.key === lang)?.image}
                                                // src="/assets/images/flags/united-kingdom.png"
                                                className="absolute h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </figure>
                                <i className="material-icons ml-2">arrow_drop_down</i>
                            </button>

                            <section
                                className={`${
                                    openLanguage == `sign-in` ? `block` : `hidden`
                                } w-screen max-w-lg border shadow-md rounded-md mt-16 bg-white arrow arrow-right-05 absolute z-20 top-0 right-0 mr-32 py-3 `}
                            >
                                <div className="text-center">
                                    <Link
                                        to={`/login`}
                                        className="bg-blue-500 text-white h-10 w-32 rounded hover:opacity-75 flex items-center justify-center mx-auto"
                                    >
                                        <span className=""> {t("Sign in")}</span>
                                    </Link>

                                </div>
                                <div className="flex text-sm leading-7 mx-3 mt-3 border-t ">
                                    <div className="w-1/2 pt-3">
                                        <h4 className="font-bold text-lg">{t("Your Lists")}</h4>
                                        <ul className="mt-3">
                                            {yourList.map((val, i) => (
                                                <li className="" key={i}>
                                                    <a
                                                        href="#"
                                                        className="hover:text-indigo-700 hover:underline"
                                                    >
                                                        {val}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="w-1/2 pt-3 border-l pl-3">
                                        <h4 className="font-bold text-lg"> {t("Your Account")}</h4>
                                        <ul className="mt-3">
                                            {yourAccount.map((val, i) => (
                                                <li className="" key={i}>
                                                    <a
                                                        href="#"
                                                        className="hover:text-indigo-700 hover:underline"
                                                    >
                                                        {val}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {!access_token && (
                                <button
                                    type="button"
                                    onClick={() => this.set_state({openLanguage: `sign-in`})}
                                    className="bg-transparent text-white h-12 px-2 rounded-sm hover:opacity-75 hover:border-white border border-transparent ml-3 "
                                >
                  <span className="block text-left text-sm text-gray-300">
                    {t("Hello, Sign in")}
                  </span>
                                    <span className="flex -mt-1">
                    <span className=""> {t("Account & Lists")}</span>
                    
                    <i className="material-icons ml-1">arrow_drop_down</i>
                  </span>
                                </button>
                            )}
                            {access_token && (
                                <a
                                    href={`${window.$admin}/auth?access_token=${access_token}`}
                                    className="bg-transparent text-white h-12 px-2 rounded-sm hover:opacity-75 hover:border-white border border-transparent ml-3 flex items-center "
                                >
                                    <b className="block text-left text-sm text-gray-300">
                                        {" "}
                                        {t("Admin")}
                                    </b>
                                </a>
                            )}
                            <button
                                type="button"
                                className="flex items-center justify-center bg-transparent text-white h-12 px-2 rounded-sm hover:opacity-75 hover:border-white border border-transparent ml-3 "
                            >
                                <i className="material-icons ml-1">signal_cellular_alt</i>
                            </button>
                        </div>
                    </section>
                    <section className="bg-gray-800 h-8 flex items-center lg:px-4 ">
                        <div className="w-64 items-center lg:flex hidden"></div>
                        <ul className="whitespace-no-wrap overflow-x-auto py-1">
                            {Object.entries(menus).map(([key, value], i) => (
                                <li key={i} className={`align-top inline ${i ? "ml-3" : ""}`}>
                                    <Link
                                        to={`${value?.link ?? `#`}`}
                                        className="text-gray-200 px-2 py-1 hover:border-white border border-transparent uppercase font-bold"
                                    >
                                        {t(key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* <div className="mx-auto font-bold text-gray-200 lg:flex hidden item-center justify-end mr-24">
              <i className="material-icons ml-32  font-bold text-gray-200">phone</i>
              <p className="pl-2 ">0344703838 - 0344283782</p>
            </div> */}
                    </section>

                </header>

            </React.Fragment>
        );
    }
}

export default withRouter(withTranslation()(Header));
