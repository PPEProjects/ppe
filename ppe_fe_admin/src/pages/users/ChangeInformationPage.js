import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Ajax from "../../components/Ajax";
import { useDispatch, useSelector } from "react-redux";
import { setDetailData } from "../../slices/details";
import { InputIcon, Button,Input,Select } from "../../components/Form";
import { filesSelector, getFiles } from "../../slices/files";
import FormUploadFile from "../../components/FormUploadFile";
import FormFooter from "../../components/FormFooter";
import UsersFormTypeJapanese from "./UsersFormTypeJapanese";
import UsersFormTypeProjects from "./UsersFormTypeProjects";
import Alert from "../../components/Alert";
import { usersSelector,getUserInfo } from "../../slices/users";
import {sidebarSelector, setSidebarData} from "../../slices/sidebar";

const ChangeInformationPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);
  const { opens } = useSelector(sidebarSelector);
  const [type, setType] = useState(``);
  const [show, setShow] = useState(1);
 
  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
    let opens1 = Object.assign({}, opens);
    delete opens1[`UserInfo`];
    dispatch(setSidebarData({opens: opens1}));
  
  }, [dispatch]);
  
  const ChangeInformationSAVE = async (e) => {
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
            <h1 className="text-xl font-bold">Change information</h1>
          </div>
          <div className="col-span-9">
           

            <form className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3 mt-4 px-4 "
              onSubmit={(e) => ChangeInformationSAVE(e)}>
                  <main className="w-full max-w-3xl mx-auto rounded">
                <section
                  className={`${
                    show !== 1 ? `hidden` : ``
                  } bg-white rounded-md overflow-hidden mt-6 `}
                >
                  <h2 className=" text-gray-800 font-semibold">
                    Essential Information
                  </h2>
                  <h2 className=" text-gray-700 text-sm">
                    Add the title, images and description that best describes this user.
                  </h2>
                  <FormUploadFile label={`Avatar`} files={user.files?.images} />
              
                  <Input title={`Full name`} name={`name`} value={user.name}/>
              
                </section>
        
              
                </main>
                    <FormFooter
                      tabNumber={type === `Japanese learner` || type === `IT project member` ? 3 : 1 }
                      show={show}
                      hidden={`change_information`}
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
export default ChangeInformationPage;
