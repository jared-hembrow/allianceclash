// npm imports
import React from "react";
//local
import AllianceCardDetails from "../AllianceCardDetails";
import MessageBoard from "./messageBoard/MessageBoard";
import AllianceManagement from "./management/AllianceManagement";
import AllianceChat from "./allianceChat/AllianceChat";
import Requests from "./invites/Requests";
// component
class AllianceContainer extends React.Component {
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
      case "message board":
        return <MessageBoard theme={theme} profile={profile} user={user} />;
      case "alliance chat":
        return <AllianceChat theme={theme} profile={profile} user={user} />;
      case "management":
        return (
          <AllianceManagement
            theme={theme}
            profile={profile}
            user={user}
            rerenderState={this.props.rerenderState}
          />
        );
      case "applications":
        return (
          <Requests
            theme={theme}
            profile={profile}
            user={user}
            rerenderState={this.props.rerenderState}
          />
        );
      default:
        return <h2>In construction</h2>;
    }
  };
  renderLeaderContent = (user, leaders) => {
    let isLeader = false;
    for (let i = 0; i < leaders.length; i++) {
      if (user.id === leaders[i].tag) {
        isLeader = true;
        break;
      }
    }
    if (isLeader) {
      return <option value="management">Management</option>;
    } else {
      return null;
    }
  };
  render() {
    const theme = this.props.theme;
    const profile = this.props.profile;
    console.log(profile);
    return (
      <div>
        <AllianceCardDetails profile={profile.alliance} theme={theme} />
        <div>
          <form>
            <div className="ui form">
              <div className="field">
                <select
                  name="content"
                  onChange={(value) => this.renderSelected(value)}
                >
                  <optgroup label="">
                    <option value="alliance chat">Alliance Chat</option>
                    <option value="message board">Message board</option>
                    <option value="applications">Applications</option>
                    {this.renderLeaderContent(
                      this.props.user.userDetails,
                      profile.leaders
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
            profile,
            this.props.user
          )}
        </div>
      </div>
    );
  }
}

// export
export default AllianceContainer;
