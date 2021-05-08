import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector, getUsers, setUserData } from "../../slices/users";
import { formSelector, setFormData } from "../../slices/form";
import { detailsSelector, setDetailData } from "../../slices/details";

import Ajax from "../../components/Ajax";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import { syllabusesSelector, getSyllabuses } from "../../slices/syllabuses";

import {
  Button,
  Input,
  InputNumber,
  Select,
  Textarea,
  Checkbox,
} from "../../components/Form";
import CoursesFormDescription from "./CoursesFormDescription";
import Editor from "../../components/Editor";

const CoursesEditForm = () => {
  const dispatch = useDispatch();
  const { user, users } = useSelector(usersSelector);
  const { isShow, mode, course } = useSelector(detailsSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [chooses, setChooses] = useState({});
  const { syllabuses } = useSelector(syllabusesSelector);
  const { editorData } = useSelector(formSelector);

  useEffect(() => {
    dispatch(getSyllabuses(`Activated`));
    dispatch(getUsers(`Activated`, [`Japanese instructor`]));
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(setFormData({ editorData: JSON.parse(course.content) }));
  // }, [course]);
  const courseSAVE1 = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    // start-editor
    params.set("content", JSON.stringify(editorData));
    // end-editor
    let res = await Ajax.put(`/courses/${course.id}`, params);
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
    <form onSubmit={(e) => courseSAVE1(e)}>
      <main className="w-full max-w-3xl mx-auto rounded max-h-64 overflow-y-auto my-3">
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4`}
        >
          <div className="flex items-center justify-between">
            <label className="block mt-4 w-full">
              <div className="flex -mb-2">
                <span className="block font-medium">Display language</span>
                <b className="text-red-600 ml-1"> (*)</b>
              </div>
              <Select
                name={`language`}
                values={[`English`, `Japanese`, `Vietnamese`]}
                value={course.language}
              />
            </label>

            <label className="block mt-4  w-full">
              <div className="flex -mb-3">
                <span className="block font-medium">Ranking</span>
              </div>
              <InputNumber
                name={`more[ranking]`}
                type={`number`}
                value={course.more.ranking}
                className={`w-full pl-1`}
              />
            </label>
          </div>

          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Name of the course</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input name={`name`} type={`text`} value={course.name} />
          </label>

          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Content of the course</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Editor type="edit" />
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
            <Input name={`more[time]`} type={`text`} value={course.more.time} />
          </label>
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Tuition</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <InputNumber
              name={`more[price]`}
              type={`number`}
              value={course.more.price}
            />
          </label>
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Discount to</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <InputNumber
              name={`more[discount]`}
              type={`number`}
              value={course.more.discount}
            />
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
            <Checkbox
              name={`teachers`}
              ids={users.map(({ id }) => id)}
              values={users.map((user) => user?.infos_lang?.vi?.name)}
            />
          </label>
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Google form url</span>
              {/* <b className="text-red-600 ml-1"> (*)</b> */}
            </div>
            <Input
              name={`more[google_form_url]`}
              type={`text`}
              value={course.more.google_form_url}
            />
          </label>
        </section>
      </main>

      <FormFooter
      // type1 ="edit"
      />
    </form>
  );
};

export default CoursesEditForm;
