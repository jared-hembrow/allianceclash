// npm imports
import React from "react";

// component
export const ClanDetailsCard = (props) => {
  const theme = props.theme.mode;
  const clanProfile = props.profile;

  function renderLabels(clanProfile) {
    return clanProfile.labels.map((label) => {
      return (
        <img
          key={label.id}
          alt={label.name}
          src={label.iconUrls.medium}
          className="ui avatar image"
        />
      );
    });
  }
  return (
    <div className={`ui ${theme} cards`}>
      <div className="red card">
        <div className={`ui ${theme} content`}>
          <div className="header">
            <img
              src={clanProfile.badge_url.medium}
              className="ui avatar image"
              alt="clan badge"
            />
            {clanProfile.name}
          </div>
          <div className="meta">{clanProfile.tag}</div>
          <div className="meta">
            {props.alliance ? `Alliance: ${props.alliance.name}` : ""}
          </div>
          <div className="description">{clanProfile.description}</div>
        </div>
      </div>

      <div className="red card">
        <div className="content">
          <div className="header">
            <table>
              <tbody>
                <tr>
                  <td>
                    <img
                      alt="throphy"
                      src="/static/images/coc/trophy.png"
                      className="ui avatar image"
                    />
                    {clanProfile.clan_points}
                  </td>
                  <td>
                    <img
                      alt="axes"
                      src="/static/images/coc/Axes.png"
                      className="ui avatar image"
                    />
                    {clanProfile.clan_versus_points}
                  </td>
                </tr>
                <tr>
                  <td>{clanProfile.war_league.name}</td>
                </tr>
                <tr>
                  <td>{clanProfile.location.name}</td>
                </tr>
                <tr>
                  <td></td>
                </tr>
                <tr>
                  <td>{renderLabels(clanProfile)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="red card">
        <div className="content">
          <table className="ui very basic collapsing celled table">
            <tbody>
              <tr>
                <td>{"Wars Won"}</td>
                <td>{clanProfile.war_wins}</td>
                <td>{"War Ties"}</td>
                <td>{clanProfile.war_ties}</td>
              </tr>
              <tr>
                <td>{"War Losses"}</td>
                <td>{clanProfile.war_losses}</td>
                <td>{"Win streak"}</td>
                <td>{clanProfile.war_win_streak}</td>
              </tr>

              <tr>
                <td>{"Frequency"}</td>
                <td>{clanProfile.war_frequency}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ClanDetailsCard;
