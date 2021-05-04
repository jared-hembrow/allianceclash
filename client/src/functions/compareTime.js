export const compareOneDay = (time) => {
  const postTime = new Date(time);
  postTime.setDate(postTime.getDate() + 1);
  const currentTime = new Date();
  return postTime < currentTime;
};
