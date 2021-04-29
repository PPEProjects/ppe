import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Ajax from "../../components/Ajax";
import { useDispatch, useSelector } from "react-redux";
import { setDetailData } from "../../slices/details";
import { InputIcon, Button,Input,Select } from "../../components/Form";

import FormUploadFile from "../../components/FormUploadFile";
import FormFooter from "../../components/FormFooter";
import UsersFormTypeJapanese from "./UsersFormTypeJapanese";
import UsersFormTypeProjects from "./UsersFormTypeProjects";
import Alert from "../../components/Alert";
import { usersSelector,getUserInfo } from "../../slices/users";
import {sidebarSelector, setSidebarData} from "../../slices/sidebar";
const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);
  const [type, setType] = useState(``);
  const [show, setShow] = useState(1);
  const { opens } = useSelector(sidebarSelector);

  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
   
    let opens1 = Object.assign({}, opens);
    delete opens1[`UserInfo`];
    dispatch(setSidebarData({opens: opens1}));
  }, [dispatch]);

  const changePasswordSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.put(`/users/${user.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    Alert({ t: `Save success`, c: [] });
    dispatch(getUserInfo());

  
  };

  const renderMain = () => {
    return (
      <aside className="w-full">
        <div className="grid grid-cols-12 gap-4 mx-6 mb-6">
          <div className="col-span-12 flex items-center justify-between mt-6 ">
            <h1 className="text-xl font-bold">Change password</h1>
          </div>
          <div className="col-span-6 ">
          

            <form className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3 mt-4 px-4 "
            onSubmit={(e) => changePasswordSAVE(e)}>
              <main className="w-full max-w-3xl mx-auto rounded">
                <section
                  className={`${
                    show !== 1 ? `hidden` : ``
                  } bg-white rounded-md overflow-hidden mt-6 `}
                >
                  <Input
                    title={`New Password`}
                    name={`password`}
                    type={`password`}
                  />
                  <Input
                    title={`Re-enter password`}
                    name={`password_confirmation`}
                    type={`password`}
                  />
                </section>
              </main>
              <FormFooter
                tabNumber={type === `Japanese learner` || type === `IT project member` ? 3 : 1 }
                show={show}
                hidden={`change_password`}
                onShowMinus={() => setShow(show - 1)}
                onShowPlus={() => setShow(show + 1)}
              />
          </form>
          </div>
        </div>
      </aside>
    );
  };
  return (
    <React.Fragment>
      {renderMain()}
    </React.Fragment>
  );
};
export default ChangePasswordPage;
