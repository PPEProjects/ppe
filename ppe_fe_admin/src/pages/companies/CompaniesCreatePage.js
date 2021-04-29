import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../slices/users";
import Ajax from "../../components/Ajax";
import { Link, useHistory } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import {
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
} from "../../components/Form";

const CompaniesCreatePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [chooses, setChooses] = useState({});
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  useEffect(() => {
    fetchData();
    async function fetchData() {}
  }, [dispatch]);

  const companySAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.post(`/companies`, params);
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
    <form onSubmit={(e) => companySAVE(e)} className="w-full my-10">
      <main className="w-full max-w-3xl mx-auto rounded">
        <h1 className="font-bold text-lg text-gray-700">
          Add Company Manually
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
                      <Input

            name={`more[ranking]`}
            type={`number`}
              className={`w-full pl-1`}
            />

             </label>
        
          </div>
       
         <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Name</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input name={`name`} type={`text`} />
             </label>
      
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">About us</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Textarea
           
            name={`about_us`}
            placeholder={`Enter a short description about your company`}
          />
             </label>
       
             <label className="block mt-4">
                      <div className="flex"><span className="block font-medium">Image</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <FormUploadFile />
             </label>
       
      
        </section>
        <section
          className={`${
            show !== 2 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">
             Register information (1/2)
          </h2>
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Type of company</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Select
           
            name={`type`}
            values={[`Outsourcing`,`Product`,`R&D`]}
          />
             </label>
         

          <div className="flex items-center justify-between">
          <label className="block mt-4 w-full">
                      <div className="flex -mb-3"><span className="block font-medium">Member # [from]</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
            
              name={`more[members][from]`}
              type={`number`}
              className={`w-full pr-1`}
            />
             </label>
        
           <label className="block mt-4  w-full">
                      <div className="flex -mb-3"><span className="block font-medium">Member # [to]</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
            
              name={`more[members][to]`}
              type={`number`}
              className={`w-full pl-1`}
            />
             </label>
         
          </div>
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Country of the company</span><b className="text-red-600 ml-1"> (*)</b></div>
                 
            <Input   name={`more[country]`} type={`text`} />
             </label>
        

          <div className="flex items-center justify-between">
          <label className="block mt-4 w-full">
                      <div className="flex -mb-3"><span className="block font-medium">Working day [from]</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
             name={`more[time][from]`}
             type={`text`}
              className={`w-full pr-1`}
            />
             </label>
         
            <label className="block mt-4  w-full">
                      <div className="flex -mb-3"><span className="block font-medium">Working day [to]</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
            
            name={`more[time][to]`}
            type={`text`}
              className={`w-full pl-1`}
            />
             </label>
        
          </div>
        </section>
        <section
          className={`${
            show !== 3 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">
             Register information (2/2)
          </h2>
          <Checkbox
            title={`Categories`}
            name={`more[categories]`}
            values={[
              `Education`,
              `Teaching`,
              `Training`,
              `Coaching`,
              `Information`,
              `Technology`,
              `Internet`,
              `Telecommunications`,
              `Electrical`,
              `Electronic`,
              `Manufacturing`,
              `Equipment`,
              `Health Care`,
              `Nursing`,
            ]}
          />

        
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Address</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input  name={`more[address]`} type={`text`} />
             </label>
        
            
          <Checkbox name={`more`} values={[`OT Salary`]} />
        </section>
      </main>

      <FormFooter
        tabNumber={3}
        show={show}
        onShowMinus={() => setShow(show - 1)}
        onShowPlus={() => setShow(show + 1)}
      />
    </form>
  );
};

export default CompaniesCreatePage;
