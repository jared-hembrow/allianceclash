// npm imports
import React from "react";
import history from "../../History";
import { connect } from "react-redux";
import { clearResults } from "../../actions/searchActions/index";
// component
class AllianceCard extends React.Component {
  componentWillUnmount() {
    this.props.clearResults();
  }
  renderApply = (theme, profile, user) => {
    console.log(user);
    if (user.cocaccounts.length < 1) {
      return null;
    }
    for (let i = 0; i < user.cocaccounts.length; i++) {
      for (let i = 0; i < user.alliances.length; i++) {
        if (user.alliances[i].alliance_tag === profile.tag) {
          return null;
        }
      }
      if (
        user.cocaccounts[i].role === "admin" ||
        user.cocaccounts[i].role === "coLeader" ||
        user.cocaccounts[i].role === "leader"
      ) {
        return (
          <button
            onClick={() =>
              history.push(`/invite/${profile.tag}/${profile.name}/alliance`)
            }
            style={{ marginLeft: "1rem" }}
            className={`ui ${theme.mode} green button`}
          >
            Apply
          </button>
        );
      }
    }
  };
  render() {
    const theme = this.props.theme;
    const profile = this.props.results;
    if (profile.hasOwnProperty("clans") === false) {
      return null;
    }
    return (
      <div
        className={`ui ${theme.mode} segment`}
        style={{
          backgroundColor: theme.segmentColor,
        }}
      >
        <div className={`ui ${theme.mode} horzontal list`}>
          <div className="item">
            <div className="content">
              <div className="ui header">
                <h1>
                  {profile.name}
                  {this.props.user
                    ? this.renderApply(theme, profile, this.props.user.user)
                    : null}
                </h1>
              </div>
              {profile.tag.toUpperCase()}
            </div>
          </div>
        </div>
        <div className={`ui ${theme.mode} segment`}>{profile.description}</div>
        <div className={`ui ${theme.mode} segment`}>
          {profile.clans.map((clan) => {
            return (
              <table key={clan.name}>
                <tbody>
                  <tr>
                    <td>{clan.name}</td>
                    <td></td>
                    <td>{clan.tag}</td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(null, { clearResults })(AllianceCard);
