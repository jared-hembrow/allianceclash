// npm imports
import React from "react";
import { connect } from "react-redux";
import AllianceChatDisplay from "./AllianceChatDisplay";
// actions
import { postAllianceChat } from "../../../../actions/allianceActions/allianceActions";
// component
class AllianceChat extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    const message = {
      message: e.target[0].value,
      userId: this.props.user.userDetails.id,
      allianceTag: this.props.profile.alliance.tag,
      type: "chat",
    };
    this.props.postAllianceChat(message);
    document.querySelector("#chat-box").value = "";
    this.forceUpdate();
  };
  render() {
    console.log(this.props);
    const theme = this.props.theme;
    return (
      <div>
        <form
          className={`ui ${theme.mode} form`}
          onSubmit={(e) => this.onSubmit(e)}
        >
          <div className="field">
            <label>
              <h3>Alliance Chat</h3>
            </label>
            <textarea id="chat-box" rows="3" />
          </div>

          <input
            className={`ui ${theme.mode} primary button`}
            type="submit"
            value="Post"
          />
        </form>
        <div className={`ui ${theme.mode} segment`}>
          <AllianceChatDisplay
            theme={theme}
            userId={this.props.user.userDetails.id}
            tag={this.props.profile.alliance.tag}
          />
        </div>
      </div>
    );
  }
}

// export component
export default connect(null, { postAllianceChat })(AllianceChat);
