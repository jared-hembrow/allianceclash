// npm imports
import React from "react";
import { connect } from "react-redux";
// actions
import { updateUserData } from "../../actions/accountActions/index";
// local imports
import Loader from "../Loader";
import history from "../../History";
import ClanContainer from "./ClanContainer";
// component

class ClanPage extends React.Component {
  state = {
    rerender: 0,
  };
  rerenderState = () => {
    this.props.updateUserData(this.props.auth.user.userDetails.id);
    this.setState({ rerender: this.state.rerender + 1 });
  };
  renderClans = (user, theme) => {
    return user.players.map((player) => {
      return (
        <ClanContainer
          key={player.clan.details.name}
          profile={player.clan}
          theme={theme}
          user={{
            userDetails: user.userDetails,
            accounts: user.accounts,
          }}
          rerender={this.rerenderState}
        />
      );
    });
  };
  render() {
    console.log("in render", this.props);
    if (!this.props.auth.isSignedIn) {
      return <Loader />;
    }
    const theme = this.props.auth.settings;
    return (
      <div className={`ui ${theme.mode} segment`}>
        {this.renderClans(this.props.auth.user, theme)}
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
export default connect(mapStateToProps, {
  updateUserData,
})(ClanPage);
