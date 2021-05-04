// npm imports
import React from "react";
// Loader
import Loader from "../Loader";
// component
const AllianceLookingClans = (props) => {
  if (props.postList === undefined) {
    return <Loader text="Loading..." />;
  }
  const theme = props.theme;
  return props.postList.map((post, idx) => {
    return (
      <div class="ui card">
        <div class="content">
          <div class="header">{post.title}</div>
        </div>
        <div class="content">
          <h4 class="ui sub header">{post.allianceName}</h4>
          <div class="ui small feed">
            <div class="event">
              <div class="content">
                <div class="summary">{post.allianceTag}</div>
              </div>
            </div>
            <div class="event">
              <div class="content">
                <div class="summary">
                  <h4 class="ui sub header">Looking For:</h4>
                  Clans
                </div>
              </div>
            </div>
            <div className={`ui ${theme} segment`}>
              <div class="event">
                <div class="content">
                  <div class="summary">{post.recruitmentPost}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="extra content">
          {/*  <button className="ui button">Apply(working on this)</button>*/}
        </div>
      </div>
    );
  });
};
// export component
export default AllianceLookingClans;
