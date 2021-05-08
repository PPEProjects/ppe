import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector, setUserData } from "../../slices/users";
import { formSelector, setFormData } from "../../slices/form";
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
import { detailsSelector, setDetailData } from "../../slices/details";

const CompaniesEditForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [chooses, setChooses] = useState({});
  const [categories, setCategories] = useState([]);
  const { isShow, mode, company } = useSelector(detailsSelector);

  useEffect(() => {
    fetchData();

    dispatch(
      setFormData({
        checkboxes: { "more[categories]": company.more.categories },
      })
    );
    async function fetchData() {}
  }, [dispatch]);

  const companySAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.put(`/companies/${company.id}`, params);
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
    <form onSubmit={(e) => companySAVE(e)}>
      <main className="w-full max-w-3xl mx-auto rounded max-h-64 overflow-y-auto my-3">
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 `}
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
                value={company.language}
              />
            </label>

            <label className="block mt-4  w-full">
              <div className="flex -mb-3">
                <span className="block font-medium">Ranking</span>
              </div>
              <Input
                name={`more[ranking]`}
                type={`number`}
                value={company.more.ranking}
                className={`w-full pl-1`}
              />
            </label>
          </div>

          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Name</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input name={`name`} type={`text`} value={company.name} />
          </label>

          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">About us</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Textarea
              name={`about_us`}
              value={company.about_us}
              placeholder={`Enter a short description about your company`}
            />
          </label>

          <FormUploadFile
            label={`Image`}
            files={company.files.images}
            handle_first={true}
          />
        </section>
        <section
          className={`${
            show !== 2 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">
            Register information (1/2)
          </h2>
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Type of company</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Select
              name={`type`}
              values={[`Outsourcing`, `Product`, `R&D`]}
              value={company.type}
            />
          </label>

          <div className="flex items-center justify-between">
            <label className="block mt-4 w-full">
              <div className="flex -mb-3">
                <span className="block font-medium">Member # [from]</span>
                <b className="text-red-600 ml-1"> (*)</b>
              </div>
              <Input
                name={`more[members][from]`}
                type={`number`}
                className={`w-full pr-1`}
                value={company.more.members.from}
              />
            </label>

            <label className="block mt-4 w-full">
              <div className="flex -mb-3">
                <span className="block font-medium">Member # [to]</span>
                <b className="text-red-600 ml-1"> (*)</b>
              </div>
              <Input
                name={`more[members][to]`}
                type={`number`}
                className={`w-full pl-1`}
                value={company.more.members.to}
              />
            </label>
          </div>
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Country of the company</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input
              name={`more[country]`}
              type={`text`}
              value={company.more.country}
            />
          </label>

          <div className="flex items-center justify-between">
            <label className="block mt-4 w-full">
              <div className="flex -mb-3">
                <span className="block font-medium">Working day [from]</span>
                <b className="text-red-600 ml-1"> (*)</b>
              </div>
              <Input
                name={`more[time][from]`}
                type={`text`}
                className={`w-full pr-1`}
                value={company.more.time.from}
              />
            </label>

            <label className="block mt-4 w-full">
              <div className="flex -mb-3">
                <span className="block font-medium">Working day [to]</span>
                <b className="text-red-600 ml-1"> (*)</b>
              </div>
              <Input
                name={`more[time][to]`}
                type={`text`}
                className={`w-full pr-1`}
                value={company.more.time.to}
              />
            </label>
          </div>
        </section>
        <section
          className={`${
            show !== 3 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 mt-6 `}
        >
          <h2 className=" text-gray-800 font-semibold">
            Register information (2/2)
          </h2>
          <Checkbox
            title={`Categories`}
            name={`more[categories]`}
            values={[
              `Education`,
              `Teaching`,
              `Training`,
              `Coaching`,
              `Information`,
              `Technology`,
              `Internet`,
              `Telecommunications`,
              `Electrical`,
              `Electronic`,
              `Manufacturing`,
              `Equipment`,
              `Health Care`,
              `Nursing`,
            ]}
          />

          <div className="grid grid-cols-12 gap-2 mt-2">
            {categories.map((item, key) => (
              <div className="col-span-4">
                <label
                  className="flex items-center cursor-pointer hover:opacity-75 "
                  key={key}
                >
                  <input
                    type="checkbox"
                    name={`more[categories][${item}]`}
                    className="form-checkbox h-4 w-4"
                  />
                  <span className="ml-2 font-medium w-full">{item}</span>
                </label>
              </div>
            ))}
          </div>
          <label className="block mt-4">
            <div className="flex -mb-3">
              <span className="block font-medium">Address</span>
              <b className="text-red-600 ml-1"> (*)</b>
            </div>
            <Input
              name={`more[address]`}
              type={`text`}
              value={company.more.address}
            />
          </label>

          <Checkbox name={`more`} values={[`OT Salary`]} />
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

export default CompaniesEditForm;
