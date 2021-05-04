// npm imports
import React from "react";
// import comppnents
import AllianceClanProfile from "./AllianceClanProfile";
// component
class AllianceClanCard extends React.Component {
  state = {
    menu: "",
  };
  renderMenu = (type) => {
    this.setState({ menu: type });
  };
  renderMenuButtons = (clan, theme) => {
    return clan.clans.map((clan) => {
      return (
        <div
          key={clan.name}
          className={this.state.menu === clan.name ? "item active" : ""}
        >
          <button
            onClick={() => this.renderMenu(clan.name)}
            className={`ui ${theme} green button`}
          >
            {clan.name}
          </button>
        </div>
      );
    });
  };
  renderMenuContent = (theme, clan, type) => {
    for (let i = 0; i < clan.clans.length; i++) {
      if (clan.clans[i].name === type) {
        return <AllianceClanProfile theme={theme} profile={clan.clans[i]} />;
      }
    }
  };
  render() {
    if (this.props.clan.length < 1 || Object.keys(this.props.clan).length < 1) {
      return null;
    }
    if (!this.props.clan.clans) {
      return null;
    }
    const theme = this.props.theme;
    return (
      <div>
        <div className={`ui ${theme.mode} secondary menu`}>
          {this.renderMenuButtons(this.props.clan, theme.mode)}
        </div>
        <div className={`ui ${theme.mode} segment`}>
          {this.renderMenuContent(theme, this.props.clan, this.state.menu)}
        </div>
      </div>
    );
  }
}

// export component
export default AllianceClanCard;
