// npm imports
import React from "react";
import { Link } from "react-router-dom";
// actions
// functions
import { encodeTag } from "../../functions/codeTag";
// class component
class AllianceClanProfile extends React.Component {
  componentDidMount() {}
  renderClanProfile = (theme, profile) => {
    return (
      <table className={`ui ${theme} very basic collasping celled table`}>
        <tbody>
          <tr>
            {/* Trophies */}
            <td>
              <h4 className={`ui ${theme} image header`}>
                <img
                  alt="trophies"
                  className="ui avatar image"
                  src={`/static/images/coc/trophy.png`}
                />
                <div className="content">
                  {"Home Village: " + profile.clanPoints}
                  <div className="sub header">
                    {"Builder Base: " + profile.clanVersusPoints}
                  </div>
                </div>
              </h4>
            </td>
            {/* Wins and losses */}
            <td>
              <h4 className={`ui ${theme} image header`}>
                <img
                  alt="win/losses"
                  className="ui avatar image"
                  src={`/static/images/coc/attack.png`}
                />
                <div className="content">
                  {"Won: " + profile.warWins}
                  <div className="sub header">
                    {"Lost: " + profile.warLosses}
                  </div>
                </div>
              </h4>
            </td>
          </tr>
          <tr>
            <td>
              <h4>Location: </h4>
              {profile.location.name}
            </td>
            <td>
              <h4>Required Trophies:</h4>
              {profile.requiredTrophies}
            </td>
            <td>
              <h4>Type:</h4>
              {profile.type}
            </td>
            <td>
              <h4>War Frequency:</h4>
              {profile.warFrequency}
            </td>
          </tr>
          <tr>
            {/* war league */}
            <td>
              <h4>{"Clan War League:"}</h4>
              {profile.warLeague.name}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };
  renderLastWars = (theme, log) => {
    if (log.length < 3) {
      return null;
    }
    const threeWars = [];
    threeWars.push(log[0], log[1], log[2]);
    const renderrows = threeWars.map((item) => {
      const rowColor =
        item.clan.stars >= item.opponent.stars
          ? { backgroundColor: "#008000" }
          : { backgroundColor: "#6B0000" };
      return (
        <tr key={item.endTime} style={rowColor}>
          {/* clan */}

          <td>
            <h4 className="ui inverted image header">
              <img
                alt="banner"
                className="ui avatar image"
                src={item.clan.badgeUrls.medium}
              />
              <div className="content">
                {item.clan.name}
                <div className="sub header">{item.clan.tag}</div>
              </div>
            </h4>
          </td>
          <td>
            <img
              alt="clan stats"
              className="ui avatar image"
              src="/static/images/coc/star.png"
            />
            {item.clan.stars}
            <img
              alt="clan stats"
              className="ui avatar image"
              src="/static/images/coc/attack.png"
            />
            {item.clan.attacks}
            <img
              alt="clan stats"
              className="ui avatar image"
              src="/static/images/coc/destroyed.png"
            />
            {item.clan.destructionPercentage + "%"}
          </td>
          <td>
            <h3>{item.teamSize + "  V  " + item.teamSize}</h3>
          </td>
          {/* opponent */}

          <td>
            <img
              alt="opponent stats"
              className="ui avatar image"
              src="/static/images/coc/star.png"
            />
            {item.opponent.stars}

            <img
              alt="opponent stats"
              className="ui avatar image"
              src="/static/images/coc/destroyed.png"
            />
            {item.opponent.destructionPercentage + "%"}
          </td>
          <td>
            <h4 className="ui inverted image header">
              <div className="content">
                {item.opponent.name}
                <div className="sub header">{item.opponent.tag}</div>
              </div>
              <img
                alt="banner"
                className="ui avatar image"
                src={item.opponent.badgeUrls.medium}
              />
            </h4>
          </td>
        </tr>
      );
    });
    return (
      <table className={`ui ${theme} very basic collasping celled table`}>
        <thead>
          <tr>
            <th>Last Three wars</th>
          </tr>
        </thead>
        <tbody>{renderrows}</tbody>
      </table>
    );
  };

  render() {
    if (!this.props.theme || !this.props.profile) {
      return null;
    }
    // const theme
    const theme = this.props.theme.mode;
    // clan profile
    const clan = this.props.profile;
    return (
      <div className={`ui ${theme} segment`}>
        <h4 className={`ui ${theme} image header`}>
          <img
            alt="banner"
            className="ui avatar image"
            src={clan.badgeUrls.medium}
          />
          <div className="content">
            {clan.name}
            <div className="sub header">{clan.tag}</div>
          </div>
          <div className={`ui ${theme} segment`}>
            <p>{clan.description}</p>
          </div>
        </h4>
        {this.renderClanProfile(theme, clan)}
        <h4>
          <Link to={`/${encodeTag(clan.tag)}/currentwar`}>
            <button className={`ui ${theme} primary button`}>
              Current War
            </button>
          </Link>
          <Link to={`/${encodeTag(clan.tag)}/profile`}>
            <button className={`ui ${theme} primary button`}>Clan Page</button>
          </Link>
        </h4>
      </div>
    );
  }
}

//export component
export default AllianceClanProfile;
