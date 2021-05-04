// npm imports
import React from "react";

// component
const AllianceCardDetails = (props) => {
  return (
    <div className={`ui ${props.theme.mode} segment`}>
      <div className={`ui ${props.theme.mode} horzontal list`}>
        <div className="item">
          <div
            className="content"
            style={{
              backgroundColor: props.theme.segmentColor,
              borderRadius: "1rem",
              padding: "1rem",
            }}
          >
            <div className="ui header">
              <h1>{props.profile.name}</h1>
            </div>
            {props.profile.tag.toUpperCase()}
          </div>
        </div>
      </div>
      <div className={`ui ${props.theme.mode} segment`}>
        <div
          style={{
            backgroundColor: props.theme.segmentColor,
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          {props.profile.description}
        </div>
      </div>
    </div>
  );
};

//export component
export default AllianceCardDetails;
