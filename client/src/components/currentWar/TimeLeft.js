import React from "react";
// actions
import { parseTime, parseDifference } from "../../functions/time";

class TimeLeft extends React.Component {
  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    intervalId: null,
    warState: "",
  };
  componentDidMount() {
    if (!this.props.data) {
      return null;
    }
    this.countDown();
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  countDown = () => {
    let id = setInterval(this.setTime, 1000);
    this.setState({ intervalId: id });
  };

  setTime = () => {
    if (this.props.data.state === "notInWar") {
      return;
    }
    const currentTime = Date.now();
    // need to fix this part --
    let timeString = "";
    if (this.props.data.hasOwnProperty("endTime")) {
      timeString = this.props.data.endTime;
    } else if (this.props.data.hasOwnProperty("end_time")) {
      timeString = this.props.data.end_time;
    }
    const end = parseTime(timeString);
    const endTime = new Date(end);
    const timeLeft = parseDifference(currentTime, endTime);
    if (timeLeft.hasOwnProperty("end")) {
      this.setState({ warState: "War Ended" });
      return;
    }
    const hoursLeft = parseInt(timeLeft.hours / 60);
    const minutesLeft = timeLeft.hours % 60;
    const secondsLeft = timeLeft.seconds % 60;

    this.setState({
      hours: hoursLeft,
      minutes: minutesLeft,
      seconds: secondsLeft,
    });
  };
  renderTimeDisplay = (num) => {
    if (num < 10) {
      return "0" + num.toString();
    } else {
      return num;
    }
  };
  render() {
    if (!this.props.data) {
      return null;
    }
    if (this.props.data.state === "notInWar") {
      return (
        <div className=" ui segment">
          <h3>Not in War</h3>
        </div>
      );
    }
    if (this.state.warState === "War Ended") {
      clearInterval(this.state.intervalId);
      return (
        <div className=" ui  inverted segment">
          <h3>War Has Ended</h3>
        </div>
      );
    }
    return (
      <div className={`ui ${this.props.theme} segment`}>
        <h4>Time Remaining </h4>
        {this.renderTimeDisplay(this.state.hours) +
          ":" +
          this.renderTimeDisplay(this.state.minutes) +
          ":" +
          this.renderTimeDisplay(this.state.seconds)}
      </div>
    );
  }
}

export default TimeLeft;
