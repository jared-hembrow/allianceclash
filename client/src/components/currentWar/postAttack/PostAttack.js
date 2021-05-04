// npm imports
import React from "react";
import { connect } from "react-redux";
// actions
import { fetchAttackProfiles } from "../../../actions/coc/cocWarActions";

//local imports
import Loader from "../../Loader";
class PostAttack extends React.Component {
  componentDidMount() {
    this.props.fetchAttackProfiles(
      this.props.match.params.tag,
      this.props.match.params.defenderTag
    );
  }
  renderAttack = (data) => {
    const attack = this.props.match.params;
    return (
      <div>
        <h4 className="ui image header">
          <img
            alt="townhall"
            className="ui avatar image"
            src={`/static/images/coc/townhall-${data.opponent.townHallLevel}.png`}
          />
          <div className="content">
            {data.opponent.name}
            <div className="sub header">{data.opponent.tag}</div>
          </div>
        </h4>
        <br />
        <img
          alt="townhall"
          className="ui avatar image"
          src={`/static/images/coc/${attack.stars}star.png`}
        />
        {attack.stars}
        <img
          alt="townhall"
          className="ui avatar image"
          src={`/static/images/coc/destroyed.png`}
        />
        {attack.destructionPercentage + "%"}
      </div>
    );
  };
  renderCard = (theme, data) => {
    const player = data.player;
    const opponent = data.opponent;
    return (
      <div className="ui cards">
        <div className="blue card">
          <div className="content">
            <img
              alt="townhall"
              className="right floated mini ui image"
              src={`/static/images/coc/townhall-${player.townHallLevel}.png`}
            />
            <div className="header">
              {player.name}
              <div className="meta">{player.tag}</div>
              <div className="description">
                {this.renderAttack(data)}
                <div>
                  <img
                    alt="level icon"
                    className="ui avatar image"
                    src={opponent.league.iconUrls.medium}
                  />
                  {opponent.trophies}

                  <img
                    alt="grey star"
                    className="ui avatar image"
                    src={`/static/images/coc/star-grey.png`}
                  />
                  {opponent.warStars}

                  <img
                    alt="level icon"
                    className="ui avatar image"
                    src={`/static/images/coc/level-icon.png`}
                  />
                  {opponent.expLevel}
                </div>
                {this.renderHeroLevels(opponent)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  renderHeroLevels = (data) => {
    const tdList = data.heroes.map((hero) => {
      const name = hero.name.split(" ");
      const initials =
        name[0].charAt(0).toUpperCase() + name[1].charAt(0).toUpperCase();
      return (
        <tr>
          <td>
            <h4>{initials + ":" + hero.level}</h4>
          </td>
        </tr>
      );
    });
    return (
      <table>
        <tbody>{tdList}</tbody>
      </table>
    );
  };
  render() {
    if (!this.props.match.params) {
      return <Loader />;
    }
    if (!this.props.attack.player) {
      return <Loader />;
    }
    if (!this.props.user.settings.webTheme) {
      return null;
    }
    // theme
    const theme = this.props.user.settings.webTheme;
    return (
      <div className={`ui ${theme} segment`}>
        {this.renderCard(theme, this.props.attack)}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    attack: state.postAttack,
  };
};
export default connect(mapStateToProps, { fetchAttackProfiles })(PostAttack);
