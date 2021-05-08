// npm imports
import React from "react";

// import loader
import Loader from "../Loader";
// import components
import ProfileStats from "./ProfileStats";
import ProfileTroops from "./ProfileTroops";
import ProfileAchievments from "./ProfileAchievments";
// profile class component
class Profile extends React.Component {
  state = {
    menu: "",
  };
  renderMenu = (type) => {
    if (this.state.menu === type) {
      this.setState({ menu: " " });
    } else {
      this.setState({ menu: type });
    }
  };
  renderMenuContent = (type, theme, profile) => {
    switch (type) {
      case "stats":
        return <ProfileStats theme={theme} profile={profile} />;
      case "troops":
        return <ProfileTroops theme={theme} profile={profile} />;
      case "achievments":
        return <ProfileAchievments theme={theme} profile={profile} />;
      default:
        return null;
    }
  };
  render() {
    console.log("props", this.props);
    if (!this.props.profile) {
      return <Loader text="Incorrect deployment of component" />;
    }
    if (!this.props.theme) {
      return <Loader text="Incorrect deployment of component" />;
    }
    const theme = this.props.theme;
    const profile = this.props.profile;
    console.log("profile render function", profile);
    return (
      <div className={`ui ${theme.mode} segment`}>
        <div className={`ui ${theme.mode} list`}>
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
          <div className="item">
            <div className={`ui ${theme.mode} segment`}>
              <div className={`ui ${theme.mode} secondary menu`}>
                <button
                  onClick={(e) => this.renderMenu("stats")}
                  className={
                    this.state.menu === "stats" ? "item active" : "item"
                  }
                >
                  Stats
                </button>
                <button
                  onClick={(e) => this.renderMenu("troops")}
                  className={
                    this.state.menu === "troops" ? "item active" : "item"
                  }
                >
                  Troops
                </button>
                <button
                  onClick={(e) => this.renderMenu("achievments")}
                  className={
                    this.state.menu === "achievments" ? "item active" : "item"
                  }
                >
                  Achievments
                </button>
              </div>

              {this.renderMenuContent(this.state.menu, theme, profile)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export class component
export default Profile;
