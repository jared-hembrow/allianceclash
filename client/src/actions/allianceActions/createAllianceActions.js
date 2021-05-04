// import the history object
import history from "../../History";

// create alliance
// action types
export const CREATE_ALLIANCE_ERROR = "CREATE_ALLIANCE_ERROR";
export const CREATE_ALLIANCE_ERROR_NAME = "CREATE_ALLIANCE_ERROR_NAME";
export const CREATE_ALLIANCE_ERROR_CLAN_LINK =
  "CREATE_ALLIANCE_ERROR_CLAN_LINK";
export const CREATE_ALLIANCE_ERROR_CLAN_NONE =
  "CREATE_ALLIANCE_ERROR_CLAN_NONE";

// action function
export const createAlliance = (formValues, id) => async (dispatch) => {
  const formKeys = Object.keys(formValues);
  const clanKeys = formKeys.filter((item) => item.includes("Clan"));
  const tagKeys = formKeys.filter((item) => item.includes("Tag"));
  const allianceTag = createAllianceTag(formValues.Name, id);
  const formObject = {
    tag: allianceTag,
    name: formValues.Name,
    description: formValues.Description,
    leaderName: formValues.Leader,
    leaderTag: formValues.LeaderId,
    clan: [],
  };
  for (let i = 0; i < clanKeys.length; i++) {
    formObject.clan.push({
      name: formValues[clanKeys[i]],
      tag: formValues[tagKeys[i]],
    });
  }
  const response = await fetch(`/user/alliance/new?id=${id}`, {
    method: "POST",
    body: JSON.stringify(formObject),
  }).then((result) => result.json());
  switch (response.result) {
    case "success":
      return history.push("/home");
    case "name already exists":
      return dispatch({ type: CREATE_ALLIANCE_ERROR_NAME, payload: response });
    case "clans already linked to alliance":
      return dispatch({
        type: CREATE_ALLIANCE_ERROR_CLAN_LINK,
        payload: response,
      });
    case "clan does not exist":
      return dispatch({
        type: CREATE_ALLIANCE_ERROR_CLAN_NONE,
        payload: response,
      });
    default:
      return dispatch({
        type: CREATE_ALLIANCE_ERROR,
        payload: response,
      });
  }
};
// function to create alliance tag
const createAllianceTag = (allianceName, id) => {
  const nameArray = allianceName.split("").sort();
  let tag = "";
  for (let i = 0; i < nameArray.length; i++) {
    tag = tag + nameArray[i];
  }
  if (id.length > 5) {
    return tag + (id[0] + id[1]) + id[4] * id[2];
  } else {
    return tag + ((id[0] + 2) * 36 + 1);
  }
};
