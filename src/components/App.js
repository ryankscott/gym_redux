import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search";
import ClassList from "./ClassList";
import Spinner from "./Spinner";
import Filter from "./Filter";
import FilterBar from "./FilterBar";
import styles from "./App.css";

class App extends Component {
  render() {
    const { fetching, classes, error } = this.props.classes;
    return (
      <div className="App">
        <Search />
        <div className={styles.classesContainer}>
          {fetching ? <Spinner /> : null}
          <ClassList classes={classes} />
          {classes.length > 0 ? <Filter /> : null}
          <FilterBar />
        </div>
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
