// npm imports
import React from "react";
import { connect } from "react-redux";
// action
import {
  postAllianceAnnouncement,
  clearAllianceAnnouncementStatus,
} from "../../../../actions/allianceActions/allianceActions";
// component

class PostAnnouncement extends React.Component {
  state = {
    messageSent: false,
  };
  componentWillUnmount() {
    this.props.clearAllianceAnnouncementStatus();
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.messageSent) {
      return;
    } else {
      const message = {
        message: e.target[0].value,
        userId: this.props.user.userDetails.id,
        allianceTag: this.props.profile.alliance.tag,
        type: "announcement",
      };
      this.props.postAllianceAnnouncement(message);
      this.setState({ messageSent: true });
    }
  };
  render() {
    const theme = this.props.theme;
    return (
      <div>
        <form
          className={`ui ${theme.mode} form`}
          onSubmit={(e) => this.onSubmit(e)}
        >
          <div className="field">
            <label>
              <h3>Post Alliance Announcement</h3>
            </label>
            <textarea />
          </div>
          <div className="field">
            {this.props.status.status === "success" ? (
              <h3 className="ui info message">{"Successfully Posted"}</h3>
            ) : null}
          </div>
          <input
            className={`ui ${theme.mode} primary button`}
            type="submit"
            value="Post"
          />
        </form>
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
export default connect(mapStateToProps, {
  postAllianceAnnouncement,
  clearAllianceAnnouncementStatus,
})(PostAnnouncement);
