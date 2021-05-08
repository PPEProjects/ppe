import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Ajax from "../../components/Ajax";
import { useDispatch, useSelector } from "react-redux";
import { setDetailData } from "../../slices/details";
import { InputIcon, Button } from "../../components/Form";
import { filesSelector, getFiles } from "../../slices/files";
import FormUploadFile from "../../components/FormUploadFile";
import Alert from "../../components/Alert";
import useMutationObserver from "../../components/useMutationObserver";
import PictureFormURL from "./PictureFormURL";
import ProjectsFormDescription from "../projects/ProjectsFormDescription";

const FilesPage = () => {
  const dispatch = useDispatch();
  const { filesObj, filesType } = useSelector(filesSelector);
  const [mode, setMode] = useState(`grid`);
  const [type, setType] = useState(``);
  const [show, setShow] = useState(1);
  const [mutations, setMutations] = useState({});

  useEffect(() => {
    setType(new URL(window.location.href).searchParams.get("type") ?? ``);
    dispatch(getFiles());
  }, [dispatch]);

  useMutationObserver((mutations) => {
    [...Array(4)].map((item, key) => {
      let el = document.querySelector(`#filesType_${key} [type=submit]`);
      if (el) {
        el.click();
      }
    });
  });

  const fileSAVE = async (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    let res = await Ajax.post(`/files`, params);
    console.log("res", res);
    if (res.status === `success` && res.errors[0] !== `Too Many Attempts.`) {
      Alert({ t: res.status, c: res.errors });
    }else {
      Alert({ t: res.status, c: res.errors });
    }
  };

  const renderMain = () => {
    return (
      <aside className="w-full">
        <div className="grid grid-cols-12  mx-6 mb-6">
          <div className="col-span-12 flex items-center justify-between mt-6 ">
            <h1 className="text-xl font-bold">Files</h1>
          </div>
          <div className="col-span-9 ">
            <section className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3">
              <div className="flex items-center justify-between mx-4">
                <div className="">
                  <b className="">{filesType?.length}</b>
                  <p className="text-gray-600">files</p>
                </div>
              </div>
            </section>

            {filesType.map((item, key) => (
              <>
                {item === "Pictures for Advertisement" && (
                  <form
                    key={key}
                    onSubmit={(e) => fileSAVE(e)}
                    className="bg-yellow-200 rounded-lg overflow-hidden shadow-sm border border-gray-300 pb-3 mt-4 px-4 "
                  >
                    <PictureFormURL
                      label={`Pictures for Advertisement`}
                      className={`-mx-4 px-4 py-4`}
                      inputs={filesObj[item]?.descriptions}
                      handle_first={true}
                    />
                    <div className="flex items-center justify-end">
                      <button
                        type="submit"
                        className="bg-indigo-700 text-white font-semibold  px-3 hover:opacity-95 rounded-md h-10 flex items-center justify-center"
                      >
                        <i className="material-icons text-2xl"></i>
                        <span className="">Save</span>
                      </button>
                    </div>
                    <input type="hidden" name={`type`} value={item} />
                    <input type="hidden" name={`saveDB`} value={`saveDB`} />
                  </form>
                )}
                {item === "Pictures for Japanese Tab slider" && (
                  <form
                    key={key}
                    id={`filesType_${key}`}
                    onSubmit={(e) => fileSAVE(e)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3 mt-4 px-4 "
                  >
                    <FormUploadFile
                      label={item}
                      files={filesObj[item]?.files?.images}
                    />
                    <input type="hidden" name={`type`} value={item} />
                    <input type="hidden" name={`saveDB`} value={`saveDB`} />
                    <button type={`submit`} className={`hidden`}>
                      submit
                    </button>
                  </form>
                )}
                {item === "Pictures for IT Tab slider" && (
                  <form
                    key={key}
                    id={`filesType_${key}`}
                    onSubmit={(e) => fileSAVE(e)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-300 py-3 mt-4 px-4 "
                  >
                    <FormUploadFile
                      label={item}
                      files={filesObj[item]?.files?.images}
                    />
                    <input type="hidden" name={`type`} value={item} />
                    <input type="hidden" name={`saveDB`} value={`saveDB`} />
                    <button type={`submit`} className={`hidden`}>
                      submit
                    </button>
                  </form>
                )}
              </>
            ))}
          </div>
        </div>
      </aside>
    );
  };
  return <React.Fragment>{renderMain()}</React.Fragment>;
};
export default FilesPage;
