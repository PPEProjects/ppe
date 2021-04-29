import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import { Button } from "../../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { detailsSelector, setDetailData } from "../../slices/details";
import { deleteSyllabuse } from "../../slices/syllabuses";
import SyllabusesEditForm from "./SyllabusesEditForm";
import SyllabusesContent from "./SyllabusesContent";
import { usersSelector,getUsers,getUsersObj } from "../../slices/users";
import Ajax from "../../components/Ajax";
import Alert from "../../components/Alert";

const SyllabusesDetailPage = () => {
  const dispatch = useDispatch();
  const { isShow, mode, syllabuse, course } = useSelector(detailsSelector);
  const { user } = useSelector(usersSelector);
  const [show, setShow] = useState(1);
  const [type, setType] = useState(``);
  const [chooses, setChooses] = useState({});
  const [courses, setCourses] = useState([]);
  const { usersObj } = useSelector(usersSelector);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUsersObj());
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
  const renderMain = () => {
  
    return (
      <React.Fragment>
        <section className="bg-black-60 fixed top-0 left-0 right-0 bottom-0 z-30">
          <div className="absolute absolute-x absolute-y w-full px-4">
            <section className="w-full max-w-3xl mx-auto px-4 py-2 bg-white rounded-lg overflow-hidden shadow-md ">
              <div className=" text-lg flex items-center justify-between ">
               <div>
               <h1 className="font-semibold text-gray-700 truncate mr-8">
            
                  {syllabuse.name}
                </h1>
                <h2 className="truncate-2y pt-2 text-sm leading-5 text-gray-500 font-semibold">
                   {usersObj[syllabuse.user_id]?.name} 
                 </h2>
               </div>
              
                <Button
                  onClick={() => dispatch(setDetailData({ isShow: false }))}
                  className={` -mr-2 block bg-white text-gray-900 h-10 w-10 rounded-lg hover:opacity-75 hover:bg-gray-300 flex items-center justify-center`}
                  type={`button`}
                  icon={`close`}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <ul className="flex text-sm text-gray-700 font-semibold">
                  <li className="text-blue-500 px-3 pb-1 border-b-4 border-blue-600">
                    <a href="#">Detail</a>
                  </li>
                
                </ul>

                <div className="flex">
                  <Button
                    onClick={() => dispatch(deleteSyllabuse(syllabuse))}
                    type={`button`}
                    title={`Delete`}
                    className={`bg-gray-300 text-gray-800 `}
                  />

              

                 
                </div>
              </div>
            
            
         
                <div className="grid grid-cols-12 gap-4 my-4 max-h-56 overflow-y-auto">
                  <div className="col-span-12">
                    {(syllabuse.contents ?? []).map((syllabus, key) => (
                        <div key={key}>
                          { syllabus.topic !== null &&
                          <h3 className="text-xl mt-3 text-indigo-700 font-semibold whitespace-pre-line">
                           {syllabus.topic}
                          </h3>
                          }
                           
                          <p className={`leading-6 whitespace-pre-line mt-3`}>{syllabus.lists}</p>
                        </div>
                      ))}
                  </div>
                </div>
      
              {mode !== `edit` && (
                <div className="flex justify-end mb-2">
                  <Button
                    type={`button`}
                    title={`Close`}
                    onClick={() => dispatch(setDetailData({ isShow: false }))}
                  />
                </div>
              )}
            </section>
          </div>
        </section>
      </React.Fragment>
    );
  };

  return <React.Fragment>{isShow ? renderMain() : ``}</React.Fragment>;
};

export default SyllabusesDetailPage;
