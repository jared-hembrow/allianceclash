// npm imports
import React from "react";

// components
import MemberList from "../cocClan/MemberList";
import Warlog from "../cocClan/Warlog";
import WarOverView from "../currentWar/WarOverView";
import TimeLeft from "../currentWar/TimeLeft";
import ClanDetailsCard from "./ClanDetailsCard";
import ClanManagement from "./clanManagement/ClanManagement";

class ClanContainer extends React.Component {
  state = {
    selected: "",
  };
  renderSelected = (value) => {
    const selected =
      value.target.options[value.target.options.selectedIndex].value;
    this.setState({ selected: selected });
  };
  renderContent = (type, theme, profile, user) => {
    switch (type) {
      case "":
        return null;
      case "management":
        return (
          <ClanManagement
            theme={theme}
            profile={profile}
            user={user}
            allianceInviteList={this.props.profile.invite}
            rerender={this.props.rerender}
          />
        );
      case "members":
        return (
          <MemberList
            members={profile.details.member_list}
            theme={theme.mode}
            type="clanProfile"
          />
        );
      case "warlog":
        return (
          <Warlog
            log={this.props.profile.war_log.war_list.items}
            theme={theme}
          />
        );
      case "war":
        return (
          <div>
            <WarOverView
              war={this.props.profile.current_war}
              theme={theme.mode}
            />
            <TimeLeft
              data={this.props.profile.current_war}
              theme={theme.mode}
            />
          </div>
        );
      default:
        return <h2>In construction</h2>;
    }
  };
  renderLeaderContent = (profile, user) => {
    for (let i = 0; i < user.cocAccounts.length; i++) {
      if (
        (user.cocAccounts[i].role === "coLeader" &&
          user.cocAccounts[i].clan_tag === profile.details.tag) ||
        (user.cocAccounts[i].role === "leader" &&
          user.cocAccounts[i].clan_tag === profile.details.tag)
      ) {
        return <option value="management">Management</option>;
      }
    }
    return null;
  };

  render() {
    console.log("container", this.props);
    const theme = this.props.theme;
    return (
      <div
        style={{
          borderRadius: "1rem",
          backgroundColor: theme.segmentColor,
          padding: "1rem",
          margin: "1rem",
        }}
      >
        <ClanDetailsCard
          profile={this.props.profile.details}
          alliance={this.props.profile.alliance}
          theme={theme}
        />
        <div className={`ui ${theme.mode} segment`}>
          <form>
            <div className="ui form">
              <div className="field">
                <select
                  name="content"
                  onChange={(value) => this.renderSelected(value)}
                >
                  <optgroup label="Stats">
                    <option value="warlog">War Log</option>
                    <option value="members">Members</option>
                    <option value="war">War</option>
                  </optgroup>
                  <optgroup label="more">
                    {this.renderLeaderContent(
                      this.props.profile,
                      this.props.user
                    )}
                  </optgroup>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className={`ui ${theme.mode} segment`}>
          {this.renderContent(
            this.state.selected,
            theme,
            this.props.profile,
            this.props.user
          )}
        </div>
      </div>
    );
  }
}

export default ClanContainer;
