// npm imports
import React from "react";
// Loader
import Loader from "../Loader";
// component
const PlayerLooking = (props) => {
  if (props.postList === undefined) {
    return <Loader text="Loading..." />;
  }
  const theme = props.theme;
  return props.postList.map((post, idx) => {
    return (
      <div class="ui card" key={post.title + idx}>
        <div class="content">
          <div class="header">{post.title}</div>
        </div>
        <div class="content">
          <h4 class="ui sub header">{post.player_name}</h4>
          <div class="ui small feed">
            <div class="event">
              <div class="content">
                <div class="summary">{post.player_tag}</div>
              </div>
            </div>
            <div class="event">
              <div class="content">
                <div class="summary">
                  <h4 class="ui sub header">Looking For:</h4>
                  {post.recruitment_type + " Clan"}
                </div>
              </div>
            </div>
            <div className={`ui ${theme} segment`}>
              <div class="event">
                <div class="content">
                  <div class="summary">{post.recruitment_post}</div>
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
export default PlayerLooking;
