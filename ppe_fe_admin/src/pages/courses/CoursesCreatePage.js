import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector, getUsers } from "../../slices/users";
import Ajax from "../../components/Ajax";
import { Link, useHistory } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import {
  Button,
  Checkbox,
  Input,
  Select,
  Textarea,
} from "../../components/Form";
import CoursesFormDescription from "./CoursesFormDescription";
import { syllabusesSelector, getSyllabuses } from "../../slices/syllabuses";
import Editor from "../../components/Editor";
import { formSelector, setFormData } from "../../slices/form";

const CoursesCreatePage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(usersSelector);
  const { syllabuses } = useSelector(syllabusesSelector);
  const { editorData } = useSelector(formSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);

  const [chooses, setChooses] = useState({});
  const history = useHistory();
  useEffect(() => {
    dispatch(getSyllabuses(`Activated`));
    dispatch(getUsers(`Activated`, [`Japanese instructor`]));
    dispatch(setFormData({ editorData: null }));
  }, [dispatch]);

  const courseSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    // start-editor
    params.set("content", JSON.stringify(editorData));
    // end-editor
    let res = await Ajax.post(`/courses`, params);
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
    <form onSubmit={(e) => courseSAVE(e)} className="w-full my-10">
      <main className="w-full max-w-3xl mx-auto rounded">
        <h1 className="font-bold text-lg text-gray-700">Add Course Manually</h1>
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
              <div className="flex -mb-2">
                <span className="block font-medium">Display language</span>
                <b className="text-red-600 ml-1"> (*)</b>
              </div>
              <Select
                name={`language`}
                values={[`English`, `Japanese`, `Vietnamese`]}
              />
            </label>

            <label className="block mt-4  w-full">
              <div className="flex -mb-3">
                <span className="block font-medium">Ranking</span>
              </div>
              <Input
                name={`more[ranking]`}
                type={`number`}
                className={`w-full pl-1`}
              />
            </label>
          </div>

          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Name of the course</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input name={`name`} type={`text`} />
          </label>

          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Content of the course</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Editor />
          </label>
        </section>
        <section
          className={`${
            show !== 2 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">
            {" "}
            Register information
          </h2>

          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">
                Time length, Day and Time of the course
              </span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input
              name={`more[time]`}
              type={`text`}
              placeholder="4 months, Mon-Wed-Fri, 7:00AM~8:30AM"
            />
          </label>
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Tuition</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input name={`more[price]`} type={`number`} />
          </label>
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Discount to</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input name={`more[discount]`} type={`number`} />
          </label>
        </section>
        <section
          className={`${
            show !== 3 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <Checkbox
            title={`Syllabuses`}
            name={`syllabus_ids`}
            ids={syllabuses.map(({ id }) => id)}
            values={syllabuses.map(({ name }) => name)}
          />
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Instructors</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
          </label>
          <Checkbox
            name={`teachers`}
            ids={users.map(({ id }) => id)}
            values={users.map(({ name }) => name)}
          />
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Google form url</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input name={`more[google_form_url]`} type={`text`} />
          </label>
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

export default CoursesCreatePage;
