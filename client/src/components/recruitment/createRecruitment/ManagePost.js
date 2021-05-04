// npm imports
import React from "react";
// function imports
import { compareOneDay } from "../../../functions/compareTime";

class ManagePost extends React.Component {
  render() {
    return (
      <div>
        <h3 className="ui red message">
          Your have already created this kind of post <br />
          {compareOneDay(this.props.status.post.datePosted) ? (
            <p className="ui red message">
              If you submit this Recruitment post it will overwrite your
              original
            </p>
          ) : (
            <p className="ui red message">You can only post once per day</p>
          )}
        </h3>
      </div>
    );
  }
}
//export component
export default ManagePost;
