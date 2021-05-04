import React from "react";
import { Link } from "react-router-dom";
class AddMenu extends React.Component {
  state = {
    menu: false,
    display: "none",
  };
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutsideMenu);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutsideMenu);
  }
  handleClickOutsideMenu = (e) => {
    const targetName = this.props.elementId;
    let checkClassName = false;
    for (let i = 0; i < e.target.classList.length; i++) {
      if (e.target.classList[i] === targetName) {
        checkClassName = true;
      }
      continue;
    }
    if (!checkClassName) {
      if (!this.state.menu) {
        return;
      }
      this.setState({ menu: false, display: "none" });
    }
  };
  setMenu = () => {
    if (this.state.menu) {
      this.setState({ menu: false, display: "none" });
    } else {
      this.setState({ menu: true, display: "block" });
    }
  };
  renderDropdownItems = (theme, items, targetId) => {
    const menuItems = items.map((item, idx) => {
      return (
        <Link
          key={item.label + idx}
          className={`${targetId}`}
          to={item.url}
          style={{ color: theme.text }}
        >
          <div
            style={{
              color: theme.text,
              backgroundColor: theme.background,
              border: `0.2rem solid ${theme.border}`,
              borderRadius: "0.8rem",
              padding: "0.5rem",
              margin: "0.5rem",
            }}
            onClick={this.setMenu}
            className={`${targetId}`}
          >
            {" "}
            {item.label}
          </div>
        </Link>
      );
    });

    return (
      <div
        className={`${targetId}`}
        style={{
          display: this.state.display,
          position: "absolute",
          zIndex: "1",
        }}
      >
        {menuItems}
      </div>
    );
  };

  render() {
    const theme = this.props.theme;

    const linkItems = this.props.menuItems;
    const targetId = this.props.elementId;
    return (
      <div
        className={`${targetId}`}
        style={{ position: "relative", display: "inline-block" }}
      >
        <div className={`${targetId}`} style={{ display: "inline-block" }}>
          <div className={`${targetId}`} onClick={this.setMenu}>
            {this.props.title}
            <i className={`dropdown icon ${targetId}`} />
          </div>
        </div>
        {this.renderDropdownItems(theme, linkItems, targetId)}
      </div>
    );
  }
}
export default AddMenu;
