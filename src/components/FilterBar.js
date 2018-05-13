import React, { Component } from "react";
import styles from "./FilterBar.css";
import { connect } from "react-redux";
import classNames from "classnames";
import Select from "react-select";
import moment from "moment";
import DateButtonGroup from "./DateButtonGroup.js";

import { gyms, classes } from "../consts.js";
import {
  updateGymFilters,
  updateClassFilters,
  updateDateFilters,
  toggleFilterBar
} from "../actions/actions.js";

const dateOptions = [
  { label: "Today", value: moment() },
  { label: "Tomorrow", value: moment().add(1, "d") },
  { label: "Day After", value: moment().add(2, "d") }
];

const selectStyles = {
  valueContainer: styles => ({
    ...styles,
    padding: "2px 8px",
    ":hover": {},
    ":selected": {}
  }),
  clearIndicator: styles => ({
    ...styles,
    padding: "2px"
  }),
  dropdownIndicator: styles => ({
    ...styles,
    padding: "2px 8px 2px 2px"
  }),
  control: (styles, { isDisabled, isFocused }) => ({
    ...styles,
    borderColor: isDisabled ? null : isFocused ? null : null,
    ":hover": {
      borderColor: isDisabled ? null : isFocused ? null : null
    }
  }),
  option: styles => ({
    ...styles,
    backgroundColor: "#FFF",
    ":hover": { backgroundColor: "#DDD" }
  }),
  menu: styles => ({ ...styles, marginTop: "2px" }),
  indicatorSeparator: styles => ({ ...styles, display: "none" }),
  multiValueRemove: styles => ({
    ...styles,
    ":hover": {}
  })
};

class FilterBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div
          className={classNames({
            [styles.cover]: true,
            [styles.visible]: this.props.visible
          })}
          onClick={this.props.onClickOutside}
        />
        <div
          className={classNames({
            [styles.container]: true,
            [styles.visible]: this.props.visible
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
              isMulti
              styles={selectStyles}
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
              isMulti
              styles={selectStyles}
            />
          </div>
          <div
            className={classNames({
              [styles.filterGroup]: true
            })}
          >
            <div className={styles.filterTitle}> Dates: </div>
            <DateButtonGroup
              options={dateOptions}
              onChange={this.props.onDateFilterChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    visible: state.UI.filterBarVisible,
    gymFilter: state.filters.filters.Gym,
    classFilter: state.filters.filters.Class,
    beforeDateFilter: state.filters.filters.Before,
    afterDateFilter: state.filters.filters.After
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGymFilterChange: selection => {
      dispatch(updateGymFilters(selection));
    },
    onClassFilterChange: selection => {
      dispatch(updateClassFilters(selection));
    },
    onDateFilterChange: selection => {
      let beforeDate = moment(selection).endOf("day");
      let afterDate = moment(selection).startOf("day");
      dispatch(updateDateFilters(beforeDate, afterDate));
    },
    onClickOutside: () => {
      dispatch(toggleFilterBar());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
