// npm imports
import React from "react";
import { connect } from "react-redux";
import history from "../../../History";
// actions
import { updateUserSettings } from "../../../actions/accountActions";
// component imports
import SettingsForm from "./SettingsForm";
// component
class Settings extends React.Component {
  componentDidMount() {
    if (!this.props.auth.isSignedIn) {
      history.push("/");
    }
  }
  onSubmit = (formValues) => {
    this.props.updateUserSettings(
      this.props.auth.user.userDetails.id,
      formValues
    );
  };

  createSettingsObj = (user, theme) => {
    return {
      playerName: user.player_name,
      theme: theme.title === "light theme" ? "light" : "dark",
    };
  };
  render() {
    if (!this.props.auth.isSignedIn) {
      return null;
    }
    const user = this.props.auth.user;
    const theme = this.props.auth.settings;
    return (
      <div className={`ui ${theme.mode} segment`}>
        <h2>Settings</h2>
        <SettingsForm
          onSubmit={this.onSubmit}
          settings={this.createSettingsObj(user.userDetails, theme)}
          user={user}
          theme={theme}
        />
      </div>
    );
  }
}
// map redux store to component state
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
// export component
export default connect(mapStateToProps, { updateUserSettings })(Settings);
