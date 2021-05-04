// npm imports
import React from "react";

// class component
class MemberList extends React.Component {
  renderMemberList = (theme, members, fontColor) => {
    console.log(theme);
    let memberCount = 0;
    const memberList = members.map((member) => {
      memberCount = memberCount + 1;
      let role = "";
      if (member.role === "coLeader") {
        role = "Co-Leader";
      } else if (member.role === "member") {
        role = "Member";
      } else if (member.role === "admin") {
        role = "Elder";
      } else {
        role = "Leader";
      }
      return (
        <tr style={{ color: fontColor }} key={member.name + member.tag}>
          <td>{memberCount}</td>
          <td>
            <h4 className={`ui ${theme} image header`}>
              <img
                alt={member.league.name}
                src={
                  member.league.name === "Unranked"
                    ? `/static/images/coc/${member.league.name}.png`
                    : member.league.iconUrls.medium
                }
                className="ui mini rounded image"
              />
              <div className="content">
                {member.name}
                <div className="sub header">{member.tag}</div>
              </div>
            </h4>
          </td>
          {this.props.type === "alliance" ? <td>{member.clanName}</td> : null}
          <td>{role}</td>
          <td>
            <h4 className={`ui ${theme} header`}>
              <img
                alt="trophy"
                src="/static/images/coc/trophy.png"
                className="ui avatar image"
              />
              {member.trophies}
            </h4>
          </td>
          <td>
            <h4 className={`ui ${theme} header`}>
              <img
                alt="axes"
                src="/static/images/coc/Axes.png"
                className="ui avatar image"
              />
              {member.versusTrophies}
            </h4>
          </td>
          <td>{member.donations}</td>
          <td>{member.donationsReceived}</td>
        </tr>
      );
    });
    return memberList;
  };
  render() {
    const theme = this.props.theme;
    console.log("list", theme);
    const fontColor = `${theme === "inverted" ? "white" : "black"}`;
    return (
      <table className={`ui very basic collapsing celled table`}>
        <thead>
          <tr>
            <th></th>
            <th style={{ color: `${fontColor}` }}>Members</th>
            <th style={{ color: `${fontColor}` }}>Role</th>
            <th style={{ color: `${fontColor}` }}>Trophies</th>
            <th style={{ color: `${fontColor}` }}>Versus Trophies</th>
            <th style={{ color: `${fontColor}` }}>Donations</th>
            <th style={{ color: `${fontColor}` }}>Recieved</th>
          </tr>
        </thead>
        <tbody>
          {this.renderMemberList(theme, this.props.members, fontColor)}
        </tbody>
      </table>
    );
  }
}

export default MemberList;
