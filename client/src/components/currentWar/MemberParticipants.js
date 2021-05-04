import React from "react";

class MemberParticipants extends React.Component {
  renderPlayerList = (list, theme) => {
    const renderedList = list.map((player) => {
      return (
        <tr key={player.name + player.tag}>
          <td>
            <h4 className={`ui ${theme} image header`}>{player.mapPosition}</h4>
          </td>
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt="townhall"
                className="ui avatar image"
                src={`/static/images/coc/townhall-${player.townhallLevel}.png`}
              />
              <div className="content">
                {player.name}
                <div className="sub header">{player.tag}</div>
              </div>
            </h4>
          </td>
          {player.hasOwnProperty("bestOpponentAttack") ? (
            <td>
              <h4>Defence</h4>
              <h4 className={`ui ${theme} image header`}>
                <img
                  alt="defence"
                  className="ui avatar image"
                  src={`/static/images/coc/${player.bestOpponentAttack.stars}star.png`}
                />
                {player.bestOpponentAttack.stars}

                <img
                  alt="defence"
                  className="ui avatar image"
                  src={`/static/images/coc/destroyed.png`}
                />
                {player.bestOpponentAttack.destructionPercentage + "%"}
              </h4>
            </td>
          ) : null}
        </tr>
      );
    });
    return renderedList;
  };
  render() {
    const theme = this.props.theme;
    const list = this.props.players.members;
    list.sort((a, b) => a.mapPosition - b.mapPosition);
    return (
      <table className={`ui ${theme.mode} very basic collapsing celled table`}>
        <tbody>{this.renderPlayerList(list, theme.mode)}</tbody>
      </table>
    );
  }
}

export default MemberParticipants;
