// npm import
import React from "react";
import { connect } from "react-redux";
import { acceptAllianceInvite } from "../../../actions/clanActions/clanActions";
class InviteList extends React.Component {
  renderConfirm = (theme, invite) => {
    if (
      this.props.profile.role === "coLeader" ||
      this.props.profile.role === "leader"
    ) {
      return (
        <div>
          <button
            onClick={() => this.handleAccept(invite)}
            className={`ui ${theme.mode} green button`}
          >
            Accept
          </button>
        </div>
      );
    }
  };
  renderInviteList = (theme) => {
    return this.props.allianceInviteList.map((invite, idx) => {
      return (
        <div
          style={{
            color: theme.text,
            border: "solid 0.2rem lightblue",
            borderRadius: "1rem",
            padding: "1rem",
          }}
          key={invite.message + idx}
          className={`ui comments`}
        >
          <div className="comment">
            <div className="content">
              {invite.allianceName}
              <div className="metadata">
                <div className="date" style={{ color: "grey" }}>
                  {invite.dateSent}
                </div>
              </div>
              <div className={`text`}>
                <h4 style={{ color: theme.text }}>{invite.message}</h4>
              </div>
              <div style={{ marginBottom: "1rem" }}></div>
              {this.renderConfirm(theme, invite)}
            </div>
          </div>
        </div>
      );
    });
  };
  handleAccept = (accept) => {
    console.log(accept);
    this.props.acceptAllianceInvite(accept);
    this.props.rerender();
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Alliance Invites</h3>
        <div>{this.renderInviteList(this.props.theme)}</div>
      </div>
    );
  }
}
export default connect(null, { acceptAllianceInvite })(InviteList);
