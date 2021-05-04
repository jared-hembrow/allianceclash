// npm imports
import React from "react";
// class component
class ProfileAchievments extends React.Component {
  renderAll = (profile) => {
    return profile.achievements.map((item) => {
      return (
        <tr key={item.name + item.info}>
          <td>
            <h4 className="header">{item.name}</h4>
          </td>
          <td>
            <h5>{item.info}</h5>
          </td>
          <td>{this.renderStars(item.stars)}</td>
          <td>
            <h5>
              <span>{item.value}</span>
              {"/"}
              <span>{item.target}</span>
            </h5>
          </td>
        </tr>
      );
    });
  };
  renderStars = (stars) => {
    switch (stars) {
      case 0:
        return (
          <img
            alt="stars"
            className="ui mini image"
            src="/static/images/coc/zero-star-battle.png"
          />
        );
      case 1:
        return (
          <img
            alt="stars"
            className="ui mini image"
            src="/static/images/coc/one-star-battle.png"
          />
        );
      case 2:
        return (
          <img
            alt="stars"
            className="ui mini image"
            src="/static/images/coc/two-star-battle.png"
          />
        );
      case 3:
        return (
          <img
            alt="stars"
            className="ui mini image"
            src="/static/images/coc/three-star-battle.png"
          />
        );
      default:
        return null;
    }
  };
  render() {
    if (!this.props.profile || !this.props.theme) {
      return null;
    }
    const theme = this.props.theme;
    const profile = this.props.profile;
    return (
      <table className={`ui ${theme.mode} very basic collasping celled table`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{this.renderAll(profile)}</tbody>
      </table>
    );
  }
}
// export componet
export default ProfileAchievments;
