import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../slices/users";
import Ajax from "../../components/Ajax";
import { Link, useHistory } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import JobsFormDescription from "./JobsFormDescription";
import FormUploadFile from "../../components/FormUploadFile";

import {
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
} from "../../components/Form";

const JobsCreatePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [chooses, setChooses] = useState({});
  const [job, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const history = useHistory();
  useEffect(() => {
    fetchData();
    async function fetchData() {
      let res = await Ajax.get(`/companies`);
      setCompanies(res?.data?.companies);
    }
  }, [dispatch]);

  const jobSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.post(`/jobs`, params);
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
    <form onSubmit={(e) => jobSAVE(e)} className="w-full my-10">
      <main className="w-full max-w-3xl mx-auto rounded">
        <h1 className="font-bold text-lg text-gray-700">Add Job Manually</h1>
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">
            Essential Information
          </h2>
          <h2 className=" text-gray-700 text-sm">
            Add the title, images and description that best describes this job.
          </h2>
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Title</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input  name={`title`} type={`text`} />
             </label>
     

          <JobsFormDescription
            label={`Description`}
            className={`bg-yellow-200 -mx-4 px-4 py-4`}
          />
       
           <FormUploadFile label={`Image for Job slider`} />
        </section>
        <section
          className={`${
            show !== 2 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">Register information</h2>
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Company</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Select
         
            name={`company_id`}
            ids={companies.map(({ id }) => id)}
            values={companies.map(({ name }) => name)}
          />
             </label>
        
            <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Address to work</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
        
            name={`more[address]`}
            type={`text`}
          />
             </label>
         
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Skills</span><b className="text-red-600 ml-1"> (*)</b></div>
                  
              <Input
             
                name={`more[skills]`}
                type={`text`}
              />
             </label>
       
     
          <label className="block mt-4">
          <div className="flex -mb-3"><span className="block font-medium"> Salary (VND)</span><b className="text-red-600 ml-1"> (*)</b></div>
          </label>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <Input
                title={`From`}
                name={`more[salary][from]`}
                type={`number`}
              />
            </div>
            <div className="col-span-4">
              <Input title={`To`} name={`more[salary][to]`} type={`number`} />
            </div>
            <div className="col-span-4 mt-1">
              <Select
                title={`Time`}
                name={`more[salary][time]`}
                values={[`Hour`, `Day`, `Month`, `Year`]}
              />
            </div>
          </div>
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Job type</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Select
           
            name={`type`}
            values={[`Full time`, `Partime`, `Remote`, `Contract`]}
          />
             </label>
         
        </section>
      </main>

      <FormFooter
      tabNumber={2}
      show={show}
        onShowMinus={() => setShow(show - 1)}
        onShowPlus={() => setShow(show + 1)}
      />
    </form>
  );
};

export default JobsCreatePage;
