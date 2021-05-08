import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "./Form";

const FormFooter = (props) => {
  const history = useHistory();
  const { hidden, tabNumber, show, type } = props;
  return (
    <section className="w-full max-w-3xl mx-auto flex items-center justify-between text-sm mt-6 ">
      <Button
        type={`button`}
        title={`Cancel`}
        onClick={() => history.goBack()}
        className={`bg-gray-300 font-thin`}
      />
      {show !== 1 && (
        <div className="flex">
          <Button
            onClick={!props.onShowMinus ? false : (e) => props.onShowMinus(e)}
            className={`bg-gray-300 rounded-r-none`}
            type={`button`}
            icon={`arrow_back`}
          />
        </div>
      )}
      {show === tabNumber && <Button type={`submit`} title={`Save`} />}
      {show !== tabNumber && (
        <Button
          onClick={!props.onShowPlus ? false : (e) => props.onShowPlus(e)}
          className={`bg-gray-300 rounded-l-none border-l-2 border-white`}
          type={`button`}
          title={`Next`}
        />
      )}

      <input type="hidden" value={hidden} name={hidden} />
    </section>
  );
};

export default FormFooter;
