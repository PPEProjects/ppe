import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector, getUsers,setUserData } from "../../slices/users";
import Ajax from "../../components/Ajax";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import {
  Button,
  Input,
  InputNumber,
  Select,
  Textarea,
  Checkbox,
} from "../../components/Form";
import ProjectsFormDescription from "./ProjectsFormDescription";
import { detailsSelector, setDetailData } from "../../slices/details";

const ProjectsEditForm = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);

  const [chooses, setChooses] = useState({});
  const { isShow, mode, project } = useSelector(detailsSelector);

  useEffect(() => {
    dispatch(getUsers(`Activated`, [`IT project member`]));
   
  }, [dispatch]);

  const projectSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.put(`/projects/${project.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    Alert({ t: `Save success`, c: [] });
    window.location.reload();
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
    <form onSubmit={(e) => projectSAVE(e)}>
      <main className="w-full max-w-3xl mx-auto rounded max-h-64 overflow-y-auto my-3">
     
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
         
             <div className="flex items-center justify-between">
          <label className="block mt-4 w-full">
                      <div className="flex -mb-2"><span className="block font-medium">Display language</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Select
        
            name={`language`}
            values={[`English`, `Japanese`, `Vietnamese`]}
            value={project.language}
          />
             </label>
        
           <label className="block mt-4  w-full">
                      <div className="flex -mb-3"><span className="block font-medium">Ranking</span></div>
                     <InputNumber
            name={`more[ranking]`}
            type={`number`}
            value={project.more.ranking}
              className={`w-full pl-1`}
            />

             </label>
        
          </div>
           
     
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Title</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
           
            name={`name`}
            type={`text`}
            value={project.name}
          />
             </label>
         

          <ProjectsFormDescription
            label={`Overview`}
            className={`bg-yellow-200 -mx-4 px-4 py-4`}
            inputs={project.descriptions}
            handle_first={true}
          />
          <label className="block mt-4">
              <div className="flex"><span className="block font-medium">Image</span><b className="text-red-600 ml-1"> (*)</b></div>
            
          </label>
          <FormUploadFile files={project.files.images} handle_first={true}/>
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
            value={project.more.start_day}
            name={`more[start_day]`}
            type={`date`}
              className={`w-full pr-1`}
            />
             </label>
        
           <label className="block mt-4  w-full">
                      <div className="flex -mb-3"><span className="block font-medium">Deadline</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
            value={project.more.deadline}
            name={`more[deadline]`}
            type={`date`}
              className={`w-full pl-1`}
            />
            
             </label>
        
          </div>
        
           <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Version number</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
           
            name={`more[version]`}
            value={project.more.version}
            type={`text`}
          />
          </label>
       
               <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Number of installments</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
           
            name={`more[installs_number]`}
            type={`number`}
            value={project.more.installs_number}
          />
          </label>
        
              <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Number of installment countries</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
           
            name={`more[installs_countries]`}
            value={project.more.installs_countries}
            type={`number`}
          />
          </label>
        
        <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Next release</span><b className="text-red-600 ml-1"> (*)</b></div>
                        <Input
            
              name={`more[next_release]`}
              value={project.more.next_release}
              type={`date`}
            />
            </label>
         
             <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Revenue</span><b className="text-red-600 ml-1"> (*)</b></div>
                        <Input
          
            name={`more[revenue]`}
            value={project.more.revenue}
            type={`number`}
          />
            </label>
      
        </section>
        <section
          className={`${
            show !== 3 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className="text-gray-800 font-semibold">Register information (2/2)</h2>
          
          <Textarea
            value={project.more.purpose}
            title={`Purpose`}
            name={`more[purpose]`}
            placeholder={``}
          />
         <Input title={`Cost for the project`} name={`more[cost]`} value={project.more.cost} type={`number`} />
         <Input title={`Target users`} name={`more[approach]`} value={project.more.approach} type={`text`} />
      
      
        </section>
        <section
          className={`${
            show !== 4 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">Platforms</h2>
       
          <Input
            title={`Android url`}
            name={`more[android]`}
            value={project.more.android}
            type={`text`}
          />
        
          <Input
            title={`IOS url`}
            name={`more[ios]`}
            value={project.more.ios}
            type={`text`}
          />
         
          <Input
            title={`Website ulr`}
            name={`more[website]`}
            value={project.more.website}
            type={`text`}
          />
          <Input
            title={`Google form url`}
            name={`more[google_form_url]`}
            value={project.more.google_form_url}
            type={`text`}
          />
             
          <Checkbox
            title={`Members`}
            name={`members`}
            ids={users.map(({ id }) => id)}
            values={users.map(({ name }) => name)}
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

export default ProjectsEditForm;
