// npm imports
import React from "react";
import { Link } from "react-router-dom";

// actions
import { encodeTag } from "../../functions/codeTag";
class Attacks extends React.Component {
  /* checkAttack = (tag) => {
    if (!this.props.gameAccounts) {
      return false;
    }
    const gameAccounts = this.props.gameAccounts;
    for (let i = 0; i < gameAccounts.length; i++) {
      if (tag === gameAccounts[i].tag) {
        return true;
      } else {
        continue;
      }
    }
    return false;
  };

  renderPostLink = (attack, theme) => {
    return (
      <td>
        <Link
          className={`ui blue ${theme} primary button`}
          to={`/currentwar/postattack/${this.props.user.id}/${encodeTag(
            attack.tag
          )}/${encodeTag(attack.attack.defenderTag)}/${
            attack.attack.destructionPercentage
          }/${attack.attack.stars}`}
        >
          Post
        </Link>
      </td>
    );
  };
  */
  renderAttacks = (attacks, theme) => {
    const sortedAttacks = attacks.sort((a, b) =>
      a.attack.order > b.attack.order ? 1 : -1
    );
    const attackTable = sortedAttacks.map((attack) => {
      let color = "";
      if (attack.team === "blue") {
        color = "#000220";
      } else {
        color = "#380000";
      }
      return (
        <tr
          key={attack.attack.order}
          style={{
            backgroundColor: `${color}`,
            color: `${color.length > 1 ? "white" : ""}`,
          }}
        >
          <td style={{ padding: "1rem" }}>{attack.attack.order}</td>
          <td>
            <h4
              className={`ui ${
                theme === "inverted" ? "" : "inverted"
              } image header`}
            >
              <img
                alt="townhall"
                className="ui avatar image"
                src={`/static/images/coc/townhall-${attack.townhallLevel}.png`}
              />
              <div
                className="content"
                style={{ color: `${color.length > 1 ? "white" : ""}` }}
              >
                {attack.name}
                <div
                  className="sub header"
                  style={{ color: `${color.length > 1 ? "white" : ""}` }}
                >
                  {attack.tag}
                </div>
              </div>
              {attack.order}
            </h4>
          </td>
          <td>
            <h4
              className={`ui ${
                theme === "inverted" ? "" : "inverted"
              } image header`}
            >
              <img
                alt="townhall"
                className="ui avatar image"
                src={`/static/images/coc/${attack.attack.stars}star.png`}
              />
              <div
                className="content"
                style={{ color: `${color.length > 1 ? "white" : ""}` }}
              >
                {attack.attack.stars}
                <div
                  className="sub header"
                  style={{ color: `${color.length > 1 ? "white" : ""}` }}
                >
                  {attack.attack.destructionPercentage + "%"}
                </div>
              </div>
            </h4>
          </td>
          <td>
            <img
              alt="townhall"
              className="ui avatar image"
              src={`/static/images/coc/harrow.png`}
            />
          </td>
          <td>
            <h4
              className={`ui ${
                theme === "inverted" ? "" : "inverted"
              } image header`}
            >
              <div
                className="content"
                style={{ color: `${color.length > 1 ? "white" : ""}` }}
              >
                {attack.defender.name}
                <div
                  className="sub header"
                  style={{ color: `${color.length > 1 ? "white" : ""}` }}
                >
                  {attack.defender.tag}
                </div>
              </div>
              <img
                alt="townhall"
                className="ui avatar image"
                src={`/static/images/coc/townhall-${attack.defender.townhallLevel}.png`}
              />
            </h4>
          </td>
          {/* 
          {this.checkAttack(attack.tag) ? this.renderPostLink(attack) : null}
        */}
        </tr>
      );
    });
    return attackTable;
  };
  render() {
    const theme = this.props.theme;
    return (
      <table className={`ui very basic collasping celled table`}>
        <tbody>{this.renderAttacks(this.props.attacks, theme.mode)}</tbody>
      </table>
    );
  }
}

export default Attacks;
