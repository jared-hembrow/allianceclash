// npm import
import React from "react";
import { connect } from "react-redux";
// componet imports
import AllianceCardDetails from "./AllianceCardDetails";
import AllianceClanCard from "./AllianceClanCard";
import MemberList from "../cocClan/MemberList";
// actions
import { fetchMultipleClanDetails } from "../../actions/coc/cocClanActions";
// component
class AllianceLayout extends React.Component {
  state = {
    menu: "",
  };
  componentDidMount() {
    const tagList = this.props.clan.map((clan) => clan.tag);
    this.props.fetchMultipleClanDetails(tagList);
  }
  renderMenu = (type) => {
    this.setState({ menu: type });
  };
  renderFullMembersList = (theme, clans) => {
    let list = [];
    clans.clans.map((clan) => {
      for (let i = 0; i < clan.memberList.length; i++) {
        let member = clan.memberList[i];
        member.clanName = clan.name;
        list.push(member);
      }
      return null;
    });
    return <MemberList theme={theme.mode} members={list} type="alliance" />;
  };
  renderMenuContent = (type, theme, profile, clans) => {
    switch (type) {
      case "clans":
        return (
          <AllianceClanCard theme={theme} profile={profile} clan={clans} />
        );
      case "members":
        return this.renderFullMembersList(theme, clans);
      default:
        return null;
    }
  };

  render() {
    if (!this.props.profile) {
      return null;
    }
    if (
      this.props.clan.length < 1 ||
      this.props.clans.length < 1 ||
      Object.keys(this.props.clans).length < 1
    ) {
      return null;
    }
    const theme = this.props.theme;
    const profile = this.props.profile;
    const clans = this.props.clans;
    return (
      <div>
        <AllianceCardDetails theme={theme.mode} profile={profile.alliance} />
        <div className={`ui ${theme.mode} secondary menu`}>
          <button
            onClick={(e) => this.renderMenu("clans")}
            className={this.state.menu === "clans" ? "item active" : "item"}
          >
            <h4 className={`ui ${theme.mode} red button`}>Clans</h4>
          </button>
          <button
            onClick={(e) => this.renderMenu("members")}
            className={this.state.menu === "members" ? "item active" : "item"}
          >
            <h4 className={`ui ${theme.mode} red button`}>Members</h4>
          </button>
        </div>
        {this.renderMenuContent(this.state.menu, theme, profile, clans)}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    clans: state.multipleClanProfiles,
  };
};
// export component
export default connect(mapStateToProps, { fetchMultipleClanDetails })(
  AllianceLayout
);
