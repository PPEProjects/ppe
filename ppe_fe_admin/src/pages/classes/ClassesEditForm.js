import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { usersSelector,getUsers } from "../../slices/users";
import Ajax from "../../components/Ajax";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import { Button, Input, Select, Textarea,Checkbox } from "../../components/Form";
// import ClassesFormContent from "./ClassesFormContent";
import { detailsSelector, setDetailData } from "../../slices/details";
import { getUsers, usersSelector,setUserData } from "../../slices/users";
import { schoolsSelector, getSchools } from "../../slices/schools";
import { coursesSelector, getCourses } from "../../slices/courses";

const ClassesEditForm = () => {
  const dispatch = useDispatch();
  const {user, users} = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [classes, setClasses] = useState([]);

  const [chooses, setChooses] = useState({});
  // const [courses, setCourses] = useState([]);
  const { isShow, mode, classe } = useSelector(detailsSelector);
  const {schools} = useSelector(schoolsSelector);
  const { courses } = useSelector(coursesSelector);
  const [usersLearners, setUsersLearners] = useState([]);

  useEffect(() => {
    dispatch(getUsers(`Activated`, [`Japanese instructor`]));
    dispatch(setUserData({types:classe.leaders}));
    dispatch(getSchools(`Activated`));
    dispatch(getCourses(`Activated`));
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
    const classesSAVE = async (e) => {
      e.preventDefault();
      const params = new FormData(e.target);
      let res = await Ajax.put(`/classes/${classe.id}`, params);
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
    <form onSubmit={(e) => classesSAVE(e)}>
      <main className="w-full max-w-3xl mx-auto rounded max-h-64 overflow-y-auto my-3">
      
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4`}
        >
          
        <label className="block mt-4">
                  <div className="flex -mb-3"><span className="block font-medium">Name</span><b className="text-red-600 ml-1"> (*)</b></div>
                  <Input name={`name`} type={`text`} value={classe.name} /> 
          </label>
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Schools</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Select
           
            name={`school_id`}
            ids={schools.map(({ id }) => id)}
            values={schools.map(({ name }) => name)}
            value={classe.school_id}
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
            values={users.map(({name}) => name)}
        />
         <label className="block mt-4">
            <div className="flex -mb-3"><span className="block font-medium">Learners</span>
                </div>
          </label>
          <Checkbox
              name={`learners`}
              ids={usersLearners.map(({id}) => id)}
              values={usersLearners.map(({name}) => name)}
          />
        



          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Image information management</span></div>
                    
          </label>
          <FormUploadFile files={classe.files.images} handle_first={true}/>
          {/* <label className="block mt-4 w-full">
                            <div className="flex -mb-2"><span className="block font-medium">Display language</span><b
                                className="text-red-600 ml-1"> (*)</b></div>
                            <Select
                                name={`classe_id`}
                                ids={schools.map(({ id }) => id)}
                                values={schools.map(({ name }) => name)}
                            />
             </label> */}
          {/* <label className="block mt-4">
                  <div className="flex -mb-3"><span className="block font-medium">Address</span><b className="text-red-600 ml-1"> (*)</b></div>
                  <Input name={`address`} type={`text`} value={classe.infos.address} /> 
          </label> */}
          {/* <label className="block mt-4">
                        <div className="flex -mb-3"><span className="block font-medium">Leaders</span><b
                            className="text-red-600 ml-1"> (*)</b></div>
                        <Checkbox
                            name={`leaders`}
                            ids={users.map(({id}) => id)}
                            values={users.map(({name}) => name)}
                        />
           </label>
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Image information management</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <FormUploadFile files={classe.files.images} handle_first={true}/>
          </label> */}

         
        </section>
      </main>

      <section className="w-full max-w-3xl mx-auto flex items-center justify-between text-sm mt-6 ">
        <Link
          to={`/Courses`}
          className="bg-gray-300 text-gray-800 h-10 px-4 rounded-md hover:bg-gray-400 flex items-center justify-center"
        >
          <span className="font-semibold">Cancel</span>
        </Link>

        <Button title={`Save`} />
        <input type="hidden" name={`status`} value={`activated`} />
      </section>
    </form>
  );
};

export default ClassesEditForm;
