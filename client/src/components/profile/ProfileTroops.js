// npm imports
import React from "react";

// function imports
import { rowArray, mapRow } from "../../functions/table";
// component
class ProfileTroops extends React.Component {
  renderHeroes = (theme, profile) => {
    return profile.heroes.map((item) => {
      return (
        <td key={item.name}>
          <h4 className={`ui ${theme.mode} image header`}>
            <img
              alt={item.name}
              className="ui avatar image"
              src={`/static/images/coc/heroes/${item.name.replace(
                " ",
                ""
              )}.png`}
            />
            <div className="content">
              {item.name}
              <div className="sub header">{item.level}</div>
            </div>
          </h4>
        </td>
      );
    });
  };
  renderPets = (theme, profile) => {
    return profile.troops.map((item) => {
      if (
        item.name === "L.A.S.S.I" ||
        item.name === "Mighty Yak" ||
        item.name === "Electro Owl" ||
        item.name === "Unicorn"
      ) {
        return (
          <td key={item.name}>
            <h4 className={`ui ${theme.mode} image header`}>
              <img
                alt={item.name}
                className="ui avatar image"
                src={`/static/images/coc/pets/${item.name.replace(
                  " ",
                  ""
                )}.png`}
              />
              <div className="content">
                {item.name}
                <div className="sub header">{item.level}</div>
              </div>
            </h4>
          </td>
        );
      }
    });
  };
  renderTroops = (theme, profile) => {
    const troops = [];
    for (let i = 0; i < profile.troops.length; i++) {
      const checkName = profile.troops[i].name.split(" ");
      if (
        profile.troops[i].village === "builderBase" ||
        checkName[0] === "Super" ||
        checkName[0] === "Stone" ||
        checkName[0] === "Battle" ||
        checkName[0] === "Siege" ||
        checkName[1] === "Wrecker" ||
        checkName[0] === "Inferno" ||
        checkName[0] === "Sneaky" ||
        checkName[0] === "Log" ||
        checkName[0] === "Ice" ||
        checkName[0] === "L.A.S.S.I" ||
        checkName[0] === "Mighty" ||
        checkName[1] === "Owl" ||
        checkName[0] === "Unicorn"
      ) {
        continue;
      }
      troops.push(profile.troops[i]);
    }

    const troopRows = rowArray(troops);
    const renderTroopTable = mapRow(troopRows, "troops", theme);

    return renderTroopTable;
  };
  renderSeige = (theme, profile) => {
    const seiges = [];
    for (let i = 0; i < profile.troops.length; i++) {
      if (
        profile.troops[i].name === "Wall Wrecker" ||
        profile.troops[i].name === "Battle Blimp" ||
        profile.troops[i].name === "Stone Slammer" ||
        profile.troops[i].name === "Siege Barracks" ||
        profile.troops[i].name === "Log Launcher"
      ) {
        seiges.push(profile.troops[i]);
      } else {
        continue;
      }
    }
    const seigeRows = rowArray(seiges);
    const renderSeigeTable = mapRow(seigeRows, "seige", theme);
    return renderSeigeTable;
  };
  renderSpells = (theme, profile) => {
    const spellRows = rowArray(profile.spells);
    const spellTable = mapRow(spellRows, "spells", theme);
    return spellTable;
  };

  render() {
    if (!this.props.theme || !this.props.profile) {
      return null;
    }
    // css theme for class
    const theme = this.props.theme;
    // profile data
    const profile = this.props.profile;
    return (
      <table className={`ui ${theme.mode} very basic collasping celled table`}>
        <tbody>
          <tr>
            <td>
              <h2>Heroes</h2>
            </td>
          </tr>
          <tr>{this.renderHeroes(theme, profile)}</tr>
          {profile.town_hall_level > 13 ? (
            <tr>
              <td>
                <h2>Pets</h2>
              </td>
            </tr>
          ) : null}
          {profile.town_hall_level > 13 ? (
            <tr>{this.renderPets(theme, profile)}</tr>
          ) : null}
          <tr>
            <td>
              <h2>Troops</h2>
            </td>
          </tr>
          {this.renderTroops(theme, profile)}
          <tr>
            <td>
              <h2>Seige Machines</h2>
            </td>
          </tr>
          {this.renderSeige(theme, profile)}
          <tr>
            <td>
              <h2>Spells</h2>
            </td>
          </tr>
          {this.renderSpells(theme, profile)}
        </tbody>
      </table>
    );
  }
}
// export component
export default ProfileTroops;
