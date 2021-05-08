// npm imports
import React from "react";
import { connect } from "react-redux";
// actions
import { searchRequest } from "../../actions/searchActions";
// component imports
import AllianceCard from "./AllianceCard";
import ClanCard from "./ClanCard";
import PlayerCard from "./PlayerCard";
import SearchForm from "./SearchForm";
class Search extends React.Component {
  state = {
    type: "",
  };
  onSubmit = (formValues) => {
    this.props.searchRequest(formValues.type, formValues.search);
    this.setState({ type: formValues.type });
  };
  renderSearchResults = (theme) => {
    const results = this.props.searchResults;
    const user = this.props.auth.isSignedIn ? this.props.auth : null;
    if (this.state.type.length > 0 && results.length < 1) {
      return <h3>No matchs found</h3>;
    }
    if (results.length < 1) {
      return null;
    }
    switch (this.state.type) {
      case "clan":
        return results.map((clan, idx) => (
          <ClanCard
            key={clan.name + idx}
            results={clan}
            user={user}
            theme={theme}
          />
        ));
      case "player":
        return results.map((player, idx) => (
          <PlayerCard
            key={player.name + idx}
            results={player}
            user={user}
            theme={theme}
          />
        ));
      default:
        return null;
    }
  };
  render() {
    const theme = this.props.auth.settings ? this.props.auth.settings : "";
    return (
      <div className={`ui ${theme.mode} segment`}>
        <SearchForm theme={theme} onSubmit={this.onSubmit} />
        <div style={{ margin: "1rem" }}>{this.renderSearchResults(theme)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    searchResults: state.searchResults,
  };
};

export default connect(mapStateToProps, { searchRequest })(Search);
