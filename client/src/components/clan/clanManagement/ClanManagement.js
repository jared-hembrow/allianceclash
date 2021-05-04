// npm import
import React from "react";
import { connect } from "react-redux";
// actions
import { leaveAlliance } from "../../../actions/clanActions/clanActions";
// commponent Imports
import InviteList from "./InviteList";
class ClanManagement extends React.Component {
  state = {
    promptLeave: false,
  };
  leaveAlliance = (alliance) => {
    this.props.leaveAlliance({
      alliance: alliance.id,
      allianceTag: alliance.tag,
      clan: this.props.profile.clan.tag,
      userRole: this.props.profile.role,
      user: this.props.user.id,
    });
    this.props.rerender();
    this.setState({ promptLeave: false });
  };
  renderLeaveButtons = (alliance, theme) => {
    if (this.state.promptLeave) {
      return (
        <div>
          <h4>Are you sure you want to leave!</h4>
          <button
            className={`ui ${theme.mode} green button`}
            onClick={() => this.leaveAlliance(alliance)}
          >
            Confirm
          </button>
          <button
            className={`ui ${theme.mode} red button`}
            onClick={() => this.setState({ promptLeave: false })}
          >
            No
          </button>
        </div>
      );
    }
    return (
      <button
        onClick={() => this.setState({ promptLeave: true })}
        className={`ui ${theme.mode} red button`}
      >
        <i className="window close outline icon" />
        {"Leave"}
      </button>
    );
  };
  renderAlliance = (alliance, theme) => {
    const fontColor = `${theme.mode === "inverted" ? "white" : "black"}`;
    return (
      <table id="alliance" className={`ui very basic collapsing celled table`}>
        <thead>
          <tr>
            <th style={{ color: fontColor }}>Alliance</th>
            <th style={{ color: fontColor }}>Alliance Tag</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ color: fontColor }} key={alliance.name}>
            <td>{alliance.name}</td>
            <td>{alliance.tag}</td>
            <td></td>
            <td>{this.renderLeaveButtons(alliance, theme)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.profile.alliance.name
          ? this.renderAlliance(this.props.profile.alliance, this.props.theme)
          : null}
        <div>
          <InviteList
            theme={this.props.theme}
            profile={this.props.profile}
            user={this.props.user}
            allianceInviteList={this.props.allianceInviteList}
            rerender={this.props.rerender}
          />
        </div>
      </div>
    );
  }
}
export default connect(null, { leaveAlliance })(ClanManagement);
