import React, { Component } from "react";
import { connect } from "react-redux";
import Search from "./Search";
import Spinner from "./Spinner";
import Filter from "./Filter";
import FilterBar from "./FilterBar";
import VisibleClassList from "../containers/VisibleClassList.js";
import { HotKeys } from "react-hotkeys";
import styles from "./App.css";
import { toggleFilterBar } from "../actions/actions.js";

// TODO: Handle no classes and have some text
class App extends Component {
  render() {
    const map = {
      openFilters: "space+/"
    };
    const handlers = {
      openFilters: this.props.searchKeyPressed
    };
    const { fetching, classes, error } = this.props.classes;
    return (
      <div className="App">
        <Search />
        <div className={styles.classesContainer}>
          {fetching ? <Spinner /> : null}
          <HotKeys keyMap={map} handlers={handlers}>
            <VisibleClassList />
            {classes.length > 0 ? <Filter /> : null}
            <FilterBar />
          </HotKeys>
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
