import React from "react";

const WarOverView = (props) => {
  const theme = props.theme;
  const data = props.war;
  if (data.state === "notInWar") {
    return null;
  }
  return (
    <table className={`ui ${theme} very basic collasping celled table`}>
      <tbody>
        <tr>
          {/* Clan */}
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt="banner"
                src={data.clan.badge_url.medium}
                className="ui avatar image"
              />
              <div className="content">
                {data.clan.name}
                <div className="sub header">
                  <img
                    alt="banner"
                    src="/static/images/coc/attack.png"
                    className="ui avatar image"
                  />
                  {data.clan.attacks}
                  <img
                    alt="banner"
                    src="/static/images/coc/star-grey.png"
                    className="ui avatar image"
                  />
                  {data.clan.stars}
                  <img
                    alt="banner"
                    src="/static/images/coc/destroyed.png"
                    className="ui avatar image"
                  />
                  {data.clan.destructionPercentage + "%"}
                </div>
              </div>
            </h4>
          </td>
          <td>
            <h3>
              {data.teamSize
                ? `${data.teamSize}  VS  ${data.teamSize}`
                : "  VS  "}
            </h3>
          </td>

          {/* opponent */}
          <td>
            <h4 className={`ui ${theme} image header`}>
              <div className="content">
                {data.opponent.name}
                <div className="sub header">
                  <img
                    alt="banner"
                    src="/static/images/coc/attack.png"
                    className="ui avatar image"
                  />
                  {data.opponent.attacks}
                  <img
                    alt="banner"
                    src="/static/images/coc/star-grey.png"
                    className="ui avatar image"
                  />
                  {data.opponent.stars}
                  <img
                    alt="banner"
                    src="/static/images/coc/destroyed.png"
                    className="ui avatar image"
                  />
                  {data.opponent.destructionPercentage + "%"}
                </div>
              </div>
              <img
                alt="banner"
                src={data.opponent.badgeUrls.medium}
                className="ui avatar image"
              />
            </h4>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default WarOverView;
