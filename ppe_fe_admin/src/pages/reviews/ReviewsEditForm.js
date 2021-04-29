import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {usersSelector, setUserData} from "../../slices/users";
import {formSelector, setFormData} from "../../slices/form";
import Ajax from "../../components/Ajax";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import FormFooter from "../../components/FormFooter";

import FormUploadFile from "../../components/FormUploadFile";
import { detailsSelector, setDetailData } from "../../slices/details";

import {
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
} from "../../components/Form";

const ReviewsEditForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [chooses, setChooses] = useState({});
  const [companies, setCompanies] = useState([]);
  const { isShow, mode, review } = useSelector(detailsSelector);

  useEffect(() => {
    fetchData();
    dispatch(setFormData({checkboxes:{star: review.star}}));
    async function fetchData() {
      let res = await Ajax.get(`/companies`);
      setCompanies(res?.data?.companies);
    }
  }, [dispatch]);

  const reviewSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.put(`/reviews/${review.id}`, params);
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
    <form onSubmit={(e) => reviewSAVE(e)}>
      <main className="w-full max-w-3xl mx-auto rounded max-h-64 overflow-y-auto my-3">
      
        <section
          className={`${
            show !== 1 ? `hidden` : ``
          } bg-white rounded-md overflow-hidden shadow px-4 py-4 `}
        >
         
            <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Company</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Select
           
            name={`company_id`}
            ids={companies.map(({ id }) => id)}
            values={companies.map(({ name }) => name)}
            value={review.company_id}
          />
         </label>
        
        <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Title</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Input
           
            name={`title`}
            value={review.title}
            type={`text`}
          />
         </label>

         
          <label className="block mt-4">
                      <div className="flex -mb-3"><span className="block font-medium">Content</span><b className="text-red-600 ml-1"> (*)</b></div>
                      <Textarea
           
            name={`content`}
            value={review.content}
            placeholder={`Enter a content about your review`}
          />
         </label>
        

          <label className="block mt-4">
            <div className="flex"><span className="block font-medium">Star</span><b className="text-red-600 ml-1"> (*)</b></div>

          </label>
          {[...Array(5)].map((x, i) => (
            <label className="flex items-center cursor-pointer mt-1 hover:opacity-75">
              <input type="radio" name={`star`} value={i} />
              <span className="ml-2">{i} star</span>
            </label>
          ))}
        </section>
      </main>

      <FormFooter
       tabNumber={1}
       show={show}
        hidden={`admin_register`}
        onShowMinus={() => setShow(show - 1)}
        onShowPlus={() => setShow(show + 1)}
      />
    </form>
  );
};

export default ReviewsEditForm;
