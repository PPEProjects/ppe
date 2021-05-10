import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./.Dir/Header";
import Footer from "./.Dir/Footer";
import { withTranslation } from "react-i18next";
import Ajax from "./.Tools/Ajax";
import JobList from "./.Child/JobList";
import JobSidebar from "./.Child/JobSidebar";
import JobMore from "./.Child/JobMore";
import JobHeaderSlider from "./.Child/JobHeaderSlider";
import moment from "moment";

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: `loading`,
      job_id: 0,
      job: {},
      company: {},
      reviews: [],
      users: {},
    };
  }

  async componentDidMount() {
    this.setState({ status: "loading" });
    let job_id = this.props.match.params.job_id;
    let job = await Ajax.get(`/jobs/${job_id}`);
    job = job?.data ?? {};
    let company = await Ajax.get(`/companies/${job.company_id}`);
    let reviews = await Ajax.get(`/reviews`, { company_id: job.company_id });
    let users = await Ajax.get(`/users`, { keyBy: `id` });
    this.setState({
      status: `success`,
      job_id: job_id,
      job: job,
      company: company?.data ?? {},
      reviews: reviews?.data?.reviews ?? [],
      users: users?.data?.users ?? {},
    });
  }

  async componentDidUpdate() {
    let { job_id } = this.state;
    if (this.props.match.params.job_id !== job_id) {
      job_id = this.props.match.params.job_id;
      this.setState({ job_id: job_id });
      this.componentDidMount();
    }
  }

  set_state(obj) {
    this.setState(obj);
  }

  render() {
    let { status, job_id, job, company, users, reviews } = this.state;
    let { descriptions, members } = job;
    let skills = job?.more?.skills ?? {};
    members = members ?? [];
    descriptions = descriptions ?? [];
    let { t } = this.props;
    return (
      <React.Fragment>
        <Header />
        <main className="">
          <div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl mx-auto lg:px-4 px-4 ">
            <JobHeaderSlider company={company} />
            <JobSidebar company={company} />
            <div className="lg:col-span-9 col-span-12 ">
              <div className="grid grid-cols-12 gap-4">
                <div className="lg:col-span-8 col-span-12 ">
                  <section className="">
                    <h1 className="text-3xl">{job.title}</h1>
                    <div className="mt-2  truncate">
                        <a
                          href="#"
                          className="uppercase text-sm border px-2 py-1 text-gray-700 hover:border-red-600 hover:text-red-700"
                        >
                         <span className="">{job?.more?.skills}</span>
                        </p>
                    </div>
                    <div className="">
                      <button
                        type="button"
                        className="bg-transparent text-gray-800 h-10 flex items-center justify-center mt-3 focus:outline-none"
                      >
                        <i className="material-icons">location_on</i>
                        <span className="ml-2">{job?.more?.address}</span>
                      </button>
                      <button
                        type="button"
                        className="bg-transparent text-gray-800 h-10 flex items-center justify-center focus:outline-none"
                      >
                        <i className="material-icons">date_range</i>
                        <span className="ml-2">
                          {moment(job.created_at).fromNow()}
                        </span>
                      </button>
                    </div>
                    <Link
                      to={`/JobRegister/${job.id}`}
                      className="bg-red-600 text-white h-12 w-full rounded-sm hover:opacity-75 flex items-center justify-center mt-2"
                    >
                      <i className="material-icons">arrow_forward</i>
                      <span className="ml-2 uppercase font-semibold">
                        {t("apply now")}
                      </span>
                    </Link>
                  </section>

                  {descriptions.map((item, key) => (
                    <section className="" key={key}>
                      <h3 className="text-2xl font-semibold mt-4">
                        {item.heading}
                      </h3>
                      <p className="leading-7 mt-3 whitespace-pre-wrap ">{item.value}</p>
                    </section>
                  ))}
                </div>
                <div className="lg:col-span-4 col-span-12 ">
                  <section className="mt-1 bg-gray-200 py-3 px-3">
                    <h3 className="text-2xl leading-8">
                      {t("Overall Rating")}{" "}
                      <span className="text-gray-600">{company.name}</span>
                    </h3>
                    <div className="flex items-center mt-4">
                      <div className="flex ">
                        {[...Array(5)].map((item, key) => (
                          <button
                            key={key}
                            type="button"
                            className={`${
                              key ? `ml-2` : ``
                            } bg-blue-500 text-white h-10 w-10 rounded hover:opacity-75 flex items-center justify-center`}
                          >
                            <i className="material-icons">star</i>
                          </button>
                        ))}
                      </div>
                      <h3 className="ml-2 text-blue-600 text-xl">4.4</h3>
                    </div>
                  </section>
                  <section className="mt-5 bg-gray-200 py-3 px-3">
                    <h3 className="text-2xl leading-8 font-light">
                      {t("Top reviews")}
                    </h3>
                    <ul className="">
                      {reviews.map((review, key) => (
                        <li
                          className="mt-3 pt-3 border-t border-white"
                          key={key}
                        >
                          <h3 className="text-xl leading-6">
                            '{review.title}'
                          </h3>
                          <div className="flex mt-2">
                            {[...Array(5)].map((item, key) => (
                              <button
                                key={key}
                                type="button"
                                className={`${
                                  key ? `ml-1` : ``
                                } bg-blue-500 text-white h-4 w-4 rounded-sm hover:opacity-75 flex items-center justify-center`}
                              >
                                <i className="material-icons text-xs">star</i>
                              </button>
                            ))}
                          </div>
                          <p className="mt-2 whitespace-pre-wrap">{review.content}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
              <section className="w-full max-w-screen-xl mx-auto mt-8 ">
                <h3 className="flex items-center text-2xl uppercase lg:mx-0 ">
                  <span className="pl-2 pb-1 font-light w-full">
                    {t("Another jobs")}
                  </span>
                </h3>
              </section>
              <section className="w-full max-w-screen-xl mx-auto ">
                <JobList />
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}
export default withTranslation()(Job);
