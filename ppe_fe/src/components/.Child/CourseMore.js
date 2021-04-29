import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
class CourseMore extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { course, isShowButton } = this.props;
    console.log('course?.more?.google_form_url', course?.more?.google_form_url)
    let { t } = this.props;
    return (
      <div className="lg:col-span-4 col-span-12 lg:mt-5 mt-0">
        <h3 className="text-2xl font-semibold	pt-3 border-t lg:hidden block">
          Prices
        </h3>
        <ul className="sticky top-0 pt-4">
            <li className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                {/* <i className="material-icons text-3xl text-indigo-700">book</i> */}
                <img className="material-icons text-3xl text-indigo-700 rounded-full w-8" src="../assets/images/flags/teacher2.jpg" />
              </div>
              <div className="ml-3">
                <div className="text-xl">{t("Expert instruction")}</div>
                {/* <div className="text-gray-600">{t("High-quality courses")}</div> */}
              </div>
            </li>
        
            <li className="flex items-center mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                <i className="material-icons text-3xl text-indigo-700">
                  person
                </i>
              </div>
              <div className="ml-3">
                <div className="text-xl w-56">{t("Self-paced")}</div>
                {/* <div className="text-gray-600">{t("Progress at your own speed")}</div> */}
              </div>
            </li>
      
          {course?.more?.time && (
            <li className="flex items-center mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                <i className="material-icons text-3xl text-indigo-700">
                  query_builder
                </i>
              </div>
              <div className="ml-3"> 
                <div className="text-xl truncate w-56">{course.more.time}</div>
                {/* <div className="text-gray-600">{t("Mon-Wed-Fri")}, 7:00AM~8:30AM</div> */}
              </div>
            </li>
          )}
          
          {course?.more?.price && (
            <li className="flex items-center mt-5">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                <i className="material-icons text-3xl text-indigo-700">
                  payments
                </i>
              </div>
              <div className="ml-3">
                {(course?.more?.price===0 || course?.syllabus_ids===null) && (
                  <h3 className="text-red-500 text-4xl font-bold">FREE</h3>
                )}
                {!(course?.more?.price===0 || course?.syllabus_ids===null) && (
                  <div>
                  {course?.more?.discount && (
                    <div className="text-xl">
                      <NumberFormat value={course.more.discount} displayType={'text'} thousandSeparator={true}/>
                      <span className="line-through ml-2">
                        <NumberFormat value={course.more.price} displayType={'text'} thousandSeparator={true}/>
                      </span>{" "}
                      {t("$")}
                    </div>
                  )}
                  {!course?.more?.price && (
                    <div className="text-xl">{course.more.price}</div>
                  )}
                  </div>
                )}
                {/* <div className="text-gray-600">
                  {t("For the full program experience")}
                </div> */}
              </div>
            </li>
          )}

            {/* {isShowButton && (course?.more?.google_form_url===''||course?.more?.google_form_url===undefined) && (
            <li className="flex items-center mt-6">
              <Link
                to={`/CourseRegister/${course?.id}`}

                className="bg-indigo-700 text-white h-10 w-full rounded-sm hover:opacity-75 mt-3 flex items-center justify-center "

              >
                <span className=""> {t("Register")}</span>

              </Link>
            </li>
          )} */}
           {/* {isShowButton && !(course?.more?.google_form_url===''||course?.more?.google_form_url===undefined) && ( */}
           <li className="flex items-center mt-6">
              <a
              href={course?.more?.google_form_url}

                className="bg-pink-500 text-white h-10 w-full rounded-sm hover:opacity-75 mt-3 flex items-center justify-center "

              >
                <span className=""> {t("Register")}</span>
              </a>
            </li>
            {/* )} */}
          {/* {isShowButton && (
            <li className="flex items-center mt-6">
               {(course?.more?.google_form_url===0 || course?.more?.google_form_url===null) && (
              <a
                // href={`/CourseRegister/${course?.id}`}
                href={course.more.google_form_url}
                className="bg-indigo-700 text-white h-10 w-full rounded-sm hover:opacity-75 mt-3 flex items-center justify-center "

              >
                
                <span className=""> {t("Register")}</span>

              </a>
               )}

            </li>
          )} */}


          {/* {isShowButton && ( */}
            {/* <li className="flex items-center mt-6">
              <a
                // to={`google.com`}
                href="https://www.google.com/"
                className="bg-indigo-700 text-white h-10 w-full rounded-sm hover:opacity-75 mt-3 flex items-center justify-center "

              >
                <span className=""> {t("Register")}</span>

              </a>
            </li> */}
          {/* )} */}
          <li className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-gray-600">
              {t("Introduce the course to friends")}:
            </h4>
            <div className="pt-2 flex items-center text-indigo-700">
                <a
                  className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full"
                  href="https://twitter.com/share?text=&url=http://ppe.edu.vn/Course/7" target="_blank"
                >
                  <svg
                    className="inline fill-current text-brand-ondark w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              <a
                className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full ml-4"
                 target = " _blank " href = "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fppe.edu.vn%2FCourse%2F7&src=sdkpreparse "
              >
                <svg
                  className="inline fill-current text-brand-ondark w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a
                className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full ml-4"
                href="https://www.youtube.com/channel/UClK5jW8wARTvwpTSllLxEvg"
              >
                <svg
                  className="inline fill-current text-brand-ondark w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
export default withTranslation()(CourseMore);
