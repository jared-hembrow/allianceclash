import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { encodeTag } from "../../../../functions/codeTag";
// actions
import {
  getAllianceInviteRequests,
  acceptJoinRequest,
} from "../../../../actions/allianceActions/allianceActions";

class Requests extends React.Component {
  componentDidMount() {
    this.props.getAllianceInviteRequests(this.props.profile.tag);
  }
  renderConfirm = (theme, request) => {
    for (let i = 0; i < this.props.profile.leaders.length; i++) {
      if (
        (this.props.profile.leaders[i].role === "coLeader" &&
          this.props.profile.leaders[i].tag === this.props.user.id) ||
        (this.props.profile.leaders[i].role === "leader" &&
          this.props.profile.leaders[i].tag === this.props.user.id)
      ) {
        return (
          <div>
            <button
              onClick={() => this.handleAccept(request)}
              className={`ui ${theme.mode} green button`}
            >
              Accept
            </button>
          </div>
        );
      }
    }
  };
  renderRequests = (theme) => {
    return this.props.joinRequest.map((request, idx) => {
      return (
        <div
          style={{ color: theme.text }}
          key={request.message + idx}
          className={`ui comments`}
        >
          <div className="comment">
            <div className="content">
              {request.clanName}
              <div className="metadata">
                <div className="date" style={{ color: "grey" }}>
                  {request.dateSent}
                </div>
              </div>
              <div className={`text`}>
                <h4 style={{ color: theme.text }}>{request.message}</h4>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <Link to={`/${encodeTag(request.clanTag)}/profile`}>
                  <button className={`ui ${theme.mode} primary button`}>
                    Clan Page
                  </button>
                </Link>
              </div>
              {this.renderConfirm(theme, request)}
            </div>
          </div>
        </div>
      );
    });
  };
  handleAccept = (request) => {
    console.log("handle", request);
    this.props.acceptJoinRequest(request);
    this.props.rerenderState();
  };
  render() {
    if (
      !this.props.joinRequest ||
      this.props.joinRequest.length < 1 ||
      !this.props.theme.text
    ) {
      return null;
    }
    console.log(this.props);
    const theme = this.props.theme;
    return (
      <div
        style={{
          borderRadius: "1rem",
          padding: "1rem",
          margin: "1rem",
          backgroundColor: theme.segmentColor,
        }}
      >
        {this.renderRequests(theme)}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    joinRequest: state.joinRequest,
  };
};
export default connect(mapStateToProps, {
  getAllianceInviteRequests,
  acceptJoinRequest,
})(Requests);
