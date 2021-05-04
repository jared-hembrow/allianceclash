// npm imports
import React from "react";
import { connect } from "react-redux";
// actions
import { updateUserData } from "../../../actions/accountActions";
// local imports
import history from "../../../History";
import AllianceContainer from "./AllianceContainer";
// component

class AlliancePage extends React.Component {
  state = {
    rerender: 0,
  };
  rerenderState = () => {
    console.log("re rendering");
    this.props.updateUserData(this.props.auth.user.userDetails.id);
    this.setState({ rerender: this.state.rerender + 1 });
  };
  componentDidMount() {
    // if (!this.props.auth.isSignedIn) {
    //    history.push("/home");
    //  }
  }
  renderAlliances = (theme) => {
    return this.props.auth.user.alliances.map((alliance) => {
      return (
        <AllianceContainer
          key={alliance.alliance.name}
          profile={alliance}
          theme={theme}
          user={this.props.auth.user}
          rerenderState={this.rerenderState}
        />
      );
    });
  };
  render() {
    if (!this.props.auth.isSignedIn) {
      return null;
    }
    const theme = this.props.auth.settings;
    return (
      <div className={`ui ${theme.mode} segment`}>
        {this.renderAlliances(theme)}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
// export component
export default connect(mapStateToProps, { updateUserData })(AlliancePage);
