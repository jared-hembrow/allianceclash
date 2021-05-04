// npm imports
import React from "react";
import { connect } from "react-redux";
// actions
import { getAllianceAnnouncement } from "../../../../actions/allianceActions/allianceActions";
// component
class MessageBoard extends React.Component {
  componentDidMount() {
    this.props.getAllianceAnnouncement(
      "announcement",
      this.props.profile.alliance.tag
    );
  }
  componentDidUpdate() {
    if (this.props.allianceAnnouncements.length > 0) {
      const messageWindow = document.querySelector(".scroll-window");
      messageWindow.scrollTop = messageWindow.scrollHeight;
    }
  }
  renderMessageList = (messages, theme) => {
    const messageCardStyle =
      theme.mode === "inverted" ? "message-card-dark" : "message-card-light";
    const messageContentStyle =
      theme.mode === "inverted"
        ? "message-content-dark"
        : "message-content-light";
    return messages.map((message, idx) => {
      return (
        <div
          key={message.message + idx}
          className={`ui comments ${messageCardStyle}`}
        >
          <div className="comment">
            <div className="content">
              {message.author}
              <div className="metadata">
                <div className="date">{message.datePosted}</div>
              </div>
              <div className={`text ${messageContentStyle}`}>
                <h4>{message.message}</h4>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  render() {
    console.log(this.props);
    return (
      <div
        style={{
          backgroundColor: this.props.theme.segmentColor,
          borderRadius: "1rem",
          padding: "1rem",
        }}
      >
        <div className="scroll-window">
          {this.renderMessageList(
            this.props.allianceAnnouncements,
            this.props.theme
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    allianceAnnouncements: state.allianceAnnouncements,
  };
};
// export component
export default connect(mapStateToProps, { getAllianceAnnouncement })(
  MessageBoard
);
