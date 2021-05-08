// npm imports
import React from "react";
import { connect } from "react-redux";
// actions
import { fetchRecruitmentPosts } from "../../actions/recruitmentActions";
// import components
import ClanLookingMembers from "./ClanLookingMembers";

import PlayerLooking from "./PlayerLooking";
import NoPosts from "./NoPosts";

// component
class RecruitmentFeedView extends React.Component {
  state = {
    postType: "",
  };
  componentDidMount() {
    this.props.fetchRecruitmentPosts(this.props.type);
  }

  componentDidUpdate() {
    if (this.state.postType !== this.props.type) {
      this.props.fetchRecruitmentPosts(this.props.type);
      this.setState({ postType: this.props.type });
    }
  }

  renderPosts = (theme, type) => {
    const posts = this.props.recruitmentPosts;
    if (posts.length < 1) {
      return <NoPosts theme={theme} />;
    }
    switch (type) {
      case "Clan looking for members":
        return <ClanLookingMembers postList={posts} theme={theme} />;
      case "Player looking to join Clan":
        return <PlayerLooking postList={posts} theme={theme} />;
      default:
        return null;
    }
  };
  render() {
    return (
      <div className={`ui ${this.props.theme}`}>
        {this.renderPosts(this.props.theme, this.props.type)}
      </div>
    );
  }
}
// map redux store to component props

const mapStateToProps = (state) => {
  return {
    recruitmentPosts: state.recruitmentPosts,
  };
};
// export component
export default connect(mapStateToProps, { fetchRecruitmentPosts })(
  RecruitmentFeedView
);
