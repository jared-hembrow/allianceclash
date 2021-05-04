// npm imports
import React from "react";
import { connect } from "react-redux";
// CSS import
import "../../../../style/scrollWindow.css";
// actions
import { getAllianceChat } from "../../../../actions/allianceActions/allianceActions";
class AllianceChatDisplay extends React.Component {
  state = {
    clearUpdate: null,
  };
  componentDidMount() {
    this.props.getAllianceChat("chat", this.props.tag);
    this.setUpdateTimer();
  }
  componentWillUnmount() {
    clearInterval(this.state.clearUpdate);
  }
  setUpdateTimer = () => {
    let update = setInterval(() => {
      this.props.getAllianceChat("chat", this.props.tag);
    }, 30000);
    this.setState({ clearUpdate: update });
  };
  componentDidUpdate() {
    if (this.props.chat.length > 0) {
      const messageWindow = document.querySelector(".scroll-window");
      messageWindow.scrollTop = messageWindow.scrollHeight;
    }
  }
  renderMessageList = (list, theme) => {
    const messageCardStyle =
      theme.mode === "inverted" ? "message-card-dark" : "message-card-light";
    const messageContentStyle =
      theme.mode === "inverted"
        ? "message-content-dark"
        : "message-content-light";
    return list.map((message, idx) => {
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
    if (this.props.chat.length < 1) {
      return null;
    }
    return (
      <div
        style={{
          backgroundColor: this.props.theme.segmentColor,
          borderRadius: "1rem",
          padding: "1rem",
        }}
      >
        <div className="scroll-window">
          {this.renderMessageList(this.props.chat, this.props.theme)}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    chat: state.allianceChat,
  };
};
export default connect(mapStateToProps, { getAllianceChat })(
  AllianceChatDisplay
);
