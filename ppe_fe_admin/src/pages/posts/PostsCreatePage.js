import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../slices/users";
import Ajax from "../../components/Ajax";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import { Link, useHistory } from "react-router-dom";

import { Button, Input, Select, Textarea } from "../../components/Form";
import PostsFormDescription from "./PostsFormDescription";

const PostsCreatePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [users, setUsers] = useState([]);
  const [chooses, setChooses] = useState({});
  const [projects, setProjects] = useState([]);
  const history = useHistory();
  useEffect(() => {
    fetchData();
    async function fetchData() {
      let res = await Ajax.get(`/projects`);
      setProjects(res.data?.projects);
    }
  }, [dispatch]);

  const postSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.post(`/posts`, params);
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
    <form onSubmit={(e) => postSAVE(e)} className="w-full my-10">
      <main className="w-full max-w-3xl mx-auto rounded">
        <h1 className="font-bold text-lg text-gray-700">Add Post Manually</h1>
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className="mt-4 text-gray-800 font-semibold">
            Essential Information
          </h2>
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Display language</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Select
              name={`language`}
              values={[`English`, `Japanese`, `Vietnamese`]}
            />
          </label>

          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Title</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input name={`title`} type={`text`} />
          </label>

          <PostsFormDescription
            label={`Description`}
            className={`bg-yellow-200 -mx-4 px-4 py-4`}
            
          />

          <label className="block mt-4">
            <div className="flex">
              <span className="block font-medium">Image</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
          </label>
          <FormUploadFile />
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

export default PostsCreatePage;
