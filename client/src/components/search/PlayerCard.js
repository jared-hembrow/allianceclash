// npm imports
import React from "react";
import { connect } from "react-redux";
import { clearResults } from "../../actions/searchActions/index";
import ProfileStats from "../cocAccount/ProfileStats";
// component
class PlayerCard extends React.Component {
  componentWillUnmount() {
    this.props.clearResults();
  }
  render() {
    const theme = this.props.theme;
    const profile = this.props.results;
    if (profile.hasOwnProperty("league") === false) {
      return null;
    }
    return (
      <div
        style={{
          backgroundColor: theme.segmentColor,
          borderRadius: "0.5rem",
        }}
        className={`ui ${theme.mode} list`}
      >
        {" "}
        <div style={{ padding: "1rem" }}>
          <div className="item">
            <img
              alt="League Symbol"
              className="ui avatar image"
              src={`${
                profile.league.iconUrls
                  ? profile.league.iconUrls.medium
                  : "/static/images/coc/Unranked.png"
              }`}
            />
            <div className="content">
              <h2 className={`${theme.mode} header`}>{profile.name}</h2>
              <div className="description">{profile.tag}</div>
            </div>
          </div>
          <ProfileStats profile={profile} theme={theme} />
        </div>
      </div>
    );
  }
}

export default connect(null, { clearResults })(PlayerCard);
