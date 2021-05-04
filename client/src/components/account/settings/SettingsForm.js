// npm imports
import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
// action imports
// function imports

// class component
class SettingsForm extends React.Component {
  onSubmit = (formValues) => {
    const form = formValues;
    // pass formValues up to parent component
    this.props.onSubmit(form);
  };
  // render any errors on forms from the validate function
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div>
          <div>{error}</div>
        </div>
      );
    }
  };
  // render a textarea or a input field
  renderInput = ({ normal, radio, textarea, input, label, type, meta }) => {
    const textareaType = (
      <textarea {...input} placeholder={label} value={input.value}></textarea>
    );
    const inputType = (
      <input {...input} autoComplete="off" placeholder={label} />
    );
    const radioType = (
      <div>
        <div style={{ padding: "1rem" }} className="ui radio checkbox">
          <input {...input} type={type} value="light" />
          <label>{"Light"}</label>
        </div>
        <div style={{ padding: "1rem" }} className="ui radio checkbox">
          <input {...input} type={type} value="dark" />
          <label>{"Dark"}</label>
        </div>
      </div>
    );
    const className = `ui ${meta.error && meta.touched ? "red message" : ""}`;
    return (
      <div>
        <label>{label}</label>
        {normal ? inputType : null}
        {textarea ? textareaType : null}
        {radio ? radioType : null}
        <div className={className}>{this.renderError(meta)}</div>
      </div>
    );
  };
  renderRadio = ({ type, input, label, theme }) => {
    return (
      <div className={`ui ${theme} radio checkbox`}>
        <input {...input} type={type} />
        <label>{label}</label>
      </div>
    );
  };
  // main render function
  render() {
    const theme = this.props.theme;
    return (
      <form
        className={`ui ${theme.mode} form`}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        {/* Player Name */}
        <div className="field">
          <Field
            name="playerName"
            component={this.renderInput}
            label="Change Player Name"
            normal={true}
            value="Name"
          />
        </div>
        {/* Web theme field */}
        <div className="field">
          <label>
            <h4>{"Theme"}</h4>
          </label>
          <Field
            name="theme"
            component={this.renderRadio}
            label="Light"
            value="light"
            type="radio"
            theme={theme}
          />
          <br />
          <Field
            name="theme"
            component={this.renderRadio}
            label="Dark"
            value="dark"
            type="radio"
            theme={theme}
          />
        </div>
        <button className={`ui ${theme} primary button`}>Submit Changes</button>
      </form>
    );
  }
}

// function to validate input fields
const validate = (formValues) => {
  const errors = {};
  if (!formValues.playerName) {
    errors.playerName = "You must enter a Player Name!";
  }
  if (formValues.playerName && formValues.playerName.length < 6) {
    errors.playerName = "Player Name must be 6 or more characters";
  }
  return errors;
};
// export the component with redux form and initial values
let InitializeFromStateForm = reduxForm({
  form: "settings",
  enableReinitialize: true,
  validate,
})(SettingsForm);
InitializeFromStateForm = connect((state, ownProps) => {
  return {
    initialValues: ownProps.settings,
  };
})(InitializeFromStateForm);
export default InitializeFromStateForm;
