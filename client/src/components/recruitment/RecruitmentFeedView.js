// npm imports
import React from "react";
import { connect } from "react-redux";
// actions
import { fetchRecruitmentPosts } from "../../actions/recruitmentActions";
// import components
import ClanLookingMembers from "./ClanLookingMembers";
import AllianceLookingClans from "./AllianceLookingClans";
import AllianceLookingPlayers from "./AllianceLookingPlayers";
import ClanLookingAlliance from "./ClanLookingAlliance";
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
  selectType = (type) => {
    switch (type) {
      case "Clan looking for members":
        return this.props.recruitmentPosts.clanLookingForMembers;
      case "Alliance looking for clans":
        return this.props.recruitmentPosts.allianceLookingForClans;
      case "Alliance looking for Players":
        return this.props.recruitmentPosts.allianceLookingForPlayers;
      case "Clan looking to join Alliance":
        return this.props.recruitmentPosts.clanLookingToJoinAlliance;
      case "Player looking to join Clan or Alliance":
        return this.props.recruitmentPosts.playerLookingToJoinClanOrAlliance;
      default:
        return null;
    }
  };
  renderPosts = (theme, type) => {
    const postList = this.selectType(type);
    if (postList === null) {
      return <NoPosts theme={theme} />;
    }
    switch (type) {
      case "Clan looking for members":
        return <ClanLookingMembers postList={postList} theme={theme} />;
      case "Alliance looking for clans":
        return <AllianceLookingClans postList={postList} theme={theme} />;
      case "Alliance looking for Players":
        return <AllianceLookingPlayers postList={postList} theme={theme} />;
      case "Clan looking to join Alliance":
        return <ClanLookingAlliance postList={postList} theme={theme} />;
      case "Player looking to join Clan or Alliance":
        return <PlayerLooking postList={postList} theme={theme} />;
      default:
        return null;
    }
  };
  render() {
    const theme = this.props.theme;
    const type = this.props.type;
    return <div className={`ui ${theme}`}>{this.renderPosts(theme, type)}</div>;
  }
}
// map redux store to component props

const mapStateToProps = (state) => {
  return {
    user: state.user,
    recruitmentPosts: state.recruitmentPosts,
  };
};
// export component
export default connect(mapStateToProps, { fetchRecruitmentPosts })(
  RecruitmentFeedView
);
