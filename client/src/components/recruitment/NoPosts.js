// npm imports
import React from "react";
// component
const NoPosts = (props) => {
  const theme = props.theme;
  return (
    <div className={`ui ${theme} segment`}>
      <h2>Currently no posts</h2>
    </div>
  );
};
// export component
export default NoPosts;
