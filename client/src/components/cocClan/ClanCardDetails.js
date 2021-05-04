// npm imports
import React from "react";

// component
class ClanCardDetails extends React.Component {
  renderLabels = (clanProfile) => {
    const labels = clanProfile.labels.map((label) => {
      return (
        <img
          key={label.id}
          alt={label.name}
          src={label.iconUrls.medium}
          className="ui avatar image"
        />
      );
    });
    return labels;
  };
  render() {
    /*
    if (!this.props.theme || !this.props.profile) {
      return <Loader text="..." />;
    }
    */
    const clanProfile = this.props.profile;
    const theme = this.props.theme;
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
                      {clanProfile.clanPoints}
                    </td>
                    <td>
                      <img
                        alt="axes"
                        src="/static/images/coc/Axes.png"
                        className="ui avatar image"
                      />
                      {clanProfile.clanVersusPoints}
                    </td>
                  </tr>
                  <tr>
                    <td>{clanProfile.warLeague.name}</td>
                  </tr>
                  <tr>
                    <td>{clanProfile.location.name}</td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                  <tr>
                    <td>{this.renderLabels(clanProfile)}</td>
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
                  <td>{clanProfile.warWins}</td>
                  <td>{"War Ties"}</td>
                  <td>{clanProfile.warTies}</td>
                </tr>
                <tr>
                  <td>{"War Losses"}</td>
                  <td>{clanProfile.warLosses}</td>
                  <td>{"Win streak"}</td>
                  <td>{clanProfile.warWinStreak}</td>
                </tr>

                <tr>
                  <td>{"Frequency"}</td>
                  <td>{clanProfile.warFrequency}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ClanCardDetails;
