import React, {Component} from "react";
import Ajax from "../../components/Ajax";
import {Input, Radio} from "../../components/Form";

class UsersFormTypeJapanese extends Component {
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
        let {courses} = this.state;
        let {show, user} = this.props;
        return (
            <React.Fragment>
                <section
                    className={`${
                        show !== 2 ? `hidden` : ``
                    } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
                >
                    <h2 className=" text-gray-600 font-semibold">Register information for the role of Japanese
                        learner</h2>
                    {/* <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Email</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Input name={`infos[email]`} type={`email`} value={user?.infos?.email}/>
                    </label> */}
                    <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Major</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Input name={`infos[major]`} type={`text`} value={user?.infos?.major}/>
                    </label>
                    <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Gender</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Radio

                            values={[`Male`, `Female`, `Other`]}
                            name={`infos[gender]`}
                            value={user?.infos?.gender}
                        />
                    </label>
                    <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Birthday</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Input name={`infos[birthday]`} type={`date`} value={user?.infos?.birthday}/>
                    </label>
                    <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Phone</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Input name={`infos[phone]`} type={`tel`} value={user?.infos?.phone}/>
                    </label>
                    <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Input your current working place or university</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Input name={`infos[school]`} type={`text`} value={user?.infos?.school}/>
                    </label>
                    <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Hobby</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Input name={`infos[hobby]`} type={`text`} value={user?.infos?.hobby}/>
                    </label>
                    <Input
                        title={`Facebook ID`}
                        name={`infos[facebook_id]`}
                        type={`text`}
                        value={user?.infos?.facebook_id}
                    />

                    <Input title={`Zalo ID`} name={`infos[zalo_id]`} type={`text`} value={user?.infos?.zalo_id}/>
                    <Input title={`Line ID`} name={`infos[line_id]`} type={`text`} value={user?.infos?.line_id}/>
                </section>
                {/*<section
                    className={`${
                        show !== 3 ? `hidden` : ``
                    } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
                >
                    <h2 className=" text-gray-600 font-semibold">Register information for the role of Japanese
                        learner</h2>
                </section>*/}
                <section
                    className={`${
                        show !== 3 ? `hidden` : ``
                    } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
                >
                    <h2 className=" text-gray-600 font-semibold">Register information for the role of Japanese
                        learner</h2>
                    <label className="block mt-4">
                        <div className="flex"><span className="block font-medium">Course</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
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
                    {/* <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Day to join</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Radio

                            values={[
                                `Monday, Wednesday, Friday`,
                                `Tuesday, Thursday, Saturday`,
                            ]}
                            name={`infos[day_to_join]`}
                            value={user?.infos?.day_to_join}
                        />
                    </label>
                    <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Time to join</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Radio
                            values={[
                                `7:00~8:30 AM`,
                                `9:00~10:30 AM`,
                                `15:00~16:30 PM`,
                                `19:30~21:00 PM`,
                            ]}
                            name={`infos[time_to_join]`}
                            value={user?.infos?.time_to_join}
                        />
                    </label> */}
                </section>
            </React.Fragment>
        );
    }
}

export default UsersFormTypeJapanese;
