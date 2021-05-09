import React from "react";
import { connect } from "react-redux";
import { addMissedAttackEntry } from "../../../actions/clanActions";
import AddMissedAttackForm from "./AddMissedAttackForm";
class AddMissedAttack extends React.Component {
  onSubmit = (formValues) => {
    console.log(formValues);
    this.props.addMissedAttackEntry({
      missedAttack: formValues,
      userId: this.props.user.userDetails.id,
      clanTag: this.props.profile.details.tag,
      clanId: this.props.profile.details.id,
    });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <AddMissedAttackForm
          theme={this.props.theme}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default connect(null, { addMissedAttackEntry })(AddMissedAttack);
