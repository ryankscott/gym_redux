import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search";
import Spinner from "./Spinner";
import FilterButton from "./FilterButton";
import FilterBar from "./FilterBar";
import VisibleClassList from "../containers/VisibleClassList.js";
import styles from "./App.css";
import { toggleFilterBar } from "../actions/actions.js";

// TODO: Handle no classes and have some text
class App extends Component {
  render() {
    const { fetching, classes, error } = this.props.classes;
    return (
      <div className={styles.appContainer}>
        <div className={styles.searchContainer}>
          <FilterButton />
          <Search />
        </div>
        <div className={styles.classesContainer}>
          {fetching ? <Spinner /> : null}
          <VisibleClassList />
          <FilterBar className={styles.filterBar} />
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
    searchKeyPressed: () => {
      dispatch(toggleFilterBar());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
