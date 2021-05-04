import React from "react";

const Loader = (props) => {
  if (!props.text) {
    return null;
  }
  return (
    <div className="ui active dimmer">
      <div className="ui text loader">{props.text}</div>

      <p></p>
    </div>
  );
};
export default Loader;
