import React, { Component } from "react";

import Ajax from "./Ajax";
import { Checkbox } from "./Form";
class FormSearchUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      keyword: ``,
      users: [],
      users_chooses: {},
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  set_state(obj) {
    this.setState(obj);
  }

  handleChangeValue(e, key) {
    e.preventDefault();
    let obj = {};
    obj[key] = e.target.value;
    this.setState(obj);
  }
  async componentDidMount() {
    let users = await Ajax.get(`/users`, { keyBy: `id` });
    this.setState({
      users: users?.data?.users ?? [],
    });
  }

  async handleSearch(e) {
    e.preventDefault();
    this.setState({ status: "loading" });
    const data = new FormData(e.target);
  }

  handleChooses(e, user) {
    e.preventDefault();
    let { users_chooses } = this.state;
    if (users_chooses[user.id]) {
      delete users_chooses[user.id];
      this.setState({ users_chooses: users_chooses });
      return;
    }
    users_chooses[user.id] = user.id;
    this.setState({ users_chooses: users_chooses });
  }

  render() {
    let { show, users, users_chooses, keyword } = this.state;
    users = Object.values(users);
    let { input, handleChange } = this.props;
    return (
      <React.Fragment>
        <section className="bg-white border border-gray-400 rounded-md overflow-hidden mt-2 relative">
          {users.map((user, key) => (
            <React.Fragment key={key}>
              {users_chooses[user.id] && (
                <React.Fragment>
                  <button
                    onClick={(e) => this.handleChooses(e, user)}
                    type="button"
                    className="float-left ml-2 mt-2 bg-gray-200 text-gray-800 h-8 px-2 rounded-md hover:bg-gray-300 border border-gray-400 flex items-center justify-center"
                  >
                    <figure className="">
                      <div className="w-6">
                        <div className="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                          <img
                            alt=""
                            src={user.image}
                            className="absolute h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </figure>
                    <span className="ml-2 w-20 truncate">{user.name}</span>
                  </button>
                  <input
                    type="hidden"
                    className=""
                    name={`contents[${input.id}][members][]`}
                    value={user.id}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
          <input
            type="text"
            onFocus={(e) => this.set_state({ show: true })}
            onChange={(e) => this.handleChangeValue(e, `keyword`)}
            className={`w-full h-10 px-3 outline-none  focus:border-blue-700 activate:border-blue-500`}
            value={keyword}
            placeholder={`Search user..`}
          />
          {show && (
            <ul className="bg-blue-200">
              {users.map((user, key) => (
                <li className="" key={key}>
                  {!users_chooses[user.id] && (
                    <button
                      onClick={(e) => this.handleChooses(e, user)}
                      type="button"
                      className="bg-gray-200 text-gray-800 h-10 w-full hover:bg-gray-300 flex items-center justify-start pl-3 cursor-pointer"
                    >
                      <figure className="">
                        <div className="w-6">
                          <div className="pb-1x1 relative rounded-full overflow-hidden bg-gray-300">
                            <img
                              alt=""
                              src={user.image}
                              className="absolute h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      </figure>
                      <span className="ml-2 truncate">{user.name}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </React.Fragment>
    );
  }
}
export default FormSearchUsers;
