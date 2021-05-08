// npm imports
import React from "react";

// component
const ProfileStats = (props) => {
  if (!props.theme || !props.profile) {
    return null;
  }
  // theme for css class
  const theme = props.theme;
  // data to be parsed into table element
  const profile = props.profile;

  return (
    <table className={`ui ${theme.mode} very basic collasping celled table`}>
      <tbody>
        <tr>
          {/* Town hall level */}
          <td>
            <h4 className={`ui ${theme.mode} image header`}>
              <img
                alt={profile.town_hall_level}
                className="ui avatar image"
                src={`/static/images/coc/townhall-${profile.town_hall_level}.png`}
              />
              <div className="content">
                {"TownHall"}
                <div className="sub header">{profile.town_hall_level}</div>
              </div>
            </h4>
          </td>
          {/* Builder hall level */}
          <td>
            <h4 className={`ui ${theme.mode} image header`}>
              <img
                alt={profile.builder_hall_level}
                className="ui avatar image"
                src={`/static/images/coc/Builder-Hall.png`}
              />
              <div className="content">
                {"BuilderHall"}
                <div className=" sub header">{profile.builder_hall_level}</div>
              </div>
            </h4>
          </td>
          {/* Level */}
          <td>
            <h4 className={`ui ${theme.mode} image header`}>
              <img
                alt={profile.exp_level}
                className="ui avatar image"
                src={`/static/images/coc/level-icon.png`}
              />
              <div className="content">
                {"Level"}
                <div className=" sub header">{profile.exp_level}</div>
              </div>
            </h4>
          </td>
          {/* War stars */}
          <td>
            <h4 className={`ui ${theme.mode} image header`}>
              <img
                alt="profile Stat"
                className="ui avatar image"
                src="/static/images/coc/star-grey.png"
              />
              <div className="content">
                {"War Stars"}
                <div className=" sub header">{profile.war_stars}</div>
              </div>
            </h4>
          </td>
        </tr>
        <tr>
          {/* Trophies */}
          <td>
            <h4 className={`ui ${theme.mode} image header`}>
              <img
                alt="profile Stat"
                className="ui avatar image"
                src="/static/images/coc/trophy.png"
              />
              <div className="content">
                {"Trophies"}
                <div className=" sub header">{profile.trophies}</div>
              </div>
            </h4>
          </td>
          {/* Best Trophies */}
          <td>
            <h4 className={`ui ${theme.mode} image header`}>
              <img
                alt="profile Stat"
                className="ui avatar image"
                src="/static/images/coc/trophy.png"
              />
              <div className="content">
                {"Best Trophies"}
                <div className=" sub header">{profile.best_trophies}</div>
              </div>
            </h4>
          </td>
          {/* builderHall Trophies */}
          <td>
            <h4 className={`ui ${theme.mode} image header`}>
              <img
                alt="profile Stat"
                className="ui avatar image"
                src="/static/images/coc/Axes.png"
              />
              <div className="content">
                {"BuilderHall Trophies"}
                <div className=" sub header">{profile.versus_trophies}</div>
              </div>
            </h4>
          </td>
          {/* Trophies */}
          <td>
            <h4 className={`ui ${theme.mode} image header`}>
              <img
                alt="profile Stat"
                className="ui avatar image"
                src="/static/images/coc/Axes.png"
              />
              <div className="content">
                {"Best BuilderHall Trophies"}
                <div className=" sub header">
                  {profile.best_versus_trophies}
                </div>
              </div>
            </h4>
          </td>
        </tr>
        <tr>
          {/* Attacks */}
          <td>
            <h4 className={`ui ${theme.mode} image header`}>
              <img
                alt="profile Stat"
                className="ui avatar image"
                src="/static/images/coc/attack.png"
              />
              <div className="content">
                {"Attacks Won"}
                <div className=" sub header">{profile.attack_wins}</div>
              </div>
            </h4>
          </td>
          {/* Defences */}
          <td>
            <h4 className={`ui ${theme.mode} image header`}>
              <img
                alt="profile Stat"
                className="ui avatar image"
                src="/static/images/coc/shield.png"
              />
              <div className="content">
                {"Defences Won"}
                <div className=" sub header">{profile.defence_wins}</div>
              </div>
            </h4>
          </td>
          {/* Builder hall battles won */}
          <td>
            <h4 className={`ui ${theme.mode} image header`}>
              <img
                alt="profile Stat"
                className="ui avatar image"
                src="/static/images/coc/Axes.png"
              />
              <div className="content">
                {"BuilderHall Battles Won"}
                <div className=" sub header">{profile.versus_battle_wins}</div>
              </div>
            </h4>
          </td>
        </tr>
        {profile.legend_statistics.currentSeason ? (
          <tr>
            <td>
              <h4 className={`ui ${theme.mode} image header`}>
                <img
                  alt="profile Stat"
                  className="ui avatar image"
                  src="/static/images/coc/legendTrophy.png"
                />
                <div className="content">
                  {"Best Legends Trophies"}
                  <div className=" sub header">
                    {profile.legend_statistics.bestSeason.trophies}
                  </div>
                </div>
              </h4>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};

// export component
export default ProfileStats;
