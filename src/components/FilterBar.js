import React, { Component } from "react";
import styles from "./FilterBar.css";
import { connect } from "react-redux";
import classNames from "classnames";
import Select from "react-select";
import DateButtonGroup from "./DateButtonGroup.js";
import { format, addDays, parse, startOfDay, endOfDay } from "date-fns";

import { gyms, classes } from "../consts.js";
import {
  updateGymFilters,
  updateClassFilters,
  updateDateFilters,
  toggleFilterBar,
  getClasses
} from "../actions/actions.js";

const dateOptions = [
  {
    label: format(new Date(), "EEEEEE"),
    value: format(new Date(), "YYYY-MM-dd")
  },
  {
    label: format(addDays(new Date(), 1), "EEEEEE"),
    value: format(addDays(new Date(), 1), "YYYY-MM-dd")
  },
  {
    label: format(addDays(new Date(), 2), "EEEEEE"),
    value: format(addDays(new Date(), 2), "YYYY-MM-dd")
  },
  {
    label: format(addDays(new Date(), 3), "EEEEEE"),
    value: format(addDays(new Date(), 3), "YYYY-MM-dd")
  },
  {
    label: format(addDays(new Date(), 4), "EEEEEE"),
    value: format(addDays(new Date(), 4), "YYYY-MM-dd")
  },
  {
    label: format(addDays(new Date(), 5), "EEEEEE"),
    value: format(addDays(new Date(), 5), "YYYY-MM-dd")
  },
  {
    label: format(addDays(new Date(), 6), "EEEEEE"),
    value: format(addDays(new Date(), 6), "YYYY-MM-dd")
  }
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
    boxShadow: "none",
    borderColor: "black",
    ":hover": { border: "1px solid black" }
  }),
  option: styles => ({
    ...styles,
    backgroundColor: "#FFF",
    ":hover": { backgroundColor: "#85cafe", color: "#FFF" }
  }),
  menu: styles => ({ ...styles, marginTop: "2px" }),
  indicatorSeparator: styles => ({ ...styles, display: "none" }),
  multiValueLabel: styles => ({
    ...styles,
    color: "#FFFFFF"
  }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: "#35a7ff"
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: "#FFFFFF",
    ":hover": {}
  })
};

class FilterBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { visible } = this.props;
    return (
      <div>
        <div
          className={classNames({
            [styles.cover]: true,
            [styles.visible]: visible
          })}
          onClick={this.props.onClickOutside}
        />
        <div
          className={classNames({
            [styles.container]: true,
            [styles.visible]: visible
          })}
        >
          <div className={styles.title}>Filters</div>
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
            <div className={styles.filterTitle}> Day: </div>
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
    dateFilter: state.filters.filters.Date
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGymFilterChange: (selection, filters) => {
      dispatch(updateGymFilters(selection));
    },
    onClassFilterChange: selection => {
      dispatch(updateClassFilters(selection));
    },
    onDateFilterChange: selection => {
      dispatch(updateDateFilters(selection));
    },
    onClickOutside: () => {
      dispatch(toggleFilterBar());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
