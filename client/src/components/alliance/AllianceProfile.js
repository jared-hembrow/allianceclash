// npm imports
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//actions
import { fetchAllianceDetails } from "../../actions/allianceActions/allianceActions";
// components
import AllianceLayout from "./AllianceLayout";
// component
class AlllianceProfile extends React.Component {
  renderAlliances = (theme, user) => {
    return user.alliances.map((alliance, idx) => {
      return (
        <AllianceLayout
          key={alliance.alliance.name + idx}
          user={user}
          theme={theme}
          profile={alliance}
          clan={alliance.clans}
        />
      );
    });
  };
  render() {
    if (!this.props.auth.isSignedIn) {
      return null;
    }
    if (this.props.auth.user.alliances.length < 1) {
      return <Link to="/add">Link Accounts Here</Link>;
    } else {
      return (
        <div>
          {this.renderAlliances(this.props.auth.settings, this.props.auth.user)}
        </div>
      );
    }
  }
}
// map redux store to component props
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
// export component
export default connect(mapStateToProps, { fetchAllianceDetails })(
  AlllianceProfile
);
