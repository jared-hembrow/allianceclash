import React from "react";
import history from "../History";

class Page extends React.Component {
  render() {
    return (
      <div>
        page
        <button onClick={() => history.push("/page2")}>page</button>
      </div>
    );
  }
}
export default Page;
