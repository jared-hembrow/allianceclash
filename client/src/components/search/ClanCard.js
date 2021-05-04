// npm imports
import React from "react";
import Warlog from "../cocClan/Warlog";
import history from "../../History";
import { encodeTag } from "../../functions/codeTag";
import { connect } from "react-redux";
import { clearResults } from "../../actions/searchActions/index";
// component
class ClanCard extends React.Component {
  componentWillUnmount() {
    this.props.clearResults();
  }
  canInvite = (alliances, theme, tag, name, user) => {
    if (!alliances) {
      return null;
    }
    console.log(user);
    for (let i = 0; i < alliances.length; i++) {
      for (let i = 0; i < user.accounts.length; i++) {
        if (user.accounts[i].clan_tag === tag) {
          return null;
        }
      }
      if (alliances[i].role === "leader" || alliances[i].role === "co-leader") {
        return (
          <button
            onClick={() =>
              history.push(`/invite/${encodeTag(tag)}/${name}/clan`)
            }
            style={{ marginLeft: "1rem" }}
            className={`ui ${theme.mode} green button`}
          >
            Invite
          </button>
        );
      }
      console.log(alliances[i]);
    }
  };
  render() {
    if (!this.props.results.hasOwnProperty("warLog")) {
      return null;
    }
    const profile = this.props.results;
    const theme = this.props.theme;
    const user = this.props.user;
    const permissions = user.alliances ? user.alliances : false;
    const log =
      profile.warLog.log.items.length > 3
        ? profile.warLog.log.items.slice(0, 3)
        : profile.warLog.log.items;
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
                  <img
                    src={profile.badgeUrls.medium}
                    className="ui avatar image"
                    alt="clan badge"
                  />
                  {profile.name}
                  {this.canInvite(
                    permissions,
                    theme,
                    profile.tag,
                    profile.name,
                    user
                  )}
                </h1>
              </div>
              {profile.tag.toUpperCase()}
            </div>
          </div>
        </div>
        <div className={`ui ${theme.mode} segment`}>{profile.description}</div>
        <div>
          <table
            className={`ui table`}
            style={{ backgroundColor: theme.segmentColor, color: theme.text }}
          >
            <tbody>
              <tr>
                <td>Level:</td>
                <td>{profile.clanLevel}</td>
                <td>Members:</td>
                <td>{`${profile.members}/50`}</td>
                <td>Location:</td>
                <td>{profile.location.name}</td>
              </tr>
              <tr>
                <td>Trophies:</td>
                <td>{profile.clanPoints}</td>
                <td>War Wins:</td>
                <td>{profile.warWins}</td>
                <td>League:</td>
                <td>
                  {profile.warLeague.name ? profile.warLeague.name : "Unranked"}
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <div className={`ui ${theme.mode} segment`}>
          <Warlog theme={theme} log={log} />
        </div>
      </div>
    );
  }
}

export default connect(null, { clearResults })(ClanCard);
