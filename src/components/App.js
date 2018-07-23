import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import FilterButton from "./FilterButton";
import FilterBar from "./FilterBar";
import ClassList from "./ClassList.js";
import styles from "./App.css";
import { toggleFilterBar, getClasses } from "../actions/actions.js";

// TODO: Handle no classes and have some text
class App extends Component {
  componentDidMount() {
    this.props.getAllClasses();
  }
  render() {
    const { fetching, classes, error } = this.props.classes;
    return (
      <div className={styles.appContainer}>
        <div className={styles.title}>
          <h1>Gym Timetable </h1>
        </div>
        <div className={styles.spinner}>{fetching ? <Spinner /> : null}</div>
        <div className={styles.classesContainer}>
          <FilterButton />
          <ClassList classes={classes} />
        </div>
        <div className={styles.filters}>
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
  return {
    getAllClasses: () => {
      dispatch(getClasses());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
