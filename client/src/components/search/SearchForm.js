// npm imports
import React from "react";
// imports for redux form
import { Field, reduxForm } from "redux-form";

// component
class SearchForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div>
          <div>{error}</div>
        </div>
      );
    }
  }
  renderInput = ({ input, meta }) => {
    const className = `ui ${meta.error && meta.touched ? "red message" : ""}`;
    return (
      <div>
        <div className="ui right aligned category search">
          <div className="ui icon input">
            <input
              {...input}
              className="prompt"
              type="text"
              placeholder="Search..."
            />
            <i className="search icon"></i>
          </div>
        </div>
        <div className={className}>{this.renderError(meta)}</div>
      </div>
    );
  };

  onSubmit = (formValues) => {
    const form = formValues;
    if (!formValues.type) {
      form.type = "alliance";
    }
    console.log(form);
    this.props.onSubmit(form);
  };

  render() {
    const theme = this.props.theme;
    return (
      <form
        className="ui form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="ui grid">
          <div className="three column row">
            <div className="column">
              <Field name="search" component={this.renderInput} />
            </div>
            <div className="column">
              <Field name="type" component="select">
                <option value="alliance">Alliance</option>
                <option value="clan">Clan</option>
                <option value="player">Player</option>
              </Field>
            </div>
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
  if (!formValues.search) {
    errors.search = "You must enter a Name to search";
  }
  return errors;
};
// export form component with redux form linked in and validator for fields
export default reduxForm({
  form: "searchForm",
  validate,
})(SearchForm);
