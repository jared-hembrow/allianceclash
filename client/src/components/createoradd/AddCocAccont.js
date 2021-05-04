// npm imports
import React from "react";
import { connect } from "react-redux";
//actions
import { addNewCocAccount } from "../../actions/registerActions";
// components
import AddCocAccountForm from "./AddCocAccountForm";
// class component
class AddCocAccount extends React.Component {
  onSubmit = (formValues) => {
    this.props.addNewCocAccount(this.props.id, formValues);
  };
  render() {
    const theme = this.props.theme;
    return (
      <div className={`ui ${theme.mode} segment`}>
        {this.props.addClashAccount.result ? (
          <div className="ui red message">
            {this.props.addClashAccount.result}
          </div>
        ) : null}
        <div>
          <AddCocAccountForm theme={theme} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    addClashAccount: state.addClashAccount,
  };
};
// export component
export default connect(mapStateToProps, { addNewCocAccount })(AddCocAccount);
