import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import ButtonGroup from './ButtonGroup.js';
import Button from './Button.js';
import SavedFilterList from './SavedFilterList.js';
import { format, addDays } from 'date-fns';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../theme.js';
// TODO: move more to styled components

import { gyms, classes } from '../consts.js';
import {
  updateGymFilters,
  updateClassFilters,
  updateDateFilters,
  updateTimeFilters,
  toggleFilterBar,
  clearAllFilters,
  saveFilters,
} from '../actions/actions.js';

const hourOptions = {
  Morning: '5,6,7,8,9,10',
  Lunch: '11,12',
  Afternoon: '13,14,15,16',
  Evening: '7,18,19,20,21',
};

const generateDateOptions = () => {
  let dateOptions = {};
  for (let index = 0; index < 7; index++) {
    const currentDate = addDays(new Date(), index);
    dateOptions[format(currentDate, 'EEEEEE')] = format(currentDate, 'i');
  }
  return dateOptions;
};

const dateOptions = generateDateOptions();

const selectStyles = {
  valueContainer: styles => ({
    ...styles,
    padding: '2px 8px',
    ':hover': {},
    ':selected': {},
  }),
  clearIndicator: styles => ({
    ...styles,
    padding: '2px',
  }),
  dropdownIndicator: styles => ({
    ...styles,
    padding: '2px 8px 2px 2px',
  }),
  control: (styles, { isDisabled, isFocused }) => ({
    ...styles,
    boxShadow: 'none',
    borderColor: 'black',
    ':hover': { border: '1px solid black' },
  }),
  option: styles => ({
    ...styles,
    backgroundColor: '#FFF',
    ':hover': { backgroundColor: '#85cafe', color: '#FFF' },
  }),
  menu: styles => ({ ...styles, marginTop: '2px' }),
  indicatorSeparator: styles => ({ ...styles, display: 'none' }),
  multiValueLabel: styles => ({
    ...styles,
    color: '#FFFFFF',
  }),
  multiValue: styles => ({
    ...styles,
    backgroundColor: '#35a7ff',
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: '#FFFFFF',
    ':hover': {},
  }),
};

const ActionButtonGroup = styled.div`
  margin: 5px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 5px;
  * {
    margin-left: 5px;
  }
`;

const SaveFilterGroup = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  padding: 5px 5px;
  align-items: center;
  justify-content: space-between;
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
  font-weight: 300;
  font-size: 24px;
  margin: 20px 5px 30px 5px;
`;

const FilterSectionTitle = styled.h2`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.backgroundColour};
  font-weight: 300;
  font-size: 18px;
  margin: 10px 0px;
`;

const FilterGroupTitle = styled.h3`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.backgroundColour};
  font-weight: 300;
  font-size: 16px;
  margin: 5px 0px;
`;

const FilterNameInput = styled.input`
  height: 15px;
  width: 100%;
  margin: 0px 5px 0px 10px;
  font-family: ${props => props.theme.font};
  font-weight: 300;
  font-size: 14px;
  padding: 5px;
  :focus {
    outline-width: 0;
  }
  border-style: solid;
  border-radius: 5px;
  border: none;
`;
const Container = styled.div`
  position: fixed;
  left: ${props => (props.visible ? '0px' : '-330px')};
  top: 0px;
  opacity: 1;
  width: 325px;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-family: ${props => props.theme.font};
  background-color: ${props => props.theme.fontColour};
  font-weight: 300;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: left 0.3s ease-out;
  box-shadow: 5px 0px 2px 0px ${props => props.theme.fontColour};
`;

const Cover = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: ${props => (props.visible ? '0px' : '-100%')};
  width: 100%;
  background: #{props => props.theme.borderColour};
  filter: blur(5px);
  transition: left 0.3s ease-out;
  transition: opacity 0.2s ease-out;
`;

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.onSaveButtonPress = this.onSaveButtonPress.bind(this);
  }
  handleNameChange(event) {
    this.setState({ value: event.target.value });
  }

  onSaveButtonPress() {
    this.setState({ value: '' });
    this.props.onSaveFilters(this.state.value);
  }

  render() {
    const { visible } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Cover visible={visible} onClick={this.props.onClickOutside} />
          <Container visible={visible}>
            <FilterTitle>Filters</FilterTitle>
            <FilterSectionTitle> Saved Filters </FilterSectionTitle>
            <SavedFilterList />
            <FilterSectionTitle> Custom Filters </FilterSectionTitle>
            <SaveFilterGroup>
              <FilterGroupTitle> Name: </FilterGroupTitle>
              <FilterNameInput onChange={this.handleNameChange} value={this.state.value} />
              <Button onClick={this.onSaveButtonPress} width={'55px'} height={'25px'} text="Save" />
            </SaveFilterGroup>
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
              <Button onClick={this.props.onClearAllFilters} text="Clear" />
            </ActionButtonGroup>
          </Container>
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
    savedFilters: state.filters.savedFilters,
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
    onSaveFilters: name => {
      dispatch(saveFilters(name));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
