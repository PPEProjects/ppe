import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../slices/users";
import Ajax from "../../components/Ajax";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import { detailsSelector, setDetailData } from "../../slices/details";

import { Button, Input, Select, Textarea } from "../../components/Form";
import PostsFormDescription from "./PostsFormDescription";
import Editor from "../../components/Editor";
import { formSelector, setFormData } from "../../slices/form";

const PostsEditForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [users, setUsers] = useState([]);
  const [chooses, setChooses] = useState({});
  const [projects, setProjects] = useState([]);
  const { isShow, mode, post } = useSelector(detailsSelector);
  const { editorData } = useSelector(formSelector);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      let res = await Ajax.get(`/projects`);
      setProjects(res.data?.projects);
      console.log("fetch data", res.data?.projects);
    }
  }, [dispatch]);

  const postSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    params.set("descriptions", JSON.stringify(editorData));
    let res = await Ajax.put(`/posts/${post.id}`, params);
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
    <form onSubmit={(e) => postSAVE(e)}>
      <main className="w-full max-w-3xl mx-auto rounded max-h-64 overflow-y-auto my-3">
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4`}
        >
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Display language</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Select
              name={`language`}
              values={[`English`, `Japanese`, `Vietnamese`]}
              value={post.language}
            />
          </label>

          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Title</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input name={`title`} type={`text`} value={post.title} />
          </label>

          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Description</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Editor type="edit" />
          </label>

          {/*<label className="block mt-4">
            <div className="flex">
              <span className="block font-medium">Image</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
          </label>
          <FormUploadFile files={post.files.images} handle_first={true} />*/}
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

export default PostsEditForm;
