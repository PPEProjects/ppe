import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector, getUsers } from "../../slices/users";
import { coursesSelector, getCourses } from "../../slices/courses";
import { schoolsSelector, getSchools } from "../../slices/schools";

import Ajax from "../../components/Ajax";
import { Link, useHistory } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import {classesSelector, getSyllabuses, setClasseData} from "../../slices/classes";

import {
  Button,
  Checkbox,
  Input,
  Select,
  Textarea,
} from "../../components/Form";
import ClassesFormDescription from "./ClassesFormDescription";
// import { syllabusesSelector, getSyllabuses } from "../../slices/syllabuses";

const ClassesCreatePage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(usersSelector);
  const { courses } = useSelector(coursesSelector);
  const { schools } = useSelector(schoolsSelector);
  const { classe } = useSelector(classesSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [classes, setClasses] = useState([]);
  const [usersLearners, setUsersLearners] = useState([]);
 
  const [chooses, setChooses] = useState({});
  const history = useHistory();
  useEffect(() => {
    dispatch(setClasseData({classe: {}}))
    dispatch(getUsers(`Activated`, [`Japanese instructor`]));
    dispatch(getCourses(`Activated`));
    dispatch(getSchools(`Activated`));

    fetchData();
    async function fetchData() {
      let res = await Ajax.get(`/classes`);
      setClasses(res.data?.classes);
      let params = {
        types: [`Office leader`],
        status: `Activated`
      }
      res = await Ajax.get(`/users`, params);
      setUsersLearners(res.data?.users);
    }
  }, [dispatch]);
  const classeSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.post(`/classes`, params);
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
    <form onSubmit={(e) => classeSAVE(e)} className="w-full my-10">
      <main className="w-full max-w-3xl mx-auto rounded">
        <h1 className="font-bold text-lg text-gray-700">Add Class Manually</h1>
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className="mt-4 text-gray-800 font-semibold">
            Essential Information
          </h2>
        
          <label className="block mt-4">
                  <div className="flex -mb-3"><span className="block font-medium">Name</span><b className="text-red-600 ml-1"> (*)</b></div>
                  <Input name={`name`} type={`text`} />
          </label>
        
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Schools</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Select
           
            name={`school_id`}
            ids={schools.map(({ id }) => id)}
            values={schools.map(({ name }) => name)}
          />
         </label>
       
          <label className="block mt-4">
            <div className="flex -mb-3"><span className="block font-medium">Courses</span><b
                className="text-red-600 ml-1"> (*)</b></div>
          </label>
          <Checkbox
              name={`courses`}
              ids={courses.map(({id}) => id)}
              values={courses.map(({name}) => name)}
          />
          <label className="block mt-4">
          <div className="flex -mb-3"><span className="block font-medium">Teachers</span><b
              className="text-red-600 ml-1"> (*)</b></div>
        </label>
        <Checkbox
            name={`teachers`}
            ids={users.map(({id}) => id)}
            // values={users.map(({name}) => name)}
            values={users.map((user ) => user?.infos_lang?.vi?.name)}

        />
          <label className="block mt-4">
            <div className="flex -mb-3"><span className="block font-medium">Learners</span>
                </div>
          </label>
          <Checkbox
              name={`learners`}
              ids={(usersLearners ?? []).map(({id}) => id)}
              values={(usersLearners ?? []).map((user) => user?.infos_lang?.vi?.name)}
          />
          <label className="block mt-4">
                        <div className="flex "><span className="block font-medium">Image information management</span>
                      </div>
                        
            </label>
            <FormUploadFile/>
      
        </section>
      
      </main>
      <FormFooter
        tabNumber={1}
        show={show}
        onShowMinus={() => setShow(show - 1)}
        onShowPlus={() => setShow(show + 1)}
      />
    </form>
  );
};

export default ClassesCreatePage;
