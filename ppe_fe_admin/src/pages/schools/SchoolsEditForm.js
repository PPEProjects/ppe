import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { usersSelector,getUsers } from "../../slices/users";
import Ajax from "../../components/Ajax";
import { Link } from "react-router-dom";
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
import SchoolsFormContent from "./SchoolsFormContent";
import { detailsSelector, setDetailData } from "../../slices/details";
import { getUsers, usersSelector, setUserData } from "../../slices/users";

const SchoolsEditForm = () => {
  const dispatch = useDispatch();
  const { user, users } = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [chooses, setChooses] = useState({});
  const [courses, setCourses] = useState([]);
  const { isShow, mode, school } = useSelector(detailsSelector);

  useEffect(() => {
    dispatch(getUsers(`Activated`, [`Office leader`]));
    dispatch(setUserData({ types: school.leaders }));
  }, [dispatch]);

  const schoolsSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.put(`/schools/${school.id}`, params);
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
    <form onSubmit={(e) => schoolsSAVE(e)}>
      <main className="w-full max-w-3xl mx-auto rounded max-h-64 overflow-y-auto my-3">
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4`}
        >
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Name</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input name={`name`} type={`text`} value={school.name} />
          </label>
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Address</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input
              name={`infos[address]`}
              type={`text`}
              value={school.infos.address}
            />
          </label>
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Leaders</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Checkbox
              name={`leaders`}
              ids={users.map(({ id }) => id)}
              values={users.map(({ name }) => name)}
            />
          </label>
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">
                Image information management
              </span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
          </label>
          <FormUploadFile files={school.files.images} handle_first={true} />
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

export default SchoolsEditForm;
