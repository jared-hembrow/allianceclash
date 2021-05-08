// npm imports
import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
// action imports
import {
  checkRecruitmentPost,
  clearRecruitmentCheck,
  fetchUserClans,
} from "../../../actions/recruitmentActions";
// function imports
import { compareOneDay } from "../../../functions/compareTime";
//import component
import Loader from "../../Loader";
import ManagePost from "./ManagePost";
// class component
class ClanPostForm extends React.Component {
  state = {
    title: "",
    recruitmentPost: "",
  };
  componentDidMount() {
    this.props.checkRecruitmentPost(
      this.props.user.userDetails.id,
      this.props.type
    );
  }
  componentWillUnmount() {
    this.props.clearRecruitmentCheck();
  }
  onSubmit = (formValues) => {
    const form = formValues;
    // if hero & townhall level requirements on form then set default values if unentered
    if (this.props.checkRecruitmentPost.status === "existing post") {
      if (!compareOneDay(this.props.checkRecruitmentPost.post.datePosted)) {
        return;
      }
    }
    if (this.props.heroLevels) {
      if (!formValues.townhallRequirement) {
        form.townhallRequirement = 3;
      }
      if (!formValues.BarbarianKingLevelRequirements) {
        form.BarbarianKingLevelRequirements = 0;
      }
      if (!formValues.ArcherQueenLevelRequirements) {
        form.ArcherQueenLevelRequirements = 0;
      }

      if (!formValues.GrandWardenLevelRequirements) {
        form.GrandWardenLevelRequirements = 0;
      }
      if (!formValues.RoyalChampionLevelRequirements) {
        form.RoyalChampionLevelRequirements = 0;
      }
    }
    // if looking is set to true
    if (this.props.looking) {
      if (!formValues.looking) {
        form.looking = "Both";
      }
    }
    if (this.props.clanLevels) {
      if (!formValues.clanLevelRequirement) {
        form.clanLevelRequirement = 1;
      }
    }
    if (!formValues.title) {
      return;
    }

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
  // render all townhall levels as options
  renderTownhallRequirements = (itemsArray) => {
    return itemsArray.map((item) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
  };
  // render all hero level fields as number input fields with max values as hero in-game max levels
  renderInputHeroRequirements = ({ maxLevel, input, label, meta }) => {
    const className = `ui ${meta.error && meta.touched ? "red message" : ""}`;
    return (
      <div>
        <label>{label}</label>
        <input type="number" {...input} min="0" max={maxLevel} />
        <div className={className}>{this.renderError(meta)}</div>
      </div>
    );
  };
  // render hero level requirements as a Field element
  createName = (heroName) => {
    const lowerFirstChar = heroName.charAt(0).toLowerCase() + heroName.slice(1);
    return lowerFirstChar.replace(" ", "") + "Requirement";
  };
  renderHeroRequirements = (levels) => {
    return levels.map((hero) => {
      return (
        <Field
          name={this.createName(hero.name)}
          key={hero.name}
          component={this.renderInputHeroRequirements}
          label={hero.name}
          maxLevel={hero.maxLevel}
        />
      );
    });
  };
  // render optional input fields from this.props.optionalFields pass in from parent component
  renderOptionalFields = (fields) => {
    return fields.map((field) => {
      return (
        <Field
          key={field.name}
          name={field.name}
          component={this.renderInput}
          label={field.label}
          textarea={false}
        />
      );
    });
  };
  // render what clan level requirement is in a number input element
  renderClanLevelField = ({ input, label, meta }) => {
    const className = `ui ${meta.error && meta.touched ? "red message" : ""}`;
    return (
      <div>
        <label>{label}</label>
        <input type="number" {...input} />
        <div className={className}>{this.renderError(meta)}</div>
      </div>
    );
  };
  // render options list for what you are looking for select Field
  renderLooking = (list) => {
    return list.map((option) => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });
  };
  // main render function
  render() {
    if (!this.props.theme) {
      return null;
    }
    if (!this.props.recruitmentPostCheck.status) {
      return <Loader />;
    }
    const theme = this.props.theme.mode;
    return (
      <form
        className={`ui ${theme} form`}
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        {this.props.recruitmentPostCheck.status === "existing post" ? (
          <ManagePost status={this.props.recruitmentPostCheck} />
        ) : null}
        {/* default fields */}
        <div className="field">
          <Field name="title" component={this.renderInput} label="Title" />
          <Field
            name="recruitmentPost"
            component={this.renderInput}
            label="Recruitment Post"
            textarea={true}
          />
          {/* optional fields */}
          <div className="field">
            {this.renderOptionalFields(this.props.optionalFields)}
          </div>
        </div>
        {/* render if townhallLevels is set to true */}
        {this.props.townhallLevels ? (
          <div className="field">
            <label>Enter minimum townhall requirements</label>
            <Field name="townhallRequirement" component="select">
              <option value="" disabled>
                Choose TH level
              </option>
              {this.renderTownhallRequirements(thLevels)}
            </Field>
          </div>
        ) : null}
        {/* render hero levels requirements if heroLevels set to true */}
        {this.props.heroLevels ? (
          <div className="field">
            <label>
              <h3>Enter hero requirements (if left blank default will be 0)</h3>
            </label>
            {this.renderHeroRequirements(heroLevels)}
          </div>
        ) : null}
        {/* render clan levels field if set to true */}
        {this.props.clanLevels ? (
          <div className="field">
            <Field
              name="clanLevelRequirement"
              component={this.renderClanLevelField}
              label="Enter required clan level"
            />
          </div>
        ) : null}
        {this.props.looking ? (
          <div className="field">
            <label>are you looking for a Clan, Alliance or Both</label>
            <Field name="looking" component="select">
              <option value="" disabled>
                select what you are looking for
              </option>
              {this.renderLooking(["Clan", "Alliance", "Both"])}
            </Field>
          </div>
        ) : null}

        <button className={`ui ${theme} primary button`}>Submit</button>
      </form>
    );
  }
}
// function to validate input fields
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a Title!";
  }
  if (formValues.title && formValues.title.length < 6) {
    errors.title = "Title must be 6 or more characters";
  }
  if (!formValues.recruitmentPost) {
    errors.recruitmentPost = "You must enter a Description!";
  }
  if (!formValues.clanName) {
    errors.clanName = "You must enter a Clan Name!";
  }
  if (!formValues.clanTag) {
    errors.clanTag = "You must enter a Clan Tag!";
  }
  if (!formValues.playerName) {
    errors.playerName = "You must enter a player Name!";
  }
  if (!formValues.playerTag) {
    errors.playerTag = "You must enter a player Tag!";
  }
  return errors;
};

// current town hall levels
const thLevels = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
// current hero levels
const heroLevels = [
  {
    name: "Barbarian King",
    maxLevel: 75,
  },
  {
    name: "Archer Queen",
    maxLevel: 75,
  },
  {
    name: "Grand Warden",
    maxLevel: 50,
  },
  {
    name: "Royal Champion",
    maxLevel: 25,
  },
];
// map redux store to component props
const mapStateToProps = (state) => {
  return {
    recruitmentPostCheck: state.recruitmentPostCheck,
    initialValues: state.recruitmentPostCheck.post,
  };
};
// export component
ClanPostForm = reduxForm({
  form: "createRecruitPost",
  enableReinitialize: true,
  validate,
})(ClanPostForm);
ClanPostForm = connect(mapStateToProps, {
  checkRecruitmentPost,
  clearRecruitmentCheck,
  fetchUserClans,
})(ClanPostForm);
export default ClanPostForm;
