import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector, setFilterData } from "../slices/filter";
import { Select } from "../components/Form";
import FilterUser from "./FilterUser";
import Cookies from "universal-cookie";

const Language = (props) => {
  const dispatch = useDispatch();
  const { filterOpen } = useSelector(filterSelector);
  const [openLanguage, setOpenLanguage] = useState(false);
  const cookies = new Cookies();
  const [lang, setLang] = useState(cookies.get("lang") ?? "English");
  const languages = [
    {
      name: "English",
      key: "English",
      image: "/assets/images/flags/united-kingdom.png",
    },
    {
      name: "Japanese",
      key: "Japanese",
      image: "/assets/images/flags/japan.png",
    },
    {
      name: "Tiếng Việt",
      key: "Vietnamese",
      image: "/assets/images/flags/vietnam.png",
    },
  ];
  useEffect(() => {
    cookies.set("lang", lang, { path: "/" });
  }, [lang]);

  return (
    <React.Fragment>
      <section className="w-40 text-sm relative">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Language</span>
        </div>
        <button
          type="button"
          onClick={() => setOpenLanguage(!openLanguage)}
          className="mt-2 bg-white text-gray-800 h-10 w-full px-2 rounded hover:opacity-75 hover:bg-gray-200 border border-gray-400 flex items-center "
        >
          <span className="truncate w-40 ">{lang}</span>
          <i className="ml-2 material-icons">arrow_drop_down</i>
        </button>
        <ul
          style={{ marginTop: `5.5rem` }}
          className={`${openLanguage ? `block` : `hidden`}
                     w-48 border shadow-md rounded-md bg-white arrow arrow-left-2 absolute z-20 top-0 left-0 -ml-2 `}
        >
          {languages.map((language, i) => (
            <li className="" key={i}>
              <button
                onClick={() => {
                  setOpenLanguage(false);
                  setLang(language.key);
                  window.location.reload();
                }}
                className={`w-full flex items-center py-3 px-3 hover:opacity-75 ${
                  i ? "border-t" : ""
                }`}
              >
                <div className="w-6">
                  <div className="pb-1x1 relative rounded-sm overflow-hidden bg-gray-300">
                    <img
                      alt=""
                      src={`${window.$home}${language.image}`}
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                </div>
                <figcaption className="ml-2">{language.name}</figcaption>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </React.Fragment>
  );
};
export default Language;
