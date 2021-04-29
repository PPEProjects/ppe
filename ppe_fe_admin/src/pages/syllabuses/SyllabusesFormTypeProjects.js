import React, { Component } from "react";
import Ajax from "../../components/Ajax";
import { Input, Radio } from "../../components/Form";

class SyllabusesFormTypeProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  async componentDidMount() {
    let projects = await Ajax.get(`/projects`);
    this.setState({
      projects: projects?.data?.projects ?? [],
    });
  }

  render() {
    let { projects } = this.state;
    let { show } = this.props;
    return (
      <React.Fragment>
        <section
          className={`${
            show !== 2 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">
             Register information (1/2)
          </h2>
          <Radio
            title={`Gender`}
            values={[`Male`, `Female`, `15:00~16:30 PM`, `19:30~21:00 PM`]}
            name={`infos[gender]`}
          />

          <Input title={`Birthday`} name={`infos[birthday]`} type={`date`} />

          <Input title={`Phone`} name={`infos[phone]`} type={`tel`} />

          <Input title={`Email`} name={`infos[email]`} type={`email`} />

          <Input title={`Major`} name={`infos[major]`} type={`text`} />
        </section>
        <section
          className={`${
            show !== 3 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">
             Register information (2/2)
          </h2>
          <Input title={`School`} name={`infos[school]`} type={`text`} />

          <Input title={`Hobby`} name={`infos[hobby]`} type={`text`} />

          <Input
            title={`Facebook ID`}
            name={`infos[facebook_id]`}
            type={`text`}
          />

          <Input title={`Zalo ID`} name={`infos[zalo_id]`} type={`text`} />

          <Input title={`Line ID`} name={`infos[line_id]`} type={`text`} />
        </section>
        <section
          className={`${
            show !== 4 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">Register info</h2>
          <label className="block mt-4">
            <span className="block font-medium">Project</span>
            <select
              name={`infos[project_id]`}
              className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 activate:border-blue-500"
            >
              <option value="">Choose project to join</option>
              {projects.map((project, key) => (
                <option key={key} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>
          {/* <Radio
            title={`Day to join`}
            values={[
              `Monday, Wednesday, Friday`,
              `Tuesday, Thursday, Saturday`,
            ]}
            name={`infos[day_to_join]`}
          />

          <Radio
            title={`Time to join`}
            values={[
              `7:00~8:30 AM`,
              `9:00~10:30 AM`,
              `15:00~16:30 PM`,
              `19:30~21:00 PM`,
            ]}
            name={`infos[time_to_join]`}
          /> */}
        </section>
      </React.Fragment>
    );
  }
}

export default SyllabusesFormTypeProjects;
