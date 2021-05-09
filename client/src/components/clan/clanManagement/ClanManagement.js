// npm import
import React from "react";
import { connect } from "react-redux";
// actions
import { leaveAlliance } from "../../../actions/clanActions/clanActions";
// commponent Imports
import InviteList from "./InviteList";
class ClanManagement extends React.Component {
  render() {
    console.log(this.props);
    return <div></div>;
  }
}
export default connect(null, { leaveAlliance })(ClanManagement);
