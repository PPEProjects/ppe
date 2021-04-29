import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./.Dir/Header";
import Alert from "./.Tools/Alert";
import Ajax from "./.Tools/Ajax";
import SubmitButton from "./.Tools/SubmitButton";
import ProjectSidebar from "./.Child/ProjectSidebar";
import ProjectMore from "./.Child/ProjectMore";
import { withTranslation } from "react-i18next";
import RegisterForm from "./.Child/RegisterForm";

// const utilizeFocus = () => {
//   const ref = React.createRef()
//   const setFocus = () => {ref.current &&  ref.current.focus()}

//   return {setFocus, ref}
// }

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: `loading`,
      errors: {},
      data: {},
      project_id: 0,
      project: {},
      projects:[]
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.inputFocus = utilizeFocus()

  }

  async componentDidMount() {
    let obj = await this.loadData();
    this.setState({ status: "loading" });
    let projects = await Ajax.get(`/projects`,{ status: `Activated`});
    projects = projects?.data?.projects ?? [];
    let project_id = this.props.match.params.project_id;
    let project = projects.filter((project) => project.id == project_id)[0];

    // let project_id = this.props.match.params.project_id;
    // let project = await Ajax.get(`/projects/${project_id}`);
    this.setState({
      status: ``,
      errors: {},
      // show: 1,
      project_id: project_id,
      // project: project?.data ?? {},
      projects:projects,
      project:project,
    });
    // this.inputFocus.setFocus()

  }

  async loadData() {
    let projects = await Ajax.get(`/projects`,{ status: `Activated`});
    projects = projects?.data?.projects ?? [];
    let project_id = this.props.match.params.project_id;
    let project = projects.filter((project) => project.id == project_id)[0];
    // let teachers = await Ajax.get(`/users`, {
    //   user_ids: Object.keys(course?.teachers??{}),
    // });
 let obj = {
      status: `success`,
      project_id: project_id,
      projects: projects ?? [],
      project: project ?? {},
      // teachers: teachers?.data?.users || [],
    }
    return obj;

    // let { project_id } = this.state;
    // if (this.props.match.params.project_id !== project_id) {
    //   project_id = this.props.match.params.project_id;
    //   this.setState({ project_id: project_id });
    //   this.componentDidMount();
    // }
  }

  set_state(obj) {
    this.setState(obj);
  }

  // async handleSubmit(e) {
  //   e.preventDefault();
  //   let { project_id } = this.state;
  //   if (this.props.match.params.project_id !== project_id) {
  //     project_id = this.props.match.params.project_id;
  //     this.setState({ project_id: project_id });
  //     this.componentDidMount();
  //   }
  //   this.setState({ status: "loading" });
  //   const params = new FormData(e.target);
  //   let res = await Ajax.post(`/users`, params);
  //   this.setState(res);
  //   const { history } = this.props;
  //   if(!res.errors) history.push(`/Project/${project_id}`);

  // }

  render() {
    let { status, errors, data, project_id, project,projects, show } = this.state;
    let { t } = this.props;
    const { history } = this.props;
    return (
      <React.Fragment>
        <Alert
          status={status}
          errors={errors}
          success={[
            `Register to join success: `,
            <b class="font-bold">{data?.name}</b>,
          ]}
        />
        <Header />
        <main className="">
          <div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl mx-auto lg:px-4 px-4 ">
            <ProjectSidebar project={project} project_id={project_id} />
            <div className="lg:col-span-9 col-span-12">
              <section className="w-full max-w-screen-xl mx-auto ">
                <div className="grid grid-cols-12 gap-4">
                  {/* <form
                    onSubmit={this.handleSubmit}
                    className="lg:col-span-8 col-span-12 lg:mt-6 mt-4 bg-yellow-200 px-4 py-4 "
                  >
                    
                    <section className={show !== 1 ? `hidden` : ``}>
                    <h2 className="font-semibold text-lg">
                        {t("Your information")} (1/2)
                      </h2>
                      <label className="block mt-4">
                      <div className="flex"><span className="block font-medium">Email</span><b className="text-red-600 ml-1"> (*)</b></div>
                        <input

                            ref={this.inputFocus.ref}
                          type="email"
                          name={`infos[email]`}
                          className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 "
                        />
                      </label>
                      <label className="block mt-4">
                      <div className="flex"><span className="block font-medium">
                          {t("Full name")}
                        </span><b className="text-red-600 ml-1"> (*)</b></div>
                        <input
                          type="text"
                          name={`name`}
                          className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 "
                        />
                      </label>
                      <div className="mt-4">
                        <span className="block font-medium">{t("Gender")}</span>
                        <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                          <input
                            type="radio"
                            name={`infos[gender]`}
                            value={`Male`}
                          
                          />
                          <span className="ml-2">{t("Male")}</span>
                        </label>
                        <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                          <input
                            type="radio"
                            name={`infos[gender]`}
                            value={`Female`}
                          />
                          <span className="ml-2">{t("Female")}</span>
                        </label>
                        <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                          <input
                            type="radio"
                            name={`infos[gender]`}
                            value={`Other`}
                          />
                          <span className="ml-2">{t("Other")}</span>
                        </label>
                      </div>
                      <label className="block mt-4">
                        <span className="block font-medium">
                          {t("Birthday")} <b className="text-red-600">(*)</b>
                        </span>
                        <input
                          type="date"
                          max="9999-12-31"
                          name={`infos[birthday]`}
                          className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 activate:border-blue-500"
                        />
                      </label>
                      <label className="block mt-4">
                      <div className="flex"><span className="block font-medium">{t("Phone")}</span><b className="text-red-600 ml-1"> (*)</b></div>
                        <input
                          type="number"
                          name={`infos[phone]`}
                          className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 "
                        />
                      </label>
                    
                      <label className="block mt-4">
                      <div className="flex"><span className="block font-medium">{t("Major")}</span><b className="text-red-600 ml-1"> (*)</b></div>
                        <input
                          type="text"
                          name={`infos[major]`}
                          className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 "
                        />
                      </label>
                    </section>
                    <section className={show !== 2 ? `hidden` : ``}>
                      <h2 className="font-semibold text-lg">
                        {t("Your information")} (2/2)
                      </h2>
                      <label className="block mt-4">
                      <div className="flex"><span className="block font-medium">{t("Input your current working place or university")}</span><b className="text-red-600 ml-1"> (*)</b></div>
                        <input
                          type="text"
                          name={`infos[school]`}
                          className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 activate:border-blue-500"
                        />
                      </label>
                      <label className="block mt-4">
                      <div className="flex"><span className="block font-medium">{t("Hobby")}</span><b className="text-red-600 ml-1"> (*)</b></div>
                        <input
                          type="text"
                          name={`infos[hobby]`}
                          className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 activate:border-blue-500"
                        />
                      </label>
                      <label className="block mt-4">
                        <span className="block font-medium">
                          {t("Facebook ID")}
                        </span>
                        <input
                          type="text"
                          name={`infos[facebook_id]`}
                          className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 activate:border-blue-500"
                        />
                      </label>
                      <label className="block mt-4">
                        <span className="block font-medium">Zalo ID</span>
                        <input
                          type="text"
                          name={`infos[zalo_id]`}
                          className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 activate:border-blue-500"
                        />
                      </label>
                      <label className="block mt-4">
                        <span className="block font-medium">Line ID</span>
                        <input
                          type="text"
                          name={`infos[line_id]`}
                          className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 activate:border-blue-500"
                        />
                      </label>
                    </section>
                    <section className={show !== 3 ? `hidden` : ``}>
                     <h2 className="font-semibold text-lg">
                        {t("You want to take the course of")}:
                      </h2>
                      <div className="mt-4">
                        <span className="block font-medium">
                          {t("Day to join")} <b className="text-red-600">(*)</b>
                        </span>
                        <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                          <input
                            type="radio"
                            name={`infos[day_to_join]`}
                           
                          />
                          <span className="ml-2">
                            {t("Monday, Wednesday, Friday")}
                          </span>
                        </label>
                        <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                          <input
                            type="radio"
                            name={`infos[day_to_join]`}
                          />
                          <span className="ml-2">
                            {t("Tuesday, Thursday, Saturday")}
                          </span>
                        </label>
                      </div>
                      <div className="mt-4">
                        <span className="block font-medium">
                          {t("Time to join")} <b className="text-red-600">(*)</b>
                        </span>
                        <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                          <input
                            type="radio"
                            name={`infos[time_to_join]`}
                           
                          />
                          <span className="ml-2">7:00~8:30 AM</span>
                        </label>
                        <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                          <input
                            type="radio"
                            name={`infos[time_to_join]`}
                           
                          />
                          <span className="ml-2">9:00~10:30 AM</span>
                        </label>
                        <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                          <input
                            type="radio"
                            name={`infos[time_to_join]`}
                           
                          />
                          <span className="ml-2">15:00~16:30 PM</span>
                        </label>
                        <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                          <input
                            type="radio"
                            name={`infos[time_to_join]`}
                           
                          />
                          <span className="ml-2">19:30~21:00 PM</span>
                        </label>
                      </div>
                    </section>

                    <section className="flex items-center justify-between text-sm mt-6 ">
                      <Link
                        to={`/Project/${project_id}`}
                        className="bg-gray-300 text-gray-800 h-10 px-4 rounded-md hover:bg-gray-400 flex items-center justify-center"
                      >
                        <span className="font-semibold">Cancel</span>
                      </Link>
                      <section className={show == 1 ? `hidden` : ``}>
                      <div className="flex">
                        <button
                          type={`button`}
                          onClick={() => this.set_state({ status: '',show: show - 1 })}
                          className="cursor-pointer bg-gray-300 text-gray-800 h-10 w-12 rounded-md rounded-r-none hover:bg-gray-400 flex items-center justify-center"
                        >
                          <i className="material-icons">arrow_back</i>
                        </button>
                        <div className={show == 2 || show==3 ? `hidden` : ``} >
                        <button
                         disabled={show == 3}
                          type={`button`}
                          onClick={() => this.set_state({ status: '', show: show + 1 })}
                          className="cursor-pointer bg-gray-300 text-gray-800 h-10 w-12 rounded-md rounded-l-none hover:bg-gray-400 border-l-2 border-white flex items-center justify-center"
                        >
                          <i className="material-icons">arrow_forward</i>
                        </button>
                        </div>
                      </div>
                      </section>
                      <div className={show == 3 ? `hidden` : ``} >
                      <button
                          type={`button`}
                          onClick={() => this.set_state({ show: show + 1 })}
                          className="w-20 bg-gray-300 text-gray-800 h-10 px-4 rounded-md hover:bg-gray-400 flex items-center justify-center"
                        >
                        <span>Next</span>
                        </button>
                        </div>
                        <div className={show == 3 ? `` : `hidden`} >
                      <SubmitButton
                        className={`w-32 rounded-md font-semibold`}
                        name={`Save`}
                        status={status}
                      />
                     <input type="hidden" name="infos[project_id]" value={project_id}/>

                      </div>
                      <input
                        type="hidden"
                        value={`user_register`}
                        name={`user_register`}
                      />
                      <input type="hidden" name={`types[IT project member]`} value={`on`} />
                    </section>
                  </form> */}
                  <RegisterForm type={`project`} type_id={project_id}/>

                  <ProjectMore project={project} isShowButton={false} />
                </div>
              </section>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
export default withTranslation()(Project);
