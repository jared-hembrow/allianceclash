// npm import
import React from "react";
import { connect } from "react-redux";
// actions
import { addToAccount } from "../../actions/accountActions";
import history from "../../History";
// component imports
import Loader from "../Loader";

import AddToAccountForm from "./AddToAccountForm";
// component
class AddToAccount extends React.Component {
  onSubmit = (formValues) => {
    this.props.addToAccount(formValues, this.props.match.params.id);
  };
  render() {
    console.log(this.props);
    if (!this.props.auth.isSignedIn) {
      return <Loader />;
    }
    const theme = this.props.auth.settings;
    return (
      <div className={`ui ${theme.mode} segment`}>
        {this.props.status.result ? (
          <div className="ui red message">{this.props.status.result}</div>
        ) : null}
        <div>
          <AddToAccountForm theme={theme} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}
// map redux store to props of Component
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    status: state.addAccountStatus,
  };
};

// export component
export default connect(mapStateToProps, { addToAccount })(AddToAccount);
