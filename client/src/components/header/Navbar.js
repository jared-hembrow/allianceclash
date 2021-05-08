// npm imports
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//actions
import { checkLoggedIn, logoutUser } from "../../actions/accountActions";
// history object
import history from "../../History";
// component imports
import AddMenu from "./AddMenu";
import GoogleAuth from "./GoogleAuth";
// header component
class Navbar extends React.Component {
  state = {
    location: "home",
  };
  componentDidMount() {
    history.listen((location) => {
      const parseLocationString = location.pathname.replace("/", "");
      this.setState({ location: parseLocationString });
    });
  }
  renderBackground = (theme) => {
    if (theme.mode === "inverted") {
      document.querySelector("body").style.background = "black";
    } else {
      document.querySelector("body").style.background = "white";
    }
  };
  renderUserNav = (theme) => {
    if (this.props.auth.isSignedIn) {
      return (
        <div
          className={
            this.state.location.includes("user") ? "item active" : "item"
          }
        >
          <AddMenu
            theme={theme}
            menuItems={accountMenu}
            title={"Account"}
            elementId="accountMenu"
          />
        </div>
      );
    } else {
      return null;
    }
  };
  renderLogButtons = (theme) => {
    return <GoogleAuth theme={theme} />;
  };

  render() {
    const theme = this.props.auth.settings;
    this.renderBackground(theme);
    return (
      <div className={`ui ${theme.mode} pointing menu`}>
        <div
          className={
            this.state.location.includes("home") || this.state.location === ""
              ? "item active"
              : "item"
          }
        >
          <Link to="/home" style={{ margin: "0%" }}>
            <img
              alt="site logo"
              src="/static/images/coc/townhall-14.png"
              className="ui mini avatar image"
            />
          </Link>
        </div>

        <div
          className={
            this.state.location.includes("recruitment") ? "item active" : "item"
          }
        >
          <AddMenu
            theme={theme}
            menuItems={
              this.props.auth.isSignedIn ? loggedinRecruitMenu : recruitMenu
            }
            title="Recruit"
            elementId="recruitMenu"
          />
        </div>
        {this.renderUserNav(theme)}
        {this.renderLogButtons(theme)}
      </div>
    );
  }
}
// menu array
const recruitMenu = [
  {
    url: "/recruitment/feed",
    label: "Recruitment Feed",
  },
  {
    url: "/search",
    label: "Search",
  },
];
const loggedinRecruitMenu = [
  {
    url: "/recruitment/post",
    label: "Create recruitment post",
  },
  {
    url: "/recruitment/feed",
    label: "Recruitment Feed",
  },
  {
    url: "/search",
    label: "Search",
  },
];
const accountMenu = [
  {
    url: "/profile",
    label: "Profiles",
  },
  { url: "/clan", label: "Clan" },
  {
    url: "/user/settings",
    label: "Settings",
  },
];
// give redux store to component props
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
// export Navbar component
export default connect(mapStateToProps, { checkLoggedIn, logoutUser })(Navbar);
