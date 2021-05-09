import React from "react";
import { connect } from "react-redux";
import { fetchMissedAttackList } from "../../../actions/clanActions";
import AddMissedAttack from "./AddMissedAttack";
class MissedAttackList extends React.Component {
  componentDidMount() {
    this.props.fetchMissedAttackList(this.props.profile.details.id);
  }
  renderAddEntry = (theme, profile, user) => {
    let leaders = [];
    for (let i = 0; i < user.accounts.length; i++) {
      if (
        (profile.details.tag === user.accounts[i].clan_tag &&
          user.accounts[i].role === "coLeader") ||
        (profile.details.tag === user.accounts[i].clan_tag &&
          user.accounts[i].role === "leader")
      ) {
        leaders.push(user.accounts[i]);
      }
    }
    console.log(leaders);
    if (leaders.length < 1) {
      return null;
    } else {
      return (
        <div className={`ui ${theme.mode} segment`}>
          <AddMissedAttack
            user={user}
            leader={leaders}
            theme={theme}
            profile={profile}
          />
        </div>
      );
    }
  };
  renderList = () => {
    return this.props.list.map((attack) => {
      return <div>{attack.name}</div>;
    });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        {this.renderAddEntry(
          this.props.theme,
          this.props.profile,
          this.props.user
        )}
        <div>{this.renderList()}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    list: state.missedAttacksList,
  };
};
export default connect(mapStateToProps, { fetchMissedAttackList })(
  MissedAttackList
);
