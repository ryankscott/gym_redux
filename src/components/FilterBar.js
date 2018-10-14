import React, { Component } from "react";
import styles from "./FilterBar.css";
import { connect } from "react-redux";
import classNames from "classnames";
import Select from "react-select";
import ButtonGroup from "./ButtonGroup.js";
import Button from "./Button.js";
import SavedFilterList from "./SavedFilterList.js";
import { format, addDays, parse, startOfDay, endOfDay } from "date-fns";
import styled, { ThemeProvider } from "styled-components";
import theme from "../theme.js";
// TODO: move more to styled components

import { gyms, classes } from "../consts.js";
import {
  updateGymFilters,
  updateClassFilters,
  updateDateFilters,
  updateTimeFilters,
  toggleFilterBar,
  clearAllFilters,
  saveFilters,
  getClasses
} from "../actions/actions.js";

const hourOptions = [
  {
    label: "Morning",
    value: {
      hours: "5,6,7,8,9,10",
      period: "morning"
    }
  },
  {
    label: "Lunch",
    value: {
      hours: "11,12",
      period: "lunch"
    }
  },
  {
    label: "Afternoon",
    value: {
      hours: "13,14,15,16",
      period: "afternoon"
    }
  },
  {
    label: "Evening",
    value: {
      hours: "17,18,19,20,21",
      period: "evening"
    }
  }
];

const dateOptions = [
  {
    label: format(new Date(), "EEEEEE"),
    value: {
      dayOfweek: format(new Date(), "i"),
      date: format(new Date(), "YYYY-MM-dd")
    }
  },
  {
    label: format(addDays(new Date(), 1), "EEEEEE"),
    value: {
      dayOfweek: format(addDays(new Date(), 1), "i"),
      date: format(addDays(new Date(), 1), "YYYY-MM-dd")
    }
  },
  {
    label: format(addDays(new Date(), 2), "EEEEEE"),
    value: {
      dayOfweek: format(addDays(new Date(), 2), "i"),
      date: format(addDays(new Date(), 2), "YYYY-MM-dd")
    }
  },
  {
    label: format(addDays(new Date(), 3), "EEEEEE"),
    value: {
      dayOfweek: format(addDays(new Date(), 3), "i"),
      date: format(addDays(new Date(), 3), "YYYY-MM-dd")
    }
  },
  {
    label: format(addDays(new Date(), 4), "EEEEEE"),
    value: {
      dayOfweek: format(addDays(new Date(), 4), "i"),
      date: format(addDays(new Date(), 4), "YYYY-MM-dd")
    }
  },
  {
    label: format(addDays(new Date(), 5), "EEEEEE"),
    value: {
      dayOfweek: format(addDays(new Date(), 5), "i"),
      date: format(addDays(new Date(), 5), "YYYY-MM-dd")
    }
  },
  {
    label: format(addDays(new Date(), 6), "EEEEEE"),
    value: {
      dayOfweek: format(addDays(new Date(), 6), "i"),
      date: format(addDays(new Date(), 6), "YYYY-MM-dd")
    }
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

const ActionButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 5px;
  * {
    margin-left: 5px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  font-size: 14px;
  height: 55px;
`;

const FilterTitle = styled.h1`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.backgroundColour};
  font-weight: 100;
  font-size: 24px;
  margin: 20px 5px 30px 5px;
`;

const FilterSectionTitle = styled.h2`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.backgroundColour};
  font-weight: 100;
  font-size: 18px;
  margin: 10px 0px;
`;

const FilterGroupTitle = styled.h3`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.backgroundColour};
  font-weight: 100;
  font-size: 16px;
  margin: 5px 0px;
`;

class FilterBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { visible } = this.props;
    return (
      <ThemeProvider theme={theme}>
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
            <FilterTitle>Filters</FilterTitle>
            <FilterSectionTitle> Saved Filters </FilterSectionTitle>
            <SavedFilterList filters={this.props.savedFilters} />
            <FilterSectionTitle> Custom Filters </FilterSectionTitle>
            <FilterGroup>
              <FilterGroupTitle> Gym: </FilterGroupTitle>
              <Select
                name="gym-select"
                options={gyms}
                onChange={this.props.onGymFilterChange}
                value={this.props.gymFilter}
                isMulti
                styles={selectStyles}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterGroupTitle> Classes: </FilterGroupTitle>
              <Select
                name="class-select"
                options={classes}
                onChange={this.props.onClassFilterChange}
                value={this.props.classFilter}
                isMulti
                styles={selectStyles}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterGroupTitle> Day: </FilterGroupTitle>
              <ButtonGroup
                selectedValue={this.props.dateFilter}
                options={dateOptions}
                onChange={this.props.onDateFilterChange}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterGroupTitle> Time: </FilterGroupTitle>
              <ButtonGroup
                selectedValue={this.props.timeFilter}
                options={hourOptions}
                onChange={this.props.onTimeFilterChange}
              />
            </FilterGroup>
            <ActionButtonGroup>
              <Button onClick={this.props.onClearAllFilters} text="Clear all" />
              <Button onClick={this.props.onSaveFilters} text="Save filters" />
            </ActionButtonGroup>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    visible: state.UI.filterBarVisible,
    gymFilter: state.filters.gym,
    classFilter: state.filters.class,
    dateFilter: state.filters.date,
    timeFilter: state.filters.time,
    savedFilters: state.filters.savedFilters
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
    onTimeFilterChange: selection => {
      dispatch(updateTimeFilters(selection));
    },
    onClickOutside: () => {
      dispatch(toggleFilterBar());
    },
    onClearAllFilters: () => {
      dispatch(clearAllFilters());
    },
    onSaveFilters: () => {
      dispatch(saveFilters());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
