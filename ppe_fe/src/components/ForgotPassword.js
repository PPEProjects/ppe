import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import Alert from "./.Tools/Alert";
import SubmitButton from "./.Tools/SubmitButton";
import Ajax from "./.Tools/Ajax";
import { withTranslation } from "react-i18next";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ``,
      errors: {},
      success: ``,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  set_state(obj) {
    this.setState(obj);
  }

  async handleSubmit(event) {
    const cookies = new Cookies();
    event.preventDefault();
    this.setState({ status: "loading" });
    const params = new FormData(event.target);
    let res = await Ajax.post(`/users`, params);
    if (res.status === "success") {
      cookies.set("access_token", res.data.access_token, { path: "/" });
      cookies.set("user", JSON.stringify(res.data.user), { path: "/" });
      this.setState({ status: "success", success: `PPE has sent new password to your email.
      新しいパースワードをあなたのメールに送りました。` });
   
      return;
    }
    this.setState(res);
  }

  render() {
    let { errors, status, success } = this.state;
    let { t } = this.props;
    return (
      <React.Fragment>
        <Alert status={status} errors={errors} success={success} />
        <header className="w-full max-w-md mx-auto px-4 mt-4">
          <Link
            to={`/`}
            className="hover:border-indigo-700 border border-transparent px-2 leading-6 block"
          >
              <div className="">
                    <img src="../assets/images/flags/logo.png" className="w-20 pt-2 text-6xl -ml-4" ></img>
                    <h4 className="whitespace-no-wrap font-semibold text-gray-200 -mt-2">
                  <span className="text-blue-500">Paracel</span>{" "}
                  <span className="text-red-600">Project</span>{" "}
                  <span className="text-white">Education</span>
                </h4>
                </div>
            {/* <h3 className="text-3xl font-semibold">
              <span className="text-blue-600">P</span>
              <span className="text-red-600">P</span>
              <span className="text-purple-600">E</span>
            </h3>
            <h4 className="whitespace-no-wrap -mb-1 font-thin text-gray-200">
              <span className="text-blue-600">Paracel</span>{" "}
              <span className="text-red-600">Project</span>{" "}
              <span className="text-purple-600">Education</span>
            </h4> */}
          </Link>
        </header>

        <main className="w-full max-w-md mx-auto px-4">
          <form
            onSubmit={this.handleSubmit}
            className="p-3 border border-gray-400 rounded mt-3"
          >
            <h3 className="text-2xl ">{t("Forgot your password?")}</h3>
            <label className="block mt-3">
              <span className="block text-gray-700">{t("Input your email")}</span>
              <input
                type="Input your email"
                name={`email`}
                className="border border-gray-400 h-10 w-full px-3 mt-2 rounded"
                placeholder="Type here..."
              />
            </label>
         
            <div className="text-center mt-3">
              <SubmitButton
                className={`px-3 rounded font-semibold`}
                name={`Submit`}
                status={status}
              />
              <input type="hidden" name={`ForgetPasswordPage`} value={`ForgetPasswordPage`} />
            </div>
          </form>
         
          <div className="text-center mt-6 clear-both">
          <Link
              to={`/login`}
              className="bg-gray-100 text-gray-800 h-10 w-32 rounded hover:opacity-75 border flex items-center justify-center mx-auto"
            >
              <span className=""> {t("Sign In")}</span>
            </Link>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
export default withTranslation()(ForgotPassword);
