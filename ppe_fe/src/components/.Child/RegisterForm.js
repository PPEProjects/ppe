import React, {Component} from "react";
import {Link} from "react-router-dom";
import SubmitButton from "../.Tools/SubmitButton";
import Ajax from "../.Tools/Ajax";
import {withTranslation} from "react-i18next";
import Cookies from "universal-cookie";
import Alert from "../.Tools/Alert";

const utilizeFocus = () => {
    const ref = React.createRef()
    const setFocus = () => {
        ref.current && ref.current.focus()
    }
    return {setFocus, ref}
}

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: `loading`,
            errors: {}, 
            data: {},
            type: this.props.type,
            type_id: this.props.type_id,
            course_id: 0,
            course: {},
            courses: [],
            project:{},
            projects:[],
            project_id:0,
            job:{},
            jobs:[],
            job_id:0,
            show: 0,
            access_token: null,
            email: null,
        };
        this.emailInput = utilizeFocus()
        this.passwordInput = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserCheckExits = this.handleUserCheckExits.bind(this);
        this.handleUserSignIn = this.handleUserSignIn.bind(this);
    }

    async componentDidMount() {
        const cookies = new Cookies();
        let access_token = cookies.get("access_token");
        console.log('access_token', access_token)
        this.setState({access_token, show: access_token ? 4 : 0})
        this.emailInput.setFocus()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            type: nextProps.type,
            type_id: nextProps.type_id,
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        let {type, type_id} = this.state;
        this.setState({status: "loading"});
        const params = new FormData(e.target);
        let res = await Ajax.post(`/users`, params);
        this.setState(res);
        const { history } = this.props;
        if (!res.errors) window.location.assign(`/${type}/${type_id}`);
    }

    async handleUserCheckExits(e) {
        e.preventDefault();
        console.log('e.target.value', e.target.value)
        const value = e.target.value
        let params = {email: value, userCheckExits: `userCheckExits`}
        let res = await Ajax.post(`/users`, params);
        if(res.status===`success`){
            this.setState({show : 0.5})
            return;
        }
        console.log('value', value)
        this.setState({
            show: 1,
        })
        // this.setState(res);
    }

    async handleUserSignIn(e) {
        e.preventDefault();
        const cookies = new Cookies();
        this.setState({ status: "loading" });
        let params = {
            email: this.emailInput.ref.current.value,
            password: this.passwordInput.current.value,
            sign_in: `sign_in`
        }
        let res = await Ajax.post(`/users`, params);
        if (res.status === "success") {
            cookies.set("access_token", res.data.access_token, { path: "/" });
            cookies.set("user", JSON.stringify(res.data.user), { path: "/" });
            this.setState({ show: 4 });
            // window.location.assign(
            //     `${window.$admin}/auth?access_token=${res.data.access_token}`
            // );

            return;
        }
        this.setState(res);
    }

    set_state(obj) {
        this.setState(obj);
    }

    render() {
        let {status, errors, data,type, type_id, show, email} = this.state;
        console.log('show', show)
        const {t} = this.props;
        const { history } = this.props;
        return (
            <>

                <Alert
                    status={status}
                    errors={errors}
                    success={[
                        `Register success: `,
                        <b class="font-bold">{data?.name}</b>,
                    ]}
                />
                <form
                    onSubmit={this.handleSubmit}
                    className="lg:col-span-8 col-span-12 lg:mt-6 mt-4 bg-yellow-200 px-4 py-4 "
                >
                    <section className={show >= 1 ? `hidden` : ``}>
                        <h2 className="font-semibold text-lg">
                            {t("Your information")}
                        </h2>
                        <label className="block mt-4">
                            <div className="flex"><span className="block font-medium">Email</span><b
                                className="text-red-600 ml-1">(*)</b></div>
                            <input
                                // onBlur={(e) => this.handleUserCheckExits(e)}
                                ref={this.emailInput.ref}
                                name={`email`}
                                className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 "
                                novalidate
                                value={email}
                                onChange={(e) => {this.set_state({email:e.target.value});this.handleUserCheckExits(e)}}
                            />
                        </label>
                        { show===0.5 &&
                        <>
                            <label className="block mt-4">
                                <div className="flex"><span className="block font-medium">Password</span><b
                                    className="text-red-600 ml-1">(*)</b></div>
                                <input
                                    ref={this.passwordInput}
                                    type="password"
                                    name={`infos[password]`}
                                    className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 "
                                />
                            </label>
                            <button
                                type={`button`}
                                onClick={this.handleUserSignIn}
                                className="mt-3 px-3 bg-gray-300 text-gray-800 h-10 px-4 rounded-md hover:bg-gray-400 flex items-center justify-center"
                            >
                                <span>Sign-In</span>
                            </button>
                        </>
                        }
                        {/*{ show!==0.5 &&
                        <button
                            type={`button`}
                            onClick={this.handleUserCheckExits}
                            className="mt-3 px-3 bg-gray-300 text-gray-800 h-10 px-4 rounded-md hover:bg-gray-400 flex items-center justify-center"
                        >
                            <span>Account Check</span>
                        </button>
                        }*/}

                    </section>
                    <section className={show !== 1 ? `hidden` : ``}>
                        <h2 className="font-semibold text-lg">
                            {t("Your information")} (1/2)
                        </h2>
                        <label className="block mt-4">
                            <div className="flex"><span className="block font-medium">Email</span><b
                                className="text-red-600 ml-1">(*)</b></div>
                            <input
                                // onBlur={(e) => this.handleUserCheckExits(e)}
                                type="email"
                                name={`infos[email]`}
                                // readOnly={true}
                                value={email}
                                onChange={(e) => {this.set_state({email:e.target.value});this.handleUserCheckExits(e)}}
                                className=" border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 "
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
                            <div className="flex"><span className="block font-medium">{t("Phone")}</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <input
                                type="number"
                                name={`infos[phone]`}
                                className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 "
                            />
                        </label>

                        <label className="block mt-4">
                            <div className="flex"><span className="block font-medium">{t("Major")}</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
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
                            <div className="flex"><span
                                className="block font-medium">{t("Input your current working place or university")}</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <input
                                type="text"
                                name={`infos[school]`}
                                className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 activate:border-blue-500"
                            />
                        </label>
                        <label className="block mt-4">
                            <div className="flex"><span className="block font-medium">{t("Hobby")}</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
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
                    <section className={show < 3 ? `hidden` : ``}>
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
                                        value={`Monday, Wednesday, Friday`}
                                />
                                <span className="ml-2">
                            {t("Monday, Wednesday, Friday")}
                          </span>
                            </label>
                            <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                                <input
                                    type="radio"
                                    name={`infos[day_to_join]`}
                                    value={`Tuesday, Thursday, Saturday`}
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
value={`7:00~8:30 AM`}
                                />
                                <span className="ml-2">7:00~8:30 AM</span>
                            </label>
                            <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                                <input
                                    type="radio"
                                    name={`infos[time_to_join]`}
                                    value={`9:00~10:30 AM`}
                                />
                                <span className="ml-2">9:00~10:30 AM</span>
                            </label>
                            <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                                <input
                                    type="radio"
                                    name={`infos[time_to_join]`}
                                    value={`15:00~16:30 PM`}
                                />
                                <span className="ml-2">15:00~16:30 PM</span>
                            </label>
                            <label className="flex items-center cursor-pointer mt-1 hover:opacity-95">
                                <input
                                    type="radio"
                                    name={`infos[time_to_join]`}
                                    value={`19:30~21:00 PM`}
                                />
                                <span className="ml-2">19:30~21:00 PM</span>
                            </label>
                        </div>
                        { show === 4 &&
                        <>
                        <SubmitButton
                            className={`mt-4 w-32 rounded-md font-semibold`}
                            name={`Save`}
                            status={status}
                        />
                            <input
                            type="hidden"
                            value={`user_registerLogin`}
                            name={`user_registerLogin`}
                            />
                            <input type="hidden" name={`types[${this.getType()}]`} value={`on`}/>
                        </>
                        }
                    </section>
                    {show >=1 && show < 4 &&
                    <section className="flex items-center justify-between text-sm mt-6 ">
                        <Link
                            to={`/${type}/${type_id}`}
                            className="bg-gray-300 text-gray-800 h-10 px-4 rounded-md hover:bg-gray-400 flex items-center justify-center"
                        >
                            <span className="font-semibold">Cancel</span>
                        </Link>
                        <section className={show == 1 ? `hidden` : ``}>
                            <div className="flex">
                                <button
                                    type={`button`}
                                    onClick={() => this.set_state({status: '', show: show - 1})}
                                    className="cursor-pointer bg-gray-300 text-gray-800 h-10 w-12 rounded-md rounded-r-none hover:bg-gray-400 flex items-center justify-center"
                                >
                                    <i className="material-icons">arrow_back</i>
                                </button>
                                <div className={show == 2 || show == 3 ? `hidden` : ``}>
                                    <button
                                        disabled={show == 3}
                                        type={`button`}
                                        onClick={() => this.set_state({status: '', show: show + 1})}
                                        className="cursor-pointer bg-gray-300 text-gray-800 h-10 w-12 rounded-md rounded-l-none hover:bg-gray-400 border-l-2 border-white flex items-center justify-center"
                                    >
                                        <i className="material-icons">arrow_forward</i>
                                    </button>
                                </div>

                            </div>
                        </section>
                        <div className={show == 3 ? `hidden` : ``}>
                            <button
                                type={`button`}
                                onClick={() => this.set_state({show: show + 1})}
                                className="w-20 bg-gray-300 text-gray-800 h-10 px-4 rounded-md hover:bg-gray-400 flex items-center justify-center"
                            >
                                <span>Next</span>
                            </button>
                        </div>
                        <div className={show == 3 ? `` : `hidden`}>
                            <SubmitButton
                                className={`w-32 rounded-md font-semibold`}
                                name={`Save`}
                                status={status}
                            />
                            <input type="hidden" name={`infos[${type}_id]`} value={type_id}/>
                        </div>

                        <input
                            type="hidden"
                            value={`user_register`}
                            name={`user_register`}
                        />
                        <input type="hidden" name={`types[${this.getType()}]`} value={`on`}/>
                    </section>
                    }

                </form>
            </>
        )
    }

    getType() {
        if (this.state.type === `course`)
            return `Japanese learner`
        if (this.state.type === `project`)
            return `IT project member`
        if (this.state.type === `job`)
            return `Job member`
    }
}

export default withTranslation()(RegisterForm);