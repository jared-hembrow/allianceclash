import React from "react";
import { connect } from "react-redux";

class Homepage extends React.Component {
  render() {
    const theme = { mode: "" };
    if (this.props.auth.isSignedIn) {
      theme.mode = this.props.auth.settings.mode;
    }
    return (
      <div className={`ui ${theme.mode} segment`}>
        <h2>Alliance Clash</h2>
        <h4>Alliance Management</h4>
        <p>Find clans to join your alliance or join an alliance</p>
        <p> first step is to sign in</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Homepage);
