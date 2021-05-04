// npm imports
import React from "react";
import { connect } from "react-redux";
// actions
import { kickClanOut } from "../../../../actions/allianceActions/allianceActions";
class ManageClans extends React.Component {
  state = {
    promptLeave: null,
  };
  kickClan = (clan) => {
    const form = {
      alliance: this.props.profile.alliance.id,
      allianceTag: this.props.profile.alliance.tag,
      clanName: clan.name,
      clan: clan.tag,
      user: this.props.user.userDetails.id,
    };
    console.log("kick", form);
    this.props.kickClanOut(form);
    this.props.rerenderState();
  };
  renderLeaveButtons = (clan, theme, idx) => {
    if (this.state.promptLeave === clan.tag) {
      return (
        <div>
          <h4>Are you sure you want to Kick!</h4>
          <button
            className={`ui ${theme} green button`}
            onClick={() => this.kickClan(clan)}
          >
            Confirm
          </button>
          <button
            className={`ui ${theme} red button`}
            onClick={() => this.setState({ promptLeave: null })}
          >
            No
          </button>
        </div>
      );
    }
    return (
      <button
        onClick={() => this.setState({ promptLeave: clan.tag })}
        className={`ui ${theme} red button`}
      >
        <i className="window close outline icon" />
        {"Kick"}
      </button>
    );
  };
  renderClans = (clans, leaders, theme) => {
    const fontColor = `${theme === "inverted" ? "white" : "black"}`;
    const clansList = clans.map((clan, idx) => {
      return (
        <tr style={{ color: fontColor }} key={clan.name + idx}>
          <td>{clan.name}</td>
          <td>{clan.tag}</td>
          <td></td>
          <td>{this.renderLeaveButtons(clan, theme, idx)}</td>
        </tr>
      );
    });
    return clansList;
  };
  render() {
    console.log("render", this.props);
    return (
      <div>
        <table className={`ui very basic collapsing celled table`}>
          <tbody>
            {this.renderClans(
              this.props.profile.clans,
              this.props.profile.leaders,
              this.props.theme.mode
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(null, { kickClanOut })(ManageClans);
