import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, usersSelector,setUserData } from "../../slices/users";
import { getProjects, projectsSelector } from "../../slices/projects";

import Ajax from "../../components/Ajax";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import { Button, Input, Select, Textarea } from "../../components/Form";
import { detailsSelector, setDetailData } from "../../slices/details";

import TasksFormContent from "./TasksFormContent";

const TasksEditForm = () => {
  const dispatch = useDispatch();
  const { user, users } = useSelector(usersSelector);
  const { projects } = useSelector(projectsSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);

  const [chooses, setChooses] = useState({});
  const { isShow, mode, task } = useSelector(detailsSelector);

  useEffect(() => {
   
    dispatch(getUsers(`Activated`));
    dispatch(getProjects(`Activated`));
    dispatch(setUserData({types:task.menbers}));

  }, [dispatch]);

  const courseSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.put(`/tasks/${task.id}`, params);
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
    <form onSubmit={(e) => courseSAVE(e)}>
      <main className="w-full max-w-3xl mx-auto rounded max-h-64 overflow-y-auto my-3">
      
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4`}
        >
         
       <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Project</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Select
           
            name={`project_id`}
            ids={projects.map(({ id }) => id)}
            values={projects.map(({ name }) => name)}
            value={task.project_id}
          />
             </label>
         

          <TasksFormContent
            users={users}
            label={`Tasks`}
            className={`bg-yellow-200 -mx-4 px-4 py-4`}
            inputs={task.contents}
          />
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

export default TasksEditForm;
