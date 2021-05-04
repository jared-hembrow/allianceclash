// npm imports
import React from "react";
import { Field, reduxForm } from "redux-form";

class InviteClan extends React.Component {
  state = {
    clanFields: ["clan0"],
  };
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <div>{error}</div>
        </div>
      );
    }
  };
  renderInput = ({ input, label, meta }) => {
    const className = `ui ${meta.error && meta.touched ? "red message" : ""}`;
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete="off" placeholder={label} />
        <div className={className}>{this.renderError(meta)}</div>
      </div>
    );
  };
  renderClanInput = (theme) => {
    return this.state.clanFields.map((item, idx) => {
      return (
        <div
          key={item + idx}
          className="ui segment"
          style={{
            backgroundColor: theme.segmentColor,
            border: `solid 0.2rem ${theme.border}`,
          }}
        >
          <div key={item} className="field">
            <Field
              name={`clan${idx}`}
              component={this.renderInput}
              label="Enter Clan Name"
            />
            <Field
              name={`tag${idx}`}
              component={this.renderInput}
              label="Enter Clan Tag"
            />
            <Field
              name={`message${idx}`}
              component={this.renderInput}
              label="Enter Message"
            />
          </div>
        </div>
      );
    });
  };
  addNewClanField = () => {
    const clanFields = this.state.clanFields;
    clanFields.push(`clan${clanFields.length}`);
    this.setState({ clanFields: clanFields });
  };
  deleteClanField = (e) => {
    if (this.state.clanFields.length < 2) {
      return;
    }
    this.state.clanFields.pop();
    this.setState({ clanFields: this.state.clanFields });
  };
  render() {
    const theme = this.props.theme;
    return (
      <div>
        <h3>Invite Clans to {this.props.profile.name}</h3>
        <form
          className={`ui ${theme.mode} form`}
          onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        >
          {this.renderClanInput(theme)}
          <div
            onClick={this.addNewClanField}
            className={`ui ${theme.mode} green button`}
          >
            <i className="plus icon" />
          </div>
          <button
            className={`ui ${theme.mode} red button`}
            onClick={(e) => this.deleteClanField(e)}
          >
            <i className="trash alternate icon"></i>
          </button>
          <button className={`ui ${theme.mode} primary button`}>
            Send Invitation
          </button>
        </form>
      </div>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.clan0) {
    errors.clan0 = "You must enter a Name!";
  }
  if (!formValues.tag0) {
    errors.tag0 = "You must enter a Tag";
  }
  return errors;
};
export default reduxForm({ form: "inviteClan", validate })(InviteClan);
