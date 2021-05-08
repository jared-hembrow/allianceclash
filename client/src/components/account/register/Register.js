import React from "react";
import { connect } from "react-redux";
// action
import { createNewUser } from "../../../actions/accountActions";
// local components
import RegisterForm from "./RegisterForm";
class Register extends React.Component {
  onSubmit = (formValues) => {
    this.props.createNewUser(formValues, this.props.match.params.id);
  };
  render() {
    console.log(this.props.match.params.id);
    return (
      <div className="ui segment">
        <h3>Create Your Account</h3>
        <RegisterForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

// export component
export default connect(null, { createNewUser })(Register);
