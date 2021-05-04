// npm imports
import React from "react";
import { connect } from "react-redux";

// actions
import { createNewRecruitmentPost } from "../../../actions/recruitmentActions";
import {
  checkGameAccounts,
  checkAllianceAccounts,
} from "../../../actions/accountActions/index";
// import components
import ClanPostForm from "./ClanPostForm";
import AllianceClanPostForm from "./AllianceClanPostForm";
import AlliancePlayerPostForm from "./AlliancePlayerPostForm";
import ClanAlliancePostForm from "./ClanAlliancePostForm";
import PlayerPostForm from "./PlayerPostForm";

// component
class CreateRecruitPost extends React.Component {
  state = {
    formType: "",
  };
  componentDidMount() {
    this.props.checkGameAccounts(this.props.auth.user.userDetails.id);
    this.props.checkAllianceAccounts(this.props.auth.user.userDetails.id);
    // check if posts have been made
  }
  onSubmit = (formValues) => {
    const form = formValues;
    form.type = this.state.formType;
    this.props.createNewRecruitmentPost(
      this.props.auth.user.userDetails.id,
      form
    );
  };
  onSelectChange = (e) => {
    const selectedIdx = e.target.options.selectedIndex;
    const selected = e.target.options[selectedIdx].value;
    if (selected === "") {
      return;
    } else {
      return this.setState({ formType: selected });
    }
  };
  renderFormType = (formType, theme) => {
    switch (formType) {
      case "":
        return (
          <div>
            <h2>Please select Form</h2>
          </div>
        );
      case "Clan looking for members":
        return (
          <ClanPostForm
            user={this.props.auth.user}
            type={formType}
            theme={theme}
            onSubmit={this.onSubmit}
            optionalFields={clanOptionalFields}
            townhallLevels={true}
            heroLevels={true}
          />
        );
      case "Alliance looking for clans":
        return (
          <AllianceClanPostForm
            user={this.props.auth.user}
            type={formType}
            theme={theme}
            onSubmit={this.onSubmit}
            optionalFields={allianceOptionalFields}
            clanLevels={true}
          />
        );
      case "Alliance looking for Players":
        return (
          <AlliancePlayerPostForm
            user={this.props.auth.user}
            type={formType}
            theme={theme}
            onSubmit={this.onSubmit}
            optionalFields={allianceOptionalFields}
            townhallLevels={true}
            heroLevels={true}
          />
        );
      case "Clan looking to join Alliance":
        return (
          <ClanAlliancePostForm
            user={this.props.auth.user}
            type={formType}
            theme={theme}
            onSubmit={this.onSubmit}
            optionalFields={clanOptionalFields}
          />
        );
      case "Player looking to join Clan or Alliance":
        return (
          <PlayerPostForm
            user={this.props.auth.user}
            type={formType}
            theme={theme}
            onSubmit={this.onSubmit}
            optionalFields={playerOptionalFields}
            looking={true}
          />
        );
      default:
        return null;
    }
  };
  selectFormType = () => {
    let formList = [];
    if (
      this.props.auth.user.cocaccounts.some(
        (account) => account.role === "leader"
      ) ||
      this.props.auth.user.cocaccounts.some(
        (account) => account.role === "coLeader"
      )
    ) {
      formList = [...clanAdminList];
    }
    if (
      this.props.auth.user.cocalliance.some(
        (account) => account.role === "leader"
      ) ||
      this.props.auth.user.cocalliance.some(
        (account) => account.role === "co-leader"
      )
    ) {
      formList = [...formList, ...allianceAdminList];
    }
    formList = [...formList, ...playerList];
    return formList.map((form) => {
      return (
        <option key={form} value={form}>
          {form}
        </option>
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
        <label>
          <h3>Select type of Recruitment Post</h3>
        </label>
        <br />
        <select name="type" onChange={this.onSelectChange}>
          <option vlaue="" disabled>
            Select a form type
          </option>
          <option value=""></option>
          {this.selectFormType()}
        </select>
        <div className={`ui ${theme.mode} segment`}>
          {this.renderFormType(this.state.formType, theme)}
        </div>
      </div>
    );
  }
}
// map redux store to component props
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
// list of form options to choose from
const clanAdminList = [
  "Clan looking for members",
  "Clan looking to join Alliance",
];
const allianceAdminList = [
  "Alliance looking for clans",
  "Alliance looking for Players",
];
const playerList = ["Player looking to join Clan or Alliance"];
// clan looking for members optional fields array
const clanOptionalFields = [
  { name: "clanName", label: "Enter clan name" },
  {
    name: "clanTag",
    label: "Enter a clan tag",
  },
];
// Alliance looking for clans or players optional fields array
const allianceOptionalFields = [
  {
    name: "allianceName",
    label: "Enter Alliance name",
  },
  {
    name: "allianceTag",
    label: "Enter Alliance tag",
  },
];
const playerOptionalFields = [
  { name: "playerName", label: "Enter player name" },
  {
    name: "playerTag",
    label: "Enter a player tag",
  },
];

// export component
export default connect(mapStateToProps, {
  createNewRecruitmentPost,
  checkGameAccounts,
  checkAllianceAccounts,
})(CreateRecruitPost);
