// npm imports
import React from "react";
import { Link } from "react-router-dom";
// actions
// functions
import { encodeTag } from "../../functions/codeTag";
// import loader
import Loader from "../Loader";
// class component
class ProfileClan extends React.Component {
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
                  {"Home Village: " + profile.clan_points}
                  <div className="sub header">
                    {"Builder Base: " + profile.clan_versus_points}
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
                  {"Won: " + profile.war_wins}
                  <div className="sub header">
                    {"Lost: " + profile.war_losses}
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
              {profile.required_trophies}
            </td>
            <td>
              <h4>Type:</h4>
              {profile.type}
            </td>
            <td>
              <h4>War Frequency:</h4>
              {profile.war_frequency}
            </td>
          </tr>
          <tr>
            {/* war league */}
            <td>
              <h4>{"Clan War League:"}</h4>
              {profile.war_league.name}
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
    if (log.length < 3) {
      threeWars = [...log];
    } else {
      threeWars.push(log[0], log[1], log[2]);
    }
    const renderrows = threeWars.map((item) => {
      const rowColor =
        item.clan.stars >= item.opponent.stars
          ? { backgroundColor: "#008000" }
          : { backgroundColor: "#6B0000" };
      return (
        <tr key={item.endTime} style={rowColor}>
          {/* clan */}

          <td>
            <h4 className={`ui inverted image header`}>
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
            <h4 className={`ui inverted image header`}>
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
      <table className={`ui inverted very basic collasping celled table`}>
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
    // const theme
    const theme = this.props.theme;
    if (!this.props.profile) {
      return <Loader text="Loading..." />;
    } // clan profile
    const clan = this.props.profile;
    const warlog = this.props.warlog.war_list.items;
    return (
      <div className={`ui ${theme.mode} segment`}>
        <h4 className={`ui ${theme.mode} image header`}>
          <img
            alt="banner"
            className="ui avatar image"
            src={clan.badge_url.medium}
          />
          <div className="content">
            {clan.name}
            <div className="sub header">{clan.tag}</div>
          </div>
          <div className={`ui ${theme.mode} segment`}>
            <p>{clan.description}</p>
          </div>
        </h4>
        {this.renderClanProfile(theme.mode, clan)}
        <h4>
          <Link to={`/${encodeTag(clan.tag)}/currentwar`}>
            <button className={`ui ${theme.mode} primary button`}>
              Current War
            </button>
          </Link>
          <Link to={`/${encodeTag(clan.tag)}/profile`}>
            <button className={`ui ${theme.mode} primary button`}>
              Clan Page
            </button>
          </Link>
        </h4>
        {this.renderLastWars(theme, warlog)}
      </div>
    );
  }
}

//export component
export default ProfileClan;
