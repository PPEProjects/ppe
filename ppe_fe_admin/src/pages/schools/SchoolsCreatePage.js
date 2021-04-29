import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector,getUsers } from "../../slices/users";
import {schoolsSelector, getSyllabuses, setSchoolData} from "../../slices/schools";
import Ajax from "../../components/Ajax";
import { Link, useHistory } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import {Button, Checkbox, Input, Select, Textarea} from "../../components/Form";
import SchoolsFormContent from "./SchoolsFormContent";
import UploadCSV from "../../components/UploadCSV";

const SchoolsCreatePage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(usersSelector);
  const { school_contents } = useSelector(schoolsSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [chooses, setChooses] = useState({});
   const [schools, setSchools] = useState([]);
  const history = useHistory();

  useEffect(() => {
    dispatch(getUsers(`Activated`, [`Office leader`]));
    dispatch(setSchoolData({school_contents: {}}))
    fetchData();
    async function fetchData() {
      let res = await Ajax.get(`/schools`);
      setSchools(res.data?.schools);
    }
  }, [dispatch]);
  const schoolsSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.post(`/schools`, params);
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
    <form onSubmit={(e) => schoolsSAVE(e)} className="w-full my-10 ">
      <main className="w-full max-w-3xl mx-auto rounded">
        <h1 className="font-bold text-lg text-gray-700">
          Add School Manually
        </h1>
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">
            Essential Information
          </h2>
          <label className="block mt-4">
                  <div className="flex -mb-3"><span className="block font-medium">Name</span><b className="text-red-600 ml-1"> (*)</b></div>
                  <Input name={`name`} type={`text`} /> 
          </label>
          <label className="block mt-4">
                  <div className="flex -mb-3"><span className="block font-medium">Address</span><b className="text-red-600 ml-1"> (*)</b></div>
                  <Input name={`infos[address]`} type={`text`} />
          </label>

          <label className="block mt-4">
            <div className="flex -mb-3"><span className="block font-medium">Leaders</span><b
                className="text-red-600 ml-1"> (*)</b></div>
          </label>
          <Checkbox
              name={`leaders`}
              ids={users.map(({id}) => id)}
              values={users.map(({name}) => name)}
          />
          <label className="block mt-4">
                        <div className="flex "><span className="block font-medium">Image information management</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                      
            </label>
            <FormUploadFile/>
          {/* <SchoolsFormContent
            label={`Contents`}
            className={`bg-yellow-200 -mx-4 px-4 py-4`}
            inputs={syllabuse_contents}
          /> */}
{/* 
          <UploadCSV label={`Files upload (csv, xlsl)`}/> */}
        </section>
      </main>
      <FormFooter
        tabNumber={1}
        show={show}
        onShowMinus={() => setShow(show - 1)}
        onShowPlus={() => setShow(show + 1)}
      />
      {/* <section className="w-full max-w-3xl mx-auto flex items-center justify-between text-sm mt-6 ">
        <Link
          to={`/Courses`}
          className="bg-gray-300 text-gray-800 h-10 px-4 rounded-md hover:bg-gray-400 flex items-center justify-center"
        >
          <span className="font-semibold">Cancel</span>
        </Link>

        <Button title={`Save`} />
        <input type="hidden" name={`status`} value={`activated`} />
      </section> */}
    </form>
  );
};

export default SchoolsCreatePage;
