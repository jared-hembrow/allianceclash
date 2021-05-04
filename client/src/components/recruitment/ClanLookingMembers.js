// npm imports
import React from "react";
// Loader
import Loader from "../Loader";
// component
const ClanLookingMembers = (props) => {
  if (props.postList === undefined) {
    return <Loader text="Loading..." />;
  }
  const theme = props.theme;
  return props.postList.map((post, idx) => {
    return (
      <div key={post.title + post.userId} className="ui card">
        <div className="content">
          <div className="header">{post.title}</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">{post.clanName}</h4>
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">{post.clanTag}</div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary">
                  <h4 className="ui sub header">Townhall Requirements</h4>
                  {post.townhallRequirement}
                  <h4 className="ui sub header">Hero Requirements</h4>
                  {`BK:${post.barbarianKingRequirement}-AQ:${post.archerQueenRequirement}-GW:${post.grandWardenRequirement}-RC:${post.royalChampionRequirement}`}
                </div>
              </div>
            </div>
            <div className={`ui ${theme} segment`}>
              <div className="event">
                <div className="content">
                  <div className="summary">{post.recruitmentPost}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="extra content">
          {/*  <button className="ui button">Apply(working on this)</button>*/}
        </div>
      </div>
    );
  });
};
// export component
export default ClanLookingMembers;
