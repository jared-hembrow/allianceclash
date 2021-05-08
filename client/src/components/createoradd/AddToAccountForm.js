import React from "react";
import { Field, reduxForm } from "redux-form";

class AddToAccountForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <div>{error}</div>
        </div>
      );
    }
  };
  renderTextInput = ({ input, label, meta }) => {
    const className = `ui ${meta.error && meta.touched ? "red message" : ""}`;

    return (
      <div>
        <label>{label}</label>
        <input {...input} />
        <div className={className}>{this.renderError(meta)}</div>
      </div>
    );
  };

  render() {
    const theme = this.props.theme;
    return (
      <form
        className={`ui ${theme.mode} form`}
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <div className="field">
          <Field name="name" component={this.renderTextInput} label="Name" />
          <Field name="tag" component={this.renderTextInput} label="Tag" />
        </div>
        <div className="field">
          <h4>Enter your API token from your clash of clans settings page</h4>
          <img
            alt="how find token"
            className="ui big image"
            src="/static/images/coc/api-token.png"
          />
          <Field
            name="APIToken"
            component={this.renderTextInput}
            label="API Token"
          />
        </div>

        <button className={`ui ${theme.mode} primary button`}>Add</button>
      </form>
    );
  }
}
// function to validate correct form entries
const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "You must enter a Name!";
  }
  if (!formValues.tag) {
    errors.tag = "You must enter a Tag";
  }
  if (!formValues.APIToken) {
    errors.APIToken = "You must enter your API token from Account!";
  }
  return errors;
};
export default reduxForm({ form: "addAccount", validate })(AddToAccountForm);
