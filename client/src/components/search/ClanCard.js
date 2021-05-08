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

  render() {
    if (!this.props.results.hasOwnProperty("warLog")) {
      return null;
    }
    const profile = this.props.results;
    const theme = this.props.theme;
    const user = this.props.user;
    const log =
      profile.warLog.war_list.items.length > 3
        ? profile.warLog.war_list.items.slice(0, 3)
        : profile.warLog.war_list.items;
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
                    src={profile.badge_url.medium}
                    className="ui avatar image"
                    alt="clan badge"
                  />
                  {profile.name}
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
                <td>{profile.clan_level}</td>
                <td>Members:</td>
                <td>{`${profile.member_count}/50`}</td>
                <td>Location:</td>
                <td>{profile.location.name}</td>
              </tr>
              <tr>
                <td>Trophies:</td>
                <td>{profile.clan_points}</td>
                <td>War Wins:</td>
                <td>{profile.war_wins}</td>
                <td>League:</td>
                <td>
                  {profile.war_league.name
                    ? profile.war_league.name
                    : "Unranked"}
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
