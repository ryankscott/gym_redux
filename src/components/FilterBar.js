import React, { Component } from "react";
import styles from "./FilterBar.css";
import { connect } from "react-redux";
import classNames from "classnames";
import Select from "react-select";
import "react-select/dist/react-select.css";
import moment from "moment";

import { gyms, classes } from "../consts.js";
import { updateGymFilters, updateClassFilters } from "../actions/actions.js";

// TODO: Fix styling when closing
class FilterBar extends Component {
  render() {
    return (
      <div
        className={classNames({
          [styles.container]: true,
          [styles.hidden]: !this.props.visible
        })}
      >
        <div className={styles.title}>Filters </div>
        <div
          className={classNames({
            [styles.filterGroup]: true
          })}
        >
          <div className={styles.filterTitle}> Gym: </div>
          <Select
            name="gym-select"
            options={gyms}
            onChange={this.props.onGymFilterChange}
            value={this.props.gymFilter}
            multi
            menuStyle={{ backgroundColor: "#EEEEEE" }}
            className={styles.select}
            optionClassName={styles.selectOption}
          />
        </div>

        <div
          className={classNames({
            [styles.filterGroup]: true
          })}
        >
          <div className={styles.filterTitle}> Classes: </div>
          <Select
            name="class-select"
            options={classes}
            onChange={this.props.onClassFilterChange}
            value={this.props.classFilter}
            multi
            menuStyle={{ backgroundColor: "#EEEEEE" }}
            optionClassName={styles.selectOption}
          />
        </div>
        <div
          className={classNames({
            [styles.filterGroup]: true
          })}
        >
          <div className={styles.filterTitle}> Dates: </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    visible: state.filters.filterBarVisible,
    gymFilter: state.filters.filters.Gym,
    classFilter: state.filters.filters.Class
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGymFilterChange: selection => {
      dispatch(updateGymFilters(selection));
    },
    onClassFilterChange: selection => {
      dispatch(updateClassFilters(selection));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
