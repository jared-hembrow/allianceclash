// npm imports
import React from "react";
// imports for redux form
import { Field, reduxForm } from "redux-form";

// component
class RegisterForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div>
          <div>{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, label, meta }) => {
    const className = `ui ${meta.error && meta.touched ? "red message" : ""}`;
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        <div className={className}>{this.renderError(meta)}</div>
      </div>
    );
  };
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="ui grid">
          <div className="row">
            <div className="four wide column">
              <Field
                name="playerName"
                component={this.renderInput}
                label="Player Name"
              />
            </div>
          </div>
          <div className="row">
            <div className="four wide column">
              <button className="ui primary button">Create</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.playerName) {
    errors.playerName = "You must enter a Player Name";
  }
  if (formValues.playerName && formValues.playerName.length > 20) {
    errors.playerName = "Player Name cannot be longer then 20 letters";
  }

  return errors;
};
// export form component with redux form linked in and validator for fields
export default reduxForm({
  form: "registerForm",
  validate,
})(RegisterForm);
