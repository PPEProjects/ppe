import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector, getUsers,setUserData } from "../../slices/users";
import Ajax from "../../components/Ajax";
import { Link, useHistory } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import { detailsSelector, setDetailData } from "../../slices/details";

import {
  Button,
  Input,
  InputNumber,
  Select,
  Textarea,
  Checkbox,
} from "../../components/Form";
import ProjectsFormDescription from "./ProjectsFormDescription";

const ProjectsCreatePage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(usersSelector);
  const { isShow, mode, project } = useSelector(detailsSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [chooses, setChooses] = useState({});
  const history = useHistory();
  useEffect(() => {
    dispatch(getUsers(`Activated`, [`IT project member`]));
   
  }, [dispatch]);

  const projectSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.post(`/projects`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
 
    history.goBack();
  };

  const handleChooses = (e, id) => {
    e.preventDefault();
    if (chooses[id]) {
      delete chooses[id];
    } else {
      chooses[id] = id;
    }
    setChooses(chooses);
  };

  return (
    <form onSubmit={(e) => projectSAVE(e)} className="w-full my-10">
      <main className="w-full max-w-3xl mx-auto rounded">
        <h1 className="font-bold text-lg text-gray-700">
          Add Project Manually
        </h1>
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className="mt-4 text-gray-800 font-semibold">
            Essential Information
          </h2>
          <div className="flex items-center justify-between">
          <label className="block mt-4 w-full">
                      <div className="flex -mb-2"><span className="block font-medium">Display language</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Select
        
            name={`language`}
            values={[`English`, `Japanese`, `Vietnamese`]}
          />
             </label>
        
           <label className="block mt-4  w-full">
                      <div className="flex -mb-3"><span className="block font-medium">Ranking</span></div>
                      <InputNumber

            name={`more[ranking]`}
            type={`number`}
              className={`w-full pl-1`}
            />

             </label>
        
          </div>
        
            <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Title</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input  name={`name`} type={`text`} />
          </label>
        
       
          <ProjectsFormDescription
            label={`Overview`}
            className={`bg-yellow-200 -mx-4 px-4 py-4`}
          />
             <label className="block mt-4">
                      <div className="flex"><span className="block font-medium">Image</span><b className="text-red-600 ml-1"> (*)</b></div>
                     
          </label>
          <FormUploadFile  />
        </section>
        <section
          className={`${
            show !== 2 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">Register information (1/2)</h2>
          <div className="flex items-center justify-between">

             <label className="block mt-4 w-full">
                      <div className="flex -mb-3"><span className="block font-medium">Start day</span><b className="text-red-600 ml-1"> (*)</b></div>
                  
                      <Input
                    name={`more[start_day]`}
                    type={`date`}
                      className={`w-full pr-1`}
                    />
             </label>
        
           <label className="block mt-4  w-full">
                      <div className="flex -mb-3"><span className="block font-medium">Deadline</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input

                      name={`more[deadline]`}
                      type={`date`}
                        className={`w-full pl-1`}
                      />

             </label>
        
          </div>
      
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Version number</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input name={`more[version]`} type={`text`} />
          </label>
         
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Number of installments</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
           
            name={`more[installs_number]`}
            type={`number`}
          />
          </label>
       
           <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Number of installment countries</span><b className="text-red-600 ml-1"> (*)</b></div>
            <Input
            name={`more[installs_countries]`}
            type={`number`}
          />
          </label>
         
            <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Next release</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
          
            name={`more[next_release]`}
            type={`date`}
          />
          </label>
        
              <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Revenue</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input name={`more[revenue]`} type={`number`} />
          </label>
       
        </section>
        <section
          className={`${
            show !== 3 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className="text-gray-800 font-semibold">Register information (2/2)</h2>
          
          <Textarea
            title={`Purpose`}
            name={`more[purpose]`}
            placeholder={``}
          />
         <Input title={`Cost for the project`} name={`more[cost]`} type={`number`} />
         <Input title={`Target users`} name={`more[approach]`} type={`text`} />
     
      
        </section>
        <section
          className={`${
            show !== 4 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">Platforms</h2>
        
          <Input title={`Android url`} name={`more[android]`} type={`text`} />
      
          <Input title={`IOS url`} name={`more[ios]`} type={`text`} />
      
          <Input title={`Website url`} name={`more[website]`} type={`text`} />
          <Input title={`Google form url`} name={`more[google_form_url]`} type={`text`} />
        
          <Checkbox
            title={`Members`}
            name={`members`}
            ids={users.map(({ id }) => id)}
            values={users.map((user ) => user.name !== null ? user.name : user?.infos_lang?.vi?.name )}

          />
         
        </section>
      </main>

      <FormFooter
         tabNumber={4}
         show={show}
        onShowMinus={() => setShow(show - 1)}
        onShowPlus={() => setShow(show + 1)}
      />
    </form>
  );
};

export default ProjectsCreatePage;
