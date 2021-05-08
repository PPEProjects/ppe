import React, { Component } from "react";
import { Link } from "react-router-dom";
import Ajax from "../.Tools/Ajax";
import { withTranslation } from "react-i18next";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: `loading`,
      footer_id: 0,
      footer: {},
      users_life_support: [],
      users_career_support: [],
    };
  }

  async componentDidMount() {
    this.setState({ status: "loading" });
    let users = await Ajax.get(`/users`, { types: [`Life supporter`] });
    let users1 = await Ajax.get(`/users`, { types: [`Job supporter`] });
    this.setState({
      users_life_support: users?.data?.users ?? [],
      users_career_support: users1?.data?.users ?? [],
    });
  }

  set_state(obj) {
    this.setState(obj);
  }

  render() {
    let { status, users_life_support, users_career_support } = this.state;
    let { t } = this.props;
    return (
      <React.Fragment>
        <footer class="bg-gray-700 text-gray-100 px-2 pt-0 pb-2 mt-12">
          <div class="container mx-auto py-8">
            <div class="flex flex-wrap mb-2 ">
              <div class="w-full md:w-1/3 md:text-left px-3 mb-2 md:mb-0 pb-3 sm:pb-0">
                <p class="text-white font-bold text-xl my-3">
                  {t("PPE contacts and supports")}
                </p>
                <p>
                  {/* <span class="text-gray-500">{t("Address and contact")}</span> :{" "} */}
                  {/* {t("TAT 11/07673,Tokyo, Japan")}. */}

                                    Paracel Project Education.<br />
                  <div>
                    <a className="flex" href="https://goo.gl/maps/sBhsUP4WqLEtXEEu6">
                      <i class="material-icons font-bold text-gray-200 mr-1">location_on</i>23
                                            Lương Thúc Kỳ, Hòa Hải, Ngũ Hành Sơn, Đà Nẵng.<br />
                    </a>
                  </div>

                  <div className=" ">
                    <a href="tel:0962414125" className="flex">
                      <i class="material-icons font-bold text-gray-200 mr-1">phone</i> <p
                        className="ml-1"> 0962414125</p> .<br />
                    </a>
                  </div>
                  <div className=" ">
                    <a href="https://www.facebook.com/ParacelProjectEducation"
                      className="flex items-center	mb-4">
                      <i class="material-icons font-bold text-gray-200 mr-1 text-3xl mt-1">facebook</i>
                      <p className="mt-2">https://www.facebook.com/ParacelProjectEducation</p>
                      <br />
                    </a>
                  </div>

                                    株式会社パシフィックネット.<br />
                  <div>
                    <a className="flex mt-1" href="https://goo.gl/maps/RJJaWr6vEnnQ19G97">
                      <i class="material-icons font-bold text-gray-200 mr-1">location_on</i>〒108‐0014
                                            東京都港区芝5－20－14三田鈴木ビル６Ｆ.<br />
                    </a>
                  </div>
                  <div className="">
                    <a href="tel:7021601245" className="flex">
                      <i class="material-icons font-bold text-gray-200 mr-1">phone</i>
                      <p>7021601245</p> .<br />
                    </a>
                  </div>
                  <div className=" ">
                    <a href="https://www.facebook.com/ParacelProjectEducation"
                      className="flex items-center	">
                      <i class="material-icons font-bold text-gray-200 mr-1 text-3xl mt-1">facebook</i>
                      <p className="mt-2">https://www.facebook.com/ParacelProjectEducation</p>
                    </a>
                  </div>
                  <br />

                </p>
                {users_life_support.length !== 0 &&
                  <p class="text-gray-500 mt-3">
                    {t("Support about life in Japan")}:
                                </p>
                }
                <div class="grid grid-cols-12 gap-1 mt-1">
                  {users_life_support.map((user, key) => (
                    <div class="col-span-6" key={key}>
                      <a
                        href="#"
                        class="flex items-center hover:border-gray-500 border border-transparent p-1"
                      >
                        <div class="">
                          <div class="w-10">
                            <div
                              class="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                              <img
                                alt=""
                                src={user.image}
                                class="absolute h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                        <figcaption class="ml-2 truncate-2y leading-5">
                          {user.name !== null
                            ? user.name
                            : user?.infos_lang?.vi?.name}
                        </figcaption>
                      </a>
                    </div>
                  ))}
                </div>

                {users_career_support.length !== 0 &&
                  <p class="text-gray-500 mt-3">
                    {t("Support about career in japan")}:
                                </p>
                }
                <div class="grid grid-cols-12 gap-1 mt-1">
                  {users_career_support.map((user, key) => (
                    <div class="col-span-6" key={key}>
                      <a
                        href="#"
                        class="flex items-center hover:border-gray-500 border border-transparent p-1"
                      >
                        <div class="">
                          <div class="w-10">
                            <div
                              class="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                              <img
                                alt=""
                                src={user.image}
                                class="absolute h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                        <figcaption class="ml-2 truncate-2y leading-5">
                        {user.name !== null
                            ? user.name
                            : user?.infos_lang?.vi?.name}
                        </figcaption>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div
                class="w-full md:w-1/3 text-center md:text-left px-3 sm:px-1 mb-2 md:mb-0 pb-3 sm:pb-0"></div>

              <div class="w-full md:w-1/3 md:text-left px-3 sm:px-1 mb-2 md:mb-0 pb-3 sm:pb-0">
                <p class="text-white font-bold text-xl my-3">
                  {t("About PPE")}
                </p>
                <p class="text-gray-500">
                  {t(
                    "PPE is short for Paracel Project Education PPE organizes practical projects for learners to experience The projects cover various aspects of life, such as safe food, Japanese,English, IT, and etc PPE consists of skilled Japaneseteachers, educators, and experienced IT engineers Learners will get enough skills of living, foreign languages, and ITfor joining Japanese companies"
                  )}
                                    .
                                </p>
                <p class="pt-6 flex items-center">
                  <a class="footer link pr-4"
                    href="https://twitter.com/share?text=&url=http://ppe.edu.vn/Course/7"
                    target="_blank"
                  >
                    <svg
                      className="inline fill-current text-brand-ondark w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a class="footerlink pr-4" target=" _blank "
                    href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fppe.edu.vn%2FCourse%2F7&src=sdkpreparse "
                  >
                    <svg
                      className="inline fill-current text-brand-ondark w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a class="footerlink pr-4"
                    href="https://www.youtube.com/channel/UClK5jW8wARTvwpTSllLxEvg">
                    <svg
                      class="inline fill-current text-brand-ondark w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>

      </React.Fragment>
    );
  }
}

export default withTranslation()(Footer);
