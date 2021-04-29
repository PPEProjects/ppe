import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../../slices/users";
import Ajax from "../../components/Ajax";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";
import FormUploadFile from "../../components/FormUploadFile";
import { Button, Input, Select, Textarea } from "../../components/Form";
import ReleasesFormContent from "./ReleasesFormContent";
import { detailsSelector, setDetailData } from "../../slices/details";

const ReleasesEditForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [users, setUsers] = useState([]);
  const [chooses, setChooses] = useState({});
  const [projects, setProjects] = useState([]);
  const { isShow, mode, release } = useSelector(detailsSelector);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      let res = await Ajax.get(`/projects`);
      setProjects(res.data?.projects);
    }
  }, [dispatch]);

  const releaseSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.put(`/releases/${release.id}`, params);
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
    <form onSubmit={(e) => releaseSAVE(e)}>
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
            value={release.project_id}
          />
             </label>
        

          <ReleasesFormContent
            label={`Releases`}
            className={`bg-yellow-200 -mx-4 px-4 py-4`}
            inputs={release.contents}
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
export default ReleasesEditForm;
