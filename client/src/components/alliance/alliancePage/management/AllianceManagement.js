// npm imports
import React from "react";
import { connect } from "react-redux";
// action
import { postClanInvite } from "../../../../actions/allianceActions/inviteRequestActions";
// component
import PostAnnouncement from "./PostAnnouncement";
import ManageClans from "./ManageClans";
import InviteClan from "./InviteClan";
class AllianceManagement extends React.Component {
  onSubmit = (formValues) => {
    const formKeys = Object.keys(formValues);
    const clanKeys = formKeys.filter((item) => item.includes("clan"));
    const tagKeys = formKeys.filter((item) => item.includes("tag"));
    const messageKeys = formKeys.filter((item) => item.includes("message"));
    const formObject = {
      tag: this.props.profile.alliance.tag,
      name: this.props.profile.alliance.name,
      user: this.props.user.userDetails.id,
      clan: [],
    };
    for (let i = 0; i < clanKeys.length; i++) {
      formObject.clan.push({
        name: formValues[clanKeys[i]],
        tag: formValues[tagKeys[i]],
        message: formValues[messageKeys[i]],
      });
    }
    console.log("Form Values", formValues);
    // post invite to action creator to send to server
    this.props.postClanInvite(formObject);
  };
  render() {
    console.log(this.props);
    const theme = this.props.theme;
    return (
      <div>
        <div
          style={{
            backgroundColor: this.props.theme.segmentColor,
            borderRadius: "1rem",
            padding: "1rem",
          }}
          className={`ui ${theme.mode} segment`}
        >
          <PostAnnouncement
            theme={theme}
            user={this.props.user}
            profile={this.props.profile}
          />
        </div>
        <div
          style={{
            backgroundColor: this.props.theme.segmentColor,
            borderRadius: "1rem",
            padding: "1rem",
          }}
          className={`ui ${theme.mode} segment`}
        >
          <ManageClans
            theme={theme}
            user={this.props.user}
            profile={this.props.profile}
            rerenderState={this.props.rerenderState}
          />
        </div>
        <div
          style={{
            backgroundColor: this.props.theme.segmentColor,
            borderRadius: "1rem",
            padding: "1rem",
          }}
          className={`ui ${theme.mode} segment`}
        >
          <InviteClan
            theme={theme}
            user={this.props.user}
            profile={this.props.profile}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    status: state.allianceAnnouncementStatus,
  };
};
// export component
export default connect(mapStateToProps, { postClanInvite })(AllianceManagement);
