// npm imports
import React from "react";
import { connect } from "react-redux";
// actions
// import components
import RecruitmentFeedView from "./RecruitmentFeedView";
// component
class RecruitmentFeed extends React.Component {
  state = {
    menu: "",
  };
  renderMenu = (type) => {
    if (type === this.state.menu) {
      return this.setState({ menu: "" });
    } else {
      return this.setState({ menu: type });
    }
  };
  renderList = (type, theme) => {
    if (type === "") {
      return null;
    }
    return <RecruitmentFeedView type={type} theme={theme} />;
  };
  render() {
    let theme = "";
    if (this.props.user.isSignedIn) {
      theme = this.props.user.settings.webTheme;
    }

    return (
      <div className={`ui ${theme} segment`}>
        <h3>Recruitment Feeds</h3>
        <div className={`ui ${theme} secondary menu`}>
          <button
            onClick={(e) => this.renderMenu("Clan looking for members")}
            className={
              this.state.menu === "Clan looking for members"
                ? "item active"
                : ""
            }
          >
            Clan looking for members
          </button>
          <button
            onClick={(e) => this.renderMenu("Alliance looking for clans")}
            className={
              this.state.menu === "Alliance looking for clans"
                ? "item active"
                : ""
            }
          >
            Alliance looking for clans
          </button>
          <button
            onClick={(e) => this.renderMenu("Alliance looking for Players")}
            className={
              this.state.menu === "Alliance looking for Players"
                ? "item active"
                : ""
            }
          >
            Alliance looking for Players
          </button>
          <button
            onClick={(e) => this.renderMenu("Clan looking to join Alliance")}
            className={
              this.state.menu === "Clan looking to join Alliance"
                ? "item active"
                : ""
            }
          >
            Clan looking to join Alliance
          </button>
          <button
            onClick={(e) =>
              this.renderMenu("Player looking to join Clan or Alliance")
            }
            className={
              this.state.menu === "Player looking to join Clan or Alliance"
                ? "item active"
                : ""
            }
          >
            Player looking to join Clan or Alliance
          </button>
        </div>
        <div className={`ui ${theme} segment`}>
          {this.renderList(this.state.menu, theme)}
        </div>
      </div>
    );
  }
}
// map redux store to component props
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
// export component with redux store connected
export default connect(mapStateToProps)(RecruitmentFeed);
