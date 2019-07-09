import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format, addDays } from 'date-fns';
import styled, { ThemeProvider } from 'styled-components';
import Select from 'react-select';

import ButtonGroup from './ButtonGroup.js';
import Button from './Button.js';
import SavedFilterList from './SavedFilterList.js';
import { theme, selectStyles } from '../theme.js';
import { device } from '../devices.js';

import { gyms, classes, hourOptions } from '../consts.js';
import {
  updateGymFilters,
  updateClassFilters,
  updateDateFilters,
  updateTimeFilters,
  toggleFilterBar,
  clearAllFilters,
  saveFilters,
} from '../actions/actions.js';

const generateDateOptions = () => {
  let dateOptions = {};
  for (let index = 0; index < 7; index++) {
    const currentDate = addDays(new Date(), index); // TODO: This isn't really required I just need {Su: 0} etc.
    dateOptions[format(currentDate, 'EEEEEE')] = format(currentDate, 'i');
  }
  return dateOptions;
};

const dateOptions = generateDateOptions();

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
  font-size: 14px;
  min-height: 70px;
  @media ${device.mobileS} {
    padding: 0px;
  }

  @media ${device.mobileL} {
    padding: 2px;
  }

  @media ${device.tablet} {
    padding: 5px;
  }
`;

const FilterTitle = styled.h1`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.backgroundColour};
  font-weight: 300;
  font-size: 24px;
  @media ${device.mobileS} {
    font-size: 18px;
    margin: 10px 5px;
  }

  @media ${device.mobileL} {
    font-size: 24px;
    margin: 10px 5px;
  }

  @media ${device.tablet} {
    margin: 20px 5px;
  }
`;

const FilterSectionTitle = styled.h2`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.backgroundColour};
  font-weight: 300;
  @media ${device.mobileS} {
    margin: 5px;
    font-size: 16px;
  }

  @media ${device.mobileL} {
    margin: 5px;
    font-size: 16px;
  }

  @media ${device.tablet} {
    margin: 10px;
    font-size: 18px;
  }
`;

const FilterGroupTitle = styled.h3`
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.backgroundColour};
  font-weight: 300;
  margin: 5px 0px;
  @media ${device.mobileS} {
    font-size: 14px;
  }

  @media ${device.mobileL} {
    font-size: 14px;
  }

  @media ${device.tablet} {
    font-size: 18px;
  }
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
  overflow-y: auto;
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

const SaveButton = styled(Button)`
  height: 25px;
  width: 55px;
  font-size: 14px;
`;

const Cover = styled.div`
  position: fixed;
  overflow: hidden;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: ${props => (props.visible ? '0px' : '-100%')};
  width: 100%;
  background: ${props => props.theme.borderColour};
  opacity: 0.2;
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
            {this.state.saveFilters && (
              <FilterSectionTitle> Saved Filters </FilterSectionTitle>
            )}
            <SavedFilterList />
            <FilterSectionTitle> Custom Filters </FilterSectionTitle>
            <SaveFilterGroup>
              <FilterGroupTitle> Name: </FilterGroupTitle>
              <FilterNameInput
                onChange={this.handleNameChange}
                value={this.state.value}
              />
              <SaveButton onClick={this.onSaveButtonPress} text="Save" />
            </SaveFilterGroup>
            <FilterGroup>
              <FilterGroupTitle> Gym: </FilterGroupTitle>
              <Select
                name="gym-select"
                options={gyms}
                onChange={this.props.onGymFilterChange}
                value={this.props.gymFilter}
                isMulti
                closeMenuOnSelect={false}
                styles={selectStyles}
              />
            </FilterGroup>

            <FilterGroup>
              <FilterGroupTitle> Classes: </FilterGroupTitle>
              <Select
                name="class-select"
                options={this.props.classtypes || []}
                onChange={this.props.onClassFilterChange}
                value={this.props.classFilter}
                isMulti
                closeMenuOnSelect={false}
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
    classtypes: state.classtypes.classtypes,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterBar);
