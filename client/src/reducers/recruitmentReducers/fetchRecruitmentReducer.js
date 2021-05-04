import {
  FETCH_RECRUITMENT_POSTS_CLAN_MEMBERS,
  FETCH_RECRUITMENT_POSTS_ALLIANCE_CLANS,
  FETCH_RECRUITMENT_POSTS_ALLIANCE_PLAYERS,
  FETCH_RECRUITMENT_POSTS_CLAN_ALLIANCE,
  FETCH_RECRUITMENT_POSTS_PLAYER_CLAN_ALLIANCE,
} from "../../actions/recruitmentActions";

export const fetchRecruitmentPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_RECRUITMENT_POSTS_CLAN_MEMBERS:
      return { ...state, clanLookingForMembers: action.payload };
    case FETCH_RECRUITMENT_POSTS_ALLIANCE_CLANS:
      return { ...state, allianceLookingForClans: action.payload };
    case FETCH_RECRUITMENT_POSTS_ALLIANCE_PLAYERS:
      return { ...state, allianceLookingForPlayers: action.payload };
    case FETCH_RECRUITMENT_POSTS_CLAN_ALLIANCE:
      return { ...state, clanLookingToJoinAlliance: action.payload };
    case FETCH_RECRUITMENT_POSTS_PLAYER_CLAN_ALLIANCE:
      return { ...state, playerLookingToJoinClanOrAlliance: action.payload };
    default:
      return state;
  }
};
