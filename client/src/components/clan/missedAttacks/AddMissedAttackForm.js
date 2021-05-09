// npm imports
import React from "react";
// imports for redux form
import { Field, reduxForm } from "redux-form";

// component
class AddMissedAttackForm extends React.Component {
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
    let form = formValues;
    if (!form.type) {
      form.type = "clan war";
    }
    if (!form.missedAttacks) {
      form.missedAttacks = "1";
    }
    this.props.onSubmit(formValues);
  };

  render() {
    const theme = this.props.theme;
    return (
      <form
        className="ui form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="ui grid">
          <div className="two column row">
            <div className="column">
              <Field name="name" label="Name" component={this.renderInput} />
            </div>
            <div className="column">
              <Field name="tag" label="Tag" component={this.renderInput} />
            </div>
          </div>
          <div className="two column row">
            <div className="column">
              <label>Number of Attacks missed</label>
              <Field name="missedAttacks" component="select">
                <option value="1">1</option>
                <option value="2">2</option>
              </Field>
            </div>
            <div className="column">
              <label>Clan war or Clan war league</label>
              <Field name="type" component="select">
                <option value="clan war">Clan war</option>
                <option value="clan war league">Clan war league</option>
              </Field>
            </div>
          </div>
          <div className="two column row">
            <div className="column">
              <button className={`ui ${theme.mode} primary button`}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "You must enter the players Name";
  }
  if (!formValues.tag) {
    errors.tag = "You must enter the players tag";
  }
  return errors;
};
// export form component with redux form linked in and validator for fields
export default reduxForm({
  form: "addMissedAttackForm",
  validate,
})(AddMissedAttackForm);
