import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search";

class App extends Component {
  render() {
    const { fetching, classes, error } = this.props;
    return (
      <div className="App">
        {classes}
        {fetching ? null : <Search />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    classes: state.classes,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
