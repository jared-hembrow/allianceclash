// npm imports
import React from "react";
class Warlog extends React.Component {
  renderWarList = (theme, log) => {
    const list = log.map((item) => {
      const type = item.clan.stars > item.teamSize * 3 ? "CWL" : item.result;
      const rowColor =
        item.clan.stars >= item.opponent.stars
          ? { backgroundColor: "#008000" }
          : { backgroundColor: "#6B0000" };
      return (
        <tr key={item.endTime} style={rowColor}>
          <td style={{ padding: "1rem" }}>
            <h3>{type}</h3>
          </td>
          {/* clan */}

          <td>
            <h4 className={`ui inverted image header`}>
              <img
                alt="banner"
                className="ui avatar image"
                src={item.clan.badgeUrls.medium}
              />
              <div className="content">
                {item.clan.name}
                <div className="sub header">{item.clan.tag}</div>
              </div>
            </h4>
          </td>
          <td>
            <img
              alt="clan stats"
              className="ui avatar image"
              src="/static/images/coc/star.png"
            />
            {item.clan.stars}
            <img
              alt="clan stats"
              className="ui avatar image"
              src="/static/images/coc/attack.png"
            />
            {item.clan.attacks}
            <img
              alt="clan stats"
              className="ui avatar image"
              src="/static/images/coc/destroyed.png"
            />
            {item.clan.destructionPercentage + "%"}
          </td>
          <td>
            <h3>{item.teamSize + "  V  " + item.teamSize}</h3>
          </td>
          {/* opponent */}

          <td>
            <img
              alt="opponent stats"
              className="ui avatar image"
              src="/static/images/coc/star.png"
            />
            {item.opponent.stars}

            <img
              alt="opponent stats"
              className="ui avatar image"
              src="/static/images/coc/destroyed.png"
            />
            {item.opponent.destructionPercentage + "%"}
          </td>
          <td>
            <h4 className={`ui inverted image header`}>
              <div className="content">
                {item.opponent.name}
                <div className="sub header">{item.opponent.tag}</div>
              </div>
              <img
                alt="banner"
                className="ui avatar image"
                src={item.opponent.badgeUrls.medium}
              />
            </h4>
          </td>
        </tr>
      );
    });
    return list;
  };
  render() {
    const theme = this.props.theme;
    if (this.props.log.length < 1) {
      return (
        <div className={`ui ${theme} segment`}>
          <h4> No wars have on record</h4>
        </div>
      );
    }
    return (
      <div>
        <table className={`ui inverted very basic collasping celled table`}>
          <tbody>{this.renderWarList(theme, this.props.log)}</tbody>
        </table>
      </div>
    );
  }
}

export default Warlog;
