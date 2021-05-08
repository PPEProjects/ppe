import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector, getUsers } from "../../slices/users";
import Ajax from "../../components/Ajax";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
// import FormFooter from "../../components/FormFooter";
// import FormUploadFile from "../../components/FormUploadFile";
import { Button, Input, Select, Textarea } from "../../components/Form";
// import SyllabusesFormContent from "./SyllabusesFormContent";
import { detailsSelector, setDetailData } from "../../slices/details";

const SyllabusesEditForm = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  // const [chooses, setChooses] = useState({});
  // const [courses, setCourses] = useState([]);
  const { isShow, mode, syllabuse } = useSelector(detailsSelector);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const syllabusesSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.put(`/syllabuses/${syllabuse.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    Alert({ t: `Save success`, c: [] });
    window.location.reload();
  };
  // const handleChooses = (e, id) => {
  //   e.preventDefault();
  //   if (chooses[id]) {
  //     delete chooses[id];
  //   } else {
  //     chooses[id] = id;
  //   }
  //   setChooses(chooses);
  // };

  return (
    <form onSubmit={(e) => syllabusesSAVE(e)}>
      <main className="w-full max-w-3xl mx-auto rounded max-h-64 overflow-y-auto my-3">
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4`}
        >
          <Input
            title={`Name`}
            name={`name`}
            type={`text`}
            value={syllabuse.name}
          />
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

export default SyllabusesEditForm;
