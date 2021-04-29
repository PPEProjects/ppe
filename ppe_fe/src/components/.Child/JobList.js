import React, { Component } from "react";
import { Link } from "react-router-dom";
import Ajax from "../.Tools/Ajax";
import moment from "moment";
import { withTranslation } from "react-i18next";
class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      companies: {},
    };
  }

  set_state(obj) {
    this.setState(obj);
  }

  async componentDidMount() {
    let jobs = await Ajax.get(`/jobs`,{ status: `Activated` });
    let companies = await Ajax.get(`/companies`, { keyBy: `id` });
    this.setState({
      jobs: jobs?.data?.jobs ?? [],
      companies: companies?.data?.companies ?? {},
    });
  }

  render() {
    let { jobs, companies } = this.state;
    let { t } = this.props;
    return (
      <React.Fragment>
        {jobs.map((job, key) => (
          <Link
            to={`/Job/${job.id}`}
            className="grid grid-cols-12 gap-4 p-3 mt-4 rounded-sm border border-transparent shadow-lg pb-4 hover:border-red-300 hover:shadow-xl"
          >
            <div className="lg:col-span-10 col-span-8">
              <h4 className="truncate-2y text-xl leading-6 text-red-600">
                {job.title}
              </h4>
              <div className="text-sm ">
                <div className="uppercase flex mt-1 truncate">
                  <span className="text-gray-500 ">
                    {companies[job.company_id].name}
                  </span>
                  <button className="flex items-center justify-center rounded-sm font-semibold bg-gray-200 px-2 ml-2 <?= $job['type']=='Full Time' ? 'text-blue-600' : '' ?> ">
                    <span className="">{job.type}</span>
                  </button>
                </div>
                <div className="flex items-center text-gray-600 mt-3 truncate">
                  <i className="material-icons text-lg">add_location_alt</i>
                  <span className="ml-1">{job.more.address}</span>
                </div>
                <div className="flex items-center mt-1 truncate">
                  <i className="material-icons text-lg">style</i>
                  <span className="ml-1">
                    {companies[job.company_id].more.category}
                  </span>
                </div>
                <div className="flex items-center mt-1 text-red-600 truncate">
                  <i className="material-icons text-lg">attach_money</i>
                  <span className="ml-1">
                    {job?.more?.salary?.from}～{job?.more?.salary?.to} (VND) /{" "}
                    {job?.more?.salary?.time}
                  </span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 col-span-4 ">
              <figure className="">
                <div className="w-full">
                  <div className="pb-3x1 relative rounded-sm overflow-hidden bg-gray-300">
                    <img
                      alt=""
                      src={companies[job.company_id].image}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                </div>
              </figure>
           
              <Link
                to={`/JobRegister/${job.id}`}
                className="bg-red-600 text-white h-8 w-full rounded-sm hover:opacity-75 flex items-center justify-center mt-2"
              >
                <span className="uppercase font-semibold">{t("Apply")}</span>
              </Link>
              <p className="text-center mt-3 text-gray-500 uppercase text-xs">
                {moment(job.created_at).fromNow()}
              </p>
            </div>
            <div className="col-span-12 leading-5 text-sm truncate-2y lg:mt-0 -mt-2">
              {companies[job.company_id].about_us}
            </div>
          </Link>
        ))}
      </React.Fragment>
    );
  }
}
export default withTranslation()(JobList);
