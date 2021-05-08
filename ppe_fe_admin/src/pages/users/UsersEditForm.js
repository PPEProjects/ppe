import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../slices/users";
import { detailsSelector, setDetailData } from "../../slices/details";
import Ajax from "../../components/Ajax";
import { Link, useHistory } from "react-router-dom";
import Alert from "../../components/Alert";
import UsersFormTypeJapanese from "./UsersFormTypeJapanese";
import UsersFormTypeProjects from "./UsersFormTypeProjects";
import FormUploadFile from "../../components/FormUploadFile";
import { Button, Input, Select, Checkbox } from "../../components/Form";
import FormFooter from "../../components/FormFooter";
import { usersSelector, setUserData } from "../../slices/users";
import UsersFormTypeInstructor from "./UsersFormTypeInstructor";
import { formSelector, setFormData } from "../../slices/form";

const UsersEditForm = () => {
  const dispatch = useDispatch();
  const { isShow, mode, user } = useSelector(detailsSelector);
  const [show, setShow] = useState(1);
  // const {  types,infos } = useSelector(usersSelector);
  const { checkboxes } = useSelector(formSelector);
  const [types, setTypes] = useState({});
  const history = useHistory();
  // useEffect(() => {
  //     dispatch(setUserData({infos:user.infos}));

  // }, []);
  useEffect(() => {
    setTypes(checkboxes.types ?? {});
    console.log("types 2", types);
  }, [checkboxes]);

  useEffect(() => {
    let type = new URL(window.location.href).searchParams.get("type");
    let checkboxes = { types: {} };
    if (type) {
      checkboxes[type] = `on`;
    }
    dispatch(setFormData({ checkboxes: checkboxes }));
    console.log("types", types);
  }, []);
  useEffect(() => {
    let checkboxes = { types: user?.types };
    dispatch(setFormData({ checkboxes: checkboxes }));
    console.log("types", types);
  }, [user]);
  const userSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.put(`/users/${user.id}`, params);
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
    Alert({ t: `Save success`, c: [] });
    dispatch(getUsers());
    window.location.reload();
  };
  const userCHECK = async (email) => {
    let res = await Ajax.post(`/users`, {
      userCheckUnique: `userCheckUnique`,
      email: email,
    });
    if (res.status === `error`) {
      Alert({ t: res.status, c: res.errors });
      return;
    }
  };

  return (
    <form onSubmit={(e) => userSAVE(e)} className="w-full my-10">
      <main className="w-full max-w-3xl mx-auto rounded max-h-64 overflow-y-auto my-3  ">
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 `}
        >
          {!checkboxes?.types[`Japanese instructor`] && (
            <label className="block mt-4">
              <div className="flex -mb-3">
                <span className="block font-medium">Full name</span>
                <b className="text-red-600 ml-1"> (*)</b>
              </div>
              <Input name={`name`} value={user.name} />
            </label>
          )}
          {checkboxes?.types[`Japanese instructor`] && (
            <>
              <label className="block mt-4">
                <div className="flex -mb-3">
                  <span className="block font-medium">
                    Full name in Vietnamese
                  </span>
                  <b className="text-red-600 ml-1"> (*)</b>
                </div>
                <Input
                  name={`infos_lang[vi][name]`}
                  value={user?.infos_lang?.vi?.name}
                />
              </label>
              <label className="block mt-4">
                <div className="flex -mb-3">
                  <span className="block font-medium">
                    Full name in English
                  </span>
                  <b className="text-red-600 ml-1"> (*)</b>
                </div>
                <Input
                  name={`infos_lang[en][name]`}
                  value={user?.infos_lang?.en?.name}
                />
              </label>
              <label className="block mt-4">
                <div className="flex -mb-3">
                  <span className="block font-medium">
                    Full name in Japanese
                  </span>
                  <b className="text-red-600 ml-1"> (*)</b>
                </div>
                <Input
                  name={`infos_lang[jp][name]`}
                  value={user?.infos_lang?.jp?.name}
                />
              </label>
            </>
          )}

          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Roles</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Checkbox
              name={`types`}
              values={[
                `Admin`,
                `Office leader`,
                `Japanese instructor`,
                `IT project instructor`,
                `Job supporter`,
                `Life supporter`,
                `Japanese learner`,
                `IT project member`,
                `Job hunter`,
              ]}
            />
          </label>

          <Input
            title={`Email (login)`}
            name={`email`}
            type={`email`}
            value={user.email}
            readOnly={true}
          />
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Avatar</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
          </label>
          <FormUploadFile files={user.files.images} handle_first={true} />
        </section>
        {types["Job supporter"] && (
          <section
            className={`${
              show !== 2 ? `hidden` : ``
            } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
          >
            <h2 className=" text-gray-800 font-semibold">
              {" "}
              Register information
            </h2>
            <Input title={`Phone`} name={`infos[phone]`} type={`tel`} />
          </section>
        )}
        {types["Japanese instructor"] && (
          <UsersFormTypeInstructor show={show} user={user} />
        )}
        {types[`Japanese learner`] && (
          <UsersFormTypeJapanese show={show} user={user} />
        )}
        {types[`IT project member`] && (
          <UsersFormTypeProjects show={show} user={user} />
        )}
      </main>
      <FormFooter
        tabNumber={4}
        show={show}
         onShowMinus={() => setShow(show - 1)}
         onShowPlus={() => setShow(show + 1)}
      />
    </form>
  );
};

export default UsersEditForm;
