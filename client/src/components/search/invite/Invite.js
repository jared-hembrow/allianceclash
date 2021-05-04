// npm
import React from "react";
import { connect } from "react-redux";
import { decodeTag } from "../../../functions/codeTag";

// actions
import { fetchManyAllianceDetails } from "../../../actions/allianceActions/allianceActions";
import { inviteRequest } from "../../../actions/searchActions/index";
import { fetchClansDetails } from "../../../actions/clanActions/clanActions";
class Invite extends React.Component {
  componentDidMount() {
    switch (this.props.match.params.type) {
      case "clan":
        this.props.fetchManyAllianceDetails(this.props.auth.alliances);
        break;
      case "alliance":
        this.props.fetchClansDetails(this.props.auth.user.id);
        break;
      default:
        break;
    }
  }
  renderAllianceOptions = (alliances) => {
    return alliances.map((alliance, idx) => {
      return (
        <option
          key={alliance.tag + idx}
          value={alliance.name + "/" + alliance.tag}
        >
          {alliance.name}
        </option>
      );
    });
  };
  allianceInvitesClan = (theme) => {
    return (
      <div className={`ui ${theme.mode} segment`}>
        <form className={`ui ${theme.mode} form`}>
          <div className="field">
            <label>
              <h3>
                {"Invite "}
                <span style={{ textDecoration: "underline" }}>
                  {this.props.match.params.name}
                </span>
                {" To"}
              </h3>
            </label>
            <select defaultValue={this.props.auth.alliances[0]}>
              {this.renderAllianceOptions(this.props.alliance)}
            </select>
          </div>

          <div className="field">
            <label>
              <h3>Message</h3>
            </label>{" "}
            <textarea />
          </div>
          <div>
            <button
              type="button"
              onClick={(e) =>
                this.handleConfirm(
                  e,
                  "allianceInvite",
                  decodeTag(this.props.match.params.tag),
                  this.props.match.params.name
                )
              }
              className={`ui ${theme.mode} green button`}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    );
  };
  renderApplyOptions = () => {
    return this.props.clan.map((clan) => {
      if (
        clan.role === "admin" ||
        clan.role === "coLeader" ||
        clan.role === "leader"
      ) {
        return (
          <option
            key={clan.clan.tag}
            value={`${clan.clan.name}/${clan.clan.tag}`}
          >
            {clan.clan.name}
          </option>
        );
      } else {
        return null;
      }
    });
  };
  allianceApply = (theme) => {
    if (this.props.clan.length < 1) {
      return null;
    }
    return (
      <div className={`ui ${theme.mode} segment`}>
        <form className={`ui ${theme.mode} form`}>
          <div className="field">
            <label>
              <h3>
                {"Apply To "}
                <span style={{ textDecoration: "underline" }}>
                  {this.props.match.params.name}
                </span>
                {" with"}
              </h3>
            </label>
            <select
              defaultValue={`${this.props.clan[0].clan.name}/${this.props.clan[0].clan.tag}`}
            >
              {this.renderApplyOptions()}
            </select>
          </div>

          <div className="field">
            <label>
              <h3>Message</h3>
            </label>{" "}
            <textarea />
          </div>
          <div>
            <button
              type="button"
              onClick={(e) =>
                this.handleConfirm(
                  e,
                  "allianceApply",
                  this.props.match.params.tag,
                  this.props.match.params.name
                )
              }
              className={`ui ${theme.mode} green button`}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    );
  };
  handleConfirm = (e, type, tag, name) => {
    const form = {};
    switch (type) {
      case "allianceInvite":
        form.name = `${e.target.form[0].value.split("/")[0]}`;
        form.tag = `${e.target.form[0].value.split("/")[1]}`;
        form.clanName = name;
        form.clanTag = tag;
        form.message = e.target.form[1].value;
        form.type = type;
        form.user = this.props.auth.user.id;
        break;
      case "allianceApply":
        form.name = name;
        form.tag = tag;
        form.clanName = `${e.target.form[0].value.split("/")[0]}`;
        form.clanTag = `${e.target.form[0].value.split("/")[1]}`;
        form.message = e.target.form[1].value;
        form.type = type;
        form.user = this.props.auth.user.id;
        break;
      default:
        break;
    }

    console.log("confirmed", form);
    this.props.inviteRequest(form);
  };

  render() {
    console.log(this.props);
    if (!this.props.auth.isSignedIn) {
      return null;
    }
    const theme = this.props.auth.settings;
    switch (this.props.match.params.type) {
      case "clan":
        return this.allianceInvitesClan(theme);
      case "alliance":
        return this.allianceApply(theme);
      default:
        return null;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    alliance: state.alliance,
    clan: state.clan,
  };
};
export default connect(mapStateToProps, {
  fetchManyAllianceDetails,
  inviteRequest,
  fetchClansDetails,
})(Invite);
