// npm import
import React from "react";
import { connect } from "react-redux";

// component imports
import Loader from "../Loader";

import AddCocAccount from "./AddCocAccont";
import AddAliance from "./CreateAlliance";
// component
class AddToAccount extends React.Component {
  state = {
    menu: "",
  };
  renderMenu = (type) => {
    if (this.state.menu === type) {
      this.setState({ menu: " " });
    } else {
      this.setState({ menu: type });
    }
  };
  renderMenuContent = (type, theme, id) => {
    switch (type) {
      case "Clash of clans":
        return <AddCocAccount theme={theme} id={id} />;
      case "Alliance":
        return <AddAliance theme={theme} id={id} />;
      default:
        return null;
    }
  };
  render() {
    if (!this.props.auth.isSignedIn) {
      return <Loader />;
    }
    const theme = this.props.auth.settings;
    return (
      <div className={`ui ${theme.mode} segment`}>
        <h3>Add or Create</h3>
        <div className={`ui ${theme.mode} secondary menu`}>
          <button
            onClick={(e) => this.renderMenu("Clash of clans")}
            className={
              this.state.menu === "Clash of clans"
                ? "ui item active button"
                : "item"
            }
          >
            Clash of clans
          </button>
          <button
            onClick={(e) => this.renderMenu("Alliance")}
            className={this.state.menu === "Alliance" ? "item active" : "item"}
          >
            Alliance
          </button>
        </div>
        {this.renderMenuContent(
          this.state.menu,
          theme,
          this.props.auth.user.userDetails.id
        )}
      </div>
    );
  }
}
// map redux store to props of Component
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

// export component
export default connect(mapStateToProps)(AddToAccount);
