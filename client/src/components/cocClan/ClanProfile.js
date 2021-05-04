// npm imports
import React from "react";
import { connect } from "react-redux";

// actions
import { fetchClanDetails } from "../../actions/coc/cocClanActions";
// import Loader
import Loader from "../Loader";
// components
import ClanCardDetails from "./ClanCardDetails";
import MemberList from "./MemberList";
import Warlog from "./Warlog";
// class component
class ClanProfile extends React.Component {
  state = {
    menu: "",
  };
  componentDidMount() {
    this.props.fetchClanDetails(this.props.match.params.clanTag);
  }
  renderMenu = (type) => {
    if (this.state.menu === type) {
      this.setState({ menu: " " });
    } else {
      this.setState({ menu: type });
    }
  };
  renderList = (type, profile, theme) => {
    switch (type) {
      case "members":
        return (
          <MemberList
            members={profile.clan.memberList}
            theme={theme}
            type="clanProfile"
          />
        );
      case "warlog":
        return <Warlog log={profile.warLog.log.items} theme={theme} />;
      default:
        return null;
    }
  };
  render() {
    // users theme
    const theme = this.props.auth.settings;

    if (!this.props.clanProfile.clan) {
      return <Loader text="Loading..." />;
    }

    const clanProfile = this.props.clanProfile;

    return (
      <div className={`ui ${theme.mode} segment`}>
        <ClanCardDetails profile={clanProfile.clan} theme={theme.mode} />
        <div className={`ui ${theme.mode} secondary menu`}>
          <button
            onClick={(e) => this.renderMenu("members")}
            className={this.state.menu === "members" ? "item active" : ""}
          >
            Members
          </button>
          <button
            onClick={(e) => this.renderMenu("warlog")}
            className={this.state.menu === "warlog" ? "item active" : ""}
          >
            War log
          </button>
        </div>
        <div className={`ui ${theme.mode} segment`}>
          {this.renderList(this.state.menu, clanProfile, theme.mode)}
        </div>
      </div>
    );
  }
}
// map redux store to component props
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    clanProfile: state.clanProfile,
  };
};
// export component
export default connect(mapStateToProps, { fetchClanDetails })(ClanProfile);
