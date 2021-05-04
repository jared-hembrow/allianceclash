// npm imports
import React from "react";
import { connect } from "react-redux";
// action imports
import { createAlliance } from "../../actions/allianceActions/createAllianceActions";
//import component
import CreateAllianceForm from "./CreateAllianceForm";
// class component
class AddAliance extends React.Component {
  onSubmit = (formValues) => {
    this.props.createAlliance(formValues, this.props.auth.user.userDetails.id);
  };
  renderSubmissionError = () => {
    return (
      <div className="ui red message">{this.props.allianceStatus.result}</div>
    );
  };
  render() {
    const theme = this.props.auth.settings;
    return (
      <div className={`ui ${theme.mode} segment`}>
        <h3>Create An Alliance</h3>

        {this.props.allianceStatus.result ? this.renderSubmissionError() : null}

        <CreateAllianceForm theme={theme} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    allianceStatus: state.allianceStatus,
  };
};
// export component
export default connect(mapStateToProps, { createAlliance })(AddAliance);
