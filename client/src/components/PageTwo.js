import React from "react";
import history from "../History";

class PageTwo extends React.Component {
  render() {
    return (
      <div>
        Second page
        <button onClick={() => history.push("/page")}>page2</button>
      </div>
    );
  }
}
export default PageTwo;
