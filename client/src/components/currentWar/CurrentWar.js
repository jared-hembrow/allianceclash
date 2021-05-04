// npm imports
import React from "react";
import { connect } from "react-redux";

// actions
import { fetchCurrentWarDetails } from "../../actions/coc/cocWarActions";
import { sortAttacks } from "../../functions/sortAttacks";

// local components
import Attacks from "./Attacks";
import TimeLeft from "./TimeLeft";
import WarOverView from "./WarOverView";
import MemberParticipants from "./MemberParticipants";
import Loader from "../Loader";

class CurrentWar extends React.Component {
  state = {
    menu: "",
  };
  componentDidMount() {
    this.props.fetchCurrentWarDetails(this.props.match.params.clanTag);
  }

  renderMenu = (type) => {
    if (this.state.menu === type) {
      this.setState({ menu: " " });
    } else {
      this.setState({ menu: type });
    }
  };
  renderAttacksList = (type, theme) => {
    const war = this.props.war;
    const attacks = sortAttacks(war.clan, war.opponent);
    const attackList = [...attacks.clan, ...attacks.opponent];
    switch (type) {
      case "attacks":
        return (
          <Attacks
            attacks={attackList}
            theme={theme}
            user={this.props.auth.user}
          />
        );
      case "clan":
        return (
          <Attacks
            attacks={attacks.clan}
            theme={theme}
            user={this.props.auth.user}
          />
        );
      case "enemy":
        return (
          <Attacks
            attacks={attacks.opponent}
            theme={theme}
            user={this.props.auth.user}
          />
        );
      case "Clan Participants":
        return (
          <MemberParticipants
            players={war.clan}
            theme={theme}
            user={this.props.auth.user}
          />
        );
      case "Enemy Participants":
        return (
          <MemberParticipants
            players={war.opponent}
            theme={theme}
            user={this.props.auth.user}
          />
        );
      default:
        return null;
    }
  };
  render() {
    if (!this.props.war) {
      return <Loader />;
    }
    if (this.props.war.state === "notInWar") {
      return <div className="ui inverted segment">Not currently in war</div>;
    }
    if (!this.props.war.state) {
      return <div className="ui inverted segment">Not currently in war</div>;
    }

    const theme = this.props.auth.settings;
    const war = this.props.war;
    return (
      <div className={`ui ${theme.mode} segment`}>
        <WarOverView war={war} theme={theme.mode} />
        <TimeLeft data={war} theme={theme.mode} />
        <div className={`ui ${theme.mode} segment`}>
          <div className={`ui ${theme.mode} secondary menu`}>
            <button
              onClick={(e) => this.renderMenu("attacks")}
              className={this.state.menu === "attacks" ? "item active" : ""}
            >
              Attacks
            </button>
            <button
              onClick={(e) => this.renderMenu("clan")}
              className={this.state.menu === "clan" ? "item active" : ""}
            >
              clan attacks
            </button>
            <button
              onClick={(e) => this.renderMenu("enemy")}
              className={this.state.menu === "enemy" ? "item active" : ""}
            >
              enemy attacks
            </button>
            <button
              onClick={(e) => this.renderMenu("Clan Participants")}
              className={
                this.state.menu === "Clan Participants" ? "item active" : ""
              }
            >
              Clan Participants
            </button>
            <button
              onClick={(e) => this.renderMenu("Enemy Participants")}
              className={
                this.state.menu === "Enemy Participants" ? "item active" : ""
              }
            >
              Enemy Participants
            </button>
          </div>
          <div className={`ui ${theme.mode} segment`}>
            {this.renderAttacksList(this.state.menu, theme)}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    war: state.currentWar,
  };
};
export default connect(mapStateToProps, {
  fetchCurrentWarDetails,
})(CurrentWar);
