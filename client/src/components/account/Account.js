import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../History";
// action
import { fetchCocProfile } from "../../actions/coc/cocProfileActions";
import { fetchMultipleClanDetails } from "../../actions/coc/cocClanActions";
// local imports
import Profile from "../cocAccount/Profile";
import ProfileClan from "../cocAccount/ProfileClan";
import AlllianceProfile from "../alliance/AllianceProfile";
// account class component
class Account extends React.Component {
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
  renderProfile = (theme, user) => {
    // render each profile with profile component
    if (user.players.length > 0) {
      return user.players.map((profile) => {
        return (
          <Profile
            key={profile.name + profile.tag}
            theme={theme}
            profile={profile.player}
          />
        );
      });
    } else {
      return <Link to="/add">Link Accounts Here</Link>;
    }
  };

  filterClans = (profile) => {
    console.log(profile);
    let tagCheck = [];
    let profileList = profile.map((item) => {
      if (tagCheck.includes(item.details.tag)) {
        return null;
      } else {
        tagCheck.push(item.details.tag);
        return item;
      }
    });
    for (let i = 0; i < profileList.length; i++) {
      if (profileList[i] === null) {
        profileList.splice(i, 1);
      }
    }
    return profileList;
  };

  renderClanProfile = (theme, user) => {
    if (user.players.length < 1) {
      return <Link to="/add">Link Accounts Here</Link>;
    }
    const playersClan = user.players.map((player) => {
      return player.clan;
    });
    const clanArray = this.filterClans(playersClan);
    console.log(clanArray);
    return clanArray.map((clan, idx) => {
      return (
        <ProfileClan
          key={clan.details.tag}
          theme={theme}
          warlog={clan.war_log}
          profile={clan.details}
        />
      );
    });
  };
  renderMenuContent = (type, theme, user) => {
    switch (type) {
      case "Clash Accounts":
        return this.renderProfile(theme, user);
      case "Clan":
        return this.renderClanProfile(theme, user);
      case "Alliance":
        return <AlllianceProfile />;
      default:
        return null;
    }
  };
  render() {
    console.log(this.props);
    const user = this.props.auth.user;
    const theme = this.props.auth.settings;
    if (!user) {
      return null;
    }
    return (
      <div className={`ui ${theme.mode} segment`}>
        <div>
          <h1 className={`ui ${theme.mode} header`}>
            {user.userDetails.player_name}
          </h1>
        </div>
        <div
          className={`ui ${theme.mode} segment`}
          style={{ backgroundColor: theme.segmentColor }}
        >
          {user.players.length < 1 ? (
            <div>
              <h3>
                {"Add Clash Of Clans accounts to your profile "}
                <Link to="/add">Here</Link>
              </h3>
            </div>
          ) : (
            <div className={`ui ${theme.mode} secondary menu`}>
              <button
                onClick={(e) => this.renderMenu("Clash Accounts")}
                className={
                  this.state.menu === "Clash Accounts"
                    ? "ui item active button"
                    : "item"
                }
              >
                Clash Accounts
              </button>
              <button
                onClick={(e) => this.renderMenu("Clan")}
                className={this.state.menu === "Clan" ? "item active" : "item"}
              >
                Clan
              </button>
              <button
                onClick={(e) => this.renderMenu("Alliance")}
                className={
                  this.state.menu === "Alliance" ? "item active" : "item"
                }
              >
                Alliance
              </button>
            </div>
          )}
          <div>{this.renderMenuContent(this.state.menu, theme, user)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  fetchCocProfile,
  fetchMultipleClanDetails,
})(Account);
