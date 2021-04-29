import React, {Component} from "react";
import Ajax from "../../components/Ajax";
import {Input, Radio, Textarea, Checkbox} from "../../components/Form";
import FormUploadVideo from "../../components/FormUploadVideo";

class UsersFormTypeInstructor extends Component {
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
                        instructor</h2>
                    <div className="">
                        <h3 className="-mb-2 mt-2 font-semibold text-red-600">[Vietnamese]</h3>
                        <label className="block mt-4">
                            <div className="flex -mb-3"><span className="block font-medium">About Me</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Textarea
                                name={`infos_lang[vi][about_me]`}
                                placeholder={`Enter some information about this Instructor`}
                                value={user?.infos_lang?.vi?.about_me}
                            />
                        </label>

                        <label className="block mt-4">
                            <div className="flex -mb-3"><span className="block font-medium">Highest School (University, Institutes, etc)  where you graduated</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Input name={`infos_lang[vi][universities]`} type={`text`}
                                   value={user?.infos_lang?.vi?.universities}/>

                        </label>

                        <label className="block mt-4">
                            <div className="flex -mb-3"><span className="block font-medium">Areas of expertise</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Textarea
                                name={`infos_lang[vi][expertise]`}
                                placeholder={`Enter areas of expertise (sperate by line)`}
                                value={user?.infos_lang?.vi?.expertise}
                            />
                        </label>
                    </div>
                    <div className="">
                        <h3 className="-mb-2 mt-2 font-semibold text-red-600">[English]</h3>
                        <label className="block mt-4">
                            <div className="flex -mb-3"><span className="block font-medium">About Me</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Textarea
                                name={`infos_lang[en][about_me]`}
                                placeholder={`Enter some information about this Instructor`}
                                value={user?.infos_lang?.en?.about_me}
                            />
                        </label>

                        <label className="block mt-4">
                            <div className="flex -mb-3"><span className="block font-medium">Highest School (University, Institutes, etc)  where you graduated</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Input name={`infos_lang[en][universities]`} type={`text`}
                                   value={user?.infos?.en?.universities}/>

                        </label>

                        <label className="block mt-4">
                            <div className="flex -mb-3"><span className="block font-medium">Areas of expertise</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Textarea
                                name={`infos_lang[en][expertise]`}
                                placeholder={`Enter areas of expertise (sperate by line)`}
                                value={user?.infos_lang?.en?.expertise}
                            />
                        </label>
                    </div>
                    <div className="">
                        <h3 className="-mb-2 mt-2 font-semibold text-red-600">[Japanese]</h3>
                        <label className="block mt-4">
                            <div className="flex -mb-3"><span className="block font-medium">About Me</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Textarea
                                name={`infos_lang[jp][about_me]`}
                                placeholder={`Enter some information about this Instructor`}
                                value={user?.infos_lang?.jp?.about_me}
                            />
                        </label>

                        <label className="block mt-4">
                            <div className="flex -mb-3"><span className="block font-medium">Highest School (University, Institutes, etc)  where you graduated</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Input name={`infos_lang[jp][universities]`} type={`text`}
                                   value={user?.infos_lang?.jp?.universities}/>

                        </label>

                        <label className="block mt-4">
                            <div className="flex -mb-3"><span className="block font-medium">Areas of expertise</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Textarea
                                name={`infos_lang[jp][expertise]`}
                                placeholder={`Enter areas of expertise (sperate by line)`}
                                value={user?.infos_lang?.jp?.expertise}
                            />
                        </label>
                    </div>
                </section>
                <section
                    className={`${
                        show !== 3 ? `hidden` : ``
                    } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6`}
                >
                    <h2 className=" text-gray-600 font-semibold">Register information for the role of Japanese
                        instructor</h2>

                    <FormUploadVideo label={<><span className=" font-medium" name={`infos[video_url]`} type={`file`}
                                                    value={user?.infos?.video_url}>Self introduction video</span></>}/>


                    <Input title={`Social links`} name={`infos[social_links]`} type={`url`}
                           value={user?.infos?.social_links}/>

                    <Input title={`Youtube video url`} name={`infos[youtube_url]`} type={`url`}
                           value={user?.infos?.youtube_url}/>
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

export default UsersFormTypeInstructor;
