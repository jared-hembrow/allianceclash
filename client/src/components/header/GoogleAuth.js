import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../../actions/accountActions/index";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "594718169632-50j43gl92n4hdgkde5n00bnp4ip5enkk.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton(theme) {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <div className="item" onClick={this.onSignOutClick}>
          <p>Sign Out</p>
        </div>
      );
    } else {
      return (
        <div className="item" onClick={this.onSignInClick}>
          Sign in
        </div>
      );
    }
  }

  render() {
    const theme = this.props.theme;
    return <div>{this.renderAuthButton(theme)}</div>;
  }
}

const mapStateToProp = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProp, { signIn, signOut })(GoogleAuth);
