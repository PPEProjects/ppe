import React, { Component } from "react";
import Ajax from "../../components/Ajax";
import { Input, Radio } from "../../components/Form";

class SyllabusesFormTypeJapanese extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  async componentDidMount() {
    let courses = await Ajax.get(`/courses`);
    this.setState({
      courses: courses?.data?.courses ?? [],
    });
  }

  render() {
    let { courses } = this.state;
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
            values={[`Male`, `Female`]}
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
            <span className="block font-medium">Course</span>
            <select
              name={`infos[course_id]`}
              className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 activate:border-blue-500"
            >
              <option value="">Choose course to join</option>
              {courses.map((course, key) => (
                <option key={key} value={course.id}>
                  {course.name}
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

export default SyllabusesFormTypeJapanese;
