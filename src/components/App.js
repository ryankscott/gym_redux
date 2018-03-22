import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search";
import ClassList from "./ClassList";
import Spinner from "./Spinner";

class App extends Component {
  render() {
    const { fetching, classes, error } = this.props.classes;
    return (
      <div className="App">
        <Search />
        <ClassList classes={classes} />
        {fetching ? <Spinner /> : null}
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
