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
          <h4 className="ui sub header">{post.clan_name}</h4>
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">{post.clan_tag}</div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary">
                  <h4 className="ui sub header">Townhall Requirements</h4>
                  {post.townhall_requirement}
                  <h4 className="ui sub header">Hero Requirements</h4>
                  {`BK:${post.barbarian_king_requirement}-AQ:${post.archer_queen_requirement}-GW:${post.grand_warden_requirement}-RC:${post.royal_champion_requirement}`}
                </div>
              </div>
            </div>
            <div className={`ui ${theme} segment`}>
              <div className="event">
                <div className="content">
                  <div className="summary">{post.recruitment_post}</div>
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
