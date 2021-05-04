import React from "react";
import { Field, reduxForm } from "redux-form";

class CreateAllianceForm extends React.Component {
  state = {
    clanFields: ["clan0"],
    clanFieldError: false,
  };
  renderClanError = () => {
    if (this.state.clanFieldError) {
      return (
        <div className="ui red message">
          <h3>
            Maximum Number of clans in a single Alliance is 5<br />
            No more are allowed!!
          </h3>
        </div>
      );
    }
    return null;
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
  renderInput = ({ textarea, input, label, meta }) => {
    const textareaType = (
      <textarea {...input} placeholder={label} value={input.value}></textarea>
    );
    const inputType = (
      <input {...input} autoComplete="off" placeholder={label} />
    );
    const className = `ui ${meta.error && meta.touched ? "red message" : ""}`;
    return (
      <div>
        <label>{label}</label>
        {textarea ? textareaType : inputType}
        <div className={className}>{this.renderError(meta)}</div>
      </div>
    );
  };
  addNewClanField = () => {
    const clanFields = this.state.clanFields;
    if (clanFields.length === 5) {
      this.setState({ clanFields: clanFields, clanFieldError: true });
      return;
    }
    clanFields.push(`clan${clanFields.length}`);
    this.setState({ clanFields: clanFields });
  };
  deleteClanField = (e) => {
    e.preventDefault();
    if (this.state.clanFields.length < 2) {
      return;
    }
    this.state.clanFields.pop();
    this.setState({ clanFields: this.state.clanFields });
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
              name={`Clan${idx}`}
              component={this.renderInput}
              label="Enter Clan Name"
            />
            <Field
              name={`Tag${idx}`}
              component={this.renderInput}
              label="Enter Clan Tag"
            />
          </div>
        </div>
      );
    });
  };
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    const theme = this.props.theme;
    return (
      <form
        className={`ui ${theme.mode} form`}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="field">
          <Field
            name="Name"
            component={this.renderInput}
            label="Enter Name for Clan Family"
          />
          <Field
            name="Description"
            component={this.renderInput}
            label="Enter Description"
            textarea={true}
          />
        </div>

        <div className="field">
          <h4>Add the Clans you wish to be part of your Alliance</h4>
          {this.renderClanInput(theme)}
          {this.renderClanError()}
          <div
            onClick={this.addNewClanField}
            className={`ui ${theme.mode} green button`}
          >
            <i className="plus icon"></i>
          </div>
          <button
            className={`ui ${theme.mode} red button`}
            onClick={(e) => this.deleteClanField(e)}
          >
            <i className="trash alternate icon"></i>
          </button>
        </div>
        <button className={`ui ${theme.mode} primary button`}>Create</button>
      </form>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.Name) {
    errors.Name = "You must enter a Name!";
  }
  if (formValues.Name && formValues.Name.length < 6) {
    errors.Name = "Name must be 6 or more characters";
  }
  if (!formValues.Description) {
    errors.Description = "You must enter a Description!";
  }
  /*
  const formKeys = Object.keys(formValues);
  const clanKeys = formKeys.filter((item) => item.includes("Clan"));
  const tagKeys = formKeys.filter((item) => item.includes("Tag"));
  */
  return errors;
};
export default reduxForm({ form: "createAlliance", validate })(
  CreateAllianceForm
);
