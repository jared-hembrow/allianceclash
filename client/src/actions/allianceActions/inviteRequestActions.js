// post an invitation to clan to join alliance to server

export const postClanInvite = (formValues) => async (dispatch) => {
  console.log("form", formValues);
  const response = await fetch("/user/alliance/invite-clan", {
    method: "POST",
    body: JSON.stringify(formValues),
  }).then((result) => result.json());
  console.log(response);
};
