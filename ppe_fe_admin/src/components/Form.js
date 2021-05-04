import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, usersSelector } from "../slices/users";
import { setFormData, formSelector } from "../slices/form";

export function Button(props) {
  let { title, type, className, icon, disabled } = props;
  className = className ?? `bg-indigo-700 text-white font-semibold  `;
  if (disabled) className += ` opacity-50 cursor-not-allowed`;
  type = type ?? `submit`;
  return (
    <button
      disabled={disabled}
      onClick={!props.onClick ? false : (e) => props.onClick(e)}
      type={type}
      className={`${className} px-3 hover:opacity-95 rounded-md h-10 flex items-center justify-center`}
    >
      <i className="material-icons text-2xl">{icon}</i>
      <span className={`${icon && title ? `ml-2` : ``}`}>{title}</span>
    </button>
  );
}

export function Input(props) {
  let { title, name, type, placeholder, value, className, readOnly } = props;
  placeholder = placeholder ?? ``;
  className = className ?? ``;
  const [value1, setValue1] = useState(value);
  useEffect(() => {
    if (props.onChange) {
      props.onChange(value1);
    }
  }, [value1]);
  return (
    <label className={`${className} block mt-4`}>
      <span className="block font-medium">{title}</span>
      <input
        type={type}
        name={name}
        className={`${readOnly ? `bg-gray-200` : ``} 
        border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-2 rounded-md outline-none focus:border-blue-700`}
        placeholder={placeholder}
        value={value1 ?? value}
        onChange={(e) => setValue1(e.target.value)}
        readOnly={readOnly}
      />
    </label>
  );
}
export function InputNumber(props) {
  let { title, name, type, placeholder, value, className, readOnly } = props;
  placeholder = placeholder ?? ``;
  className = className ?? ``;
  const [value1, setValue1] = useState(value);
  useEffect(() => {
    if (props.onChange) {
      props.onChange(value1);
    }
  }, [value1]);
  return (
    <label className={`${className} block mt-4`}>
      <span className="block font-medium">{title}</span>
      <input type={`number`} name={name} min={`0`}></input>
    </label>
  );
}

export function InputIcon({ icon, placeholder, className,...props }) {
  placeholder = placeholder ?? ``;
  className = className ?? ``;
  icon = icon ?? `search`;
  return (
    <label className={`${className} block mt-3 `}>
      <div className="border border-gray-400 rounded block overflow-hidden relative">
        <i className="material-icons absolute absolute-y ml-3 text-gray-500">
          {icon}
        </i>
        <input 
         {...props}
          type="text"
          className="h-10 w-full pr-3 pl-10"
          placeholder={placeholder}
        />
      </div>
    </label>
  );
}

export function Textarea({ title, name, placeholder, value, className }) {
  placeholder = placeholder ?? ``;
  className = className ?? ``;
  return (
    <label className="block mt-4">
      <span className="block font-medium">{title}</span>
      <textarea
        name={name}
        className={`${className} border w-full h-24 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700`}
        placeholder={placeholder}
      >
        {value}
      </textarea>
    </label>
  );
}

export function Radio({ title, name, values }) {
  return (
    <div className="mt-4">
      <span className="block font-medium">{title}</span>
      {values.map((item, key) => (
        <label
          key={key}
          className="flex items-center cursor-pointer mt-1 hover:opacity-95"
        >
          <input type="radio" name={name} value={item} />
          <span className="ml-2">{item}</span>
        </label>
      ))}
    </div>
  );
}

export function Checkbox(props) {
  const dispatch = useDispatch();
  const { checkboxes } = useSelector(formSelector);
  console.log("checkboxes", checkboxes);
  let { title, name, value, values, ids, checks } = props;
  ids = ids ?? values;
  console.log("name", name);
  useEffect(() => {}, [dispatch]);
  const handleChecks = (id, val) => {
    let checkboxes1 = JSON.parse(JSON.stringify(checkboxes));
    checkboxes1 = checkboxes1 ?? {};
    checkboxes1[name] = checkboxes1[name] ?? {};
    console.log("checkboxes1", checkboxes1);
    console.log("name", name);
    console.log("id", id);
    checkboxes1[name][id] = val;
    console.log("checkboxes1 1", checkboxes1);
    dispatch(setFormData({ checkboxes: checkboxes1 }));
  };
  return (
    <section className=" mt-4">
      <span className="block font-medium">{title}</span>
      <div className="grid grid-cols-12 gap-2 mt-2">
        {values.map((item, key) => (
          <div className="col-span-4" key={key}>
            <label className="flex items-center cursor-pointer hover:opacity-95">
              <input
                onChange={(e) => handleChecks(ids[key], e.target.checked)}
                type="checkbox"
                name={`${name}[${ids[key]}]`}
                checked={checkboxes[name] ? checkboxes[name][ids[key]] : false}
                className="form-checkbox h-4 w-4"
              />
              <span className="ml-2 w-full">{item}</span>
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Select(props) {
  let { title, name, value, values, ids } = props;
  ids = ids ?? values;
  const [value1, setValue1] = useState(value);
  useEffect(() => {
    if (props.onChange) {
      props.onChange(value1);
    }
  }, [value1]);
  return (
    <label className="block mt-4 pr-1">
      <span className="block font-medium">{title}</span>
      <select
        name={name}
        onChange={(e) => setValue1(e.target.value)}
        className="border w-full h-10 border-gray-400 hover:border-gray-500 px-3 mt-1 rounded-md outline-none focus:border-blue-700 activate:border-blue-500"
      >
        <option value={``}>-</option>
        {values.map((item, key) => (
          <option
            value={ids[key]}
            key={key}
            selected={value === ids[key] || value1 === ids[key]}
          >
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
